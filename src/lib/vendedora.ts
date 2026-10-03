import { vendedorasData, type VendedoraData } from "@/content/vendedoras-data";
import type { PaymentWays } from "./pagamento";

/** Nome do parâmetro no endereço: `wecarefeed.com/pt?v=W1`. */
export const PARAMETRO_VENDEDORA = "v";

/** Onde o navegador guarda o código entre uma visita e outra. */
export const CHAVE_VENDEDORA = "wecare-vendedora";

/**
 * Por quantos dias o código vale depois que a pessoa entrou por ele.
 *
 * Quem recebe a página no WhatsApp quase nunca compra no mesmo minuto: lê,
 * pensa, e volta dias depois pelo histórico da conversa, sem o código no
 * endereço. Trinta dias cobrem essa volta sem carregar a origem para sempre.
 */
export const DIAS_DE_VALIDADE = 30;

/** Acha a vendedora pelo código do endereço. Código desconhecido não vale. */
export function acharVendedora(codigo: string | null): VendedoraData | null {
  if (!codigo) return null;
  const limpo = codigo.trim().toUpperCase();
  return vendedorasData.find((v) => v.codigo === limpo) ?? null;
}

/**
 * Troca os links gerais pelos da vendedora, quando ela tem link para a oferta.
 *
 * A troca respeita o que já estava na tela: caminho que o idioma da página não
 * mostra continua escondido, e oferta sem link próprio segue no link geral.
 */
export function comVendedora(
  ways: PaymentWays,
  ofertaId: string,
  vendedora: VendedoraData | null,
): PaymentWays {
  const links = vendedora?.links[ofertaId];
  if (!links) return ways;
  return {
    ...ways,
    cardBR: ways.cardBR && links.cardUrlBR ? links.cardUrlBR : ways.cardBR,
    pixLink: ways.pixLink && links.pixUrlBR ? links.pixUrlBR : ways.pixLink,
  };
}
