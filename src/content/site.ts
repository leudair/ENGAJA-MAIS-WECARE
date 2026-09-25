/**
 * Configuração comercial do site.
 *
 * PENDENTE DE DEFINIÇÃO (não preencher com suposições):
 * - contactUrl: link de contato geral, usado enquanto um plano não tem
 *   checkout próprio. O link de pagamento de CADA plano não fica aqui: fica
 *   em `checkoutUrl`, junto do preço dele, em `plans-data.ts`.
 * - wecareProfileUrl: link do perfil da WeCare usado na seção de demonstração.
 * - logoUrl: arquivo da logo oficial, em `public/`. O arquivo atual foi gerado
 *   a partir da logo enviada pelo Leudair, com o fundo branco recortado para a
 *   marca assentar sobre o preto. Para trocar, basta apontar para outro arquivo.
 *
 * Enquanto forem `null`, a interface leva o visitante para a seção de contato
 * da própria página, sem prometer canal que ainda não existe.
 */
export const siteConfig = {
  brand: "Engaja Mais WeCare",
  contactUrl: null as string | null,
  logoUrl: "/logo-wecare.png" as string | null,
  wecareProfileUrl: null as string | null,
} as const;

export const contactHref = siteConfig.contactUrl ?? "#contato";

/**
 * Idiomas em que o Pix aparece como opção de pagamento.
 *
 * Os caminhos brasileiros são dois: o código Pix copia e cola, que a pessoa
 * cola no aplicativo do próprio banco, e o link do Mercado Pago para cartão
 * brasileiro. Nenhum dos dois serve para quem está nos Estados Unidos, e
 * mostrar esses botões lá só confunde, então ficam restritos à página em
 * português. Para liberar em outro idioma, basta acrescentar o código dele
 * aqui.
 */
export const pixLocales = ["pt"] as const;

export function showsPix(locale: string): boolean {
  return (pixLocales as readonly string[]).includes(locale);
}
