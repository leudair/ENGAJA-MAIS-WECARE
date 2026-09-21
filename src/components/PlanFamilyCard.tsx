"use client";

import { useLayoutEffect, useRef, useState } from "react";
import type { Content } from "@/content";
import type { PlanCard, PlanFamilyCard } from "@/lib/plans";
import {
  CheckIcon,
  ChevronIcon,
  DarkCard,
  OutlineButton,
  QuietButton,
  RubyButton,
} from "./ui";

/** Lista de entrega por publicação, com o valor alinhado à direita. */
function PlanMetrics({ metrics }: { metrics: PlanCard["metrics"] }) {
  return (
    <ul className="space-y-0">
      {metrics.map((metric) => (
        <li
          key={metric.label}
          className="rule-card flex items-baseline justify-between gap-3 py-2.5 first:border-t-0"
        >
          <span className="text-[0.82rem] leading-snug text-list">
            {metric.label}
          </span>
          <span className="display shrink-0 text-right text-[0.95rem] text-gold-soft">
            {metric.value}
          </span>
        </li>
      ))}
    </ul>
  );
}

/**
 * Card de uma família de planos.
 *
 * A primeira página é a venda: nome, copy, "a partir de" e o que entra. As
 * ofertas não empurram a página para baixo — elas entram de lado, uma por
 * vez, como folhear um livro. Assim o card mantém o tamanho e a página não
 * estica com os nove combos.
 */
export function PlanFamilyCard({
  family,
  c,
  contactHref,
}: {
  family: PlanFamilyCard;
  c: Content;
  contactHref: string;
}) {
  const [page, setPage] = useState(0);
  const [height, setHeight] = useState<number | undefined>(undefined);
  const pages = useRef<(HTMLDivElement | null)[]>([]);

  // A altura acompanha a página aberta: sem isso o card ficaria sempre do
  // tamanho da oferta mais alta, com um vazio embaixo da tela de venda.
  useLayoutEffect(() => {
    const measure = () => {
      const current = pages.current[page];
      if (current) setHeight(current.offsetHeight);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [page]);

  const total = family.plans.length;
  const offer = page > 0 ? family.plans[page - 1] : null;

  const counter = c.plans.counter
    .replace("{n}", String(page))
    .replace("{total}", String(total));

  return (
    <div className="relative">
      {family.recommended && (
        <span className="badge-ruby absolute -top-3 right-6 z-10">
          {c.plans.recommended}
        </span>
      )}

      <DarkCard kind={family.metal} className="h-full">
        <div className="flex h-full flex-col px-6 pt-8 pb-9 sm:px-7 sm:pt-9 sm:pb-10">
          <div
            className="overflow-hidden transition-[height] duration-300 ease-out"
            style={height ? { height } : undefined}
          >
            <div
              className="flex transition-transform duration-300 ease-out"
              style={{ transform: `translateX(-${page * 100}%)` }}
            >
              {/* Página 0: a venda. */}
              <div
                ref={(el) => {
                  pages.current[0] = el;
                }}
                className="w-full shrink-0 self-start"
                aria-hidden={page !== 0}
              >
                <h3 className="display-caps text-2xl text-gold-line sm:text-[1.75rem]">
                  {family.name}
                </h3>
                <p className="mt-1.5 text-[0.84rem] leading-snug text-pretty text-list-soft">
                  {family.tagline}
                </p>

                <p className="mt-6 text-[0.62rem] font-bold tracking-[0.22em] text-gold-deep uppercase">
                  {c.plans.fromLabel}
                </p>
                <p className="display mt-1 text-[2.7rem] leading-none text-paper">
                  {family.fromPrice}
                </p>
                <p className="mt-2 text-[0.66rem] font-bold tracking-[0.18em] text-gold-line uppercase">
                  {c.plans.cycleLabel}
                </p>

                <div className="rule-card mt-6" />

                <ul className="mt-4">
                  {c.plans.metricLabels.map((label) => (
                    <li
                      key={label}
                      className="rule-card flex items-start gap-3 py-2.5 first:border-t-0"
                    >
                      <CheckIcon />
                      <span className="text-[0.88rem] leading-snug text-list">
                        {label}
                      </span>
                    </li>
                  ))}
                </ul>

                <p className="mt-6 text-center text-[0.78rem] leading-snug text-pretty text-paper-weak italic">
                  {family.pitch}
                </p>
              </div>

              {/* Páginas 1..n: uma oferta por vez. */}
              {family.plans.map((plan, index) => (
                <div
                  key={plan.id}
                  ref={(el) => {
                    pages.current[index + 1] = el;
                  }}
                  className="w-full shrink-0 self-start"
                  aria-hidden={page !== index + 1}
                >
                  <p className="text-[0.6rem] font-bold tracking-[0.24em] text-gold-deep uppercase">
                    {family.name}
                  </p>
                  <h3 className="display-caps mt-2 text-xl text-gold-line">
                    {plan.name}
                  </h3>
                  <p className="display mt-2 text-[2.5rem] leading-none text-paper">
                    {plan.price}
                  </p>
                  <p className="mt-1.5 text-[0.66rem] font-bold tracking-[0.18em] text-gold-line uppercase">
                    {c.plans.priceNote}
                  </p>

                  <div className="rule-card mt-5" />

                  <p className="mt-4 text-[0.6rem] font-bold tracking-[0.22em] text-gold-deep uppercase">
                    {c.plans.metricsTitle}
                  </p>
                  <div className="mt-1">
                    <PlanMetrics metrics={plan.metrics} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Controles: a seta leva para a oferta seguinte, e a página vira. */}
          <div className="mt-7 flex-1">
            {page === 0 ? (
              <button
                type="button"
                onClick={() => setPage(1)}
                className="btn btn-outline w-full"
              >
                {c.plans.openLabel}
                <ChevronIcon className="-rotate-90" />
              </button>
            ) : (
              <>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setPage(page - 1)}
                    aria-label={
                      page === 1 ? c.plans.backLabel : c.plans.prevLabel
                    }
                    className="btn btn-outline min-h-12 w-12 shrink-0 px-0"
                  >
                    <ChevronIcon className="rotate-90" />
                  </button>

                  {offer && (
                    <RubyButton
                      href={contactHref}
                      className="flex-1 px-2 text-[0.62rem] sm:text-[0.7rem]"
                    >
                      {c.plans.cta}
                    </RubyButton>
                  )}

                  <button
                    type="button"
                    onClick={() => setPage(page + 1)}
                    disabled={page === total}
                    aria-label={c.plans.nextLabel}
                    className="btn btn-outline min-h-12 w-12 shrink-0 px-0 disabled:pointer-events-none disabled:opacity-35"
                  >
                    <ChevronIcon className="-rotate-90" />
                  </button>
                </div>

                {/* Onde a pessoa está no folheio. */}
                <div className="mt-4 flex items-center justify-center gap-2">
                  {family.plans.map((plan, index) => (
                    <button
                      key={plan.id}
                      type="button"
                      onClick={() => setPage(index + 1)}
                      aria-label={plan.name}
                      aria-current={page === index + 1}
                      className={`h-1.5 rounded-full transition-all ${
                        page === index + 1
                          ? "w-6 bg-gold-line"
                          : "w-1.5 bg-gold-line/30"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-[0.62rem] font-bold tracking-[0.14em] text-gold-deep uppercase">
                    {counter}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </DarkCard>
    </div>
  );
}

/**
 * Lista de comparação, fechada por padrão: os nove combos numa tela só.
 * Existe para quem quer comparar preço sem precisar folhear card por card.
 * São blocos, não tabela: no celular uma tabela exigiria rolagem lateral.
 */
export function PlanComparison({
  families,
  c,
  contactHref,
}: {
  families: PlanFamilyCard[];
  c: Content;
  contactHref: string;
}) {
  return (
    <details className="surface group mt-10 px-4 py-1 sm:px-6">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 py-4 text-left marker:content-none sm:py-5">
        <span>
          <span className="display-caps block text-sm text-gold-line sm:text-base">
            {c.plans.compareLabel}
          </span>
          <span className="mt-1 block text-xs text-paper-faint">
            {c.plans.compareNote}
          </span>
        </span>
        <ChevronIcon className="text-gold-line transition-transform duration-200 group-open:rotate-180" />
      </summary>

      <div className="rule-card py-5">
        {families.map((family) => (
          <div key={family.id} className="mb-8 last:mb-0">
            <p className="eyebrow">{family.name}</p>

            <div className="mt-3 grid grid-cols-[minmax(0,1fr)] gap-3 sm:grid-cols-3">
              {family.plans.map((plan) => (
                <div
                  key={plan.id}
                  className="flex flex-col rounded-[14px] border border-gold-line/25 bg-ink-900 px-4 pt-4 pb-5"
                >
                  <p className="display-caps text-[0.78rem] text-gold-line">
                    {plan.name}
                  </p>
                  <p className="display mt-1 text-xl text-paper">
                    {plan.price}
                  </p>

                  <ul className="mt-3 flex-1 space-y-0">
                    {plan.metrics.map((metric) => (
                      <li
                        key={metric.label}
                        className="rule-card flex items-baseline justify-between gap-2 py-1.5"
                      >
                        <span className="text-[0.7rem] leading-snug text-list-soft">
                          {metric.label}
                        </span>
                        <span className="display shrink-0 text-right text-[0.78rem] text-gold-soft">
                          {metric.value}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <QuietButton
                    href={contactHref}
                    className="mt-4 w-full px-2 text-[0.6rem]"
                  >
                    {c.plans.cta}
                  </QuietButton>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </details>
  );
}
