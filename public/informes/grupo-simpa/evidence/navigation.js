
// Direct links to a dimension expose its evidence without changing raw text.
function revealLinkedDimension() {
  const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
  const details = target?.querySelector('details');
  if (details && !details.open) details.open = true;
}
revealLinkedDimension();
addEventListener('hashchange', revealLinkedDimension);
