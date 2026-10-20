// This Source Code Form is subject to the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { Downloads } from "resource://gre/modules/Downloads.sys.mjs";
import { Subprocess } from "resource://gre/modules/Subprocess.sys.mjs";
import {
  setTimeout,
  clearTimeout,
  setInterval,
  clearInterval,
} from "resource://gre/modules/Timer.sys.mjs";
import {
  DEB_RELEASE_API,
  getManifestAsset,
  selectDebUpdate,
  validInstalledPackage,
} from "resource:///modules/AdrenalineDebRelease.mjs";

const INTERVAL = 6 * 60 * 60 * 1000;
const STATE_TOPIC = "adrenaline-deb-update-state";

async function readOutput(pipe, collect = false) {
  let output = "";
  for (;;) {
    const chunk = await pipe.readString();
    if (!chunk) {
      return output;
    }
    if (collect) {
      output += chunk;
    }
  }
}

class DebianUpdater {
  state = "idle";
  update = null;
  progress = 0;
  _started = false;
  _checking = null;
  _operation = null;
  _downloadPath = null;

  get isDebPackage() {
    if (Services.appinfo.OS !== "Linux") {
      return false;
    }
    const marker = Services.dirsvc.get("GreD", Ci.nsIFile);
    marker.append("distribution");
    marker.append("adrenaline-deb.json");
    return marker.exists();
  }

  async installedPackage() {
    if (!this.isDebPackage) {
      return null;
    }
    // Keep the running binary's identity even after apt replaces files on disk.
    if (!this._installed) {
      const marker = await IOUtils.readJSON(
        PathUtils.join(
          Services.dirsvc.get("GreD", Ci.nsIFile).path,
          "distribution",
          "adrenaline-deb.json",
        ),
      );
      const arch = Services.appinfo.XPCOMABI.split("-")[0];
      const expected = { x86_64: "amd64", aarch64: "arm64" }[arch];
      if (!validInstalledPackage(marker) || marker.arch !== expected) {
        throw new Error("Invalid Debian installation metadata");
      }
      this._installed = marker;
    }
    return this._installed;
  }

  get enabled() {
    return (
      this.isDebPackage &&
      Services.prefs.getBoolPref("adrenaline.deb.updates.enabled", true)
    );
  }

  _setState(state) {
    this.state = state;
    Services.obs.notifyObservers(null, STATE_TOPIC);
  }

  start() {
    if (this._started || !this.enabled) {
      return;
    }
    this._started = true;
    const check = () =>
      this.check().catch((error) =>
        console.error("Adrenaline Debian update:", error),
      );
    this._initialTimer = setTimeout(check, 60000);
    this._timer = setInterval(check, INTERVAL);
    this._shutdown = () => {
      clearTimeout(this._initialTimer);
      clearInterval(this._timer);
      Services.obs.removeObserver(this._shutdown, "quit-application");
    };
    Services.obs.addObserver(this._shutdown, "quit-application");
  }

  async _fetchJSON(url) {
    const response = await fetch(url, {
      credentials: "omit",
      cache: "no-store",
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(20000),
    });
    if (!response.ok) {
      throw new Error(`GitHub release request failed (${response.status})`);
    }
    return response.json();
  }

  check(force = false) {
    if (this._checking) {
      return this._checking;
    }
    if (!this.enabled || this._operation || this.state === "installed") {
      return Promise.resolve(this.update);
    }
    const last = Services.prefs.getStringPref(
      "adrenaline.deb.updates.last-check",
      "0",
    );
    if (!force && Date.now() - Number(last) < INTERVAL) {
      return Promise.resolve(this.update);
    }
    this._checking = this._check().finally(() => {
      this._checking = null;
    });
    return this._checking;
  }

  async _check() {
    this._setState("checking");
    Services.prefs.setStringPref(
      "adrenaline.deb.updates.last-check",
      String(Date.now()),
    );
    try {
      const installed = await this.installedPackage();
      const release = await this._fetchJSON(DEB_RELEASE_API);
      const asset = getManifestAsset(release);
      const update = asset
        ? selectDebUpdate(
            release,
            await this._fetchJSON(asset.browser_download_url),
            installed,
          )
        : null;
      if (this._downloadPath && this.update?.build_id !== update?.build_id) {
        await this._removeDownload();
      }
      this.update = update;
      this._setState(
        update ? (this._downloadPath ? "ready" : "available") : "up-to-date",
      );
      return update;
    } catch (error) {
      this._setState("error");
      throw error;
    }
  }

  async _removeDownload() {
    if (this._downloadPath) {
      const directory = PathUtils.parent(this._downloadPath);
      await IOUtils.remove(this._downloadPath, { ignoreAbsent: true });
      this._downloadPath = null;
      await IOUtils.remove(directory, { ignoreAbsent: true });
    }
  }

  async _verifyPackage(path, update) {
    const stat = await IOUtils.stat(path);
    if (
      stat.size !== update.size ||
      (await IOUtils.computeHexDigest(path, "sha256")) !== update.sha256
    ) {
      throw new Error("Debian update checksum verification failed");
    }
    const process = await Subprocess.call({
      command: "/usr/bin/dpkg-deb",
      arguments: [
        "--show",
        "--showformat=${Package}\n${Version}\n${Architecture}",
        path,
      ],
    });
    const output = await readOutput(process.stdout, true);
    const { exitCode } = await process.wait();
    if (
      exitCode !== 0 ||
      output.trim() !== `adrenaline-browser\n${update.version}\n${update.arch}`
    ) {
      throw new Error("Debian update package identity verification failed");
    }
  }

  downloadAndInstall() {
    if (this._operation) {
      return this._operation;
    }
    if (
      !this.enabled ||
      !this.update ||
      this._checking ||
      this.state === "installed"
    ) {
      return Promise.reject(new Error("No Debian update is ready"));
    }
    this._operation = this._install().finally(() => {
      this._operation = null;
    });
    return this._operation;
  }

  async _install() {
    const update = this.update;
    try {
      if (!this._downloadPath) {
        this._setState("downloading");
        const directory = Services.dirsvc.get("TmpD", Ci.nsIFile);
        directory.append("adrenaline-update");
        directory.createUnique(Ci.nsIFile.DIRECTORY_TYPE, 0o700);
        const path = PathUtils.join(directory.path, update.name);
        this._downloadPath = path;
        const download = await Downloads.createDownload({
          source: { url: update.url, isPrivate: true },
          target: path,
        });
        download.onchange = () => {
          if (this.progress !== download.progress) {
            this.progress = download.progress;
            this._setState("downloading");
          }
        };
        try {
          await download.start();
        } finally {
          await download.finalize(true);
        }
      }
      this._setState("verifying");
      await this._verifyPackage(this._downloadPath, update);
      this._setState("installing");
      // apt owns the installation. PolicyKit prompts for the administrator's
      // authorization; the browser never rewrites package-owned files itself.
      const process = await Subprocess.call({
        command: "/usr/bin/pkexec",
        arguments: [
          "/usr/bin/apt-get",
          "install",
          "--yes",
          "--no-remove",
          "--",
          this._downloadPath,
        ],
        stderr: "stdout",
      });
      // Drain output while apt runs, preventing a full pipe from blocking it.
      const output = readOutput(process.stdout);
      const { exitCode } = await process.wait();
      await output;
      if (exitCode !== 0) {
        throw new Error(
          `Debian update installation failed or was cancelled (${exitCode})`,
        );
      }
      await this._removeDownload();
      this._setState("installed");
    } catch (error) {
      await this._removeDownload().catch((cleanupError) =>
        console.error("Adrenaline update cleanup:", cleanupError),
      );
      this._setState("error");
      throw error;
    }
  }
}

export const AdrenalineDebUpdater = new DebianUpdater();
