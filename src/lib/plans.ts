import {
  planFamilyOrder,
  plansData,
  type PlanData,
  type PlanFamilyId,
  type Range,
} from "@/content/plans-data";
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
};

export type PlanFamilyCard = {
  id: PlanFamilyId;
  name: string;
  tagline: string;
  plans: PlanCard[];
};

function cardName(locale: Locale, c: Content, plan: PlanData): string {
  if (plan.name) return plan.name;
  // Sem nome comercial próprio: a família mais o preço identificam o plano,
  // como no documento de combos ("Intermediário • 1.497").
  const family = c.plans.families[plan.family].name;
  return `${family} • ${number(locale, plan.priceBRL)}`;
}

/** Monta as três famílias já formatadas para o idioma da página. */
export function getPlanFamilies(locale: Locale, c: Content): PlanFamilyCard[] {
  return planFamilyOrder.map((familyId) => ({
    id: familyId,
    name: c.plans.families[familyId].name,
    tagline: c.plans.families[familyId].tagline,
    plans: plansData
      .filter((plan) => plan.family === familyId)
      .map((plan) => ({
        id: plan.id,
        name: cardName(locale, c, plan),
        price: formatPrice(locale, plan.priceBRL),
        metrics: plan.metrics.map((range, i) => ({
          label: c.plans.metricLabels[i],
          value: formatRange(locale, range, c.plans.rangeSeparator),
        })),
        featured: plan.featured === true,
      })),
  }));
}
