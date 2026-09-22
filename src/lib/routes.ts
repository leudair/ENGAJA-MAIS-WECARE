import { locales, type Locale, defaultLocale } from "@/content";

/** Caminho da página de engajamento (home) no idioma indicado. */
export function engagementPath(locale: Locale): string {
  return `/${locale}`;
}

/** Caminho da página de Crescimento Viral no idioma indicado. */
export function viralGrowthPath(locale: Locale): string {
  return `/${locale}/crescimento-viral`;
}

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function resolveLocale(value: string | undefined): Locale {
  return value && isLocale(value) ? value : defaultLocale;
}

/** Mesma rota da atual, trocando apenas o idioma. */
export function switchLocalePath(pathname: string, target: Locale): string {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length > 0 && isLocale(segments[0])) {
    segments[0] = target;
    return `/${segments.join("/")}`;
  }
  return `/${target}`;
}

/** Caminho dos Termos de Uso no idioma indicado. */
export function termsPath(locale: Locale): string {
  return `/${locale}/termos-de-uso`;
}

/** Caminho da Política de Privacidade no idioma indicado. */
export function privacyPath(locale: Locale): string {
  return `/${locale}/politica-de-privacidade`;
}
