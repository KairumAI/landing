import type { ContactMessages } from "../i18n/contact";

interface ChallengeOptions {
  sitekey: string;
  theme: string;
  size: string;
  callback: (token: string) => void;
  "expired-callback": () => void;
  "error-callback": () => void;
}
interface Turnstile {
  render: (container: HTMLElement, options: ChallengeOptions) => string;
  reset: (widget: string) => void;
}
declare global {
  interface Window {
    turnstile?: Turnstile;
  }
}

const form = document.querySelector<HTMLFormElement>("[data-contact-form]");
if (form) enhanceContactForm(form);

function enhanceContactForm(form: HTMLFormElement) {
  const fields = form.querySelector<HTMLFieldSetElement>(
    "[data-contact-fields]",
  )!;
  const submit = form.querySelector<HTMLButtonElement>(
    "[data-contact-submit]",
  )!;
  const status = form.querySelector<HTMLElement>("[data-contact-status]")!;
  const challenge = form.querySelector<HTMLElement>(
    "[data-contact-challenge]",
  )!;
  const copy = JSON.parse(form.dataset.contactCopy!) as ContactMessages;
  let token = "";
  let pending = false;
  let accepted = false;
  let widget: string | undefined;

  const message = (state: string, text: string) => {
    status.dataset.state = state;
    status.textContent = text;
  };
  const unavailable = () => message("unavailable", copy.unavailable);

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (pending || accepted) return;
    if (form.dataset.configured !== "true") return unavailable();
    const name = form.elements.namedItem("name") as HTMLInputElement;
    name.value = name.value.trim();
    if (!form.reportValidity()) return;
    if (!token) return message("checking", copy.checking);

    // Read values before disabling the fieldset (disabled controls are omitted).
    const values = new FormData(form);
    const body = {
      name: String(values.get("name") ?? "").trim(),
      email: String(values.get("email") ?? "").trim(),
      company: String(values.get("company") ?? "").trim(),
      message: String(values.get("message") ?? "").trim(),
      _honeypot: String(values.get("_honeypot") ?? ""),
      "cf-turnstile-response": token,
      _email: { subject: copy.notificationSubject },
    };
    pending = true;
    fields.disabled = true;
    submit.disabled = true;
    submit.textContent = copy.sending;
    form.setAttribute("aria-busy", "true");
    message("sending", copy.sending);
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20_000);
    try {
      const response = await fetch(form.dataset.endpoint!, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "omit",
        body: JSON.stringify(body),
        signal: controller.signal,
      });
      if (response.status === 200) {
        accepted = true;
        form.reset();
        fields.hidden = true;
        message("success", copy.success);
        status.focus();
      } else if (response.status === 403) {
        message("spam", copy.spam);
      } else if (response.status === 402) {
        unavailable();
      } else {
        message("error", copy.error);
      }
    } catch {
      // A timeout does not establish that the provider rejected the submission.
      message("error", copy.error);
    } finally {
      clearTimeout(timeout);
      pending = false;
      token = "";
      form.removeAttribute("aria-busy");
      if (!accepted) {
        fields.disabled = false;
        submit.textContent = copy.submit;
        submit.disabled = true;
        if (widget) window.turnstile?.reset(widget);
      }
    }
  });

  if (form.dataset.configured !== "true") return unavailable();
  fields.disabled = false;
  message("checking", copy.checking);

  let challengeStarted = false;
  const loadChallenge = () => {
    if (challengeStarted) return;
    challengeStarted = true;
    const script = document.createElement("script");
    script.src =
      "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    script.async = true;
    const challengeTimeout = setTimeout(() => {
      message("captcha-error", copy.captchaError);
    }, 15_000);
    script.onerror = () => {
      clearTimeout(challengeTimeout);
      message("captcha-error", copy.captchaError);
    };
    script.onload = () => {
      clearTimeout(challengeTimeout);
      if (!window.turnstile) return message("captcha-error", copy.captchaError);
      try {
        widget = window.turnstile.render(challenge, {
          sitekey: form.dataset.sitekey!,
          theme: form.closest(".home-contact") ? "dark" : "light",
          size: "compact",
          callback: (value) => {
            token = value;
            submit.disabled = pending || accepted;
            if (
              ["checking", "captcha-error"].includes(status.dataset.state ?? "")
            )
              message("ready", "");
          },
          "expired-callback": () => {
            token = "";
            submit.disabled = true;
            if (!pending && !accepted) message("checking", copy.checking);
          },
          "error-callback": () => {
            token = "";
            submit.disabled = true;
            if (!pending && !accepted)
              message("captcha-error", copy.captchaError);
          },
        });
      } catch {
        message("captcha-error", copy.captchaError);
      }
    };
    document.head.append(script);
  };

  // Home's form sits below the fold: request the third-party script only nearby.
  if (typeof IntersectionObserver === "undefined") return loadChallenge();
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        observer.disconnect();
        loadChallenge();
      }
    },
    { rootMargin: "300px" },
  );
  observer.observe(form);
}
