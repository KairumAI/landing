import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { setTimeout } from "node:timers/promises";
import { fileURLToPath } from "node:url";
import { digest, type DeliveryManifest } from "./verify-public-delivery";

type FetchPage = (url: string) => Promise<Response>;

export function livePaths(manifest: DeliveryManifest) {
  const paths = new Set([
    "index.html",
    "productos/analytics/index.html",
    "robots.txt",
    "sitemap.xml",
    "informes/index.html",
    "informes/hub.js",
  ]);
  for (const path of Object.keys(manifest.files)) {
    if (
      /^informes\/[^/]+\/(?:index\.html|informe\.pdf)$/.test(path) ||
      /^informes\/[^/]+\/evidence\/(?:D|DQ|T)-001\.html$/.test(path)
    )
      paths.add(path);
  }
  const script = Object.keys(manifest.files).find((path) =>
    /^_astro\/.*\.js$/.test(path),
  );
  assert.ok(script, "Missing Astro client bundle");
  paths.add(script);
  return [...paths];
}

export async function checkPublicDeliveryLive(
  manifest: DeliveryManifest,
  fetchPage: FetchPage = (url) =>
    fetch(url, { signal: AbortSignal.timeout(15000), cache: "no-store" }),
  origin = "https://kairum.com.ar",
) {
  assert.ok(
    ["https://kairum.com.ar", "https://kairum.pages.dev"].includes(origin),
    "Unexpected public origin",
  );
  const paths = livePaths(manifest);
  for (const path of paths) {
    assert.ok(manifest.files[path], `Missing live checksum: ${path}`);
    const response = await fetchPage(`${origin}/${path}`);
    assert.equal(response.status, 200, `Unavailable published file: ${path}`);
    assert.equal(
      digest(new Uint8Array(await response.arrayBuffer())),
      manifest.files[path],
      `Unexpected published bytes: ${path}`,
    );
    assert.equal(
      response.headers.get("x-content-type-options"),
      "nosniff",
      `Missing security header: ${path}`,
    );
    if (path.startsWith("informes/"))
      assert.match(response.headers.get("x-robots-tag") ?? "", /noindex/);
  }
  const excluded = [
    "/.env",
    "/api/health",
    "/api/workspace",
    "/dashboard",
    "/login",
    "/propuestas/",
    ...Object.keys(manifest.files).flatMap((path) => {
      const match = /^informes\/([^/]+)\/index\.html$/.exec(path);
      return match ? [`/propuestas/${match[1]}/propuesta.pdf`] : [];
    }),
  ];
  for (const path of excluded) {
    const response = await fetchPage(`${origin}${path}`);
    const blockedProposal =
      origin === "https://kairum.com.ar" &&
      path.startsWith("/propuestas/") &&
      response.status === 403;
    assert.ok(
      response.status === 404 || blockedProposal,
      `Unexpected public route: ${path}`,
    );
    await response.body?.cancel();
  }
  return {
    passed: true,
    checked_files: paths.length,
    excluded_routes: excluded.length,
  };
}

if (
  process.argv[1] &&
  resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  const path =
    process.argv[2] ??
    fileURLToPath(
      new URL("../build/public-delivery-manifest.json", import.meta.url),
    );
  const manifest = JSON.parse(await readFile(path, "utf8")) as DeliveryManifest;
  for (let attempt = 1; ; attempt++) {
    try {
      console.log(JSON.stringify(await checkPublicDeliveryLive(manifest)));
      break;
    } catch (error) {
      if (attempt === 6) throw error;
      console.log(
        `Waiting for public delivery (${attempt}/6): ${error instanceof Error ? error.message : String(error)}`,
      );
      await setTimeout(10000);
    }
  }
}
