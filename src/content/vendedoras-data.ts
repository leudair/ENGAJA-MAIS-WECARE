/**
 * As vendedoras e os links de pagamento de cada uma.
 *
 * O site é um só. Quem identifica a venda é o código no fim do endereço:
 * `wecarefeed.com/pt?v=W1`. Quem entra por ele paga nos links desta lista, e
 * não nos links gerais, de forma que a referência que chega no webhook do
 * Mercado Pago já diz quem vendeu.
 *
 * Cada vendedora precisa dos seus próprios links criados no painel do Mercado
 * Pago, com o mesmo valor e o mesmo nome dos gerais, mudando só o código de
 * referência, que ganha o prefixo dela: `W1-PLANO-BLACK`, `W1-VIRAL-50K`, e
 * assim por diante.
 *
 * Oferta sem link próprio cai no link geral. Por isso dá para ir cadastrando
 * aos poucos, sem o site quebrar no meio do caminho.
 *
 * A chave de `links` é o `id` da oferta, igual ao de `plans-data.ts` e
 * `viral-data.ts`.
 */

export type LinksDaVendedora = {
  /** Link do Mercado Pago que só aceita Pix, em real. */
  pixUrlBR: string | null;
  /** Link do Mercado Pago que só aceita cartão, em real. */
  cardUrlBR: string | null;
};

export type VendedoraData = {
  /** Código que vai no endereço. Letra W e o número dela: W1, W2, W3. */
  codigo: string;
  /** Nome de quem é, só para esta lista. Não aparece em lugar nenhum do site. */
  nome: string;
  links: Record<string, LinksDaVendedora>;
};

export const vendedorasData: VendedoraData[] = [];

/**
 * Confere a lista antes de o site ir ao ar.
 *
 * Código repetido manda duas vendedoras para o mesmo lugar, e link que não é
 * https cobra fora do Mercado Pago. Os dois derrubam a construção aqui, em vez
 * de comissionar a pessoa errada depois.
 */
const vistos = new Set<string>();
for (const vendedora of vendedorasData) {
  if (!/^W\d+$/.test(vendedora.codigo)) {
    throw new Error(
      `Código de vendedora inválido: "${vendedora.codigo}". Use a letra W maiúscula e o número, como W1.`,
    );
  }
  if (vistos.has(vendedora.codigo)) {
    throw new Error(`Código de vendedora repetido: "${vendedora.codigo}".`);
  }
  vistos.add(vendedora.codigo);

  for (const [oferta, links] of Object.entries(vendedora.links)) {
    for (const url of [links.pixUrlBR, links.cardUrlBR]) {
      if (url && !url.startsWith("https://")) {
        throw new Error(
          `Link de "${oferta}" da vendedora ${vendedora.codigo} inválido: tem que ser um endereço https.`,
        );
      }
    }
  }
}
