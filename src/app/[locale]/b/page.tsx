import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PaginaB } from "@/components/PaginaB";
import { getContent, locales, type Locale } from "@/content";
import { getPlanFamilies } from "@/lib/plans";
import { isLocale } from "@/lib/routes";
import { metadadosDaPagina } from "@/lib/seo";

const path = "b";

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
    ...metadadosDaPagina({
      locale,
      title: `${c.variantB.title} ${c.footer.tagline}`,
      cardTitle: c.variantB.title,
      description: c.variantB.lead,
      caminho: path,
    }),
    // Só a A disputa busca. A B é destino de anúncio e tem o mesmo conteúdo,
    // então indexar as duas dividiria a página em duas no Google.
    robots: { index: false, follow: true },
  };
}

export default async function VariantBPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const c = getContent(locale);
  return (
    <PaginaB c={c} locale={locale} familias={getPlanFamilies(locale, c)} />
  );
}
