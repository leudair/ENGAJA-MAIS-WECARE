import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowIcon, Eyebrow, QuietButton, Surface } from "@/components/ui";
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
    <section className="px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-3xl">
        <Surface gold className="px-6 py-14 text-center sm:px-14 sm:py-16">
          <Eyebrow center>{c.viralPage.eyebrow}</Eyebrow>
          <h1 className="display-caps mt-4 text-[1.9rem] text-balance text-paper sm:text-5xl">
            {c.viralPage.title}
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-pretty text-paper-dim sm:text-base">
            {c.viralPage.lead}
          </p>
          <div className="mt-9 flex justify-center">
            <QuietButton href={engagementPath(locale)}>
              <ArrowIcon className="rotate-180" />
              {c.viralPage.backCta}
            </QuietButton>
          </div>
        </Surface>
      </div>
    </section>
  );
}
