import { contactHref, showsPix } from "@/content/site";
import type { Content, Locale } from "@/content/types";
import {
  viralBandOrder,
  viralPackages,
  type ViralBandId,
  type ViralPackageData,
} from "@/content/viral-data";
import {
  formatPrice,
  formatPriceUSD,
  formatRange,
  number,
  shortNumber,
} from "./plans";
import type { MetalKind } from "@/components/ui";

/** Uma linha de entrega: o rótulo, o número e o ícone do serviço. */
export type ViralStat = {
  label: string;
  value: string;
  /** Nome curto, para dentro do quadro de vídeo. */
  short?: string;
  /** O número por extenso, para leitores de tela. */
  full?: string;
};

export type ViralVideoCard = {
  /** O número do vídeo, 1, 2 ou 3, para a lingueta do quadro. */
  n: number;
  /** "1º vídeo", já traduzido, para a lingueta. */
  tab: string;
  /** "Vídeo viral 1", já traduzido, para leitores de tela. */
  title: string;
  /**
   * As cinco entregas do vídeo, na ordem da arte: visualizações, curtidas,
   * comentários, repostagens e compartilhamentos.
   */
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
   * Posição dentro da faixa, da meta maior para a menor, começando em 1. As
   * faixas não têm todas o mesmo tamanho: a de cima e a do meio têm quatro
   * metas cada, e a de entrada tem uma só.
   */
  tier: number;
  href: string;
  payment: { card: string | null; pix: string | null };
};

export type ViralBandCard = {
  id: ViralBandId;
  name: string;
  tagline: string;
  /** Fecho de venda, no rodapé da chapa. */
  pitch: string;
  /** Metal da chapa: ouro na faixa de cima, prata no meio, bronze na entrada. */
  metal: MetalKind;
  /** Só a faixa de cima leva o selo de recomendado. */
  recommended: boolean;
  packages: ViralPackageCard[];
};

/** Material de cada faixa, na mesma direção visual dos planos mensais. */
const bandMetal: Record<ViralBandId, MetalKind> = {
  premium: "gold",
  intermediate: "silver",
  entry: "bronze",
};

function toVideoCard(
  locale: Locale,
  c: Content,
  video: ViralPackageData["videos"][number],
  index: number,
): ViralVideoCard {
  const counts = [
    video.views,
    video.likes,
    video.comments,
    video.reposts,
    video.shares,
  ];
  // O nome longo continua existindo, mas só para quem usa leitor de tela: no
  // quadro cabe o curto, que é o que o Leudair pediu em 24/09/2026.
  const labels = [c.viralPage.viewsLabel, ...c.viralPage.videoLabels];
  return {
    n: index + 1,
    tab: c.viralPage.videoTab.replace("{n}", String(index + 1)),
    title: c.viralPage.videoLabel.replace("{n}", String(index + 1)),
    stats: labels.map((label, i) => ({
      label,
      short: c.viralPage.videoShortLabels[i],
      value: shortNumber(locale, counts[i]),
      full: number(locale, counts[i]),
    })),
  };
}

function toPackageCard(
  locale: Locale,
  c: Content,
  pkg: ViralPackageData,
  tier: number,
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
    tier,
    href: pkg.checkoutUrl ?? pix ?? contactHref,
    payment: { card: pkg.checkoutUrl, pix },
  };
}

/**
 * As nove metas em três faixas, já formatadas para o idioma da página.
 *
 * Mesma organização dos planos mensais, e pelo mesmo motivo: nove chapas
 * empilhadas fariam a pessoa rolar meia página antes de ver a segunda oferta.
 * Cada faixa abre na meta mais completa e folheia até a menor.
 *
 * As faixas não têm o mesmo tamanho, e é de propósito: a de entrada tem uma
 * meta só, a do meio tem quatro e a de cima tem quatro. Foi assim que o
 * Leudair dividiu em 24/09/2026, e cada faixa ganhou um acabamento próprio.
 */
export function getViralBands(locale: Locale, c: Content): ViralBandCard[] {
  return viralBandOrder.map((bandId) => {
    const packages = viralPackages.filter((pkg) => pkg.band === bandId);
    return {
      id: bandId,
      name: c.viralPage.bands[bandId].name,
      tagline: c.viralPage.bands[bandId].tagline,
      pitch: c.viralPage.bands[bandId].pitch,
      metal: bandMetal[bandId],
      recommended: bandId === "premium",
      packages: packages.map((pkg, index) =>
        toPackageCard(locale, c, pkg, index + 1),
      ),
    };
  });
}
