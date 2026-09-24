/**
 * Números das ofertas de Crescimento Viral.
 *
 * Este arquivo não é traduzível de propósito: guarda só números. Os rótulos
 * ("visualizações", "curtidas", ...) ficam nos arquivos de conteúdo de cada
 * idioma e a formatação fica em `src/lib/viral.ts`.
 *
 * De onde vêm os números: o Leudair mandou seis artes em 24/09/2026 e depois
 * revisou a escada inteira comigo, meta por meta, aprovando uma de cada vez.
 * O que está aqui é o que ele aprovou, e a folha com a aprovação de cada uma
 * fica em `/mnt/project-files/ofertas-virais-aprovadas.md`. Nada aqui é média
 * nem estimativa.
 *
 * Regras que vêm junto:
 * - São nove metas em três faixas. Cada faixa abre na meta mais completa e
 *   folheia até a menor, igual aos planos mensais.
 * - Toda meta entrega três vídeos virais, e são esses três que ficam fixados
 *   no perfil. O resto do trabalho acontece nos vídeos já publicados, e
 *   quantos entram muda de meta para meta.
 * - **Nenhum número pode cair quando a meta sobe.** Vale para as quinze
 *   células de cada meta, não só para o preço. A página mostra as metas lado
 *   a lado na lista de comparação, então uma coluna que desce salta aos
 *   olhos. Já aconteceu duas vezes com os compartilhamentos do terceiro
 *   vídeo, e é o primeiro teste a rodar depois de mexer em qualquer número.
 * - Os valores em dólar seguem a regra que ele fechou para os planos mensais
 *   em 23/09/2026: dólar a R$ 5,20, sem centavos e terminando em 7.
 */

import type { Range } from "./plans-data";

/** As três faixas, da mais completa para a de entrada. */
export type ViralBandId = "premium" | "intermediate" | "entry";

export const viralBandOrder: readonly ViralBandId[] = [
  "premium",
  "intermediate",
  "entry",
];

/** Um dos três vídeos virais da meta. */
export type ViralVideo = {
  views: number;
  likes: number;
  comments: number;
  reposts: number;
  shares: number;
};

export type ViralPackageData = {
  id: string;
  band: ViralBandId;
  /** Meta de seguidores orgânicos. */
  followers: number;
  priceBRL: number;
  priceUSD: number;
  /** Preço de tabela riscado, o "De:" das artes. */
  fromBRL: number;
  fromUSD: number;
  /** Os três vídeos virais, do mais forte para o mais leve. */
  videos: readonly [ViralVideo, ViralVideo, ViralVideo];
  /** Quantos vídeos já publicados entram no trabalho, além dos três. */
  recentCount: number;
  /** Faixa por vídeo já publicado, na ordem de `viralPage.recentLabels`. */
  recent: readonly [Range, Range, Range, Range];
  /** Mesma regra dos planos: link colado no preço, e nulo enquanto não existe. */
  checkoutUrl: string | null;
  pixUrl: string | null;
};

export const viralPackages: readonly ViralPackageData[] = [
  // ---- Faixa premium, de 10 mil a 50 mil -------------------------------
  {
    id: "viral-50000",
    band: "premium",
    followers: 50000,
    priceBRL: 9997,
    priceUSD: 1927,
    fromBRL: 14997,
    fromUSD: 2887,
    videos: [
      {
        views: 1500000,
        likes: 22000,
        comments: 400,
        reposts: 15000,
        shares: 50000,
      },
      {
        views: 1200000,
        likes: 18000,
        comments: 300,
        reposts: 10000,
        shares: 40000,
      },
      {
        views: 1000000,
        likes: 14000,
        comments: 200,
        reposts: 6000,
        shares: 35000,
      },
    ],
    recentCount: 40,
    recent: [
      [30000, 60000],
      [900, 1400],
      [800, 1200],
      [1200, 1800],
    ],
    checkoutUrl: null,
    pixUrl: null,
  },
  {
    id: "viral-20000",
    band: "premium",
    followers: 20000,
    priceBRL: 5997,
    priceUSD: 1157,
    fromBRL: 8997,
    fromUSD: 1727,
    videos: [
      {
        views: 800000,
        likes: 12000,
        comments: 200,
        reposts: 8000,
        shares: 28000,
      },
      {
        views: 600000,
        likes: 9000,
        comments: 150,
        reposts: 4000,
        shares: 20000,
      },
      {
        views: 500000,
        likes: 7000,
        comments: 100,
        reposts: 2500,
        shares: 18000,
      },
    ],
    recentCount: 30,
    recent: [
      [20000, 40000],
      [600, 900],
      [500, 700],
      [800, 1100],
    ],
    checkoutUrl: null,
    pixUrl: null,
  },
  {
    id: "viral-10000",
    band: "premium",
    followers: 10000,
    priceBRL: 3997,
    priceUSD: 767,
    fromBRL: 5997,
    fromUSD: 1157,
    videos: [
      {
        views: 500000,
        likes: 8000,
        comments: 175,
        reposts: 6000,
        shares: 20000,
      },
      {
        views: 300000,
        likes: 6000,
        comments: 120,
        reposts: 2500,
        shares: 15000,
      },
      {
        views: 200000,
        likes: 3000,
        comments: 75,
        reposts: 1500,
        shares: 15000,
      },
    ],
    recentCount: 25,
    recent: [
      [15000, 35000],
      [350, 550],
      [250, 450],
      [500, 750],
    ],
    checkoutUrl: null,
    pixUrl: null,
  },

  // ---- Faixa intermediária, de 3 mil a 5 mil ---------------------------
  {
    id: "viral-5000",
    band: "intermediate",
    followers: 5000,
    priceBRL: 2497,
    priceUSD: 477,
    fromBRL: 3997,
    fromUSD: 767,
    videos: [
      {
        views: 250000,
        likes: 3000,
        comments: 85,
        reposts: 3000,
        shares: 8500,
      },
      {
        views: 200000,
        likes: 2250,
        comments: 50,
        reposts: 2250,
        shares: 6000,
      },
      {
        views: 125000,
        likes: 1250,
        comments: 30,
        reposts: 1250,
        shares: 3500,
      },
    ],
    recentCount: 20,
    recent: [
      [10000, 25000],
      [250, 450],
      [200, 350],
      [450, 650],
    ],
    checkoutUrl: null,
    pixUrl: null,
  },
  {
    id: "viral-4000",
    band: "intermediate",
    followers: 4000,
    priceBRL: 1997,
    priceUSD: 387,
    fromBRL: 2997,
    fromUSD: 577,
    videos: [
      { views: 200000, likes: 2600, comments: 70, reposts: 2400, shares: 6000 },
      { views: 150000, likes: 1900, comments: 40, reposts: 1600, shares: 4200 },
      { views: 100000, likes: 1100, comments: 25, reposts: 900, shares: 2800 },
    ],
    recentCount: 20,
    recent: [
      [9000, 20000],
      [225, 400],
      [150, 275],
      [375, 575],
    ],
    checkoutUrl: null,
    pixUrl: null,
  },
  {
    id: "viral-3000",
    band: "intermediate",
    followers: 3000,
    priceBRL: 1497,
    priceUSD: 287,
    fromBRL: 2297,
    fromUSD: 447,
    videos: [
      { views: 150000, likes: 2200, comments: 55, reposts: 1800, shares: 5000 },
      { views: 100000, likes: 1600, comments: 30, reposts: 1000, shares: 3500 },
      { views: 70000, likes: 900, comments: 18, reposts: 600, shares: 2500 },
    ],
    recentCount: 15,
    recent: [
      [8000, 18000],
      [200, 350],
      [100, 200],
      [300, 500],
    ],
    checkoutUrl: null,
    pixUrl: null,
  },

  // ---- Faixa de entrada, de 500 a 2 mil --------------------------------
  {
    id: "viral-2000",
    band: "entry",
    followers: 2000,
    priceBRL: 997,
    priceUSD: 197,
    fromBRL: 1597,
    fromUSD: 307,
    videos: [
      { views: 100000, likes: 1600, comments: 40, reposts: 1200, shares: 4000 },
      { views: 60000, likes: 1200, comments: 18, reposts: 500, shares: 3000 },
      { views: 40000, likes: 600, comments: 12, reposts: 300, shares: 2000 },
    ],
    recentCount: 15,
    recent: [
      [7500, 15000],
      [150, 300],
      [75, 150],
      [250, 450],
    ],
    checkoutUrl: null,
    pixUrl: null,
  },
  {
    id: "viral-1000",
    band: "entry",
    followers: 1000,
    priceBRL: 497,
    priceUSD: 97,
    fromBRL: 997,
    fromUSD: 197,
    videos: [
      { views: 50000, likes: 800, comments: 30, reposts: 600, shares: 2000 },
      { views: 30000, likes: 600, comments: 12, reposts: 250, shares: 1500 },
      { views: 20000, likes: 300, comments: 9, reposts: 150, shares: 1000 },
    ],
    recentCount: 10,
    recent: [
      [5000, 10000],
      [100, 200],
      [50, 100],
      [150, 300],
    ],
    checkoutUrl: null,
    pixUrl: null,
  },
  {
    id: "viral-500",
    band: "entry",
    followers: 500,
    priceBRL: 297,
    priceUSD: 57,
    fromBRL: 497,
    fromUSD: 97,
    videos: [
      { views: 25000, likes: 400, comments: 15, reposts: 300, shares: 1000 },
      { views: 15000, likes: 300, comments: 6, reposts: 125, shares: 750 },
      { views: 10000, likes: 150, comments: 5, reposts: 75, shares: 500 },
    ],
    recentCount: 10,
    recent: [
      [2500, 5000],
      [50, 100],
      [25, 50],
      [75, 150],
    ],
    checkoutUrl: null,
    pixUrl: null,
  },
];
