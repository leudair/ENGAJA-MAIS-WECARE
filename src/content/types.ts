export const locales = ["pt", "en", "es"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "pt";

export const localeLabels: Record<Locale, string> = {
  pt: "Português",
  en: "English",
  es: "Español",
};

export const localeShortLabels: Record<Locale, string> = {
  pt: "PT",
  en: "EN",
  es: "ES",
};

export const localeHtmlLang: Record<Locale, string> = {
  pt: "pt-BR",
  en: "en",
  es: "es",
};

import type { PlanFamilyId } from "./plans-data";

export type { PlanFamilyId };

/** Textos fixos de uma família de planos (Premium, Intermediário, Start). */
export type PlanFamilyCopy = {
  name: string;
  tagline: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type Step = {
  title: string;
  description: string;
};

export type Content = {
  meta: {
    title: string;
    description: string;
  };
  nav: {
    howItWorks: string;
    plans: string;
    limit: string;
    faq: string;
    viralGrowth: string;
    skipToContent: string;
    languageLabel: string;
  };
  hero: {
    /** Texto alternativo da logo, para leitores de tela. */
    logoAlt: string;
    /** Rótulo gravado no filete superior da moldura. */
    method: string;
    /** O maior texto da página, dentro da moldura dourada. */
    frameTitle: string;
    /** Uma linha curta que explica a metodologia. */
    methodNote: string;
    /** Copy de valor. `highlight` sai em ouro escovado, na mesma frase. */
    title: string;
    highlight: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    note: string;
    /** Faixa de provas abaixo do hero. Só fatos já definidos. */
    proofs: { title: string; description: string }[];
  };
  howItWorks: {
    eyebrow: string;
    title: string;
    subtitle: string;
    steps: Step[];
  };
  included: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: { title: string; description: string }[];
  };
  limit: {
    eyebrow: string;
    title: string;
    lead: string;
    bullets: string[];
    footnote: string;
  };
  plans: {
    eyebrow: string;
    title: string;
    subtitle: string;
    /** Nome e linha de apoio de cada família, na ordem de `planFamilyOrder`. */
    families: Record<PlanFamilyId, PlanFamilyCopy>;
    /** Rótulos das cinco métricas, na ordem de `metrics` em `plans-data.ts`. */
    metricLabels: [string, string, string, string, string];
    /** Palavra entre o mínimo e o máximo de uma faixa, ex.: " a ". */
    rangeSeparator: string;
    /** Sob o preço, ex.: "por ciclo mensal". */
    priceNote: string;
    /** Lembrete do teto, repetido em cada card. */
    cycleNote: string;
    /** Título da lista de entrega dentro do card. */
    metricsTitle: string;
    /** Rótulo do expansor que abre a entrega no celular. */
    metricsToggle: string;
    /** Aviso de que os planos não incluem seguidores. */
    noFollowers: string;
    cta: string;
    disclaimer: string;
  };
  demo: {
    eyebrow: string;
    title: string;
    lead: string;
    paragraphs: string[];
    cta: string;
  };
  privacy: {
    eyebrow: string;
    title: string;
    lead: string;
    bullets: string[];
  };
  viral: {
    eyebrow: string;
    title: string;
    lead: string;
    cta: string;
  };
  faq: {
    eyebrow: string;
    title: string;
    items: FaqItem[];
  };
  finalCta: {
    title: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
  };
  viralPage: {
    eyebrow: string;
    title: string;
    lead: string;
    backCta: string;
  };
  footer: {
    tagline: string;
    rights: string;
    engagement: string;
    viralGrowth: string;
  };
};
