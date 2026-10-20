// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

export const DEB_REPOSITORY = "Bintaplaptrinh/Adrenaline_browser";
export const DEB_RELEASES_URL = `https://github.com/${DEB_REPOSITORY}/releases`;
export const DEB_RELEASE_API = `https://api.github.com/repos/${DEB_REPOSITORY}/releases/latest`;
export const DEB_MANIFEST_NAME = "adrenaline-update.json";

export function validInstalledPackage(marker) {
  return (
    marker?.schema === 1 &&
    marker.repository === DEB_REPOSITORY &&
    typeof marker.version === "string" &&
    typeof marker.build_id === "string" &&
    /^[0-9][A-Za-z0-9.+~:-]*$/.test(marker.version) &&
    /^[0-9]{14}$/.test(marker.build_id) &&
    ["amd64", "arm64"].includes(marker.arch)
  );
}

export function isReleaseAssetURL(value, tag, name) {
  try {
    const url = new URL(value);
    return (
      url.origin === "https://github.com" &&
      !url.username &&
      !url.password &&
      !url.search &&
      !url.hash &&
      decodeURIComponent(url.pathname) ===
        `/${DEB_REPOSITORY}/releases/download/${tag}/${name}`
    );
  } catch {
    return false;
  }
}

export function getManifestAsset(release) {
  if (
    release?.draft ||
    release?.prerelease ||
    !/^deb-[0-9]{14}$/.test(release?.tag_name)
  ) {
    return null;
  }
  const asset = release.assets?.find((item) => item.name === DEB_MANIFEST_NAME);
  if (!asset) {
    return null;
  }
  if (
    asset.state !== "uploaded" ||
    !Number.isSafeInteger(asset.size) ||
    asset.size < 1 ||
    asset.size > 65536 ||
    !isReleaseAssetURL(
      asset.browser_download_url,
      release.tag_name,
      DEB_MANIFEST_NAME,
    )
  ) {
    throw new Error("Invalid Debian release manifest asset");
  }
  return asset;
}

/** Fail closed on incomplete releases, foreign URLs, or mismatched packages. */
export function selectDebUpdate(release, manifest, installed) {
  if (!validInstalledPackage(installed)) {
    throw new Error("Invalid installed Debian package marker");
  }
  if (!getManifestAsset(release)) {
    return null;
  }
  if (
    manifest?.schema !== 1 ||
    manifest.repository !== DEB_REPOSITORY ||
    manifest.tag !== release.tag_name ||
    manifest.tag !== `deb-${manifest.build_id}` ||
    typeof manifest.version !== "string" ||
    typeof manifest.build_id !== "string" ||
    !/^[0-9]{14}$/.test(manifest.build_id) ||
    !/^[0-9][A-Za-z0-9.+~:-]*$/.test(manifest.version)
  ) {
    throw new Error("Invalid Debian update manifest identity");
  }
  const asset = manifest.assets?.[installed.arch];
  const name = `adrenaline-browser_${manifest.version}_${installed.arch}.deb`;
  const published = release.assets?.find((item) => item.name === name);
  if (
    asset?.name !== name ||
    !/^[a-f0-9]{64}$/.test(asset.sha256) ||
    !Number.isSafeInteger(asset.size) ||
    asset.size < 1 ||
    asset.size > 2147483648 ||
    !isReleaseAssetURL(asset.url, manifest.tag, name) ||
    published?.state !== "uploaded" ||
    published.size !== asset.size ||
    !isReleaseAssetURL(published.browser_download_url, manifest.tag, name) ||
    (published.digest && published.digest !== `sha256:${asset.sha256}`)
  ) {
    throw new Error("Invalid or incomplete Debian release package");
  }
  if (manifest.build_id <= installed.build_id) {
    return null;
  }
  return Object.freeze({
    ...asset,
    version: manifest.version,
    build_id: manifest.build_id,
    arch: installed.arch,
    releaseURL: `${DEB_RELEASES_URL}/tag/${manifest.tag}`,
  });
}
