import { contactCopy } from "../../i18n/contact";
import type { Locale } from "../../i18n/locales";
import type { ContactConfig } from "../../lib/contact-config";
import { escapeHtml } from "../../lib/escape";

export interface ContactSlots {
  homeAction: string;
  contactPanel: string;
}

export function createContactSlots(
  locale: Locale,
  config: ContactConfig,
): ContactSlots {
  const copy = contactCopy[locale];
  const e = escapeHtml;

  return {
    homeAction: `<a class="contact-alt-link" data-contact-entry href="/contacto/#consulta">${e(copy.homeAction)}<i data-icon="ArrowRight" aria-hidden="true" style="--icon:url('/kairum/assets/icons/ArrowRight.svg')"></i></a>`,
    contactPanel: `<section id="consulta" class="contact-panel" aria-labelledby="contact-form-title">
      <header class="contact-panel-header">
        <h2 id="contact-form-title">${e(copy.title)}</h2>
        <p id="contact-form-intro">${e(copy.intro)}</p>
      </header>
      <form data-contact-form method="post" action="${e(config.endpoint || "#consulta")}" data-endpoint="${e(config.endpoint)}" data-sitekey="${e(config.siteKey)}" data-configured="${config.enabled ? "true" : "false"}" data-contact-copy="${e(JSON.stringify(copy.messages))}" aria-labelledby="contact-form-title" aria-describedby="contact-form-intro">
        <fieldset class="contact-fields" data-contact-fields disabled>
          <div class="contact-field">
            <label for="contact-name">${e(copy.name)}</label>
            <input id="contact-name" name="name" type="text" autocomplete="name" placeholder="${e(copy.placeholders.name)}" maxlength="120" required>
          </div>
          <div class="contact-field">
            <label for="contact-email">${e(copy.email)}</label>
            <input id="contact-email" name="email" type="email" autocomplete="email" placeholder="${e(copy.placeholders.email)}" maxlength="254" required>
          </div>
          <div class="contact-field contact-field-wide">
            <label for="contact-company">${e(copy.company)}</label>
            <input id="contact-company" name="company" type="text" autocomplete="organization" placeholder="${e(copy.placeholders.company)}" maxlength="160">
          </div>
          <div class="contact-field contact-field-wide">
            <label for="contact-message">${e(copy.message)}</label>
            <textarea id="contact-message" name="message" rows="3" placeholder="${e(copy.placeholders.message)}" maxlength="2500"></textarea>
          </div>
          <input class="contact-honeypot" name="_honeypot" type="text" autocomplete="off" tabindex="-1" aria-hidden="true">
          <div class="contact-footer">
            <div class="contact-challenge" data-contact-challenge></div>
            <button class="button primary contact-submit" type="submit" data-contact-submit disabled>${e(copy.messages.submit)}</button>
          </div>
        </fieldset>
        <p class="contact-status" data-contact-status${config.enabled ? "" : ' data-state="unavailable"'} role="status" aria-live="polite" aria-atomic="true" tabindex="-1">${config.enabled ? "" : e(copy.messages.unavailable)}</p>
        <noscript><p class="contact-noscript">${e(copy.noScript)}</p></noscript>
      </form>
    </section>`,
  };
}
