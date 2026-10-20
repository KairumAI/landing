import type { EditorialPageId } from "../i18n/editorial/schema";

// Assets are original KAIRUM illustrations, encoded locally at two widths.
// References without a cover retain the site's default social image.
const illustrated = new Set<EditorialPageId>([
  "visibility-guide",
  "mentions-citations-visits",
  "choosing-questions",
  "interpreting-results",
]);

export const editorialMedia = (id: string) =>
  id === "adobe-shopping"
    ? {
        small: "/editorial/KAIRUM-blog-compras-IA-portada.png",
        large: "/editorial/KAIRUM-blog-compras-IA-portada.png",
        social: "/editorial/KAIRUM-blog-compras-IA-portada.png",
        width: 1920,
        height: 1080,
        socialWidth: 1920,
        socialHeight: 1080,
      }
    : illustrated.has(id as EditorialPageId)
      ? {
          small: `/editorial/${id}-640.webp`,
          large: `/editorial/${id}-1280.webp`,
          social: `/editorial/${id}-social.jpg`,
          width: 1280,
          height: 853,
          socialWidth: 1200,
          socialHeight: 800,
        }
      : undefined;
