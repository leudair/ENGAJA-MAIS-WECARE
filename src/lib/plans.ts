import {
  planFamilyOrder,
  plansData,
  type PlanData,
  type PlanFamilyId,
  type Range,
} from "@/content/plans-data";
import { metricIconOrder, type MetricIconName } from "@/components/MetricIcon";
import type { MetalKind } from "@/components/ui";
import { paymentHref, paymentWays, type PaymentWays } from "./pagamento";
import type { Content, Locale } from "@/content/types";

/**
 * Locale do `Intl` usado para formatar números e preços. Ele manda só na
 * pontuação do número. A moeda é decidida por `priceLocales`, logo abaixo.
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
export function number(locale: Locale, value: number): string {
  return new Intl.NumberFormat(numberLocale[locale], {
    useGrouping: "always",
  }).format(value);
}

/**
 * Número abreviado, para onde não cabe o valor por extenso: 1.500.000 sai
 * como 1,5M e 22.000 como 22K.
 *
 * A abreviação só entra quando é exata com no máximo uma casa decimal. Um
 * número como 1.125 volta inteiro, porque "1,1K" não é 1.125 e nenhuma
 * quantidade pode aparecer arredondada numa página de venda.
 */
export function shortNumber(locale: Locale, value: number): string {
  const unit = (divisor: number, suffix: string) =>
    `${new Intl.NumberFormat(numberLocale[locale], {
      maximumFractionDigits: 1,
    }).format(value / divisor)}${suffix}`;

  if (value >= 1_000_000 && value % 100_000 === 0) return unit(1_000_000, "M");
  if (value >= 1_000 && value % 100 === 0) return unit(1_000, "K");
  return number(locale, value);
}

/**
 * Idiomas que compram em real. Os outros veem o preço em dólar, que é o
 * público dos Estados Unidos para quem a página foi escrita. Anda junto com
 * `pixLocales` em `site.ts`: quem paga em real paga por Pix, quem paga em
 * dólar paga no cartão.
 */
const brlLocales: readonly Locale[] = ["pt"];

/**
 * Os símbolos são escritos à mão de propósito: o `Intl` em espanhol devolve
 * "4987 BRL" e "957 USD", que não é como o preço aparece no material
 * comercial. Em inglês o cifrão sozinho já é dólar; em português e espanhol
 * ele precisa do "US" na frente para não ser confundido com a moeda local.
 */
export function formatPrice(locale: Locale, priceBRL: number): string {
  return `R$ ${number(locale, priceBRL)}`;
}

export function formatPriceUSD(locale: Locale, priceUSD: number): string {
  const value = number(locale, priceUSD);
  return locale === "en" ? `$${value}` : `US$ ${value}`;
}

/**
 * O preço principal do card e, quando existe, a mesma quantia na outra moeda,
 * que fica embaixo em letra menor. Só o português mostra as duas: é o
 * brasileiro que mora fora e quer saber quanto dá em dólar.
 */
function planPrices(
  locale: Locale,
  c: Content,
  plan: PlanData,
): { price: string; priceAlt: string | null } {
  if (!brlLocales.includes(locale)) {
    return { price: formatPriceUSD(locale, plan.priceUSD), priceAlt: null };
  }
  return {
    price: formatPrice(locale, plan.priceBRL),
    priceAlt: c.plans.priceApprox.replace(
      "{value}",
      formatPriceUSD(locale, plan.priceUSD),
    ),
  };
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
  /**
   * A mesma quantia na outra moeda, em letra menor embaixo do preço, ou
   * `null` quando o idioma mostra uma moeda só.
   */
  priceAlt: string | null;
  metrics: { label: string; value: string; icon: MetricIconName }[];
  featured: boolean;
  /** Tarja de posicionamento, já traduzida, quando o combo tem uma. */
  crown: string | null;
  /**
   * Posição dentro da família, do mais caro para o mais barato. Manda no
   * acabamento da oferta: 1 é a chapa em relevo, 3 é a caixa simples.
   */
  tier: 1 | 2 | 3;
  /**
   * Para onde vai o botão deste plano quando não há escolha a fazer: o único
   * meio de pagamento disponível, ou a seção de contato enquanto nenhum link
   * existir.
   */
  href: string;
  /**
   * Os caminhos de pagamento deste plano. Quando há mais de um, o botão abre
   * a escolha em vez de ir direto. Os dois caminhos brasileiros já vêm
   * filtrados por idioma.
   */
  payment: PaymentWays;
};

export type PlanFamilyCard = {
  id: PlanFamilyId;
  name: string;
  tagline: string;
  /** Fecho de venda da primeira página do card. */
  pitch: string;
  /** Metal da chapa: bronze na entrada, prata no meio, ouro no topo. */
  metal: MetalKind;
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
  const payment = paymentWays(locale, plan, formatPrice(locale, plan.priceBRL));

  return {
    id: plan.id,
    name: cardName(c, plan),
    ...planPrices(locale, c, plan),
    metrics: plan.metrics.map((range, i) => ({
      label: c.plans.metricLabels[i],
      value: formatRange(locale, range, c.plans.rangeSeparator),
      icon: metricIconOrder[i],
    })),
    featured: plan.featured === true,
    crown: plan.crown ? c.plans.crowns[plan.crown] : null,
    tier,
    href: paymentHref(payment),
    payment,
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
