import { es, type CopyKey, type MarketingCopy } from "./es";
import { en } from "./en";
import { ptBr } from "./pt-br";
import type { Locale } from "../locales";

export type Translate = (key: CopyKey) => string;
const dictionaries: Record<Locale, MarketingCopy> = { es, en, "pt-br": ptBr };
export const translator =
  (locale: Locale): Translate =>
  (key) =>
    dictionaries[locale][key];
