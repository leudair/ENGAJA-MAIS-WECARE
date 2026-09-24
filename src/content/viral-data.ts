/**
 * Números das seis ofertas de Crescimento Viral, conforme as artes que o
 * Leudair mandou em 24/09/2026.
 *
 * Este arquivo não é traduzível de propósito: guarda só números. Os rótulos
 * ("visualizações", "curtidas", ...) ficam nos arquivos de conteúdo de cada
 * idioma e a formatação fica em `src/lib/viral.ts`.
 *
 * Regras que vêm junto com estes números:
 * - A ordem começa pela oferta mais completa, a de 20.000 seguidores, e desce
 *   até a de 500. É o mesmo comportamento dos planos mensais.
 * - Cada oferta tem três vídeos virais, e são esses três que ficam fixados no
 *   perfil. O resto do trabalho acontece nos últimos vídeos já publicados,
 *   e quantos são muda de oferta para oferta.
 * - Nada aqui é média nem estimativa nossa: é o que está escrito na arte.
 * - Os valores em dólar seguem a mesma regra que o Leudair fechou para os
 *   planos mensais em 23/09/2026: dólar a R$ 5,20, sem centavos e terminando
 *   em 7. As três ofertas de baixo caem exatamente nos valores que ele já
 *   aprovou lá (997 vira 197, 497 vira 97, 297 vira 57).
 */

import type { Range } from "./plans-data";

/** Um dos três vídeos virais da oferta. */
export type ViralVideo = {
  views: number;
  likes: number;
  comments: number;
  reposts: number;
  shares: number;
};

export type ViralPackageData = {
  id: string;
  /** Meta de seguidores orgânicos da oferta. */
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
  {
    id: "viral-20000",
    followers: 20000,
    priceBRL: 5997,
    priceUSD: 1157,
    fromBRL: 8997,
    fromUSD: 1727,
    videos: [
      {
        views: 800000,
        likes: 8000,
        comments: 300,
        reposts: 3000,
        shares: 15000,
      },
      {
        views: 600000,
        likes: 6000,
        comments: 200,
        reposts: 2000,
        shares: 10000,
      },
      {
        views: 500000,
        likes: 5000,
        comments: 100,
        reposts: 1000,
        shares: 10000,
      },
    ],
    recentCount: 20,
    recent: [
      [15000, 25000],
      [300, 400],
      [100, 200],
      [300, 500],
    ],
    checkoutUrl: null,
    pixUrl: null,
  },
  {
    id: "viral-10000",
    followers: 10000,
    priceBRL: 3997,
    priceUSD: 767,
    fromBRL: 5997,
    fromUSD: 1157,
    videos: [
      {
        views: 500000,
        likes: 8000,
        comments: 500,
        reposts: 6000,
        shares: 20000,
      },
      {
        views: 300000,
        likes: 6000,
        comments: 200,
        reposts: 2500,
        shares: 15000,
      },
      {
        views: 200000,
        likes: 3000,
        comments: 150,
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
  {
    id: "viral-5000",
    followers: 5000,
    priceBRL: 2497,
    priceUSD: 477,
    fromBRL: 3997,
    fromUSD: 767,
    videos: [
      {
        views: 250000,
        likes: 3000,
        comments: 200,
        reposts: 3000,
        shares: 7500,
      },
      {
        views: 200000,
        likes: 2250,
        comments: 175,
        reposts: 2250,
        shares: 5000,
      },
      { views: 125000, likes: 1250, comments: 75, reposts: 1250, shares: 2000 },
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
    id: "viral-2000",
    followers: 2000,
    priceBRL: 997,
    priceUSD: 197,
    fromBRL: 1597,
    fromUSD: 307,
    videos: [
      { views: 50000, likes: 800, comments: 50, reposts: 600, shares: 2000 },
      { views: 30000, likes: 600, comments: 20, reposts: 250, shares: 1500 },
      { views: 20000, likes: 300, comments: 15, reposts: 150, shares: 1000 },
    ],
    recentCount: 15,
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
    /*
     * As artes de 2.000 e de 1.000 trazem os mesmos números nos três vídeos
     * virais. O que separa as duas é quantos vídeos já publicados entram no
     * trabalho, 15 contra 10, e o preço. Está assim de propósito, copiado da
     * arte, e não é erro de digitação.
     */
    id: "viral-1000",
    followers: 1000,
    priceBRL: 497,
    priceUSD: 97,
    fromBRL: 997,
    fromUSD: 197,
    videos: [
      { views: 50000, likes: 800, comments: 50, reposts: 600, shares: 2000 },
      { views: 30000, likes: 600, comments: 20, reposts: 250, shares: 1500 },
      { views: 20000, likes: 300, comments: 15, reposts: 150, shares: 1000 },
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
    followers: 500,
    priceBRL: 297,
    priceUSD: 57,
    fromBRL: 497,
    fromUSD: 97,
    videos: [
      { views: 25000, likes: 400, comments: 25, reposts: 300, shares: 1000 },
      { views: 15000, likes: 300, comments: 10, reposts: 125, shares: 750 },
      { views: 10000, likes: 150, comments: 8, reposts: 75, shares: 500 },
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
