import {
  planFamilyOrder,
  plansData,
  type PlanData,
  type PlanFamilyId,
  type Range,
} from "@/content/plans-data";
import type { MetalKind } from "@/components/ui";
import type { Content, Locale } from "@/content/types";

/**
 * Locale do `Intl` usado para formatar números e preços. Os preços são sempre
 * em reais: o idioma muda a pontuação, não a moeda.
 */
const numberLocale: Record<Locale, string> = {
  pt: "pt-BR",
  en: "en-US",
  es: "es-ES",
};

/**
 * Números agrupados no padrão do idioma. `useGrouping: "always"` porque o
 * espanhol, sem isso, escreve 1000 em vez de 1.000 e desalinha com os outros.
 */
function number(locale: Locale, value: number): string {
  return new Intl.NumberFormat(numberLocale[locale], {
    useGrouping: "always",
  }).format(value);
}

/**
 * Preço sempre em reais, com o símbolo escrito à mão: o `Intl` em espanhol
 * devolve "4987 BRL", que não é como o preço aparece no material comercial.
 * O idioma muda só a pontuação do número.
 */
export function formatPrice(locale: Locale, priceBRL: number): string {
  return `R$ ${number(locale, priceBRL)}`;
}

export function formatRange(
  locale: Locale,
  [min, max]: Range,
  separator: string,
): string {
  return `${number(locale, min)}${separator}${number(locale, max)}`;
}

export type PlanCard = {
  id: string;
  name: string;
  price: string;
  metrics: { label: string; value: string }[];
  featured: boolean;
  /**
   * Posição dentro da família, do mais caro para o mais barato. Manda no
   * acabamento da oferta: 1 é a chapa em relevo, 3 é a caixa simples.
   */
  tier: 1 | 2 | 3;
};

export type PlanFamilyCard = {
  id: PlanFamilyId;
  name: string;
  tagline: string;
  /** Fecho de venda da primeira página do card. */
  pitch: string;
  /** Metal da chapa: bronze na entrada, prata no meio, ouro no topo. */
  metal: MetalKind;
  /** Menor preço da família, já formatado, para o "a partir de". */
  fromPrice: string;
  /** Só a família Premium leva o selo de recomendado. */
  recommended: boolean;
  plans: PlanCard[];
};

/** Material de cada família, conforme a direção visual. */
const familyMetal: Record<PlanFamilyId, MetalKind> = {
  premium: "gold",
  intermediate: "silver",
  start: "bronze",
};

function cardName(c: Content, plan: PlanData): string {
  if (plan.name) return plan.name;
  // Sem nome comercial próprio: a família mais o sufixo, no mesmo padrão da
  // família Start (Start Max, Start Plus, Start).
  const family = c.plans.families[plan.family].name;
  if (!plan.suffix) return family;
  return `${family} ${c.plans.suffixes[plan.suffix]}`;
}

function toCard(
  locale: Locale,
  c: Content,
  plan: PlanData,
  tier: 1 | 2 | 3,
): PlanCard {
  return {
    id: plan.id,
    name: cardName(c, plan),
    price: formatPrice(locale, plan.priceBRL),
    metrics: plan.metrics.map((range, i) => ({
      label: c.plans.metricLabels[i],
      value: formatRange(locale, range, c.plans.rangeSeparator),
    })),
    featured: plan.featured === true,
    tier,
  };
}

/** Monta as três famílias já formatadas para o idioma da página. */
export function getPlanFamilies(locale: Locale, c: Content): PlanFamilyCard[] {
  return planFamilyOrder.map((familyId) => {
    const plans = plansData.filter((plan) => plan.family === familyId);
    return {
      id: familyId,
      name: c.plans.families[familyId].name,
      tagline: c.plans.families[familyId].tagline,
      pitch: c.plans.families[familyId].pitch,
      metal: familyMetal[familyId],
      fromPrice: formatPrice(
        locale,
        Math.min(...plans.map((plan) => plan.priceBRL)),
      ),
      recommended: familyId === "premium",
      plans: plans.map((plan, index) =>
        toCard(locale, c, plan, (index + 1) as 1 | 2 | 3),
      ),
    };
  });
}

/**
 * O plano usado como exemplo na página: o mais completo da família Premium.
 * A direção visual pede um card real, com métricas em texto.
 */
export function getShowcasePlan(locale: Locale, c: Content): PlanCard {
  const plan =
    plansData.find((item) => item.id === "executivo-black") ?? plansData[0];
  return toCard(locale, c, plan, 1);
}
