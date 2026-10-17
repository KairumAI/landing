import { expect, test, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { readFileSync } from "node:fs";
import { mkdir } from "node:fs/promises";
import { join } from "node:path";
import { pageContent, pages, localizedPath } from "../../src/lib/routes";
import { contactConfig } from "../../src/lib/contact-config";
import { createContactSlots } from "../../src/components/kairum/contact-form";
import { contactCopy } from "../../src/i18n/contact";
import { locales, localeMeta, type Locale } from "../../src/i18n/locales";

const csp = readFileSync("public/_headers", "utf8")
  .split("\n")
  .find((line) => line.includes("Content-Security-Policy:"))!
  .split("Content-Security-Policy:")[1]
  .trim();
const configured = contactConfig("offline-contract", "offline-site-key");
async function capture(page: Page, name: string, selector: string) {
  const folder = process.env.CONTACT_SCREENSHOTS;
  if (!folder) return;
  await mkdir(folder, { recursive: true });
  const form = page.locator(selector).locator("[data-contact-form]");
  if (await form.count()) {
    await form.scrollIntoViewIfNeeded();
    if ((await form.getAttribute("data-configured")) === "true")
      await expect(form.locator("[data-contact-submit]")).toBeEnabled();
  }
  // Capture from the top so sticky navigation is not composited over long crops.
  await page.evaluate(async () => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    await new Promise<void>((resolve) =>
      requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
    );
  });
  const clip = await page.locator(selector).boundingBox();
  if (!clip) throw new Error(`Missing capture region: ${selector}`);
  await page.screenshot({
    path: join(folder, `${name}.png`),
    fullPage: true,
    clip,
  });
}
const providerScript = `window.turnstile = {
  render(container, options) {
    container.setAttribute('data-test-challenge', 'rendered');
    container.setAttribute('data-test-challenge-size', options.size);
    container.setAttribute('data-test-challenge-theme', options.theme);
    const frame = document.createElement('iframe');
    frame.title = 'Synthetic Turnstile verification';
    frame.width = '300';
    frame.height = '65';
    frame.style.cssText = 'display:block;border:0';
    frame.srcdoc = '<body style="margin:0;display:grid;place-items:center;box-sizing:border-box;width:300px;height:65px;border:1px solid #85857c;background:#fafaf7;color:#181818;font:12px sans-serif">Turnstile — offline fixture</body>';
    container.replaceChildren(frame);
    window.addEventListener('test:challenge-expired', options['expired-callback']);
    window.addEventListener('test:challenge-ready', () => options.callback('synthetic-turnstile-token'));
    options.callback('synthetic-turnstile-token');
    return 'offline-widget';
  },
  reset() { window.dispatchEvent(new Event('test:challenge-ready')); }
};`;

test.beforeEach(async ({ page }) => {
  // Keep navigation/capture tests offline too, even with production public IDs.
  await page.route("https://submit-form.com/**", (route) => route.abort());
  await page.route("https://challenges.cloudflare.com/**", (route) =>
    route.fulfill({
      contentType: "application/javascript",
      body: providerScript,
    }),
  );
});

// Use the actual renderer with public fixture configuration, while keeping the
// built site's scripts/CSS. Only the two external services are substituted.
async function openConfigured(
  page: Page,
  ready = true,
  path = "/contacto/",
  locale: Locale = "es",
) {
  const definition = pages.find((entry) => entry.path === path)!;
  const target = localizedPath(path, locale);
  await page.route("https://challenges.cloudflare.com/**", (route) =>
    route.fulfill({
      contentType: "application/javascript",
      body: ready
        ? providerScript
        : providerScript.replace(
            "options.callback('synthetic-turnstile-token');",
            "",
          ),
    }),
  );
  await page.route(
    (url) => url.pathname === target,
    async (route) => {
      const response = await route.fetch();
      const main = pageContent(
        definition.id,
        locale,
        createContactSlots(locale, configured),
      ).html.match(/<main\b[\s\S]*?<\/main>/)![0];
      await route.fulfill({
        response,
        headers: { ...response.headers(), "content-security-policy": csp },
        body: (await response.text()).replace(/<main\b[\s\S]*?<\/main>/, main),
      });
    },
  );
  await page.goto(target);
  await expect(page.locator('[name="name"]')).toBeEnabled();
  if (path === "/contacto/")
    await expect(page.locator("[data-contact-challenge]")).toHaveAttribute(
      "data-test-challenge",
      "rendered",
    );
}

async function fillContact(page: Page, locale: Locale = "es") {
  const copy = contactCopy[locale];
  await page.getByLabel(copy.name, { exact: true }).fill("Consulta sintética");
  await page.getByLabel(copy.email, { exact: true }).fill("test@example.com");
}

for (const [prefix, label] of [
  ["", "Quiero más información"],
  ["/en", "I'd like more information"],
  ["/pt-br", "Quero mais informações"],
]) {
  test(`${prefix || "es"}: an interested visitor can reach the contact form without booking`, async ({
    page,
  }) => {
    await page.goto(`${prefix}/`);
    const closing = page.locator("#contacto");
    await expect(closing.locator("form")).toBeVisible();
    await expect(
      closing.locator(":scope > .wrap > div:first-child h2"),
    ).toBeVisible();
    await expect(closing.locator(":scope > .wrap > a.button")).toHaveAttribute(
      "href",
      /calendly\.com/,
    );
    await capture(page, `${prefix.slice(1) || "es"}-home-contact`, "#contacto");
    await page.setViewportSize({ width: 320, height: 900 });
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBeLessThanOrEqual(320);
    await capture(
      page,
      `${prefix.slice(1) || "es"}-home-contact-320`,
      "#contacto",
    );
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page
      .locator("#contacto")
      .getByRole("link", { name: label, exact: true })
      .click();
    await expect(page).toHaveURL(new RegExp(`${prefix}/contacto/#consulta$`));
    await expect(page.locator("#consulta form")).toBeVisible();
    await capture(
      page,
      `${prefix.slice(1) || "es"}-contact-desktop`,
      ".info-hero",
    );
    await expect(page.locator('#consulta input[name="email"]')).toHaveAttribute(
      "type",
      "email",
    );
    await expect(page.locator('#consulta input[name="email"]')).toHaveAttribute(
      "required",
      "",
    );
    await expect(page.locator('#consulta input[name="name"]')).toHaveAttribute(
      "required",
      "",
    );
    await page.setViewportSize({ width: 320, height: 900 });
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBeLessThanOrEqual(320);
    await capture(page, `${prefix.slice(1) || "es"}-contact-320`, ".info-hero");
  });
}

test("missing, partial or invalid configuration never enables a receiver", () => {
  for (const [id, key] of [
    ["", ""],
    ["valid-id", ""],
    ["", "valid-site-key"],
    ["https://other.example/", "valid-site-key"],
    ["valid-id", "<script>"],
  ]) {
    expect(contactConfig(id, key)).toEqual({
      endpoint: "",
      siteKey: "",
      enabled: false,
    });
  }
  expect(contactConfig(" valid-id ", " valid-site-key ")).toEqual({
    endpoint: "https://submit-form.com/valid-id",
    siteKey: "valid-site-key",
    enabled: true,
  });
});

for (const path of ["/contacto/", "/"] as const) {
  test(`${path}: an accepted query sends the documented fields once and shows confirmation`, async ({
    page,
  }) => {
    let posts = 0;
    let payload: Record<string, unknown> = {};
    let release!: () => void;
    const held = new Promise<void>((resolve) => {
      release = resolve;
    });
    await page.route("https://submit-form.com/**", async (route) => {
      if (route.request().method() === "OPTIONS")
        return route.fulfill({
          status: 204,
          headers: {
            "access-control-allow-origin": "*",
            "access-control-allow-headers": "content-type",
            "access-control-allow-methods": "POST",
          },
        });
      posts++;
      payload = route.request().postDataJSON();
      await held;
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        headers: { "access-control-allow-origin": "*" },
        body: JSON.stringify(payload),
      });
    });
    await openConfigured(page, true, path);
    if (path !== "/")
      await capture(page, "configured-contact-desktop", ".info-hero");
    await page.setViewportSize({ width: 320, height: 900 });
    if (path !== "/")
      await capture(page, "configured-contact-320", ".info-hero");
    await fillContact(page);
    await page
      .getByRole("button", { name: "Enviar consulta", exact: true })
      .click();
    await expect(page.locator("form")).toHaveAttribute("aria-busy", "true");
    await page
      .locator("form")
      .evaluate((form) =>
        form.dispatchEvent(new Event("submit", { cancelable: true })),
      );
    await expect.poll(() => posts).toBe(1);
    release();
    await expect(page.getByRole("status")).toContainText(
      "Recibimos tu consulta",
    );
    await expect(page.locator("[data-contact-fields]")).toBeHidden();
    expect(payload).toEqual({
      name: "Consulta sintética",
      email: "test@example.com",
      company: "",
      message: "",
      _honeypot: "",
      "cf-turnstile-response": "synthetic-turnstile-token",
      _email: { subject: "Nueva consulta desde KAIRUM" },
    });
    expect(posts).toBe(1);
  });
}

const closingPages = pages.filter(
  (entry) =>
    entry.id === "home" ||
    entry.path.startsWith("/productos/") ||
    ["marcas", "agencias", "nosotros"].includes(entry.id),
);
for (const locale of locales) {
  for (const entry of closingPages) {
    test(`${locale}${entry.path}: closing keeps its booking CTA and receives one localized inquiry`, async ({
      page,
    }) => {
      let posts = 0;
      await page.route("https://submit-form.com/**", (route) => {
        if (route.request().method() === "OPTIONS")
          return route.fulfill({
            status: 204,
            headers: {
              "access-control-allow-origin": "*",
              "access-control-allow-headers": "content-type",
              "access-control-allow-methods": "POST",
            },
          });
        posts++;
        return route.fulfill({
          status: 200,
          contentType: "application/json",
          headers: { "access-control-allow-origin": "*" },
          body: "{}",
        });
      });
      await openConfigured(page, true, entry.path, locale);
      const closing = page.locator(
        entry.id === "home" ? ".home-contact" : ".closing-section",
      );
      const form = closing.locator("[data-contact-form]");
      await expect(page.locator("[data-contact-form]")).toHaveCount(1);
      await expect(
        closing.locator(":scope > .wrap > div:first-child h2"),
      ).toBeVisible();
      await expect(
        closing.locator(":scope > .wrap > a.button"),
      ).toHaveAttribute("href", /calendly\.com/);
      if (entry.id !== "home") {
        expect(
          await closing.evaluate(
            (element) => getComputedStyle(element).backgroundColor,
          ),
        ).toBe("rgb(255, 196, 0)");
        expect(
          await closing
            .locator(".contact-panel")
            .evaluate((element) => getComputedStyle(element).backgroundColor),
        ).toBe("rgba(0, 0, 0, 0)");
      }
      await form.scrollIntoViewIfNeeded();
      const challenge = form.locator("[data-contact-challenge]");
      await expect(challenge).toHaveAttribute(
        "data-test-challenge-size",
        "normal",
      );
      await expect(challenge).toHaveAttribute(
        "data-test-challenge-theme",
        entry.id === "home" ? "dark" : "light",
      );
      await expect(form.locator("[data-contact-submit]")).toBeEnabled();
      await capture(
        page,
        `${locale}-${entry.id}-closing`,
        entry.id === "home" ? ".home-contact" : ".closing-section",
      );
      await page.setViewportSize({ width: 320, height: 900 });
      const widget = challenge.locator("iframe");
      const widgetBox = await widget.boundingBox();
      expect(widgetBox?.width).toBe(300);
      expect(widgetBox?.height).toBe(65);
      expect(widgetBox!.x).toBeGreaterThanOrEqual(0);
      expect(widgetBox!.x + widgetBox!.width).toBeLessThanOrEqual(320);
      expect(
        await widget.evaluate((element) => getComputedStyle(element).transform),
      ).toBe("none");
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth),
      ).toBeLessThanOrEqual(320);
      await capture(
        page,
        `${locale}-${entry.id}-closing-320`,
        entry.id === "home" ? ".home-contact" : ".closing-section",
      );
      await fillContact(page, locale);
      await form
        .getByRole("button", {
          name: contactCopy[locale].messages.submit,
          exact: true,
        })
        .click();
      await expect(form.locator("[data-contact-status]")).toHaveText(
        contactCopy[locale].messages.success,
      );
      expect(posts).toBe(1);
    });
  }
}

for (const [index, locale] of locales.entries()) {
  test(`${locale}: footer language links share the existing footer and retain the current anchor`, async ({
    page,
  }) => {
    const path = ["/", "/productos/report/", "/blog/"][index];
    await page.goto(`${localizedPath(path, locale)}#contenido`);
    const nav = page.locator(".footer-bottom > .footer-languages");
    await expect(nav).toBeVisible();
    await expect(page.locator("[data-language-link]")).toHaveCount(3);
    await expect(page.locator(".locale-strip")).toHaveCount(0);
    for (const code of locales) {
      const link = nav.getByRole("link", {
        name: localeMeta[code].name,
        exact: true,
      });
      await expect(link).toHaveAttribute("href", localizedPath(path, code));
      await expect(link).toHaveAttribute("hreflang", localeMeta[code].hreflang);
    }
    await expect(nav.locator('[aria-current="page"]')).toHaveText(
      localeMeta[locale].name,
    );
    await capture(page, `${locale}-footer-languages`, ".site-footer");
    await page.setViewportSize({ width: 320, height: 900 });
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBeLessThanOrEqual(320);
    await capture(page, `${locale}-footer-languages-320`, ".site-footer");
    const next = locales[(index + 1) % locales.length];
    await nav
      .getByRole("link", { name: localeMeta[next].name, exact: true })
      .click();
    await expect(page).toHaveURL(
      new RegExp(`${localizedPath(path, next)}#contenido$`),
    );
  });
}

test("Home loads Turnstile only when the form approaches the viewport", async ({
  page,
}) => {
  let challengeRequests = 0;
  await openConfigured(page, true, "/");
  // Override the fixture for the next navigation to count actual script requests.
  await page.route("https://challenges.cloudflare.com/**", (route) => {
    challengeRequests++;
    return route.fulfill({
      contentType: "application/javascript",
      body: providerScript,
    });
  });
  await page.reload();
  expect(challengeRequests).toBe(0);
  await page.locator("[data-contact-form]").scrollIntoViewIfNeeded();
  await expect.poll(() => challengeRequests).toBe(1);
  await expect(page.locator("[data-contact-submit]")).toBeEnabled();
});

for (const status of [402, 403, 500]) {
  test(`provider ${status} preserves the query and never announces success`, async ({
    page,
  }) => {
    await page.route("https://submit-form.com/**", (route) =>
      route.fulfill({
        status,
        headers: { "access-control-allow-origin": "*" },
        body: "Rejected",
      }),
    );
    await openConfigured(page);
    await fillContact(page);
    await page
      .getByRole("button", { name: "Enviar consulta", exact: true })
      .click();
    await expect(page.getByRole("status")).toHaveAttribute(
      "data-state",
      status === 402 ? "unavailable" : status === 403 ? "spam" : "error",
    );
    await expect(page.locator('[name="name"]')).toHaveValue(
      "Consulta sintética",
    );
    await expect(page.locator('[name="email"]')).toHaveValue(
      "test@example.com",
    );
    await expect(page.getByRole("status")).not.toContainText("Recibimos");
    await expect(
      page.getByRole("button", { name: "Enviar consulta", exact: true }),
    ).toBeEnabled();
  });
}

test("missing and expired challenge tokens prevent submission", async ({
  page,
}) => {
  let posts = 0;
  await page.route("https://submit-form.com/**", (route) => {
    posts++;
    return route.abort();
  });
  await openConfigured(page, false);
  await fillContact(page);
  const submit = page.getByRole("button", {
    name: "Enviar consulta",
    exact: true,
  });
  await expect(submit).toBeDisabled();
  await page
    .locator("form")
    .evaluate((form) =>
      form.dispatchEvent(new Event("submit", { cancelable: true })),
    );
  expect(posts).toBe(0);
  await page.evaluate(() =>
    window.dispatchEvent(new Event("test:challenge-ready")),
  );
  await expect(submit).toBeEnabled();
  await page.evaluate(() =>
    window.dispatchEvent(new Event("test:challenge-expired")),
  );
  await expect(submit).toBeDisabled();
  expect(posts).toBe(0);
});

test("network failure keeps editable data without claiming delivery", async ({
  page,
}) => {
  await page.route("https://submit-form.com/**", (route) =>
    route.abort("failed"),
  );
  await openConfigured(page);
  await fillContact(page);
  await page
    .getByRole("button", { name: "Enviar consulta", exact: true })
    .click();
  await expect(page.getByRole("status")).toContainText(
    "No pudimos confirmar el envío",
  );
  await expect(page.locator('[name="email"]')).toHaveValue("test@example.com");
  await expect(page.locator('[name="email"]')).toBeEnabled();
});

test("a whitespace-only name is rejected before contacting the provider", async ({
  page,
}) => {
  let posts = 0;
  await page.route("https://submit-form.com/**", (route) => {
    posts++;
    return route.abort();
  });
  await openConfigured(page);
  await fillContact(page);
  const name = page.getByLabel("Nombre (obligatorio)", { exact: true });
  await name.fill("   ");
  await page
    .getByRole("button", { name: "Enviar consulta", exact: true })
    .click();
  await expect(name).toHaveValue("");
  expect(
    await name.evaluate(
      (input: HTMLInputElement) => input.validity.valueMissing,
    ),
  ).toBe(true);
  expect(posts).toBe(0);
});

for (const path of ["/contacto/", "/"] as const) {
  test(`${path}: the contact form is accessible under the deployed CSP`, async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await openConfigured(page, true, path);
    await page.locator("[data-contact-form]").scrollIntoViewIfNeeded();
    await expect(page.locator("[data-contact-submit]")).toBeEnabled();
    const builder = new AxeBuilder({ page }).withTags([
      "wcag2a",
      "wcag2aa",
      "wcag21aa",
      "wcag22aa",
    ]);
    if (path === "/") builder.include("#contacto");
    const audit = await builder.analyze();
    expect(audit.violations).toEqual([]);
    expect(errors).toEqual([]);
  });
}
