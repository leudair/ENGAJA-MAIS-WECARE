import type { Content, Locale } from "./types";
import { en } from "./en";
import { es } from "./es";
import { pt } from "./pt";

export const dictionaries: Record<Locale, Content> = { pt, en, es };

export function getContent(locale: Locale): Content {
  return dictionaries[locale];
}

export * from "./types";
export { siteConfig, contactHref } from "./site";
