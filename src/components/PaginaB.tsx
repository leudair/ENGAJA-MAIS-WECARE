"use client";

import Link from "next/link";
import type { Content, Locale } from "@/content";
import { siteConfig } from "@/content/site";
import type { PlanFamilyCard } from "@/lib/plans";
import { privacyPath, termsPath, viralGrowthPath } from "@/lib/routes";
import { PlanCta } from "./PlanCta";
import { VarianteFixa } from "./VisitaProvider";
import { useWhatsAppHref } from "./WhatsAppCta";

/**
 * Versão B do teste A/B.
 *
 * A A é uma vitrine: preta, longa, com as chapas de metal escovado e os
 * planos em carrossel. A B é o contrário disso de propósito, porque duas
 * páginas parecidas não medem nada no anúncio: folha clara, página curta,
 * nove planos numa lista só, um caminho só até o WhatsApp.
 *
 * O que não muda: os preços, os nomes dos planos, as cinco faixas por
 * publicação, o limite de 30 e os documentos legais. Se a oferta mudasse
 * junto com o visual, o teste não diria qual das duas coisas ganhou.
 */
export function PaginaB({
  c,
  locale,
  familias,
}: {
  c: Content;
  locale: Locale;
  familias: PlanFamilyCard[];
}) {
  return (
    <VarianteFixa valor="B">
      <div data-tema="claro" className="folha-clara">
        <Topo c={c} locale={locale} />
        <Abertura c={c} />
        <Entregas c={c} />
        <Planos c={c} familias={familias} />
        <Duvidas c={c} />
        <Fechamento c={c} />
        <Pe c={c} locale={locale} />
      </div>
    </VarianteFixa>
  );
}

/** Botão principal da folha. Leva sempre para a mesma conversa. */
function BotaoFolha({
  c,
  className = "",
  vazado = false,
}: {
  c: Content;
  className?: string;
  vazado?: boolean;
}) {
  const href = useWhatsAppHref(c);
  return (
    <a
      href={href}
      className={`btn-folha ${vazado ? "btn-folha-vazado" : ""} ${className}`}
    >
      {c.variantB.cta}
    </a>
  );
}

/**
 * Topo próprio, sem menu.
 *
 * Página de anúncio não leva menu: cada link no topo é uma saída antes de a
 * pessoa ler a oferta. Fica só a marca, para ela saber onde está.
 */
function Topo({ c, locale }: { c: Content; locale: Locale }) {
  return (
    <header className="mx-auto flex max-w-3xl items-center justify-between px-5 py-5">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={siteConfig.logoUrl ?? ""}
        alt={c.hero.logoAlt}
        width={120}
        height={36}
        className="h-7 w-auto"
      />
      <Link
        href={viralGrowthPath(locale)}
        className="text-[0.68rem] font-semibold tracking-[0.14em] text-onmetal-soft/70 uppercase transition-colors hover:text-ruby-500"
      >
        {c.finalCta.secondaryCta}
      </Link>
    </header>
  );
}

function Abertura({ c }: { c: Content }) {
  return (
    <section className="mx-auto max-w-3xl px-5 pt-6 pb-12">
      <p className="text-[0.68rem] font-bold tracking-[0.2em] text-ruby-500 uppercase">
        {c.variantB.eyebrow}
      </p>
      <h1 className="mt-4 font-display text-[2rem] leading-[1.1] font-bold text-balance text-onmetal sm:text-[2.9rem]">
        {c.variantB.title}
      </h1>
      <p className="mt-5 max-w-xl text-base leading-relaxed text-pretty text-onmetal-soft">
        {c.variantB.lead}
      </p>
      <div className="mt-8">
        <BotaoFolha c={c} className="w-full sm:w-auto" />
        <p className="mt-3 text-[0.75rem] text-onmetal-soft/75">
          {c.variantB.ctaNote}
        </p>
      </div>
    </section>
  );
}

/**
 * O que entra no mês.
 *
 * São os mesmos itens da A, no texto que já estava aprovado. O que muda é a
 * forma: lista corrida em vez de cartões em relevo.
 */
function Entregas({ c }: { c: Content }) {
  return (
    <section className="mx-auto max-w-3xl px-5 py-10">
      <div className="fio-ouro" aria-hidden />
      <ul className="mt-8 grid gap-5 sm:grid-cols-2">
        {c.included.items.map((item) => (
          <li key={item.title} className="cartao-claro p-5">
            <p className="text-sm font-bold text-onmetal">{item.title}</p>
            <p className="mt-1.5 text-[0.82rem] leading-relaxed text-onmetal-soft">
              {item.description}
            </p>
          </li>
        ))}
      </ul>
      <p className="mt-6 text-[0.8rem] leading-relaxed text-onmetal-soft/85">
        {c.limit.lead}
      </p>
    </section>
  );
}

/**
 * Os nove planos numa lista só.
 *
 * A A folheia três carrosséis, um por faixa de preço. Aqui todos aparecem de
 * uma vez, do mais completo ao mais simples, porque a pessoa que veio de
 * anúncio não folheia: ela corre o olho e sai.
 */
function Planos({ c, familias }: { c: Content; familias: PlanFamilyCard[] }) {
  return (
    <section id="planos" className="mx-auto max-w-3xl px-5 py-10">
      <h2 className="font-display text-2xl font-bold text-onmetal sm:text-3xl">
        {c.variantB.plansTitle}
      </h2>
      <p className="mt-2 text-[0.85rem] text-onmetal-soft">
        {c.variantB.plansLead}
      </p>

      <div className="mt-8 flex flex-col gap-8">
        {familias.map((familia) => (
          <div key={familia.id}>
            <p className="text-[0.68rem] font-bold tracking-[0.18em] text-onmetal-soft/70 uppercase">
              {familia.name}
            </p>
            <div className="mt-3 flex flex-col gap-3">
              {familia.plans.map((plano) => (
                <div
                  key={plano.id}
                  className={`cartao-claro p-5 ${
                    plano.featured ? "cartao-claro-destaque" : ""
                  }`}
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <p className="text-base font-bold text-onmetal">
                      {plano.name}
                    </p>
                    <p className="text-lg font-bold text-ruby-500">
                      {plano.price}
                    </p>
                  </div>
                  {plano.priceAlt && (
                    <p className="text-right text-[0.72rem] text-onmetal-soft/70">
                      {plano.priceAlt}
                    </p>
                  )}

                  <ul className="mt-4 grid gap-x-4 gap-y-1.5 sm:grid-cols-2">
                    {plano.metrics.map((metrica) => (
                      <li
                        key={metrica.label}
                        className="flex items-baseline justify-between gap-3 text-[0.8rem]"
                      >
                        <span className="text-onmetal-soft/80">
                          {metrica.label}
                        </span>
                        <span className="font-semibold text-onmetal tabular-nums">
                          {metrica.value}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <PlanCta
                    plan={plano}
                    c={c}
                    className="mt-5 w-full"
                    variant="key"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/** As mesmas perguntas da A, abertas, sem sanfona. */
function Duvidas({ c }: { c: Content }) {
  return (
    <section className="mx-auto max-w-3xl px-5 py-10">
      <div className="fio-ouro" aria-hidden />
      <h2 className="mt-8 font-display text-2xl font-bold text-onmetal">
        {c.faq.title}
      </h2>
      <dl className="mt-6 flex flex-col gap-5">
        {c.faq.items.map((item) => (
          <div key={item.question}>
            <dt className="text-sm font-bold text-onmetal">{item.question}</dt>
            <dd className="mt-1.5 text-[0.82rem] leading-relaxed text-onmetal-soft">
              {item.answer}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function Fechamento({ c }: { c: Content }) {
  return (
    <section className="mx-auto max-w-3xl px-5 py-12">
      <div className="cartao-claro cartao-claro-destaque px-6 py-10 text-center">
        <h2 className="font-display text-2xl font-bold text-balance text-onmetal sm:text-3xl">
          {c.variantB.closingTitle}
        </h2>
        <div className="mt-7 flex justify-center">
          <BotaoFolha c={c} className="w-full sm:w-auto" />
        </div>
        <p className="mt-3 text-[0.75rem] text-onmetal-soft/75">
          {c.variantB.ctaNote}
        </p>
      </div>
    </section>
  );
}

/** Pé curto: só o que a lei pede e a marca. */
function Pe({ c, locale }: { c: Content; locale: Locale }) {
  return (
    <footer className="mx-auto max-w-3xl px-5 pt-4 pb-12">
      <div className="fio-ouro" aria-hidden />
      <nav
        aria-label={c.legal.terms.navLabel}
        className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[0.72rem] font-semibold tracking-[0.1em] text-onmetal-soft/70 uppercase"
      >
        <Link
          href={termsPath(locale)}
          className="transition-colors hover:text-ruby-500"
        >
          {c.legal.terms.navLabel}
        </Link>
        <Link
          href={privacyPath(locale)}
          className="transition-colors hover:text-ruby-500"
        >
          {c.legal.privacy.navLabel}
        </Link>
      </nav>
      <p className="mt-5 text-[0.72rem] text-onmetal-soft/60">
        © {new Date().getFullYear()} {siteConfig.brand}. {c.footer.rights}
      </p>
    </footer>
  );
}
