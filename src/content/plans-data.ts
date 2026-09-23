/**
 * Números dos combos mensais, conforme o documento de combos de 19/09/2026.
 *
 * Este arquivo não é traduzível de propósito: guarda só números e nomes
 * comerciais. As faixas são formatadas por idioma em `src/lib/plans.ts`, e os
 * rótulos ("Visualizações", "Curtidas brasileiras", ...) ficam nos arquivos de
 * conteúdo de cada idioma.
 *
 * Regras que vêm junto com estes números:
 * - Toda faixa é POR PUBLICAÇÃO, não total do ciclo.
 * - Todo plano cobre até 30 publicações por ciclo mensal.
 * - São planos só de engajamento: não incluem seguidores.
 * - Salvamentos estão no escopo mas a quantidade ainda não foi definida, então
 *   não aparecem em lugar nenhum do site.
 * - Preços em reais nos três idiomas: o idioma muda a formatação, não a moeda.
 */

export type PlanFamilyId = "premium" | "intermediate" | "start";

/** Faixa mínima e máxima de uma métrica, por publicação. */
export type Range = readonly [number, number];

export type PlanData = {
  id: string;
  family: PlanFamilyId;
  /** Nome comercial fixo, igual nos três idiomas. */
  name: string | null;
  /**
   * Quando o combo não tem nome comercial fixo, o nome sai da família mais
   * este sufixo, traduzido em `plans.suffixes`. A família Intermediária usa
   * o mesmo padrão da Start: Max no maior, Plus no do meio, nada no menor.
   */
  suffix?: "max" | "plus";
  priceBRL: number;
  /** Na ordem dos rótulos em `plans.metricLabels`. */
  metrics: readonly [Range, Range, Range, Range, Range];
  /** Card em destaque na família. Um por família. */
  featured?: boolean;
  /** Tarja de posicionamento, quando o combo tem uma. */
  crown?: "influencer";
  /**
   * Link de pagamento do Stripe deste plano, e só dele. Fica colado no preço
   * de propósito: link trocado é cliente pagando o valor errado. Enquanto for
   * `null`, o botão leva para a seção de contato da própria página, sem
   * prometer um checkout que ainda não existe.
   */
  checkoutUrl: string | null;
  /**
   * Link de pagamento por Pix deste plano. Mesma regra do `checkoutUrl`: fica
   * colado no preço, e enquanto for `null` o Pix simplesmente não aparece
   * como opção. Pix é sistema brasileiro, então esse botão só é mostrado nos
   * idiomas listados em `pixLocales`, em `site.ts`.
   */
  pixUrl: string | null;
};

export const planFamilyOrder: readonly PlanFamilyId[] = [
  "premium",
  "intermediate",
  "start",
];

export const plansData: readonly PlanData[] = [
  // ---- Família Premium -------------------------------------------------
  {
    id: "executivo-black",
    family: "premium",
    name: "Executivo Black",
    crown: "influencer",
    priceBRL: 4987,
    checkoutUrl: null,
    pixUrl: null,
    metrics: [
      [80000, 120000],
      [1000, 1600],
      [2500, 3000],
      [200, 350],
      [40, 60],
    ],
    featured: true,
  },
  {
    id: "prime",
    family: "premium",
    name: "Prime",
    priceBRL: 2997,
    checkoutUrl: null,
    pixUrl: null,
    metrics: [
      [50000, 80000],
      [700, 1000],
      [1500, 2000],
      [150, 250],
      [25, 40],
    ],
  },
  {
    id: "executivo",
    family: "premium",
    name: "Executivo",
    priceBRL: 1997,
    checkoutUrl: null,
    pixUrl: null,
    metrics: [
      [30000, 50000],
      [500, 800],
      [1000, 1500],
      [100, 180],
      [15, 25],
    ],
  },

  // ---- Família Intermediário -------------------------------------------
  {
    id: "intermediario-1497",
    family: "intermediate",
    name: null,
    suffix: "max",
    priceBRL: 1497,
    checkoutUrl: null,
    pixUrl: null,
    metrics: [
      [20000, 35000],
      [350, 600],
      [700, 1000],
      [80, 130],
      [10, 20],
    ],
    featured: true,
  },
  {
    id: "intermediario-997",
    family: "intermediate",
    name: null,
    suffix: "plus",
    priceBRL: 997,
    checkoutUrl: null,
    pixUrl: null,
    metrics: [
      [12000, 20000],
      [250, 400],
      [400, 700],
      [50, 90],
      [8, 15],
    ],
  },
  {
    id: "intermediario-697",
    family: "intermediate",
    name: null,
    priceBRL: 697,
    checkoutUrl: null,
    pixUrl: null,
    metrics: [
      [8000, 12000],
      [150, 250],
      [250, 400],
      [30, 60],
      [5, 10],
    ],
  },

  // ---- Família Start ---------------------------------------------------
  {
    id: "start-max",
    family: "start",
    name: "Start Max",
    priceBRL: 497,
    checkoutUrl: null,
    pixUrl: null,
    metrics: [
      [5000, 8000],
      [100, 180],
      [150, 250],
      [20, 40],
      [3, 6],
    ],
    featured: true,
  },
  {
    id: "start-plus",
    family: "start",
    name: "Start Plus",
    priceBRL: 297,
    checkoutUrl: null,
    pixUrl: null,
    metrics: [
      [3000, 5000],
      [60, 100],
      [80, 150],
      [10, 25],
      [2, 4],
    ],
  },
  {
    id: "start",
    family: "start",
    name: "Start",
    priceBRL: 197,
    checkoutUrl: null,
    pixUrl: null,
    metrics: [
      [1500, 3000],
      [30, 60],
      [40, 80],
      [5, 15],
      [1, 2],
    ],
  },
];

/**
 * Um link de pagamento errado cobra o valor errado, então um link fora do
 * padrão derruba a construção do site em vez de ir para o ar quieto.
 */
for (const plan of plansData) {
  for (const [meio, url] of [
    ["cartão", plan.checkoutUrl],
    ["Pix", plan.pixUrl],
  ] as const) {
    if (url && !url.startsWith("https://")) {
      throw new Error(
        `Link de pagamento por ${meio} inválido no plano "${plan.id}": tem que ser um endereço https.`,
      );
    }
  }
}
