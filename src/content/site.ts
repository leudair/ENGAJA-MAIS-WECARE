/**
 * Configuração comercial do site.
 *
 * PENDENTE DE DEFINIÇÃO (não preencher com suposições):
 * - contactUrl: link de contato/checkout usado pelos botões de plano.
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
