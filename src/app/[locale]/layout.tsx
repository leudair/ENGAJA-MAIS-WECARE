import type { Metadata } from "next";
import { Cinzel, Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { VendedoraProvider } from "@/components/VendedoraProvider";
import { getContent, locales, localeHtmlLang, type Locale } from "@/content";
import { isLocale } from "@/lib/routes";
import { siteConfig } from "@/content/site";
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
    metadataBase: new URL(siteConfig.url),
    title: content.meta.title,
    description: content.meta.description,
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(locales.map((l) => [l, `/${l}`])),
    },
    openGraph: {
      title: content.meta.title,
      description: content.meta.description,
      siteName: siteConfig.brand,
      locale: localeHtmlLang[locale],
      type: "website",
      url: `/${locale}`,
      // A capa que o WhatsApp e as redes mostram ao lado do link. Tem uma por
      // idioma porque a frase na chapa é a mesma do topo da página.
      images: [
        {
          url: `/og-${locale}.jpg`,
          width: 1200,
          height: 630,
          alt: content.meta.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: content.meta.title,
      description: content.meta.description,
      images: [`/og-${locale}.jpg`],
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
        {/* Guarda por qual vendedora a pessoa chegou, para a compra cair nos
            links dela e a comissão ter de onde sair. */}
        <VendedoraProvider>
          <Header locale={locale} content={content} />
          <main id="conteudo">{children}</main>
          <Footer locale={locale} content={content} />
        </VendedoraProvider>
      </body>
    </html>
  );
}
