import { contactHref, showsPix } from "@/content/site";
import type { Locale } from "@/content/types";
import { lerCodigoPix } from "./pix";

/** Os três caminhos de pagamento de uma oferta, como vêm dos dados. */
export type MeiosDePagamento = {
  /** Link do Stripe, em dólar, para quem paga de fora. */
  checkoutUrl: string | null;
  /** Link do Mercado Pago, em real, para cartão brasileiro. */
  cardUrlBR: string | null;
  /** Link do Mercado Pago, em real, que só aceita Pix. */
  pixUrlBR: string | null;
  /**
   * Código Pix copia e cola, em real, gerado no banco. Quando existe, ele
   * ganha do link: o código aparece na própria página, sem a pessoa sair
   * daqui, e não passa por intermediário.
   */
  pixCode: string | null;
};

/**
 * Confere os meios de pagamento de uma oferta antes de o site ir ao ar.
 *
 * Um link de pagamento é uma caixa fechada: dá para exigir que seja https e
 * nada mais. O código Pix não: o valor vem escrito dentro dele, então aqui a
 * conferência é de verdade, e um código que cobra diferente do preço da
 * oferta derruba a construção em vez de ir cobrar errado do cliente.
 */
export function conferirPagamento(
  oferta: string,
  meios: MeiosDePagamento,
  precoBRL: number,
): void {
  for (const [nome, url] of [
    ["cartão internacional", meios.checkoutUrl],
    ["cartão do Brasil", meios.cardUrlBR],
    ["Pix", meios.pixUrlBR],
  ] as const) {
    if (url && !url.startsWith("https://")) {
      throw new Error(
        `Link de ${nome} inválido em "${oferta}": tem que ser um endereço https.`,
      );
    }
  }

  const codigo = meios.pixCode;
  if (!codigo) return;

  const leitura = lerCodigoPix(codigo);
  if (!leitura.ePix) {
    throw new Error(
      `Código Pix inválido em "${oferta}": não parece um copia e cola do Pix.`,
    );
  }
  if (!leitura.somaCerta) {
    throw new Error(
      `Código Pix inválido em "${oferta}": a soma de conferência não bate, o código deve ter sido copiado pela metade ou alterado.`,
    );
  }
  if (leitura.valor === null) {
    throw new Error(
      `Código Pix sem valor em "${oferta}": gere o código já com o valor de R$ ${precoBRL}, senão o cliente digita a quantia que quiser.`,
    );
  }
  if (Math.round(leitura.valor * 100) !== Math.round(precoBRL * 100)) {
    throw new Error(
      `Código Pix com valor errado em "${oferta}": o código cobra R$ ${leitura.valor} e a oferta custa R$ ${precoBRL}.`,
    );
  }
}

/** Os caminhos de pagamento já prontos para a interface. */
export type PaymentWays = {
  /** Stripe, em dólar. */
  card: string | null;
  /** Mercado Pago, em real. */
  cardBR: string | null;
  /**
   * Pix copia e cola, com o valor já escrito por extenso para a tela. Quando
   * existe, é ele que o botão de Pix abre.
   */
  pix: { code: string; amount: string } | null;
  /** Link de Pix do Mercado Pago, usado quando não há código copia e cola. */
  pixLink: string | null;
};

/**
 * Filtra os caminhos pelo idioma da página. Pix e cartão brasileiro só
 * funcionam para quem tem banco no Brasil: mostrar isso para o comprador
 * americano não ajuda, só confunde.
 */
export function paymentWays(
  locale: Locale,
  meios: MeiosDePagamento,
  amount: string,
): PaymentWays {
  const brasileiro = showsPix(locale);
  const pix =
    brasileiro && meios.pixCode ? { code: meios.pixCode, amount } : null;
  return {
    card: meios.checkoutUrl,
    cardBR: brasileiro ? meios.cardUrlBR : null,
    pix,
    // O código e o link fazem a mesma coisa para quem compra, então a oferta
    // mostra um botão de Pix só, nunca dois.
    pixLink: brasileiro && !pix ? meios.pixUrlBR : null,
  };
}

/** Quantos caminhos esta oferta tem. Mais de um abre a escolha. */
export function paymentCount(ways: PaymentWays): number {
  return [ways.card, ways.cardBR, ways.pix ?? ways.pixLink].filter(Boolean)
    .length;
}

/**
 * Para onde o botão vai quando não há escolha a fazer. O Pix não tem endereço:
 * quando ele é o único caminho, quem resolve é a tela do código, não este
 * endereço.
 */
export function paymentHref(ways: PaymentWays): string {
  return ways.pixLink ?? ways.card ?? ways.cardBR ?? contactHref;
}
