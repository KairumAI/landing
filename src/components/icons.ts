// Phosphor icons, rendered once as an inline sprite and referenced with <use>.
const files = import.meta.glob<string>("../assets/icons/*.svg", {
  query: "?raw",
  import: "default",
  eager: true,
});

export const iconViewBox = "0 0 256 256";

/** Inner markup of each icon, keyed by file name. */
export const icons: Record<string, string> = Object.fromEntries(
  Object.entries(files).map(([path, svg]) => {
    const name = path.slice(path.lastIndexOf("/") + 1, -".svg".length);
    if (!svg.includes(`viewBox="${iconViewBox}"`))
      throw new Error(`Icon ${name} must use viewBox ${iconViewBox}`);
    return [name, svg.replace(/^<svg[^>]*>|<\/svg>\s*$/g, "")];
  }),
);
