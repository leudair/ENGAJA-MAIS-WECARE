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
  /**
   * Nome comercial fixo, igual nos três idiomas. Quando é `null`, o nome sai
   * da família mais o preço, como no documento ("Intermediário • 1.497"), que
   * identifica o valor e não cria nome comercial novo.
   */
  name: string | null;
  priceBRL: number;
  /** Na ordem dos rótulos em `plans.metricLabels`. */
  metrics: readonly [Range, Range, Range, Range, Range];
  /** Card em destaque na família. Um por família. */
  featured?: boolean;
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
    priceBRL: 4987,
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
    priceBRL: 1497,
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
    priceBRL: 997,
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
    metrics: [
      [1500, 3000],
      [30, 60],
      [40, 80],
      [5, 15],
      [1, 2],
    ],
  },
];
