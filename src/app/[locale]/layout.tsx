import type { Metadata } from "next";
import { Cinzel, Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getContent, locales, localeHtmlLang, type Locale } from "@/content";
import { isLocale } from "@/lib/routes";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

// Capitular romana: é o que dá o ar gravado aos títulos.
const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-display-face",
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
    <html
      lang={localeHtmlLang[locale]}
      className={`${inter.variable} ${cinzel.variable}`}
    >
      <body className="relative min-h-dvh">
        {/* Preto texturizado: favos e linhas finas, atrás de toda a página. */}
        <div className="page-texture" aria-hidden />
        {/* Fio dourado emoldurando a página, afastado da borda da tela. */}
        <div className="page-frame" aria-hidden />
        <a
          href="#conteudo"
          className="sr-only rounded-md bg-gold-bright px-4 py-2 text-sm font-semibold text-ink-950 focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60]"
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
