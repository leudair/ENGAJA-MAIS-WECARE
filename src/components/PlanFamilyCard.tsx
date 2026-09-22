"use client";

import { useLayoutEffect, useRef, useState, type TouchEvent } from "react";
import type { Content } from "@/content";
import type { PlanCard, PlanFamilyCard } from "@/lib/plans";
import { ChevronIcon, LedButton, MetalButton, MetalPlate } from "./ui";

/** Lista de entrega por publicação, com o valor alinhado à direita. */
function PlanMetrics({ metrics }: { metrics: PlanCard["metrics"] }) {
  return (
    <ul className="space-y-0">
      {metrics.map((metric) => (
        <li
          key={metric.label}
          className="flex items-baseline justify-between gap-3 border-b border-black/25 py-2.5 last:border-0"
        >
          <span className="text-[0.84rem] leading-snug font-bold text-onmetal">
            {metric.label}
          </span>
          <span className="display num-emboss shrink-0 text-right text-[1.02rem] text-onmetal">
            {metric.value}
          </span>
        </li>
      ))}
    </ul>
  );
}

/**
 * O metal de cada combo na lista de comparação: ouro no de maior volume
 * da família, prata no do meio, bronze no de entrada.
 */
const comboMetal: Record<1 | 2 | 3, string> = {
  1: "metal-gold",
  2: "metal-silver",
  3: "metal-bronze",
};

/** Quanto mais caro o plano, mais trabalhada é a caixa da oferta. */
const offerClass: Record<1 | 2 | 3, string> = {
  1: "offer offer-1",
  2: "offer offer-2",
  3: "offer offer-3",
};

/**
 * Card de uma família de planos.
 *
 * O card já abre no plano mais caro da família. As outras ofertas entram de
 * lado, uma por vez, como folhear um livro, do mais caro para o mais barato,
 * e depois da última ele volta para a primeira. Nada empurra a página para
 * baixo: o card mantém o tamanho e a seção não estica com os nove combos.
 */
export function PlanFamilyCard({
  family,
  c,
}: {
  family: PlanFamilyCard;
  c: Content;
}) {
  const [page, setPage] = useState(0);
  const [height, setHeight] = useState<number | undefined>(undefined);
  const pages = useRef<(HTMLDivElement | null)[]>([]);
  const touchX = useRef<number | null>(null);

  const total = family.plans.length;
  const offer = family.plans[page];

  // A altura acompanha a oferta aberta: sem isso o card ficaria sempre do
  // tamanho da oferta mais alta, com um vazio embaixo das outras.
  useLayoutEffect(() => {
    const measure = () => {
      const current = pages.current[page];
      if (current) setHeight(current.offsetHeight);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [page]);

  // Depois da última oferta volta para a primeira, e vice-versa.
  const go = (step: number) =>
    setPage((current) => (current + step + total) % total);

  // No celular a pessoa arrasta o card com o dedo, como num carrossel.
  const onTouchStart = (event: TouchEvent) => {
    touchX.current = event.touches[0].clientX;
  };

  const onTouchEnd = (event: TouchEvent) => {
    if (touchX.current === null) return;
    const delta = event.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(delta) > 40) go(delta < 0 ? 1 : -1);
  };

  const counter = c.plans.counter
    .replace("{n}", String(page + 1))
    .replace("{total}", String(total));

  return (
    <div className="relative">
      {family.recommended && (
        <span className="badge-ruby absolute -top-3 right-5 z-10">
          {c.plans.recommended}
        </span>
      )}

      <MetalPlate kind={family.metal} className="h-full">
        <div className="flex h-full flex-col px-5 pt-7 pb-9 sm:px-7 sm:pt-9 sm:pb-11">
          {/* Cabeçalho fixo: a família não muda quando a pessoa folheia. */}
          <h3 className="display-caps text-xl text-onmetal sm:text-2xl">
            {family.name}
          </h3>
          <p className="mt-2 text-[0.82rem] leading-snug text-pretty text-onmetal-soft/80">
            {family.tagline}
          </p>

          <span className="mt-5 block h-px bg-black/35" />

          <div
            className="mt-5 overflow-hidden transition-[height] duration-300 ease-out"
            style={height ? { height } : undefined}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <div
              className="flex transition-transform duration-300 ease-out"
              style={{ transform: `translateX(-${page * 100}%)` }}
            >
              {family.plans.map((plan, index) => (
                <div
                  key={plan.id}
                  ref={(el) => {
                    pages.current[index] = el;
                  }}
                  className="w-full shrink-0 self-start"
                  aria-hidden={page !== index}
                >
                  {plan.crown && (
                    <span className="offer-crown">{plan.crown}</span>
                  )}

                  <h4
                    className={`display-caps text-onmetal ${
                      plan.crown ? "mt-3" : ""
                    } ${plan.tier === 1 ? "text-2xl sm:text-[1.7rem]" : "text-lg sm:text-xl"}`}
                  >
                    {plan.name}
                  </h4>
                  <p
                    className={`display mt-2 leading-none text-onmetal ${
                      plan.tier === 1 ? "text-[2.9rem]" : "text-[2.4rem]"
                    }`}
                  >
                    {plan.price}
                  </p>
                  <p className="mt-1.5 text-[0.66rem] font-bold tracking-[0.18em] text-onmetal-soft uppercase">
                    {c.plans.priceNote}
                  </p>

                  {/* A caixa das entregas: o acabamento sobe com o preço. */}
                  <div className={`mt-5 ${offerClass[plan.tier]}`}>
                    <p className="text-[0.58rem] font-bold tracking-[0.24em] text-onmetal-soft uppercase">
                      {c.plans.metricsTitle}
                    </p>
                    <div className="mt-1">
                      <PlanMetrics metrics={plan.metrics} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Controles: a seta leva para a oferta seguinte, e a página vira. */}
          <div className="mt-7 flex-1">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label={c.plans.prevLabel}
                className="btn btn-quiet min-h-12 w-12 shrink-0 px-0"
              >
                <ChevronIcon className="rotate-90" />
              </button>

              {offer.tier === 1 ? (
                <LedButton
                  href={offer.href}
                  className="flex-1 px-2 text-[0.62rem] sm:text-[0.7rem]"
                >
                  {c.plans.cta}
                </LedButton>
              ) : (
                <MetalButton
                  href={offer.href}
                  className="flex-1 px-2 text-[0.62rem] sm:text-[0.7rem]"
                >
                  {c.plans.cta}
                </MetalButton>
              )}

              <button
                type="button"
                onClick={() => go(1)}
                aria-label={c.plans.nextLabel}
                className="btn btn-quiet min-h-12 w-12 shrink-0 px-0"
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
                  onClick={() => setPage(index)}
                  aria-label={plan.name}
                  aria-current={page === index}
                  className={`h-1.5 rounded-full transition-all ${
                    page === index ? "w-6 bg-black/55" : "w-1.5 bg-black/25"
                  }`}
                />
              ))}
              <span className="ml-2 text-[0.62rem] font-bold tracking-[0.14em] text-onmetal-soft/70 uppercase">
                {counter}
              </span>
            </div>

            <p className="mt-5 text-[0.82rem] leading-snug text-pretty text-onmetal-soft/85">
              {family.pitch}
            </p>
          </div>
        </div>
      </MetalPlate>
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
}: {
  families: PlanFamilyCard[];
  c: Content;
}) {
  return (
    <details className="surface group mt-10 px-4 py-1 sm:px-6">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 py-4 text-left marker:content-none sm:py-5">
        <span>
          <span className="display-caps block text-sm text-gold-bright sm:text-base">
            {c.plans.compareLabel}
          </span>
          <span className="mt-1 block text-xs text-paper-faint">
            {c.plans.compareNote}
          </span>
        </span>
        <ChevronIcon className="text-gold-bright transition-transform duration-200 group-open:rotate-180" />
      </summary>

      <div className="border-t border-white/12 py-5">
        {families.map((family) => (
          <div key={family.id} className="mb-8 last:mb-0">
            <p className="eyebrow">{family.name}</p>

            <div className="mt-3 grid grid-cols-[minmax(0,1fr)] gap-3 sm:grid-cols-3">
              {family.plans.map((plan) => (
                <div
                  key={plan.id}
                  className={`combo metal ${comboMetal[plan.tier]} combo-${plan.tier} flex flex-col`}
                >
                  {plan.crown && (
                    <span className="offer-crown mb-3 self-start">
                      {plan.crown}
                    </span>
                  )}

                  <p className="display-caps text-[0.84rem] text-onmetal">
                    {plan.name}
                  </p>
                  <p className="display num-emboss mt-1 text-2xl text-onmetal">
                    {plan.price}
                  </p>

                  <ul className="mt-3 flex-1 space-y-0">
                    {plan.metrics.map((metric) => (
                      <li
                        key={metric.label}
                        className="flex items-baseline justify-between gap-2 border-t border-black/25 py-1.5"
                      >
                        <span className="text-[0.76rem] leading-snug font-bold text-onmetal">
                          {metric.label}
                        </span>
                        <span className="display num-emboss shrink-0 text-right text-[0.86rem] text-onmetal">
                          {metric.value}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {plan.tier === 1 ? (
                    <LedButton
                      href={plan.href}
                      className="mt-4 w-full px-2 text-[0.6rem]"
                    >
                      {c.plans.cta}
                    </LedButton>
                  ) : (
                    <MetalButton
                      href={plan.href}
                      className="mt-4 w-full px-2 text-[0.6rem]"
                    >
                      {c.plans.cta}
                    </MetalButton>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </details>
  );
}
