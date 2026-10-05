import { expect, test } from "@playwright/test";
import {
  mkdtemp,
  mkdir,
  rm,
  writeFile,
  symlink,
  truncate,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { assertReleaseContext } from "../../scripts/check-release-ref";
import { checkPublicDeliveryLive } from "../../scripts/check-public-delivery-live";
import {
  digest,
  validateReportsManifest,
  verifyDelivery,
  verifyReports,
  type ReportsManifest,
} from "../../scripts/verify-public-delivery";

const content: Record<string, string> = {
  "informes/index.html": '<a href="tu-marca/">Informe</a>',
  "informes/hub.js": "export {};",
  "informes/tu-marca/index.html":
    '<a href="../../productos/analytics/">KAIRUM</a><img src="assets/logo.svg">',
  "informes/tu-marca/assets/logo.svg":
    '<svg xmlns="http://www.w3.org/2000/svg"></svg>',
  "informes/tu-marca/evidence/D-001.html": "Evidencia pública",
  "informes/tu-marca/informe.pdf": "%PDF-1.7",
};
const manifest: ReportsManifest = {
  schema_version: 1,
  source: {
    repository: "KairumAI/geo-product",
    commit: "a".repeat(40),
    run_id: 1,
    artifact_id: 1,
    artifact_sha256: "b".repeat(64),
    manifest_sha256: "c".repeat(64),
    public_origin: "https://kairum.com.ar",
  },
  reports: 1,
  files: Object.fromEntries(
    Object.entries(content).map(([path, bytes]) => [path, digest(bytes)]),
  ),
};

async function fixture() {
  const root = await mkdtemp(join(tmpdir(), "kairum-delivery-test-"));
  const files = {
    ...content,
    "index.html": "Home aprobada",
    "productos/analytics/index.html": "Analytics",
    "robots.txt": "User-agent: *",
    "sitemap.xml": "<urlset />",
    "404.html": "404",
    _headers:
      "/*\n  Content-Security-Policy: script-src 'self';\n\n/informes/*\n  X-Robots-Tag: noindex, nofollow\n",
    _redirects: "/landing / 301",
    "_astro/app.js": "export {};",
  };
  for (const [path, value] of Object.entries(files)) {
    await mkdir(dirname(join(root, path)), { recursive: true });
    await writeFile(join(root, path), value);
  }
  return {
    root,
    files,
    dispose: () => rm(root, { recursive: true, force: true }),
  };
}

test("complete package preserves report checksums and resolves its assets and links", async () => {
  const item = await fixture();
  try {
    const result = await verifyDelivery(item.root, manifest);
    expect(result.stats.reports).toBe(1);
    expect(result.stats.public_files).toBe(Object.keys(item.files).length);
    expect(result.stats.report_links).toBe(3);
  } finally {
    await item.dispose();
  }
});

for (const scenario of ["changed", "missing", "extra", "symlink"] as const) {
  test(`rejects a ${scenario} report file`, async () => {
    const item = await fixture();
    try {
      const path = join(item.root, "informes/tu-marca/index.html");
      if (scenario === "changed") await writeFile(path, "Wrong report");
      if (scenario === "missing") await rm(path);
      if (scenario === "extra")
        await writeFile(
          join(item.root, "informes/unreviewed.html"),
          "Unreviewed",
        );
      if (scenario === "symlink") {
        await rm(path);
        await symlink(join(item.root, "index.html"), path);
      }
      await expect(verifyReports(item.root, manifest)).rejects.toThrow();
    } finally {
      await item.dispose();
    }
  });
}

for (const path of [
  "../secret.txt",
  "informes/a/propuesta.pdf",
  "informes/a/data/responses.json",
  "informes/a/../../secret.txt",
  "informes/.env",
  "informes/a/bad.json",
]) {
  test(`rejects a private or escaping manifest path: ${path}`, () => {
    expect(() =>
      validateReportsManifest({
        ...manifest,
        files: { ...manifest.files, [path]: "d".repeat(64) },
      }),
    ).toThrow("Not an approved public report path");
  });
}

for (const path of [
  ".env",
  "propuestas/propuesta.pdf",
  "functions/index.js",
  "_worker.js",
]) {
  test(`rejects a private route or server in the final output: ${path}`, async () => {
    const item = await fixture();
    try {
      await mkdir(dirname(join(item.root, path)), { recursive: true });
      await writeFile(join(item.root, path), "Unpublishable");
      await expect(verifyDelivery(item.root, manifest)).rejects.toThrow();
    } finally {
      await item.dispose();
    }
  });
}

test("rejects an asset above the Pages Free limit", async () => {
  const item = await fixture();
  try {
    await writeFile(join(item.root, "large.pdf"), "");
    await truncate(join(item.root, "large.pdf"), 25 * 1024 * 1024 + 1);
    await expect(verifyDelivery(item.root, manifest)).rejects.toThrow(
      "Pages asset too large",
    );
  } finally {
    await item.dispose();
  }
});

test("detects broken report references after a shared landing asset is removed", async () => {
  const item = await fixture();
  try {
    await rm(join(item.root, "informes/tu-marca/assets/logo.svg"));
    const files = { ...manifest.files };
    delete files["informes/tu-marca/assets/logo.svg"];
    await expect(
      verifyDelivery(item.root, { ...manifest, files }),
    ).rejects.toThrow("Broken report reference");
  } finally {
    await item.dispose();
  }
});

const release = {
  repository: "KairumAI/landing",
  event: "release",
  ref: "refs/tags/v1.0.0",
};
for (const event of ["release", "workflow_dispatch"]) {
  test(`admits a version tag for ${event}`, () => {
    expect(() => assertReleaseContext({ ...release, event })).not.toThrow();
  });
}
for (const change of [
  { event: "push" },
  { event: "pull_request" },
  { ref: "refs/heads/main" },
  { ref: "refs/heads/v1.0.0" },
  { ref: "refs/tags/v1" },
  { repository: "another-owner/landing" },
]) {
  test(`rejects an ineligible release request: ${JSON.stringify(change)}`, () => {
    expect(() => assertReleaseContext({ ...release, ...change })).toThrow();
  });
}

for (const scenario of [
  "correct",
  "stale report",
  "missing noindex",
  "public proposal",
] as const) {
  test(`live verification checks ${scenario}`, async () => {
    const item = await fixture();
    try {
      const files = Object.fromEntries(
        Object.entries(item.files).map(([path, bytes]) => [
          path,
          digest(bytes),
        ]),
      );
      const fetchPage = async (url: string) => {
        const path = new URL(url).pathname.slice(1);
        if (!(path in item.files))
          return new Response(null, {
            status:
              scenario === "public proposal" && path.startsWith("propuestas/")
                ? 200
                : 404,
          });
        const headers: Record<string, string> = {
          "x-content-type-options": "nosniff",
        };
        if (scenario !== "missing noindex" && path.startsWith("informes/"))
          headers["x-robots-tag"] = "noindex, nofollow";
        const text =
          scenario === "stale report" && path === "informes/tu-marca/index.html"
            ? "Old report"
            : item.files[path as keyof typeof item.files];
        return new Response(text, { headers });
      };
      const result = checkPublicDeliveryLive(
        { schema_version: 1, commit: "a".repeat(40), files },
        fetchPage,
      );
      if (scenario === "correct") expect((await result).passed).toBe(true);
      else await expect(result).rejects.toThrow();
    } finally {
      await item.dispose();
    }
  });
}
