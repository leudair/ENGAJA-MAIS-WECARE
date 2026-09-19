/**
 * Configuração comercial do site.
 *
 * PENDENTE DE DEFINIÇÃO (não preencher com suposições):
 * - contactUrl: link de contato/checkout usado pelos botões de plano.
 * - wecareProfileUrl: link do perfil da WeCare usado na seção de demonstração.
 * - logoUrl: arquivo da logo oficial. Enquanto for `null`, o site usa o lockup
 *   tipográfico do componente Logo. Para trocar, coloque o arquivo em `public/`
 *   e aponte aqui, por exemplo "/logo-engaja-mais-wecare.svg".
 *
 * Enquanto forem `null`, a interface leva o visitante para a seção de contato
 * da própria página, sem prometer canal que ainda não existe.
 */
export const siteConfig = {
  brand: "Engaja Mais WeCare",
  contactUrl: null as string | null,
  logoUrl: null as string | null,
  wecareProfileUrl: null as string | null,
} as const;

export const contactHref = siteConfig.contactUrl ?? "#contato";
