const search = document.querySelector(".hub-search");
const input = document.querySelector("#report-search");
const clear = document.querySelector("#clear-search");
const status = document.querySelector("#search-status");
const sections = [...document.querySelectorAll(".hub-reports")];
const cards = [...document.querySelectorAll(".report-card")];
const normalize = (value) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("es");

if (search && input && clear && status) {
  const update = () => {
    const query = normalize(input.value.trim());
    for (const card of cards) {
      card.hidden = !normalize(card.textContent).includes(query);
    }
    for (const section of sections) {
      section.hidden = ![...section.querySelectorAll(".report-card")].some(
        (card) => !card.hidden,
      );
    }
    const count = cards.filter((card) => !card.hidden).length;
    status.textContent = count
      ? `${count} ${count === 1 ? "informe disponible" : "informes disponibles"}`
      : "No encontramos informes con esa búsqueda. Probá otra empresa o sector.";
    clear.disabled = input.value.length === 0;
  };
  search.hidden = false;
  search.addEventListener("submit", (event) => event.preventDefault());
  input.addEventListener("input", update);
  clear.addEventListener("click", () => {
    input.value = "";
    update();
    input.focus();
  });
  for (const link of document.querySelectorAll(".hub-jump a")) {
    link.addEventListener("click", () => {
      input.value = "";
      update();
    });
  }
  update();
}
