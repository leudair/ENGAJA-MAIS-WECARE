# Engaja Mais WeCare

Site dos planos mensais de engajamento da WeCare. Construído em Next.js (App Router)
com Tailwind CSS, layout pensado primeiro para o celular e conteúdo em português,
inglês e espanhol.

## Rodar localmente

```bash
npm install
npm run dev
```

A raiz (`/`) redireciona para `/pt`.

## Rotas

| Rota | Descrição |
| --- | --- |
| `/pt`, `/en`, `/es` | Página de engajamento (planos mensais) |
| `/pt/crescimento-viral` e equivalentes | Página de Crescimento Viral |

## Onde ficam os textos

Todo o texto visível vem de `src/content/`:

- `types.ts` — formato do conteúdo, igual para os três idiomas
- `pt.ts`, `en.ts`, `es.ts` — os textos de cada idioma
- `site.ts` — configuração comercial (links de contato e do perfil da WeCare)

Para mudar uma frase, edite o idioma correspondente. Para adicionar um campo novo,
declare em `types.ts` primeiro: o TypeScript avisa se algum idioma ficar sem tradução.

## Planos

As três famílias (Start, Intermediário e Premium) ficam em `plans.items` de cada
idioma. O campo `price` aceita `null` quando o valor ainda não está definido — nesse
caso a interface mostra "Sob consulta" em vez de inventar um número.

## Pendências de conteúdo

- `siteConfig.contactUrl`: link de contato ou checkout usado pelos botões de plano.
  Enquanto for `null`, os botões levam para a seção de contato da própria página.
- `siteConfig.wecareProfileUrl`: link do perfil da WeCare. Enquanto for `null`, o
  botão da seção de demonstração não é exibido.
- Preços dos planos Intermediário e Premium.
- Conteúdo definitivo da página de Crescimento Viral.
