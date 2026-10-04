import { $, $$ } from "./dom";
import { t } from "./i18n";

$(".menu-toggle").addEventListener("click", () => {
  const open = $(".menu-toggle").getAttribute("aria-expanded") === "true";
  $(".menu-toggle").setAttribute("aria-expanded", String(!open));
  $(".menu-toggle").setAttribute(
    "aria-label",
    open ? t.menu.open : t.menu.close,
  );
  $("#mobile-nav").hidden = open;
});
$$("#mobile-nav a").forEach((link) =>
  link.addEventListener("click", () => {
    $("#mobile-nav").hidden = true;
    $(".menu-toggle").setAttribute("aria-expanded", "false");
    $(".menu-toggle").setAttribute("aria-label", t.menu.open);
  }),
);
