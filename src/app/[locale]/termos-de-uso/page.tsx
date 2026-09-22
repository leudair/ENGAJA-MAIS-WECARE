import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalDocumentPage } from "@/components/LegalDocument";
import { getContent, localeHtmlLang, locales, type Locale } from "@/content";
import { termsDocument } from "@/content/legal-data";
import { isLocale } from "@/lib/routes";

const path = "termos-de-uso";

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
    title: `${c.legal.terms.title}, ${c.footer.tagline}`,
    alternates: {
      canonical: `/${locale}/${path}`,
      languages: Object.fromEntries(locales.map((l) => [l, `/${l}/${path}`])),
    },
    openGraph: {
      title: c.legal.terms.title,
      locale: localeHtmlLang[locale],
      type: "website",
    },
  };
}

export default async function TermsPage({
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
      document={termsDocument}
      title={c.legal.terms.title}
      eyebrow={c.legal.terms.eyebrow}
      locale={locale}
      c={c}
    />
  );
}
