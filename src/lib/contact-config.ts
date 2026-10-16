export interface ContactConfig {
  endpoint: string;
  siteKey: string;
  enabled: boolean;
}

// Both values are public identifiers. Private Turnstile keys live in Formspark.
export function contactConfig(formId = "", siteKey = ""): ContactConfig {
  const id = formId.trim();
  const key = siteKey.trim();
  const validId = /^[A-Za-z0-9_-]{1,100}$/.test(id);
  const validKey = /^[A-Za-z0-9_-]{10,100}$/.test(key);
  const enabled = validId && validKey;
  return {
    endpoint: enabled ? `https://submit-form.com/${id}` : "",
    siteKey: enabled ? key : "",
    enabled,
  };
}
