import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowIcon, Eyebrow, GhostButton } from "@/components/ui";
import { getContent, localeHtmlLang, locales, type Locale } from "@/content";
import { engagementPath, isLocale } from "@/lib/routes";

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
    title: `${c.viralPage.title} — ${c.footer.tagline}`,
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
 * O conteúdo definitivo será construído na próxima frente de trabalho. Esta
 * rota já existe para que o botão da página de engajamento tenha destino real.
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

  return (
    <section className="relative flex min-h-[70dvh] items-center overflow-hidden px-5 py-28 sm:px-8 sm:py-36">
      <div
        className="glow -top-24 left-1/2 size-[30rem] -translate-x-1/2 bg-gold-600/20"
        aria-hidden
      />
      <div className="relative z-10 mx-auto max-w-2xl text-center">
        <div className="flex justify-center">
          <Eyebrow>{c.viralPage.eyebrow}</Eyebrow>
        </div>
        <h1 className="brushed-text text-4xl leading-tight font-semibold tracking-tight text-balance sm:text-6xl">
          {c.viralPage.title}
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-pretty text-white/60 sm:text-lg">
          {c.viralPage.lead}
        </p>
        <div className="mt-9 flex justify-center">
          <GhostButton href={engagementPath(locale)}>
            <ArrowIcon className="rotate-180" />
            {c.viralPage.backCta}
          </GhostButton>
        </div>
      </div>
    </section>
  );
}
