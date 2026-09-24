import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ArrowIcon,
  Eyebrow,
  QuietButton,
  SectionTitle,
  Surface,
} from "@/components/ui";
import { ViralBand, ViralComparison } from "@/components/ViralPackages";
import { getContent, localeHtmlLang, locales, type Locale } from "@/content";
import { engagementPath, isLocale } from "@/lib/routes";
import { getViralBands } from "@/lib/viral";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const c = getContent(locale);
  return {
    title: `${c.viralPage.title}, ${c.footer.tagline}`,
    description: c.viral.lead,
    alternates: {
      canonical: `/${locale}/crescimento-viral`,
      languages: Object.fromEntries(
        locales.map((l) => [l, `/${l}/crescimento-viral`]),
      ),
    },
    openGraph: {
      title: c.viralPage.title,
      description: c.viral.lead,
      locale: localeHtmlLang[locale],
      type: "website",
    },
  };
}

/**
 * Página de Crescimento Viral.
 *
 * O topo traz a chamada que o Leudair escolheu: a estratégia começa pelo
 * engajamento e só depois sobe os seguidores, que é o argumento da página
 * inteira. Embaixo vêm as nove metas em três faixas, cada faixa folheada a
 * partir da meta mais completa, e a lista de comparação fechada.
 */
export default async function ViralGrowthPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const c = getContent(locale);
  const bands = getViralBands(locale, c);

  return (
    <>
      <section className="px-4 pt-20 pb-12 sm:px-6 sm:pt-28 sm:pb-16">
        <div className="mx-auto max-w-3xl">
          <Surface gold className="px-6 py-14 text-center sm:px-14 sm:py-16">
            <Eyebrow center>{c.viralPage.eyebrow}</Eyebrow>
            {/* A chamada é uma frase de duas partes, então vai na serifa sem
                caixa alta: em maiúsculas ela grita e deixa de se ler. O ouro
                escovado é o destaque que ele pediu. */}
            <h1 className="display text-metal-gold mt-4 text-[1.75rem] leading-tight text-balance sm:text-[2.6rem]">
              {c.viralPage.title}
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-pretty text-paper sm:text-base">
              {c.viralPage.lead}
            </p>
          </Surface>
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6 sm:pb-28">
        <div className="mx-auto max-w-3xl">
          {/* A marca em cima da seção, como ele pediu em 24/09/2026: o
              símbolo da WeCare, o nome da metodologia e a linha pequena da
              estratégia, na ordem em que ele descreveu. */}
          <div className="flex flex-col items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/marca-wecare-ouro.webp"
              alt=""
              aria-hidden
              width={400}
              height={425}
              className="h-12 w-auto sm:h-16"
            />
            <p className="display gold-relief mt-3 text-[1.05rem] leading-none tracking-wide uppercase sm:text-[1.4rem]">
              {c.viral.eyebrow}
            </p>
            <p className="mt-2 text-[0.58rem] font-bold tracking-[0.22em] text-gold-label uppercase sm:text-[0.7rem]">
              {c.viralPage.strategyLabel}
            </p>
          </div>

          <SectionTitle center>{c.viralPage.packagesTitle}</SectionTitle>
          <p className="mx-auto mt-4 max-w-xl text-center text-sm leading-relaxed text-pretty text-paper-dim">
            {c.viralPage.packagesSubtitle}
          </p>

          {/* Uma faixa embaixo da outra, e não lado a lado: cada chapa traz
              três caixas de vídeo, que em um terço da tela ficariam estreitas
              demais para o número caber numa linha. */}
          <div className="mt-10 grid grid-cols-[minmax(0,1fr)] gap-8 sm:gap-10">
            {bands.map((band) => (
              <ViralBand key={band.id} band={band} c={c} />
            ))}
          </div>

          <ViralComparison bands={bands} c={c} />

          <p className="mt-8 text-center text-xs leading-relaxed text-pretty text-paper-faint">
            {c.viralPage.disclaimer}
          </p>

          <div className="mt-9 flex justify-center">
            <QuietButton href={engagementPath(locale)}>
              <ArrowIcon className="rotate-180" />
              {c.viralPage.backCta}
            </QuietButton>
          </div>
        </div>
      </section>
    </>
  );
}
