import type { Metadata } from "next";
import { localeHtmlLang, locales, type Locale } from "@/content";
import { siteConfig } from "@/content/site";

/**
 * Metadados de uma página: endereço canônico, as versões nos outros idiomas e
 * o cartão que o WhatsApp e as redes mostram ao lado do link.
 *
 * Fica num lugar só de propósito. O `openGraph` do Next não se mistura com o
 * da página de cima: o que a página escreve substitui tudo. Foi assim que a
 * página de Crescimento Viral e os dois documentos legais ficaram sem capa
 * nenhuma, cada um escrevendo o seu `openGraph` sem a imagem. Passando por
 * aqui, a capa entra sempre.
 */
export function metadadosDaPagina({
  locale,
  title,
  cardTitle,
  description,
  caminho,
}: {
  locale: Locale;
  /** Título da aba e do resultado de busca. */
  title: string;
  /** Título do cartão do link, quando é diferente do da aba. */
  cardTitle?: string;
  description: string;
  /** O que vem depois do idioma no endereço. Vazio na página inicial. */
  caminho?: string;
}): Metadata {
  const sufixo = caminho ? `/${caminho}` : "";
  const endereco = `/${locale}${sufixo}`;
  const capa = `/og-${locale}.jpg`;
  const tituloDoCartao = cardTitle ?? title;

  return {
    title,
    description,
    alternates: {
      canonical: endereco,
      languages: Object.fromEntries(locales.map((l) => [l, `/${l}${sufixo}`])),
    },
    openGraph: {
      title: tituloDoCartao,
      description,
      siteName: siteConfig.brand,
      locale: localeHtmlLang[locale],
      type: "website",
      url: endereco,
      images: [{ url: capa, width: 1200, height: 630, alt: tituloDoCartao }],
    },
    twitter: {
      card: "summary_large_image",
      title: tituloDoCartao,
      description,
      images: [capa],
    },
  };
}
