import { expect, test } from "@playwright/test";
import { readFileSync } from "node:fs";
import {
  digest,
  type ReportsManifest,
} from "../../scripts/verify-public-delivery";

const manifest = JSON.parse(
  readFileSync("publishing/reports-manifest.json", "utf8"),
) as ReportsManifest;

test("preserved public library searches, opens reports and returns to the new Home under CSP", async ({
  page,
  request,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  const csp = readFileSync("public/_headers", "utf8")
    .split("\n")
    .find((line) => line.includes("Content-Security-Policy:"))!
    .split("Content-Security-Policy:")[1]
    .trim();
  await page.route("**/*", async (route) => {
    const response = await route.fetch();
    await route.fulfill({
      response,
      headers: { ...response.headers(), "content-security-policy": csp },
    });
  });
  await page.goto("/informes/");
  await expect(page.locator(".report-card")).toHaveCount(26);
  await expect(page.getByRole("search")).toBeVisible();
  await page
    .getByRole("searchbox", { name: "Buscar empresa o sector" })
    .fill("Mega Research");
  await expect(page.locator(".report-card:visible")).toHaveCount(1);
  await expect(page.getByRole("status")).toContainText("1");
  const pdf = await request.get("/informes/megaresearch/informe.pdf");
  expect(pdf.status()).toBe(200);
  expect(digest(await pdf.body())).toBe(
    manifest.files["informes/megaresearch/informe.pdf"],
  );
  await page.getByRole("button", { name: "Limpiar", exact: true }).click();
  await expect(page.locator(".report-card:visible")).toHaveCount(26);
  await page
    .getByRole("link", { name: "Abrir informe de Mega Research", exact: true })
    .click();
  await expect(page).toHaveURL(/\/informes\/megaresearch\/$/);
  await expect(page.locator("h1")).toBeVisible();
  const evidence = await request.get(
    "/informes/megaresearch/evidence/D-001.html",
  );
  expect(evidence.status()).toBe(200);
  expect(digest(await evidence.body())).toBe(
    manifest.files["informes/megaresearch/evidence/D-001.html"],
  );
  await page.goto("/informes/");
  await page
    .getByRole("link", { name: "KAIRUM, volver al inicio", exact: true })
    .click();
  await expect(page).toHaveURL(/\/$/);
  await expect(page.locator("body")).toHaveAttribute("data-page", "home");
  expect(errors).toEqual([]);
});

test("each preserved report keeps its exact HTML; the library retains noindex headers", async ({
  request,
}) => {
  for (const path of Object.keys(manifest.files).filter((path) =>
    /^informes\/[^/]+\/index\.html$/.test(path),
  )) {
    const response = await request.get(`/${path}`);
    expect(response.status(), path).toBe(200);
    expect(digest(await response.body()), path).toBe(manifest.files[path]);
  }
  // Some published legacy reports rely on Pages headers instead of a robots
  // meta tag. Preserve their bytes; production HTTP checks verify that header.
  expect(readFileSync("public/_headers", "utf8")).toMatch(
    /\/informes\/\*\s+X-Robots-Tag: noindex, nofollow/,
  );
  for (const path of [
    "/propuestas/",
    "/propuestas/megaresearch/propuesta.pdf",
    "/informes/megaresearch/data/responses.json",
    "/.env",
  ]) {
    expect((await request.get(path)).status(), path).toBe(404);
  }
});
