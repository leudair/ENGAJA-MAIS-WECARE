import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getContent, locales, localeHtmlLang, type Locale } from "@/content";
import { isLocale } from "@/lib/routes";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
});

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
  const content = getContent(locale);
  return {
    title: content.meta.title,
    description: content.meta.description,
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(locales.map((l) => [l, `/${l}`])),
    },
    openGraph: {
      title: content.meta.title,
      description: content.meta.description,
      locale: localeHtmlLang[locale],
      type: "website",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const content = getContent(locale);

  return (
    <html lang={localeHtmlLang[locale]} className={inter.variable}>
      <body className="grain relative min-h-dvh">
        <a
          href="#conteudo"
          className="sr-only rounded-full bg-gold-400 px-4 py-2 text-sm font-semibold text-ink-950 focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60]"
        >
          {content.nav.skipToContent}
        </a>
        <Header locale={locale} content={content} />
        <main id="conteudo">{children}</main>
        <Footer locale={locale} content={content} />
      </body>
    </html>
  );
}
