import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { mkdir, readdir, readFile, stat, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

export type ReportsManifest = {
  schema_version: number;
  source: {
    repository: string;
    commit: string;
    run_id: number;
    artifact_id: number;
    artifact_sha256: string;
    manifest_sha256: string;
    public_origin: string;
  };
  reports: number;
  files: Record<string, string>;
};

export type DeliveryManifest = {
  schema_version: 1;
  commit: string;
  files: Record<string, string>;
};

export const digest = (data: Uint8Array | string) =>
  createHash("sha256").update(data).digest("hex");

const publicOrigin = "https://kairum.com.ar";
const privatePath =
  /(?:^|\/)(?:\.\.?|\.[^/]+|internal|data|propuestas?|proposals?|private|api|dashboard|login|node_modules|functions)(?:[/.]|$)/i;
const publicExtension =
  /\.(?:html|css|js|svg|webp|png|jpg|jpeg|ico|woff2|pdf|txt|xml)$/i;

export function validateReportsManifest(value: unknown): ReportsManifest {
  assert.ok(value && typeof value === "object", "Missing report manifest");
  const manifest = value as ReportsManifest;
  assert.equal(manifest.schema_version, 1, "Unknown report manifest version");
  assert.equal(manifest.source?.repository, "KairumAI/geo-product");
  assert.match(manifest.source?.commit ?? "", /^[a-f0-9]{40}$/);
  assert.match(manifest.source?.artifact_sha256 ?? "", /^[a-f0-9]{64}$/);
  assert.match(manifest.source?.manifest_sha256 ?? "", /^[a-f0-9]{64}$/);
  assert.ok(
    Number.isSafeInteger(manifest.source?.run_id) && manifest.source.run_id > 0,
  );
  assert.ok(
    Number.isSafeInteger(manifest.source?.artifact_id) &&
      manifest.source.artifact_id > 0,
  );
  assert.equal(manifest.source?.public_origin, publicOrigin);
  assert.ok(Number.isSafeInteger(manifest.reports) && manifest.reports > 0);
  assert.ok(manifest.files && typeof manifest.files === "object");
  assert.ok(manifest.files["informes/index.html"], "Missing report library");
  for (const [path, hash] of Object.entries(manifest.files)) {
    assert.ok(
      /^(?:informes\/|licenses\/OFL-[a-z-]+\.txt$)/.test(path) &&
        !privatePath.test(path) &&
        !path.includes("\\") &&
        path
          .split("/")
          .every((part) => /^[A-Za-z0-9][A-Za-z0-9._-]*$/.test(part)) &&
        publicExtension.test(path),
      `Not an approved public report path: ${path}`,
    );
    assert.match(hash, /^[a-f0-9]{64}$/, `Invalid public hash: ${path}`);
  }
  assert.equal(
    Object.keys(manifest.files).filter((path) =>
      /^informes\/[^/]+\/index\.html$/.test(path),
    ).length,
    manifest.reports,
    "Report catalog count changed",
  );
  return manifest;
}

export async function walkFiles(root: string, prefix = ""): Promise<string[]> {
  const entries = await readdir(join(root, prefix), { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    const path = prefix ? `${prefix}/${entry.name}` : entry.name;
    assert.ok(!entry.isSymbolicLink(), `Unexpected symlink: ${path}`);
    if (entry.isDirectory()) files.push(...(await walkFiles(root, path)));
    else {
      assert.ok(entry.isFile(), `Unexpected file type: ${path}`);
      files.push(path);
    }
  }
  return files.sort();
}

export async function verifyReports(root: string, manifest: ReportsManifest) {
  validateReportsManifest(manifest);
  const actual = (await walkFiles(root)).filter((path) =>
    path.startsWith("informes/"),
  );
  const expected = Object.keys(manifest.files)
    .filter((path) => path.startsWith("informes/"))
    .sort();
  assert.deepEqual(
    actual,
    expected,
    "Report files are missing or unapproved files were added",
  );
  for (const [path, expectedHash] of Object.entries(manifest.files)) {
    assert.equal(
      digest(await readFile(join(root, path))),
      expectedHash,
      `Published report changed: ${path}`,
    );
  }
  return {
    reports: manifest.reports,
    files: Object.keys(manifest.files).length,
  };
}

function referencePath(value: string, owner: string): string | undefined {
  const decoded = value.replaceAll("&amp;", "&");
  if (
    !decoded ||
    decoded.startsWith("#") ||
    /^(?:data|mailto|tel|javascript):/.test(decoded)
  )
    return;
  const url = new URL(decoded, `${publicOrigin}/${owner}`);
  if (url.origin !== publicOrigin && url.origin !== "https://kairum.pages.dev")
    return;
  const path = decodeURIComponent(url.pathname).slice(1);
  if (["landing", "landing/", "kairum", "kairum/"].includes(path))
    return "index.html";
  return path.endsWith("/") || !path ? `${path}index.html` : path;
}

export async function verifyReportLinks(
  root: string,
  manifest: ReportsManifest,
) {
  const available = new Set(await walkFiles(root));
  let checked = 0;
  for (const owner of Object.keys(manifest.files)) {
    if (!/\.(?:html|css)$/.test(owner)) continue;
    const content = await readFile(join(root, owner), "utf8");
    const matches = owner.endsWith(".html")
      ? content.matchAll(/(?:href|src|poster)\s*=\s*["']([^"']+)["']/g)
      : content.matchAll(/url\(\s*["']?([^)'"\s]+)["']?\s*\)/g);
    for (const match of matches) {
      const path = referencePath(match[1], owner);
      if (!path) continue;
      assert.ok(
        available.has(path) ||
          available.has(`${path}/index.html`) ||
          available.has(`${path}.html`),
        `Broken report reference in ${owner}: ${path}`,
      );
      checked++;
    }
  }
  return checked;
}

export async function verifyDelivery(root: string, manifest: ReportsManifest) {
  const reports = await verifyReports(root, manifest);
  const paths = await walkFiles(root);
  assert.ok(paths.length <= 20_000, "Pages Free file limit exceeded");
  const files: Record<string, string> = {};
  let bytes = 0;
  for (const path of paths) {
    assert.ok(
      !privatePath.test(path),
      `Private route in public output: ${path}`,
    );
    assert.ok(
      path === "_headers" ||
        path === "_redirects" ||
        (publicExtension.test(path) && !path.endsWith(".map")),
      `Not a static public file: ${path}`,
    );
    assert.ok(
      !/^_worker\.js(?:\/|$)/.test(path),
      "Pages Functions are not part of this delivery",
    );
    const size = (await stat(join(root, path))).size;
    assert.ok(size <= 25 * 1024 * 1024, `Pages asset too large: ${path}`);
    bytes += size;
    files[path] = digest(await readFile(join(root, path)));
  }
  for (const path of [
    "index.html",
    "productos/analytics/index.html",
    "robots.txt",
    "sitemap.xml",
    "404.html",
    "_headers",
    "_redirects",
  ]) {
    assert.ok(files[path], `Missing marketing resource: ${path}`);
  }
  const headers = await readFile(join(root, "_headers"), "utf8");
  assert.match(headers, /\/informes\/\*\s+X-Robots-Tag: noindex, nofollow/);
  assert.match(headers, /script-src 'self';/);
  const reportLinks = await verifyReportLinks(root, manifest);
  return {
    files,
    stats: {
      ...reports,
      public_files: paths.length,
      bytes,
      report_links: reportLinks,
    },
  };
}

if (
  process.argv[1] &&
  resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  const root = fileURLToPath(new URL("..", import.meta.url));
  const directory = process.argv[2];
  assert.ok(
    directory === "public" || directory === "dist",
    "Use public or dist",
  );
  const manifest = validateReportsManifest(
    JSON.parse(
      await readFile(join(root, "publishing/reports-manifest.json"), "utf8"),
    ),
  );
  if (directory === "public") {
    console.log(
      JSON.stringify({
        source: await verifyReports(join(root, directory), manifest),
      }),
    );
  } else {
    const { files, stats } = await verifyDelivery(
      join(root, directory),
      manifest,
    );
    await mkdir(join(root, "build"), { recursive: true });
    const delivery: DeliveryManifest = {
      schema_version: 1,
      commit: process.env.GITHUB_SHA ?? "local",
      files,
    };
    await writeFile(
      join(root, "build/public-delivery-manifest.json"),
      JSON.stringify(delivery, null, 2) + "\n",
    );
    console.log(JSON.stringify(stats));
  }
}
