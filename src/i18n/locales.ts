export const locales = ["es", "en", "pt-br"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale = "es";

export const localeMeta: Record<
  Locale,
  {
    htmlLang: string;
    ogLocale: string;
    hreflang: string;
    name: string;
    path: string;
    ogImage: string;
  }
> = {
  es: {
    htmlLang: "es-AR",
    ogLocale: "es_AR",
    hreflang: "es",
    name: "Español",
    path: "/",
    ogImage: "/og.jpg",
  },
  en: {
    htmlLang: "en",
    ogLocale: "en_US",
    hreflang: "en",
    name: "English",
    path: "/en/",
    ogImage: "/og-en.jpg",
  },
  "pt-br": {
    htmlLang: "pt-BR",
    ogLocale: "pt_BR",
    hreflang: "pt-BR",
    name: "Português",
    path: "/pt-br/",
    ogImage: "/og-pt-br.jpg",
  },
};

export const bookingUrl = "https://calendly.com/brunodecruz/30min";
export const highlightBrand = "Norte";
