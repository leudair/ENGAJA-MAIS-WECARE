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
 * - São nove metas em três faixas, do jeito que ele dividiu em 24/09/2026:
 *   a de 500 sozinha na entrada, de 1.000 a 4.000 no meio, e de 5.000 a
 *   50.000 em cima. Cada faixa abre na meta mais completa e folheia até a
 *   menor, igual aos planos mensais, e cada uma tem um acabamento próprio.
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
 * - Regra dele de 24/09/2026, depois das artes: em toda meta, menos a de
 *   500, as repostagens caem pela metade e os compartilhamentos sobem 20%.
 *   Quem viraliza de verdade recebe poucas repostagens e muito
 *   compartilhamento, e é o compartilhamento que mostra que o vídeo correu.
 *   Os números foram arredondados para valores redondos depois da conta.
 *   Duas metas saíram da conta abaixo da meta anterior e tiveram que subir:
 *   os compartilhamentos do terceiro vídeo de 4.000 e de 5.000, que ficavam
 *   abaixo dos 3.000 da meta de 3.000.
 * - Quantos vídeos já publicados entram, decidido por ele em 24/09/2026:
 *   500 e 1.000 levam 10, a de 2.000 leva 15, a de 3.000 leva 18, a de 4.000
 *   leva 20, e de 5.000 para cima todas levam 25. As quatro de cima repetem
 *   o mesmo número de propósito: o que as separa é o tamanho do trabalho em
 *   cada vídeo, não quantos vídeos entram.
 * - A meta de 500 e a de 1.000 mostram as mesmas repostagens, porque a de
 *   500 ficou como estava e a de 1.000 caiu pela metade até dar no mesmo
 *   número. Ele aprovou assim, sabendo que as duas aparecem iguais.
 */

import type { Range } from "./plans-data";

/** As três faixas, da mais completa para a de entrada. */
import { conferirPagamento } from "@/lib/pagamento";

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
  /** Link do Mercado Pago, em real, para cartão brasileiro. */
  cardUrlBR: string | null;
  /** Link do Mercado Pago, em real, que só aceita Pix. */
  pixUrlBR: string | null;
  /** Código Pix copia e cola, gerado no banco já com o valor. */
  pixCode: string | null;
};

export const viralPackages: readonly ViralPackageData[] = [
  // ---- Faixa premium, de 5 mil a 50 mil --------------------------------
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
        reposts: 7500,
        shares: 60000,
      },
      {
        views: 1200000,
        likes: 18000,
        comments: 300,
        reposts: 5000,
        shares: 48000,
      },
      {
        views: 1000000,
        likes: 14000,
        comments: 200,
        reposts: 3000,
        shares: 42000,
      },
    ],
    recentCount: 25,
    recent: [
      [30000, 60000],
      [900, 1400],
      [400, 600],
      [1500, 2200],
    ],
    checkoutUrl: null,
    cardUrlBR: null,
    pixUrlBR: "https://mpago.la/16B3KYv",
    pixCode: null,
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
        reposts: 4000,
        shares: 34000,
      },
      {
        views: 600000,
        likes: 9000,
        comments: 150,
        reposts: 2000,
        shares: 24000,
      },
      {
        views: 500000,
        likes: 7000,
        comments: 100,
        reposts: 1250,
        shares: 22000,
      },
    ],
    recentCount: 25,
    recent: [
      [20000, 40000],
      [600, 900],
      [250, 350],
      [1000, 1300],
    ],
    checkoutUrl: null,
    cardUrlBR: null,
    pixUrlBR: "https://mpago.la/1VgPMZp",
    pixCode: null,
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
        reposts: 3000,
        shares: 24000,
      },
      {
        views: 300000,
        likes: 6000,
        comments: 120,
        reposts: 1250,
        shares: 18000,
      },
      {
        views: 200000,
        likes: 3000,
        comments: 75,
        reposts: 750,
        shares: 18000,
      },
    ],
    recentCount: 25,
    recent: [
      [15000, 35000],
      [350, 550],
      [125, 225],
      [600, 900],
    ],
    checkoutUrl: null,
    cardUrlBR: null,
    pixUrlBR: "https://mpago.la/31j23qH",
    pixCode: null,
  },
  {
    id: "viral-5000",
    band: "premium",
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
        reposts: 1500,
        shares: 9000,
      },
      {
        views: 200000,
        likes: 2250,
        comments: 50,
        reposts: 1125,
        shares: 6000,
      },
      {
        views: 125000,
        likes: 1250,
        comments: 30,
        reposts: 625,
        shares: 3600,
      },
    ],
    recentCount: 25,
    recent: [
      [10000, 25000],
      [250, 450],
      [100, 175],
      [540, 780],
    ],
    checkoutUrl: null,
    cardUrlBR: null,
    pixUrlBR: "https://mpago.la/2okoebB",
    pixCode: null,
  },

  // ---- Faixa intermediária, de 1 mil a 4 mil ---------------------------
  {
    id: "viral-4000",
    band: "intermediate",
    followers: 4000,
    priceBRL: 1997,
    priceUSD: 387,
    fromBRL: 2997,
    fromUSD: 577,
    videos: [
      {
        views: 200000,
        likes: 2600,
        comments: 70,
        reposts: 1200,
        shares: 7200,
      },
      {
        views: 150000,
        likes: 1900,
        comments: 40,
        reposts: 800,
        shares: 5000,
      },
      {
        views: 100000,
        likes: 1100,
        comments: 25,
        reposts: 450,
        shares: 3200,
      },
    ],
    recentCount: 20,
    recent: [
      [9000, 20000],
      [225, 400],
      [75, 140],
      [450, 690],
    ],
    checkoutUrl: null,
    cardUrlBR: null,
    pixUrlBR: "https://mpago.la/2k7gCJ7",
    pixCode: null,
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
      {
        views: 150000,
        likes: 2200,
        comments: 55,
        reposts: 900,
        shares: 6000,
      },
      {
        views: 100000,
        likes: 1600,
        comments: 30,
        reposts: 500,
        shares: 4200,
      },
      {
        views: 70000,
        likes: 900,
        comments: 18,
        reposts: 300,
        shares: 3000,
      },
    ],
    recentCount: 18,
    recent: [
      [8000, 18000],
      [200, 350],
      [50, 100],
      [360, 600],
    ],
    checkoutUrl: null,
    cardUrlBR: null,
    pixUrlBR: "https://mpago.la/1cHPW5F",
    pixCode: null,
  },
  {
    id: "viral-2000",
    band: "intermediate",
    followers: 2000,
    priceBRL: 997,
    priceUSD: 197,
    fromBRL: 1597,
    fromUSD: 307,
    videos: [
      {
        views: 100000,
        likes: 1600,
        comments: 40,
        reposts: 600,
        shares: 4800,
      },
      {
        views: 60000,
        likes: 1200,
        comments: 18,
        reposts: 250,
        shares: 3600,
      },
      {
        views: 40000,
        likes: 600,
        comments: 12,
        reposts: 150,
        shares: 2400,
      },
    ],
    recentCount: 15,
    recent: [
      [7500, 15000],
      [150, 300],
      [40, 75],
      [300, 540],
    ],
    checkoutUrl: null,
    cardUrlBR: null,
    pixUrlBR: "https://mpago.la/1ByaiCP",
    pixCode: null,
  },
  {
    id: "viral-1000",
    band: "intermediate",
    followers: 1000,
    priceBRL: 497,
    priceUSD: 97,
    fromBRL: 997,
    fromUSD: 197,
    videos: [
      {
        views: 50000,
        likes: 800,
        comments: 30,
        reposts: 300,
        shares: 2400,
      },
      {
        views: 30000,
        likes: 600,
        comments: 12,
        reposts: 125,
        shares: 1800,
      },
      {
        views: 20000,
        likes: 300,
        comments: 9,
        reposts: 75,
        shares: 1200,
      },
    ],
    recentCount: 10,
    recent: [
      [5000, 10000],
      [100, 200],
      [25, 50],
      [180, 360],
    ],
    checkoutUrl: null,
    cardUrlBR: null,
    pixUrlBR: null,
    pixCode: null,
  },

  // ---- Faixa de entrada, só a meta de 500 ------------------------------
  {
    id: "viral-500",
    band: "entry",
    followers: 500,
    priceBRL: 297,
    priceUSD: 57,
    fromBRL: 497,
    fromUSD: 97,
    videos: [
      {
        views: 25000,
        likes: 400,
        comments: 15,
        reposts: 300,
        shares: 1000,
      },
      {
        views: 15000,
        likes: 300,
        comments: 6,
        reposts: 125,
        shares: 750,
      },
      {
        views: 10000,
        likes: 150,
        comments: 5,
        reposts: 75,
        shares: 500,
      },
    ],
    recentCount: 10,
    recent: [
      [2500, 5000],
      [50, 100],
      [25, 50],
      [75, 150],
    ],
    checkoutUrl: null,
    cardUrlBR: null,
    pixUrlBR: null,
    pixCode: null,
  },
];

/**
 * Mesma conferência dos planos mensais: meio de pagamento fora do padrão
 * derruba a construção do site.
 */
for (const pkg of viralPackages) {
  conferirPagamento(pkg.id, pkg, pkg.priceBRL);
}
