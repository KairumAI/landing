import { $, $$ } from "./dom";

$(".menu-toggle").addEventListener("click", () => {
  const open = $(".menu-toggle").getAttribute("aria-expanded") === "true";
  $(".menu-toggle").setAttribute("aria-expanded", String(!open));
  $(".menu-toggle").setAttribute(
    "aria-label",
    open ? "Abrir menú" : "Cerrar menú",
  );
  $("#mobile-nav").hidden = open;
});
$$("#mobile-nav a").forEach((link) =>
  link.addEventListener("click", () => {
    $("#mobile-nav").hidden = true;
    $(".menu-toggle").setAttribute("aria-expanded", "false");
    $(".menu-toggle").setAttribute("aria-label", "Abrir menú");
  }),
);
