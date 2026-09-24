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
import type { ViralBandId } from "./viral-data";

export type { PlanFamilyId, ViralBandId };

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
    /**
     * Fileira de pessoas embaixo do botão. A frase ao lado tem que ser um
     * fato já definido: aqui não entra número de clientes, contador de
     * gente online nem nada que a gente não possa comprovar.
     */
    people: {
      text: string;
      /** Parte em destaque, no fim da frase. */
      strong: string;
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
    /** Sob o preço dos combos, ex.: "por ciclo mensal". */
    priceNote: string;
    /**
     * Linha menor embaixo do preço, com a mesma quantia na outra moeda.
     * `{value}` é trocado pelo valor já formatado. Só aparece em português.
     */
    priceApprox: string;
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
    /** Tarjas de posicionamento, por chave usada em `plans-data`. */
    crowns: { influencer: string };
    /** Sufixos dos combos sem nome comercial próprio. */
    suffixes: { max: string; plus: string };
    /** Título da lista de entrega dentro de cada combo. */
    metricsTitle: string;
    /** Aviso de que os planos não incluem seguidores. */
    noFollowers: string;
    cta: string;
    /**
     * Escolha do meio de pagamento, mostrada depois que a pessoa clica no
     * plano. Só aparece quando aquele plano tem os dois links.
     */
    pay: {
      question: string;
      card: string;
      pix: string;
      cancel: string;
    };
    disclaimer: string;
  };
  /** Exemplo de um plano real, em chapa de ouro com borda rubi. */
  showcase: {
    eyebrow: string;
    title: string;
    lead: string;
    /** Linha sob o nome do plano, ex.: "Plano mensal, até 30 publicações". */
    planNote: string;
    cta: string;
  };
  demo: {
    eyebrow: string;
    title: string;
    lead: string;
    paragraphs: string[];
    cta: string;
    /** A arte do perfil no idioma da página: cada idioma tem a sua. */
    art: string;
    /** Descrição da arte do perfil, para quem navega ouvindo a página. */
    artAlt: string;
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
    /** Cabeçalho da lista das metas, abaixo da chamada. */
    packagesTitle: string;
    packagesSubtitle: string;
    /**
     * Nome, linha de apoio e fecho de cada faixa de metas, na ordem de
     * `viralBandOrder`. Mesma estrutura das famílias dos planos mensais.
     */
    bands: Record<ViralBandId, PlanFamilyCopy>;
    /** Selo da faixa de cima, ex.: "Mais completo". */
    bandRecommended: string;
    /** Linha pequena do topo do painel, ex.: "Estratégia de crescimento viral". */
    strategyLabel: string;
    /**
     * Exemplo curto abaixo da explicação, numa cor à parte para ninguém
     * confundir com o que a meta escolhida entrega. `{n}` é a meta e `{v}` é
     * quantos vídeos já publicados entram nela.
     */
    exampleNote: string;
    /** O que a oferta entrega, ex.: "seguidores orgânicos". */
    followersUnit: string;
    /** Título de cada um dos três vídeos. `{n}` vira 1, 2 ou 3. */
    videoLabel: string;
    /** O que o número grande do vídeo conta, ex.: "visualizações". */
    viewsLabel: string;
    /** As outras quatro entregas do vídeo, nesta ordem. */
    videoLabels: [string, string, string, string];
    /**
     * Os mesmos cinco nomes em versão curta, na ordem visualizações,
     * curtidas, comentários, repostagens e compartilhamentos. Dentro do
     * quadro de vídeo há cerca de cem pixels de largura, e o nome por
     * extenso não cabe ao lado do número.
     */
    videoShortLabels: [string, string, string, string, string];
    /** Lingueta do quadro de vídeo. `{n}` vira 1, 2 ou 3. */
    videoTab: string;
    /**
     * Faixa dos vídeos já publicados. `{n}` vira quantos entram no trabalho,
     * que muda de oferta para oferta.
     */
    recentTitle: string;
    recentLabels: [string, string, string, string];
    /** Sob cada faixa, ex.: "cada vídeo". */
    recentNote: string;
    /** Aviso de que os três vídeos virais são os que ficam fixados. */
    pinnedNote: string;
    /** Preço de tabela riscado. `{value}` é o valor já formatado. */
    fromLabel: string;
    /** Linha curta acima do preço, ex.: "por apenas". */
    priceNote: string;
    cta: string;
    /** Botões de virar página, para leitores de tela. */
    prevLabel: string;
    nextLabel: string;
    /** Posição da oferta no folheio, ex.: "2 de 6". */
    counter: string;
    /** Lista de comparação, fechada, abaixo do folheio. */
    compareLabel: string;
    compareNote: string;
    disclaimer: string;
    backCta: string;
  };
  footer: {
    tagline: string;
    rights: string;
    engagement: string;
    viralGrowth: string;
  };
  /**
   * Textos em volta dos documentos legais. O contrato em si não entra aqui:
   * ele fica em `legal-data.ts`, em português, igual nos três idiomas.
   */
  legal: {
    updatedLabel: string;
    backCta: string;
    /**
     * Aviso de que o documento vale em português. Fica `null` na própria
     * página em português, onde não há nada a avisar.
     */
    languageNote: string | null;
    terms: { navLabel: string; title: string; eyebrow: string };
    privacy: { navLabel: string; title: string; eyebrow: string };
  };
};
