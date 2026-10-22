/**
 * Rastreio da visita.
 *
 * A página inteira existe para levar a pessoa até o WhatsApp, e lá quem atende
 * é o agente de IA. Para o agente saber de onde a pessoa veio, o botão abre a
 * conversa com a mensagem já escrita, e no fim dela vai um código com a
 * vendedora, a variante da página, o idioma, a oferta clicada e a campanha do
 * anúncio.
 *
 * O código é a única coisa que viaja da página até o WhatsApp, então ele é
 * escrito em pares `chave=valor`, para o agente ler sem adivinhar.
 */

/** Parâmetro da variante no endereço: `?ab=B`. */
export const PARAMETRO_VARIANTE = "ab";

/** Onde o navegador guarda a origem da visita entre uma página e outra. */
export const CHAVE_VISITA = "wecare-visita";

/** Por quantos dias a origem da visita continua valendo. */
export const DIAS_DE_VALIDADE = 30;

/**
 * De onde a visita veio. Tudo opcional: quem chega pelo endereço limpo não
 * tem vendedora, nem variante, nem campanha, e isso é o caso normal.
 */
export type Visita = {
  /** Código da vendedora, como `W1`. */
  vendedora: string | null;
  /** Variante do teste A/B, `A` ou `B`. */
  variante: string | null;
  /** `utm_source`, de onde o anúncio veio. */
  origem: string | null;
  /** `utm_campaign`, qual campanha. */
  campanha: string | null;
  /** `utm_content`, qual anúncio dentro da campanha. */
  anuncio: string | null;
};

export const visitaVazia: Visita = {
  vendedora: null,
  variante: null,
  origem: null,
  campanha: null,
  anuncio: null,
};

/** Só letras, números, ponto, traço e sublinhado, até 40 caracteres. */
function limpar(valor: string | null): string | null {
  if (!valor) return null;
  const limpo = valor
    .trim()
    .replace(/[^A-Za-z0-9._-]/g, "")
    .slice(0, 40);
  return limpo || null;
}

/** Lê a origem da visita no endereço da página. */
export function lerVisita(search: string): Visita {
  const p = new URLSearchParams(search);
  const variante = limpar(p.get(PARAMETRO_VARIANTE));
  return {
    vendedora: limpar(p.get("v")),
    variante: variante ? variante.toUpperCase() : null,
    origem: limpar(p.get("utm_source")),
    campanha: limpar(p.get("utm_campaign")),
    anuncio: limpar(p.get("utm_content")),
  };
}

/** Verdadeiro quando o endereço não trouxe nada de novo sobre a origem. */
export function visitaVaga(visita: Visita): boolean {
  return Object.values(visita).every((valor) => valor === null);
}

/**
 * Monta o código que vai no fim da mensagem do WhatsApp.
 *
 * O idioma entra sempre, porque é a única coisa que existe em toda visita e
 * já diz ao agente em que língua responder.
 */
export function codigoDaOrigem(
  visita: Visita,
  locale: string,
  oferta?: string,
): string {
  const pares: [string, string | null][] = [
    ["v", visita.vendedora],
    ["ab", visita.variante],
    ["lang", locale],
    ["of", oferta ?? null],
    ["src", visita.origem],
    ["cmp", visita.campanha],
    ["ad", visita.anuncio],
  ];
  return pares
    .filter(([, valor]) => valor)
    .map(([chave, valor]) => `${chave}=${valor}`)
    .join(" ");
}

/**
 * Endereço que abre a conversa no WhatsApp com a mensagem já escrita.
 *
 * O `wa.me` é o endereço oficial e funciona no aplicativo e no navegador. A
 * pessoa ainda pode apagar o texto antes de enviar, então o código não é
 * garantia: é o caminho mais confiável que existe sem servidor.
 */
export function linkDoWhatsApp(numero: string, texto: string): string {
  return `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;
}
