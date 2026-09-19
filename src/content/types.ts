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

export type PlanTier = "start" | "intermediate" | "premium";

export type Plan = {
  /** Identificador estável do plano. Não traduzir. */
  id: PlanTier;
  name: string;
  /**
   * Preço já formatado para o idioma. Use `null` quando o valor ainda não
   * estiver definido comercialmente — a interface mostra `priceUndefined`.
   */
  price: string | null;
  /** Texto curto ao lado do preço, ex.: "por ciclo mensal". */
  priceNote: string;
  summary: string;
  features: string[];
  cta: string;
  /** Destaca visualmente o card. Apenas um plano deve ter `true`. */
  highlighted: boolean;
  /** Selo exibido no topo do card destacado. */
  badge?: string;
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
    /** Destaque logo abaixo da logo, o maior texto da página. */
    method: string;
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
    priceUndefined: string;
    priceUndefinedNote: string;
    items: Plan[];
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
