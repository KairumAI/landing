import { es } from "./es";
import { en } from "./en";
import { ptBr } from "./pt-br";
import type { Locale } from "../locales";
import type { EditorialCopy } from "./schema";
export { editorialEntries, editorialLocales, reviewedDate } from "./schema";
export type { EditorialPageId, EditorialPage, Section } from "./schema";
const dictionaries: Record<Locale, EditorialCopy> = { es, en, "pt-br": ptBr };
export const editorialCopy = (locale: Locale): EditorialCopy =>
  dictionaries[locale];
