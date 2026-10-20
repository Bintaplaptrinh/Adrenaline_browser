#!/usr/bin/env python3
# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.

"""Prepare Debian-only releases and the browser's GitHub update manifest."""

import argparse
from datetime import datetime, timezone
import hashlib
import json
import os
from pathlib import Path
import re
import subprocess
import tarfile
from urllib.parse import quote

ROOT = Path(__file__).resolve().parent.parent
REPOSITORY = "Bintaplaptrinh/Adrenaline_browser"
ARCHITECTURES = {"x86_64": "amd64", "aarch64": "arm64"}


def validate_identity(version, build_id, tag=None):
    if not re.fullmatch(r"[0-9][A-Za-z0-9.+~:-]*", version):
        raise ValueError("Invalid Debian version")
    if not re.fullmatch(r"[0-9]{14}", build_id):
        raise ValueError("Invalid build ID")
    datetime.strptime(build_id, "%Y%m%d%H%M%S")
    if tag is not None and tag != f"deb-{build_id}":
        raise ValueError("Release tag must match its build ID")
    subprocess.run(["dpkg", "--validate-version", version], check=True)


def prepare():
    base = json.loads((ROOT / "surfer.json").read_text())["brands"]["release"]["release"]["displayVersion"]
    build_id = datetime.now(timezone.utc).strftime("%Y%m%d%H%M%S")
    version = f"{base}+{build_id}"
    tag = f"deb-{build_id}"
    validate_identity(version, build_id, tag)
    values = f"version={version}\nbuild_id={build_id}\ntag={tag}\n"
    print(values, end="")
    if output := os.environ.get("GITHUB_OUTPUT"):
        with open(output, "a") as stream:
            stream.write(values)


def package(args):
    validate_identity(args.version, args.build_id)
    target = "aarch64" if args.arch == "aarch64" else "x86_64"
    tarballs = list((ROOT / "engine").glob(f"obj-{target}*/dist/adrenaline-*.tar.xz"))
    if len(tarballs) != 1:
        raise ValueError(f"Expected one {target} browser tarball, found {len(tarballs)}")
    subprocess.run([
        "bash", str(ROOT / "scripts/package-deb.sh"),
        "--tarball", str(tarballs[0]), "--arch", args.arch,
        "--version", args.version, "--build-id", args.build_id,
    ], check=True)


def create_manifest(dist, version, build_id, tag):
    validate_identity(version, build_id, tag)
    assets = {}
    checksums = []
    packages = sorted(dist.glob("*.deb"))
    if len(packages) != 2:
        raise ValueError("A release requires exactly the amd64 and arm64 packages")
    for path in packages:
        fields = subprocess.check_output([
            "dpkg-deb", "--show", "--showformat=${Package}\n${Version}\n${Architecture}", str(path)
        ], text=True).splitlines()
        if len(fields) != 3:
            raise ValueError(f"Invalid package control fields: {path.name}")
        name, package_version, arch = fields
        if name != "adrenaline-browser" or package_version != version or arch not in ARCHITECTURES.values():
            raise ValueError(f"Unexpected package identity: {path.name}")
        expected_name = f"adrenaline-browser_{version}_{arch}.deb"
        if path.name != expected_name or arch in assets:
            raise ValueError(f"Unexpected or duplicate asset: {path.name}")
        # A release must contain the marker consumed by the installed updater.
        with subprocess.Popen(["dpkg-deb", "--fsys-tarfile", str(path)], stdout=subprocess.PIPE) as proc:
            with tarfile.open(fileobj=proc.stdout, mode="r|") as archive:
                marker = None
                for member in archive:
                    if member.name == "./usr/lib/adrenaline/distribution/adrenaline-deb.json":
                        marker = json.load(archive.extractfile(member))
                        break
                # Drain stdout before waiting for dpkg-deb to finish.
                for _ in archive:
                    pass
            if proc.wait() != 0:
                raise ValueError(f"Cannot read package: {path.name}")
        if marker != {"schema": 1, "repository": REPOSITORY, "version": version, "build_id": build_id, "arch": arch}:
            raise ValueError(f"Package update marker does not match release: {path.name}")
        with path.open("rb") as stream:
            digest = hashlib.file_digest(stream, "sha256").hexdigest()
        assets[arch] = {
            "name": path.name,
            "url": f"https://github.com/{REPOSITORY}/releases/download/{quote(tag, safe='')}/{quote(path.name, safe='')}",
            "sha256": digest,
            "size": path.stat().st_size,
        }
        checksums.append(f"{digest}  {path.name}\n")
    manifest = {"schema": 1, "repository": REPOSITORY, "version": version, "build_id": build_id, "tag": tag, "assets": assets}
    (dist / "adrenaline-update.json").write_text(json.dumps(manifest, indent=2) + "\n")
    (dist / "SHA256SUMS").write_text("".join(checksums))
    return manifest


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    commands = parser.add_subparsers(dest="command", required=True)
    commands.add_parser("prepare")
    for name in ("package", "manifest"):
        command = commands.add_parser(name)
        command.add_argument("--version", required=True)
        command.add_argument("--build-id", required=True)
        if name == "package":
            command.add_argument("--arch", choices=ARCHITECTURES, required=True)
        else:
            command.add_argument("--tag", required=True)
            command.add_argument("--dist", type=Path, default=ROOT / "dist")
    args = parser.parse_args()
    if args.command == "prepare":
        prepare()
    elif args.command == "package":
        package(args)
    else:
        create_manifest(args.dist, args.version, args.build_id, args.tag)


if __name__ == "__main__":
    main()
