type ClientCopy = { menuOpen: string; menuClose: string };
const node = document.getElementById("i18n-client");
export const clientCopy: ClientCopy = JSON.parse(node?.textContent ?? "{}");
