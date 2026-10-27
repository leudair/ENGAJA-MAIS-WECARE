import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalDocumentPage } from "@/components/LegalDocument";
import { getContent, localeHtmlLang, locales, type Locale } from "@/content";
import { privacyDocument } from "@/content/legal-data";
import { isLocale } from "@/lib/routes";
import { metadadosDaPagina } from "@/lib/seo";

const path = "politica-de-privacidade";

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
  return metadadosDaPagina({
    locale,
    title: `${c.legal.privacy.title}, ${c.footer.tagline}`,
    cardTitle: c.legal.privacy.title,
    description: c.meta.description,
    caminho: path,
  });
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const c = getContent(locale);

  return (
    <LegalDocumentPage
      document={privacyDocument}
      title={c.legal.privacy.title}
      locale={locale}
      c={c}
    />
  );
}
