import { defaultLocale, locales, type Locale } from "./locales";
import { es } from "./es";
import { en } from "./en";
import { ptBr } from "./pt-br";
import type { Dictionary } from "./types";

const dictionaries: Record<Locale, Dictionary> = { es, en, "pt-br": ptBr };

export function toLocale(value: string | undefined): Locale {
  return locales.find((locale) => locale === value) ?? defaultLocale;
}

export function getDictionary(locale: string | undefined): Dictionary {
  return dictionaries[toLocale(locale)];
}
