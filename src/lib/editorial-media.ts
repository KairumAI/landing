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
  illustrated.has(id as EditorialPageId)
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
