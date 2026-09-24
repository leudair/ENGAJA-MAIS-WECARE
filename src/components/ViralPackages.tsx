"use client";

import { useLayoutEffect, useRef, useState, type TouchEvent } from "react";
import type { Content } from "@/content";
import type { ViralBandCard, ViralPackageCard } from "@/lib/viral";
import { MetricIcon, type MetricIconName } from "./MetricIcon";
import { PlanCta } from "./PlanCta";
import { ChevronIcon } from "./ui";

/**
 * Ícones das cinco entregas de um vídeo, na ordem da arte: visualizações,
 * curtidas, comentários, repostagens e compartilhamentos.
 */
const videoIcons: readonly MetricIconName[] = [
  "views",
  "likes",
  "comments",
  "reposts",
  "shares",
];

/** Ícones da régua dos vídeos já publicados, na ordem de `recentLabels`. */
const recentIcons: readonly MetricIconName[] = [
  "views",
  "likes",
  "reposts",
  "shares",
];

/**
 * Um dos três quadros de vídeo: a lingueta com o número em cima e as cinco
 * entregas embaixo, uma por linha, separadas por um fio.
 *
 * Os três ficam lado a lado, inclusive no celular. Foi o que o Leudair pediu
 * em 24/09/2026, depois de recusar o formato anterior: o quadro empilhado
 * deixava a oferta com mais de 1.300px e obrigava a rolar a tela para ver uma
 * informação só. Em três colunas o rótulo de cada entrega não cabe, então
 * quem nomeia o número é o ícone, e a legenda embaixo dos três diz o que cada
 * ícone conta.
 */
function VideoCard({ video }: { video: ViralPackageCard["videos"][number] }) {
  return (
    <div className="relative pt-2.5">
      <div className="art-card art-notch h-full">
        <div className="art-card-face art-notch h-full px-1.5 pt-4 pb-1.5">
          <ul>
            {video.stats.map((stat, i) => (
              <li
                key={stat.label}
                className="flex items-center gap-1 border-t border-white/12 py-[0.3rem] first:border-t-0"
              >
                <MetricIcon name={videoIcons[i]} small />
                <span className="display min-w-0 truncate text-[0.62rem] leading-none text-gold-bright sm:text-[0.78rem]">
                  {stat.value}
                </span>
                <span className="sr-only">
                  {stat.label}, {video.title}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* A lingueta pendurada no topo do quadro, com o número do vídeo. */}
      <span
        aria-hidden
        className="art-tab absolute top-0 left-1/2 flex h-5 w-8 -translate-x-1/2 justify-center pt-0.5 text-[0.6rem] leading-none font-bold text-onmetal"
      >
        {video.n}
      </span>
    </div>
  );
}

/** Uma oferta inteira no formato da arte, do rótulo ao botão. */
function OfferFace({
  pkg,
  band,
  c,
  onOpenChange,
}: {
  pkg: ViralPackageCard;
  band: ViralBandCard;
  c: Content;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <div>
      {/* Tarja fina do topo, que na arte nomeia a peça. */}
      <div className="art-bar metal px-3 py-1 text-center">
        <span className="text-[0.56rem] font-bold tracking-[0.22em] text-onmetal uppercase">
          {band.name}
        </span>
      </div>

      {/* A chapa grande: a meta, que é o que tem que chamar a atenção. */}
      <div className="art-plate art-notch metal mt-2 px-3 py-3 text-center">
        <p className="display display-3d text-[2.1rem] leading-none sm:text-[2.9rem]">
          {pkg.followers}
        </p>
        <p className="mt-0.5 text-[0.56rem] font-bold tracking-[0.2em] text-onmetal-soft uppercase sm:text-[0.68rem]">
          {pkg.followersUnit}
        </p>
      </div>

      {/* Os três vídeos virais, lado a lado. */}
      <div className="mt-2 grid grid-cols-3 gap-1.5">
        {pkg.videos.map((video) => (
          <VideoCard key={video.title} video={video} />
        ))}
      </div>

      {/* O que cada ícone conta, já que nos quadros não cabe o rótulo. */}
      <ul className="mt-2 flex flex-wrap justify-center gap-x-2.5 gap-y-1">
        {pkg.videos[0].stats.map((stat, i) => (
          <li key={stat.label} className="flex items-center gap-1">
            <MetricIcon name={videoIcons[i]} small />
            <span className="text-[0.5rem] font-bold tracking-[0.1em] text-paper-dim uppercase">
              {stat.label}
            </span>
          </li>
        ))}
      </ul>

      {/* A régua de quatro casas: os vídeos que a pessoa já publicou. */}
      <p className="mt-3 text-center text-[0.58rem] leading-snug font-bold tracking-[0.1em] text-gold-label uppercase">
        {pkg.recentTitle}
      </p>
      <div className="art-cells art-notch metal mt-1.5 flex">
        {pkg.recent.map((stat, i) => (
          <div
            key={stat.label}
            className="art-cell min-w-0 flex-1 px-1 py-1.5 text-center"
          >
            {/* Ícone, faixa e rótulo um embaixo do outro, cada um podendo
                quebrar em duas linhas. Em linha, a faixa "30.000 a 60.000" e
                a palavra "Compartilhamentos" não cabiam na quarta casa e
                saíam cortadas. */}
            <span className="flex justify-center">
              <MetricIcon name={recentIcons[i]} small />
            </span>
            <p className="display num-emboss mt-1 text-[0.56rem] leading-[1.15] text-onmetal sm:text-[0.66rem]">
              {stat.value}
            </p>
            <p className="mt-0.5 text-[0.36rem] leading-[1.15] font-bold tracking-tight break-words text-onmetal-soft uppercase sm:text-[0.42rem]">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
      <p className="mt-1 text-center text-[0.5rem] text-paper-faint">
        {c.viralPage.recentNote}
      </p>

      <span aria-hidden className="art-hair mt-3 block" />

      {/* A chapa do preço: o de antes riscado e o de agora. */}
      <div className="art-plate art-notch metal mt-3 px-3 py-2.5 text-center">
        <p className="flex items-baseline justify-center gap-1.5">
          <span className="price-was text-[0.66rem] font-semibold text-onmetal-soft">
            {pkg.from}
          </span>
          <span className="text-[0.5rem] font-bold tracking-[0.18em] text-onmetal-soft uppercase">
            {c.viralPage.priceNote}
          </span>
        </p>
        <p className="display display-3d mt-1 text-[1.7rem] leading-none sm:text-[2.1rem]">
          {pkg.price}
        </p>
        {/* A mesma quantia em dólar, para o brasileiro que mora fora. Só
            aparece em português, onde o preço principal é em real. */}
        {pkg.priceAlt && (
          <p className="display-3d-sm mt-1.5 text-[0.6rem] font-semibold">
            {pkg.priceAlt}
          </p>
        )}
      </div>

      <PlanCta
        plan={pkg}
        c={c}
        label={c.viralPage.cta}
        onOpenChange={onOpenChange}
        className="mt-3 w-full px-2 text-[0.66rem] sm:text-[0.76rem]"
      />

      <p className="mt-2 text-center text-[0.56rem] leading-snug text-pretty text-paper-faint">
        {c.viralPage.pinnedNote}
      </p>
    </div>
  );
}

/**
 * Painel de uma faixa de metas de Crescimento Viral.
 *
 * O painel abre na meta mais completa da faixa e as outras entram de lado,
 * uma por vez, até a menor, voltando para a primeira depois da última. A
 * faixa de entrada tem uma meta só, e nela some tudo que serve para folhear,
 * porque não há para onde ir.
 *
 * Cada faixa tem o seu metal, e é só isso que muda entre os três painéis: o
 * desenho é o mesmo da arte, e todas as peças puxam `--metal`.
 */
export function ViralBand({ band, c }: { band: ViralBandCard; c: Content }) {
  const [page, setPage] = useState(0);
  const [paying, setPaying] = useState(false);
  const [height, setHeight] = useState<number | undefined>(undefined);
  const pages = useRef<(HTMLDivElement | null)[]>([]);
  const touchX = useRef<number | null>(null);

  const total = band.packages.length;
  const single = total === 1;

  // A altura acompanha a meta aberta, para o painel não ficar sempre do
  // tamanho da oferta mais alta.
  useLayoutEffect(() => {
    const measure = () => {
      const current = pages.current[page];
      if (current) setHeight(current.offsetHeight);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [page]);

  const go = (step: number) => {
    setPaying(false);
    setPage((current) => (current + step + total) % total);
  };

  // No celular a pessoa arrasta o painel com o dedo, como num carrossel.
  const onTouchStart = (event: TouchEvent) => {
    if (single) return;
    touchX.current = event.touches[0].clientX;
  };

  const onTouchEnd = (event: TouchEvent) => {
    if (touchX.current === null) return;
    const delta = event.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(delta) > 40) go(delta < 0 ? 1 : -1);
  };

  const counter = c.viralPage.counter
    .replace("{n}", String(page + 1))
    .replace("{total}", String(total));

  return (
    <div className={`relative metal-${band.metal}`}>
      {band.recommended && (
        <span className="badge-ruby absolute -top-3 right-5 z-10">
          {c.viralPage.bandRecommended}
        </span>
      )}

      <div className="art-field px-3 pt-4 pb-5 sm:px-5 sm:pt-5 sm:pb-6">
        <div
          className="overflow-hidden transition-[height] duration-300 ease-out"
          style={height ? { height } : undefined}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div
            className="flex transition-transform duration-300 ease-out"
            style={{ transform: `translateX(-${page * 100}%)` }}
          >
            {band.packages.map((pkg, index) => (
              <div
                key={pkg.id}
                ref={(el) => {
                  pages.current[index] = el;
                }}
                className="w-full shrink-0 self-start px-px"
                aria-hidden={page !== index}
              >
                <OfferFace
                  pkg={pkg}
                  band={band}
                  c={c}
                  onOpenChange={setPaying}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Folhear a faixa. Some quando a faixa tem uma meta só. */}
        {!single && !paying && (
          <div className="mt-3 flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label={c.viralPage.prevLabel}
              className="btn btn-key btn-arrow min-h-9 w-9 shrink-0"
            >
              <ChevronIcon className="rotate-90" />
            </button>

            {band.packages.map((pkg, index) => (
              <button
                key={pkg.id}
                type="button"
                onClick={() => setPage(index)}
                aria-label={`${pkg.followers} ${pkg.followersUnit}`}
                aria-current={page === index}
                className={`h-1.5 rounded-full transition-all ${
                  page === index ? "w-6 bg-gold-label" : "w-1.5 bg-white/25"
                }`}
              />
            ))}

            <button
              type="button"
              onClick={() => go(1)}
              aria-label={c.viralPage.nextLabel}
              className="btn btn-key btn-arrow min-h-9 w-9 shrink-0"
            >
              <ChevronIcon className="-rotate-90" />
            </button>

            <span className="ml-1 text-[0.58rem] font-bold tracking-[0.14em] text-paper-faint uppercase">
              {counter}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Lista de comparação, fechada por padrão: as nove metas numa tela só, para
 * quem quer comparar preço sem folhear. São blocos e não tabela, porque no
 * celular uma tabela de nove colunas exigiria rolagem lateral.
 */
export function ViralComparison({
  bands,
  c,
}: {
  bands: ViralBandCard[];
  c: Content;
}) {
  return (
    <details className="surface group mt-10 px-4 py-1 sm:px-6">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 py-4 text-left marker:content-none sm:py-5">
        <span>
          <span className="display-caps block text-sm text-gold-bright sm:text-base">
            {c.viralPage.compareLabel}
          </span>
          <span className="mt-1 block text-xs text-paper-faint">
            {c.viralPage.compareNote}
          </span>
        </span>
        <ChevronIcon className="text-gold-bright transition-transform duration-200 group-open:rotate-180" />
      </summary>

      <div className="border-t border-white/12 py-5">
        {bands.map((band) => (
          <div key={band.id} className="mb-8 last:mb-0">
            <p className="eyebrow">{band.name}</p>

            <div className="mt-3 grid grid-cols-[minmax(0,1fr)] gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {band.packages.map((pkg) => (
                <div
                  key={pkg.id}
                  className={`combo metal metal-${band.metal} combo-${Math.min(pkg.tier, 3)} flex flex-col`}
                >
                  <p className="display display-3d text-2xl leading-none">
                    {pkg.followers}
                  </p>
                  <p className="mt-1 text-[0.58rem] font-bold tracking-[0.18em] text-onmetal-soft uppercase">
                    {pkg.followersUnit}
                  </p>

                  <p className="display display-3d mt-3 text-2xl">
                    {pkg.price}
                  </p>
                  {pkg.priceAlt && (
                    <p className="display-3d-sm text-[0.66rem] font-semibold">
                      {pkg.priceAlt}
                    </p>
                  )}

                  {/* Na comparação entra só o resumo: o vídeo mais forte e a
                      régua dos vídeos já publicados. Em duas colunas, porque
                      numa linha só "Compartilhamentos" mais "300 a 500" não
                      cabe na largura de um terço da tela. */}
                  <ul className="mt-3 grid flex-1 grid-cols-2 content-start gap-x-3 gap-y-2">
                    {[pkg.videos[0].stats[0], ...pkg.recent].map((stat, i) => (
                      <li
                        key={`${stat.label}-${i}`}
                        className="border-t border-black/22 pt-1.5"
                      >
                        <span className="flex items-center gap-1.5">
                          <MetricIcon
                            name={i === 0 ? "views" : recentIcons[i - 1]}
                          />
                          <span className="display num-emboss text-[0.88rem] text-onmetal">
                            {stat.value}
                          </span>
                        </span>
                        <p className="mt-0.5 text-[0.58rem] leading-tight font-bold text-onmetal uppercase">
                          {i === 0 ? pkg.videos[0].title : stat.label}
                        </p>
                      </li>
                    ))}
                  </ul>

                  <p className="mt-2 text-[0.62rem] leading-tight text-onmetal-soft/85">
                    {pkg.recentTitle}
                  </p>

                  <PlanCta
                    plan={pkg}
                    c={c}
                    label={c.viralPage.cta}
                    className="mt-4 w-full px-2 text-[0.6rem]"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </details>
  );
}
