import type { Dictionary } from "../i18n/types";

const data = document.querySelector<HTMLScriptElement>("#i18n-client");
if (!data?.textContent) throw new Error("Missing landing translations");
export const t: Dictionary["client"] = JSON.parse(data.textContent);
