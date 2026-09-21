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
  /** Fecho de venda da primeira tela do card, antes das ofertas. */
  pitch: string;
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
    plans: string;
    howItWorks: string;
    viralGrowth: string;
    faq: string;
    /** CTA da barra do topo, em moldura rubi. */
    cta: string;
    skipToContent: string;
    languageLabel: string;
  };
  hero: {
    /** Texto alternativo da logo, para leitores de tela. */
    logoAlt: string;
    eyebrow: string;
    /** H1 em duas linhas: a primeira branca, a segunda em ouro. */
    titleTop: string;
    titleBottom: string;
    paragraph: string;
    cta: string;
    /** Chapa de bronze ao lado do H1. */
    badge: {
      brand: string;
      amount: string;
      unit: string;
      note: string;
    };
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
    /** Caixa em relevo com o teto do ciclo, logo abaixo do título. */
    highlight: {
      /** O número, sozinho, em corpo grande. */
      amount: string;
      /** O que o número conta, ex.: "publicações por mês". */
      unit: string;
      /** A frase que explica que o teto vale para todos os planos. */
      note: string;
    };
    /** Nome e linha de apoio de cada família, na ordem de `planFamilyOrder`. */
    families: Record<PlanFamilyId, PlanFamilyCopy>;
    /** Rótulos das cinco métricas, na ordem de `metrics` em `plans-data.ts`. */
    metricLabels: [string, string, string, string, string];
    /** Palavra entre o mínimo e o máximo de uma faixa, ex.: " a ". */
    rangeSeparator: string;
    /** Acima do preço do card de família. */
    fromLabel: string;
    /** Abaixo do preço, o teto do ciclo. */
    cycleLabel: string;
    /** Sob o preço dos combos, ex.: "por ciclo mensal". */
    priceNote: string;
    /** Vira o card para a primeira oferta da família. */
    openLabel: string;
    /** Volta da primeira oferta para a tela de venda. */
    backLabel: string;
    /** Botões de virar página, para leitores de tela. */
    prevLabel: string;
    nextLabel: string;
    /** Posição da oferta no folheio, ex.: "2 de 3". */
    counter: string;
    /** Lista de comparação, fechada, abaixo dos três cards. */
    compareLabel: string;
    compareNote: string;
    /** Selo da família recomendada. */
    recommended: string;
    /** Título da lista de entrega dentro de cada combo. */
    metricsTitle: string;
    /** Aviso de que os planos não incluem seguidores. */
    noFollowers: string;
    cta: string;
    disclaimer: string;
  };
  /** Exemplo de um plano real, em chapa de ouro com borda rubi. */
  showcase: {
    eyebrow: string;
    title: string;
    lead: string;
    /** Linha sob o nome do plano, ex.: "Plano mensal — até 30 publicações". */
    planNote: string;
    cta: string;
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
    /** Ressalva obrigatória: a página não promete viralização. */
    note: string;
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
