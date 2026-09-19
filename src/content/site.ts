/**
 * Configuração comercial do site.
 *
 * PENDENTE DE DEFINIÇÃO (não preencher com suposições):
 * - contactUrl: link de contato/checkout usado pelos botões de plano.
 * - wecareProfileUrl: link do perfil da WeCare usado na seção de demonstração.
 *
 * Enquanto forem `null`, a interface leva o visitante para a seção de contato
 * da própria página, sem prometer canal que ainda não existe.
 */
export const siteConfig = {
  brand: "Engaja Mais WeCare",
  contactUrl: null as string | null,
  wecareProfileUrl: null as string | null,
} as const;

export const contactHref = siteConfig.contactUrl ?? "#contato";
