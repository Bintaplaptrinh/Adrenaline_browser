import importlib.util
import json
from pathlib import Path
import shutil
import subprocess
import tarfile
import tempfile
import unittest

ROOT = Path(__file__).resolve().parent.parent
spec = importlib.util.spec_from_file_location("deb_release", ROOT / "scripts/deb-release.py")
release = importlib.util.module_from_spec(spec)
spec.loader.exec_module(release)
BUILD_ID = "20261020180000"
VERSION = f"1.21.5b+{BUILD_ID}"
TAG = f"deb-{BUILD_ID}"


class DebianReleaseTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.workspace = tempfile.TemporaryDirectory(prefix="adrenaline-deb-test-")
        cls.root = Path(cls.workspace.name)
        application = cls.root / "application/adrenaline"
        application.mkdir(parents=True)
        executable = application / "adrenaline"
        executable.write_text("#!/bin/sh\nexit 0\n")
        executable.chmod(0o755)
        cls.tarball = cls.root / "browser.tar.xz"
        with tarfile.open(cls.tarball, "w:xz") as archive:
            archive.add(application, arcname="adrenaline")
        cls.packages = cls.root / "packages"
        for arch in ("x86_64", "aarch64"):
            subprocess.run([
                "bash", str(ROOT / "scripts/package-deb.sh"), "--tarball", str(cls.tarball),
                "--arch", arch, "--version", VERSION, "--build-id", BUILD_ID,
                "--out", str(cls.packages),
            ], check=True, capture_output=True, text=True)

    @classmethod
    def tearDownClass(cls):
        cls.workspace.cleanup()

    def setUp(self):
        self.temporary = tempfile.TemporaryDirectory(prefix="release-", dir=self.root)
        self.addCleanup(self.temporary.cleanup)
        self.dist = Path(self.temporary.name)
        for package in self.packages.glob("*.deb"):
            shutil.copy(package, self.dist)

    def manifest(self):
        return release.create_manifest(self.dist, VERSION, BUILD_ID, TAG)

    def test_packages_produce_arch_specific_manifest_and_matching_checksums(self):
        manifest = self.manifest()
        self.assertEqual(set(manifest["assets"]), {"amd64", "arm64"})
        self.assertEqual(json.loads((self.dist / "adrenaline-update.json").read_text()), manifest)
        subprocess.run(["sha256sum", "--check", "SHA256SUMS"], cwd=self.dist, check=True, capture_output=True)

    def test_package_contains_launcher_policies_and_update_identity(self):
        package = next(self.dist.glob("*_amd64.deb"))
        extraction = self.dist / "extracted"
        subprocess.run(["dpkg-deb", "--extract", str(package), str(extraction)], check=True)
        marker = json.loads((extraction / "usr/lib/adrenaline/distribution/adrenaline-deb.json").read_text())
        self.assertEqual(marker["version"], VERSION)
        self.assertEqual(marker["build_id"], BUILD_ID)
        self.assertEqual(marker["arch"], "amd64")
        self.assertTrue((extraction / "usr/bin/adrenaline").is_symlink())
        policies = json.loads((extraction / "usr/lib/adrenaline/distribution/policies.json").read_text())
        self.assertTrue(policies["policies"]["DisableAppUpdate"], "Firefox MAR updates remain disabled")

    def test_incomplete_release_is_rejected(self):
        next(self.dist.glob("*_arm64.deb")).unlink()
        with self.assertRaises(ValueError):
            self.manifest()
        self.assertFalse((self.dist / "adrenaline-update.json").exists())

    def test_mismatched_version_is_rejected(self):
        with self.assertRaises(ValueError):
            release.create_manifest(self.dist, f"1.21.6b+{BUILD_ID}", BUILD_ID, TAG)

    def test_mismatched_build_marker_is_rejected(self):
        with self.assertRaises(ValueError):
            release.create_manifest(self.dist, VERSION, "20261021180000", "deb-20261021180000")

    def test_invalid_release_identity_is_rejected(self):
        for version, build_id, tag in [
            ("../../evil", BUILD_ID, TAG), (VERSION, "20261320180000", TAG),
            (VERSION, BUILD_ID, "other-tag"),
        ]:
            with self.subTest(version=version, build_id=build_id, tag=tag):
                with self.assertRaises(ValueError):
                    release.validate_identity(version, build_id, tag)

    def test_ci_revision_is_newer_than_base_version(self):
        subprocess.run(["dpkg", "--compare-versions", VERSION, "gt", "1.21.5b"], check=True)
        subprocess.run(["dpkg", "--compare-versions", VERSION, "gt", "1.21.5b+20261019180000"], check=True)


if __name__ == "__main__":
    unittest.main()
