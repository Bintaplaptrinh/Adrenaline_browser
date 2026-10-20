import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import vm from "node:vm";
import * as policy from "../src/adrenaline/common/sys/AdrenalineDebRelease.mjs";

const buildId = "20261020180000";
const version = `1.21.5b+${buildId}`;
const tag = `deb-${buildId}`;
const digest = "a".repeat(64);
const installed = {
  schema: 1,
  repository: policy.DEB_REPOSITORY,
  version: "1.21.5b+20261019180000",
  build_id: "20261019180000",
  arch: "amd64",
};

function fixture() {
  const assets = Object.fromEntries(
    ["amd64", "arm64"].map((arch) => {
      const name = `adrenaline-browser_${version}_${arch}.deb`;
      return [
        arch,
        {
          name,
          url: `${policy.DEB_RELEASES_URL}/download/${tag}/${encodeURIComponent(name)}`,
          sha256: digest,
          size: 100,
        },
      ];
    }),
  );
  const manifest = {
    schema: 1,
    repository: policy.DEB_REPOSITORY,
    version,
    build_id: buildId,
    tag,
    assets,
  };
  const release = {
    tag_name: tag,
    draft: false,
    prerelease: false,
    assets: [
      {
        name: policy.DEB_MANIFEST_NAME,
        state: "uploaded",
        size: 1024,
        browser_download_url: `${policy.DEB_RELEASES_URL}/download/${tag}/${policy.DEB_MANIFEST_NAME}`,
      },
      ...Object.values(assets).map((asset) => ({
        name: asset.name,
        browser_download_url: asset.url,
        state: "uploaded",
        size: asset.size,
        digest: `sha256:${asset.sha256}`,
      })),
    ],
  };
  return { manifest, release };
}

test("selects the matching Debian architecture and ignores old/equal builds", () => {
  const { manifest, release } = fixture();
  for (const arch of ["amd64", "arm64"]) {
    assert.equal(
      policy.selectDebUpdate(release, manifest, { ...installed, arch }).arch,
      arch,
    );
  }
  assert.equal(
    policy.selectDebUpdate(release, manifest, {
      ...installed,
      build_id: buildId,
    }),
    null,
  );
  assert.equal(
    policy.selectDebUpdate(release, manifest, {
      ...installed,
      build_id: "20261021180000",
    }),
    null,
  );
});

test("ignores legacy Windows releases, drafts, and prereleases", () => {
  const { manifest, release } = fixture();
  for (const candidate of [
    { ...release, tag_name: "1.0.0" },
    { ...release, draft: true },
    { ...release, prerelease: true },
    { ...release, assets: [] },
  ]) {
    assert.equal(policy.selectDebUpdate(candidate, manifest, installed), null);
  }
});

test("accepts equivalent GitHub asset URLs with literal or encoded plus signs", () => {
  const { release, manifest } = fixture();
  release.assets[1].browser_download_url =
    release.assets[1].browser_download_url.replace("%2B", "+");
  assert.equal(
    policy.selectDebUpdate(release, manifest, installed).version,
    version,
  );
});

test("rejects foreign URLs, incomplete uploads, and malformed release identities", () => {
  const mutations = [
    (data) => {
      data.manifest.repository = "other/repo";
    },
    (data) => {
      data.manifest.build_id = "20261021180000";
    },
    (data) => {
      data.manifest.version = "../../evil";
    },
    (data) => {
      data.manifest.assets.amd64.url = "https://evil.example/package.deb";
    },
    (data) => {
      data.manifest.assets.amd64.sha256 = "missing";
    },
    (data) => {
      data.manifest.assets.amd64.size = 2147483649;
    },
    (data) => {
      delete data.manifest.assets.amd64;
    },
    (data) => {
      data.release.assets[1].state = "new";
    },
    (data) => {
      data.release.assets[1].size = 99;
    },
    (data) => {
      data.release.assets[1].digest = `sha256:${"b".repeat(64)}`;
    },
    (data) => {
      data.release.assets[0].browser_download_url += "?redirect=evil";
    },
  ];
  for (const mutate of mutations) {
    const data = fixture();
    mutate(data);
    assert.throws(() =>
      policy.selectDebUpdate(data.release, data.manifest, installed),
    );
  }
  assert.equal(
    policy.isReleaseAssetURL("http://github.com/evil", tag, "x.deb"),
    false,
  );
});

async function updaterHarness({
  checksum = digest,
  aptExit = 0,
  packageArch = "amd64",
  enabled = true,
} = {}) {
  const data = fixture();
  const calls = {
    requests: [],
    downloads: [],
    processes: [],
    removed: [],
    states: [],
    chunks: [],
  };
  const preferences = new Map([["adrenaline.deb.updates.enabled", enabled]]);
  const fakeFile = (name) => ({
    path: name === "GreD" ? "/app" : "/tmp",
    append(part) {
      this.path = path.posix.join(this.path, part);
    },
    exists() {
      return true;
    },
    createUnique() {
      this.path += "-unique";
    },
  });
  const Services = {
    appinfo: { OS: "Linux", XPCOMABI: "x86_64-gcc3" },
    dirsvc: { get: fakeFile },
    prefs: {
      getBoolPref: (key, fallback) => preferences.get(key) ?? fallback,
      getStringPref: (key, fallback) => preferences.get(key) ?? fallback,
      setStringPref: (key, value) => preferences.set(key, value),
    },
    obs: {
      notifyObservers() {
        calls.states.push(updater.state);
      },
    },
  };
  const Downloads = {
    async createDownload(options) {
      calls.downloads.push(options);
      return { progress: 100, async start() {}, async finalize() {} };
    },
  };
  const Subprocess = {
    async call(options) {
      calls.processes.push(options);
      const chunks = options.command.endsWith("dpkg-deb")
        ? ["adrenaline-browser\n", `${version}\n`, packageArch, ""]
        : ["apt output\n".repeat(10000), "installation finished", ""];
      calls.chunks.push(chunks);
      return {
        stdout: {
          async readString() {
            return chunks.shift();
          },
        },
        async wait() {
          return { exitCode: options.command.endsWith("pkexec") ? aptExit : 0 };
        },
      };
    },
  };
  const context = vm.createContext({
    console,
    URL,
    AbortSignal,
    Date,
    Services,
    Ci: { nsIFile: { DIRECTORY_TYPE: 1 } },
    IOUtils: {
      async readJSON() {
        return { ...installed };
      },
      async stat() {
        return { size: 100 };
      },
      async computeHexDigest() {
        return checksum;
      },
      async remove(value) {
        calls.removed.push(value);
      },
    },
    PathUtils: { join: path.posix.join, parent: path.posix.dirname },
    async fetch(url) {
      calls.requests.push(url);
      return {
        ok: true,
        async json() {
          return url === policy.DEB_RELEASE_API ? data.release : data.manifest;
        },
      };
    },
  });
  const source = await readFile(
    new URL(
      "../src/adrenaline/common/sys/AdrenalineDebUpdater.sys.mjs",
      import.meta.url,
    ),
    "utf8",
  );
  const module = new vm.SourceTextModule(source, { context });
  await module.link((specifier) => {
    const exports = specifier.endsWith("AdrenalineDebRelease.mjs")
      ? policy
      : specifier.endsWith("Downloads.sys.mjs")
        ? { Downloads }
        : specifier.endsWith("Subprocess.sys.mjs")
          ? { Subprocess }
          : {
              setTimeout() {},
              clearTimeout() {},
              setInterval() {},
              clearInterval() {},
            };
    return new vm.SyntheticModule(
      Object.keys(exports),
      function () {
        for (const [key, value] of Object.entries(exports)) {
          this.setExport(key, value);
        }
      },
      { context },
    );
  });
  await module.evaluate();
  const updater = module.namespace.AdrenalineDebUpdater;
  return { updater, calls, Services };
}

test("checking is deduplicated and never downloads or installs without a user action", async () => {
  const { updater, calls } = await updaterHarness();
  const check = updater.check(true);
  assert.equal(updater.check(true), check);
  await check;
  assert.equal(updater.state, "available");
  assert.equal(calls.requests.length, 2);
  assert.equal(calls.downloads.length, 0);
  assert.equal(calls.processes.length, 0);
  await updater.check();
  assert.equal(calls.requests.length, 2, "background checks are rate limited");
});

test("verified packages install through PolicyKit/apt, drain output, then require restart", async () => {
  const { updater, calls } = await updaterHarness();
  await updater.check(true);
  const install = updater.downloadAndInstall();
  assert.equal(updater.downloadAndInstall(), install);
  await install;
  assert.equal(updater.state, "installed");
  assert.equal(calls.downloads.length, 1);
  assert.deepEqual(
    calls.processes.map((item) => item.command),
    ["/usr/bin/dpkg-deb", "/usr/bin/pkexec"],
  );
  assert.equal(calls.processes[1].arguments[0], "/usr/bin/apt-get");
  assert.ok(calls.processes[1].arguments.includes("--no-remove"));
  assert.ok(calls.chunks.every((chunks) => chunks.length === 0));
  assert.equal(
    calls.removed.length,
    2,
    "package and private temporary directory removed",
  );
  await updater.check(true);
  assert.equal(updater.state, "installed");
});

test("checksum mismatch prevents every installer subprocess", async () => {
  const { updater, calls } = await updaterHarness({ checksum: "b".repeat(64) });
  await updater.check(true);
  await assert.rejects(updater.downloadAndInstall(), /checksum/);
  assert.equal(updater.state, "error");
  assert.equal(calls.processes.length, 0);
  assert.equal(calls.removed.length, 2);
});

test("package architecture mismatch prevents privileged installation", async () => {
  const { updater, calls } = await updaterHarness({ packageArch: "arm64" });
  await updater.check(true);
  await assert.rejects(updater.downloadAndInstall(), /identity/);
  assert.equal(calls.processes.length, 1);
});

test("cancelled administrator authentication is an error and can be retried", async () => {
  const { updater, calls } = await updaterHarness({ aptExit: 126 });
  await updater.check(true);
  await assert.rejects(updater.downloadAndInstall(), /cancelled/);
  assert.equal(updater.state, "error");
  assert.equal(calls.removed.length, 2);
  assert.equal(updater._operation, null);
});

test("disabled updates do not contact GitHub", async () => {
  const { updater, calls } = await updaterHarness({ enabled: false });
  await updater.check(true);
  assert.equal(calls.requests.length, 0);
});
