import { contactHref, showsPix } from "@/content/site";
import type { Content, Locale } from "@/content/types";
import { viralPackages, type ViralPackageData } from "@/content/viral-data";
import { formatPrice, formatPriceUSD, formatRange, number } from "./plans";
import type { MetalKind } from "@/components/ui";

/** Uma linha de entrega: o rótulo, o número e o ícone do serviço. */
export type ViralStat = {
  label: string;
  value: string;
};

export type ViralVideoCard = {
  /** "Vídeo viral 1", já traduzido. */
  title: string;
  views: string;
  viewsLabel: string;
  stats: ViralStat[];
};

export type ViralPackageCard = {
  id: string;
  /** A meta de seguidores, já pontuada no idioma. */
  followers: string;
  followersUnit: string;
  price: string;
  /** A mesma quantia na outra moeda, ou `null` quando só há uma moeda. */
  priceAlt: string | null;
  /** Preço de tabela riscado. */
  from: string;
  videos: ViralVideoCard[];
  /** "Também vamos trabalhar nos seus últimos 20 vídeos", já montado. */
  recentTitle: string;
  recent: ViralStat[];
  /**
   * Metal da chapa. Com seis ofertas, os metais andam de dois em dois: ouro
   * nas duas maiores, prata nas do meio, bronze nas de entrada.
   */
  metal: MetalKind;
  /** Espessura da parede da caixa dos vídeos, pelo mesmo caminho do metal. */
  tier: 1 | 2 | 3;
  href: string;
  payment: { card: string | null; pix: string | null };
};

/** Ouro nas duas maiores, prata nas do meio, bronze nas duas de entrada. */
const metalByIndex: readonly MetalKind[] = [
  "gold",
  "gold",
  "silver",
  "silver",
  "bronze",
  "bronze",
];

const tierByIndex: readonly (1 | 2 | 3)[] = [1, 1, 2, 2, 3, 3];

function toVideoCard(
  locale: Locale,
  c: Content,
  video: ViralPackageData["videos"][number],
  index: number,
): ViralVideoCard {
  const counts = [video.likes, video.comments, video.reposts, video.shares];
  return {
    title: c.viralPage.videoLabel.replace("{n}", String(index + 1)),
    views: number(locale, video.views),
    viewsLabel: c.viralPage.viewsLabel,
    stats: c.viralPage.videoLabels.map((label, i) => ({
      label,
      value: number(locale, counts[i]),
    })),
  };
}

function toPackageCard(
  locale: Locale,
  c: Content,
  pkg: ViralPackageData,
  index: number,
): ViralPackageCard {
  // Pix só existe para quem tem banco no Brasil, igual aos planos mensais.
  const pix = showsPix(locale) ? pkg.pixUrl : null;
  const inBRL = locale === "pt";

  return {
    id: pkg.id,
    followers: number(locale, pkg.followers),
    followersUnit: c.viralPage.followersUnit,
    price: inBRL
      ? formatPrice(locale, pkg.priceBRL)
      : formatPriceUSD(locale, pkg.priceUSD),
    priceAlt: inBRL
      ? c.plans.priceApprox.replace(
          "{value}",
          formatPriceUSD(locale, pkg.priceUSD),
        )
      : null,
    from: c.viralPage.fromLabel.replace(
      "{value}",
      inBRL
        ? formatPrice(locale, pkg.fromBRL)
        : formatPriceUSD(locale, pkg.fromUSD),
    ),
    videos: pkg.videos.map((video, i) => toVideoCard(locale, c, video, i)),
    recentTitle: c.viralPage.recentTitle.replace(
      "{n}",
      String(pkg.recentCount),
    ),
    recent: c.viralPage.recentLabels.map((label, i) => ({
      label,
      value: formatRange(locale, pkg.recent[i], c.plans.rangeSeparator),
    })),
    metal: metalByIndex[index],
    tier: tierByIndex[index],
    href: pkg.checkoutUrl ?? pix ?? contactHref,
    payment: { card: pkg.checkoutUrl, pix },
  };
}

/** As seis ofertas já formatadas para o idioma da página, da maior para a menor. */
export function getViralPackages(
  locale: Locale,
  c: Content,
): ViralPackageCard[] {
  return viralPackages.map((pkg, index) =>
    toPackageCard(locale, c, pkg, index),
  );
}
