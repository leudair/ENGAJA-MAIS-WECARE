"use client";

import { useLayoutEffect, useRef, useState, type TouchEvent } from "react";
import type { Content } from "@/content";
import type { ViralBandId } from "@/content/viral-data";
import type { ViralBandCard, ViralPackageCard, ViralStat } from "@/lib/viral";
import { MetricIcon, metricIconOrder, type MetricIconName } from "./MetricIcon";
import { PlanCta } from "./PlanCta";
import { ChevronIcon, MetalPlate, SparkIcon } from "./ui";

/**
 * Ícones das quatro entregas de um vídeo, na ordem de `viralPage.videoLabels`:
 * curtidas, comentários, repostagens e compartilhamentos.
 */
const videoIcons = ["likes", "comments", "reposts", "shares"] as const;

/** Ícones da faixa dos vídeos já publicados, na ordem de `recentLabels`. */
const recentIcons = ["views", "likes", "reposts", "shares"] as const;

/**
 * O acabamento de cada faixa de metas, decidido pelo Leudair em 24/09/2026:
 * ele quis que as três se distinguissem de longe, e não só pelo metal da
 * chapa. O que muda é a caixa de cada vídeo e a cor do que vai dentro dela.
 *
 * - Faixa de cima: miolo de obsidiana com moldura de ouro escovado, números
 *   em ouro claro. É a mais trabalhada das três.
 * - Faixa do meio: o rebaixo de metal escovado, com os números gravados na
 *   chapa. É o acabamento que a página já tinha.
 * - Faixa de entrada: sem caixa, só um fio gravado em cima de cada bloco.
 */
type Finish = {
  box: string;
  /** Espaçamento interno da caixa, que some quando não há caixa. */
  pad: string;
  eyebrow: string;
  big: string;
  value: string;
  label: string;
  soft: string;
  rule: string;
};

const finishes: Record<ViralBandId, Finish> = {
  premium: {
    box: "viral-box-gold",
    pad: "px-3.5 py-3",
    eyebrow: "text-gold-label",
    big: "display text-gold-bright",
    value: "display text-gold-bright",
    label: "text-gold-label",
    soft: "text-paper-dim",
    rule: "border-white/14",
  },
  intermediate: {
    box: "viral-box",
    pad: "px-3.5 py-3",
    eyebrow: "text-onmetal-soft",
    big: "display display-3d",
    value: "display num-emboss text-onmetal",
    label: "text-onmetal",
    soft: "text-onmetal-soft",
    rule: "border-black/22",
  },
  entry: {
    box: "viral-box-plain",
    pad: "px-1 pt-3 pb-1",
    eyebrow: "text-onmetal-soft",
    big: "display display-3d",
    value: "display num-emboss text-onmetal",
    label: "text-onmetal",
    soft: "text-onmetal-soft",
    rule: "border-black/22",
  },
};

/**
 * Uma entrega do vídeo: o número em cima e o nome do serviço embaixo.
 *
 * Fica assim, e não em linha com o nome de um lado e o número do outro, para
 * caber em duas colunas. Uma entrega por linha deixava cada vídeo com quase
 * 350px de altura, e a chapa inteira passava de 1.300px no celular, que é
 * onde o Leudair olha a página.
 */
function StatCell({
  stat,
  icon,
  f,
}: {
  stat: ViralStat;
  icon: MetricIconName;
  f: Finish;
}) {
  return (
    <li className={`border-t pt-1.5 ${f.rule}`}>
      <span className="flex items-center gap-1.5">
        <MetricIcon name={icon} />
        <span className={`text-[0.88rem] ${f.value}`}>{stat.value}</span>
      </span>
      <p
        className={`mt-0.5 text-[0.58rem] leading-tight font-bold uppercase ${f.label}`}
      >
        {stat.label}
      </p>
    </li>
  );
}

/** Um dos três vídeos virais: o número grande em cima, as entregas embaixo. */
function VideoBox({
  video,
  f,
}: {
  video: ViralPackageCard["videos"][number];
  f: Finish;
}) {
  return (
    <div className={`${f.box} ${f.pad}`}>
      <p
        className={`text-[0.56rem] font-bold tracking-[0.2em] uppercase ${f.eyebrow}`}
      >
        {video.title}
      </p>
      <p className={`mt-1.5 text-[1.7rem] leading-none ${f.big}`}>
        {video.views}
      </p>
      <p className={`text-[0.68rem] font-semibold ${f.soft}`}>
        {video.viewsLabel}
      </p>
      <ul className="mt-2.5 grid grid-cols-2 gap-x-3 gap-y-2">
        {video.stats.map((stat, i) => (
          <StatCell key={stat.label} stat={stat} icon={videoIcons[i]} f={f} />
        ))}
      </ul>
    </div>
  );
}

/**
 * A faixa dos vídeos que a pessoa já publicou. São faixas por vídeo, não um
 * total, e é isso que o rótulo de baixo diz em cada coluna.
 */
function RecentBand({
  pkg,
  c,
  f,
}: {
  pkg: ViralPackageCard;
  c: Content;
  f: Finish;
}) {
  return (
    <div className={`mt-4 ${f.box} ${f.pad}`}>
      <p
        className={`text-[0.6rem] leading-snug font-bold tracking-[0.14em] uppercase ${f.label}`}
      >
        {pkg.recentTitle}
      </p>
      <p className={`mt-0.5 text-[0.62rem] ${f.soft}`}>
        {c.viralPage.recentNote}
      </p>
      <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-4">
        {pkg.recent.map((stat, i) => (
          <StatCell key={stat.label} stat={stat} icon={recentIcons[i]} f={f} />
        ))}
      </ul>
    </div>
  );
}

/** A meta, o preço e tudo que a oferta entrega. */
function PackageFace({
  pkg,
  c,
  f,
}: {
  pkg: ViralPackageCard;
  c: Content;
  f: Finish;
}) {
  return (
    <div>
      {/* A meta mais completa da faixa é a que abre a chapa, e é a única que
          vem em corpo maior. As outras descem de tamanho junto com o preço,
          que é a mesma hierarquia dos planos mensais. */}
      <p
        className={`display display-3d leading-none ${
          pkg.tier === 1
            ? "text-[2.6rem] sm:text-[3.4rem]"
            : "text-[2.2rem] sm:text-[2.9rem]"
        }`}
      >
        {pkg.followers}
      </p>
      <p className="mt-1 text-[0.68rem] font-bold tracking-[0.2em] text-onmetal-soft uppercase sm:text-[0.78rem]">
        {pkg.followersUnit}
      </p>

      <span className="mt-4 block h-px bg-black/32" />

      <p className="price-was mt-4 text-[0.78rem] font-semibold text-onmetal-soft">
        {pkg.from}
      </p>
      <p className="text-[0.6rem] font-bold tracking-[0.22em] text-onmetal-soft uppercase">
        {c.viralPage.priceNote}
      </p>
      <p className="display display-3d mt-0.5 text-[2.5rem] leading-none">
        {pkg.price}
      </p>
      {/* A mesma quantia em dólar, para o brasileiro que mora fora. Só
          aparece em português, onde o preço principal é em real. */}
      {pkg.priceAlt && (
        <p className="display-3d-sm mt-1.5 text-[0.72rem] font-semibold">
          {pkg.priceAlt}
        </p>
      )}

      {/* Os três vídeos virais. No celular vão um embaixo do outro: em três
          colunas de 100px os números do vídeo quebram no meio. */}
      <div className="mt-5 grid grid-cols-[minmax(0,1fr)] gap-3 sm:grid-cols-3">
        {pkg.videos.map((video) => (
          <VideoBox key={video.title} video={video} f={f} />
        ))}
      </div>

      <RecentBand pkg={pkg} c={c} f={f} />

      <p className="mt-3 text-[0.72rem] leading-snug text-pretty text-onmetal-soft/85">
        {c.viralPage.pinnedNote}
      </p>
    </div>
  );
}

/**
 * Chapa de uma faixa de metas de Crescimento Viral.
 *
 * A chapa abre na meta mais completa da faixa e as outras entram de lado,
 * uma por vez, até a menor, voltando para a primeira depois da última. É o
 * mesmo comportamento dos planos mensais, e pelo mesmo motivo: nove metas
 * empilhadas fariam a pessoa rolar meia página antes de ver a segunda.
 *
 * A faixa de entrada tem uma meta só. Nela some tudo que serve para folhear,
 * porque não há para onde ir: ficam a oferta e o botão.
 */
export function ViralBand({ band, c }: { band: ViralBandCard; c: Content }) {
  const [page, setPage] = useState(0);
  const [paying, setPaying] = useState(false);
  const [height, setHeight] = useState<number | undefined>(undefined);
  const pages = useRef<(HTMLDivElement | null)[]>([]);
  const touchX = useRef<number | null>(null);

  const total = band.packages.length;
  const single = total === 1;
  const offer = band.packages[page];
  const f = finishes[band.id];

  // A altura acompanha a meta aberta: as metas têm alturas diferentes, e sem
  // isso a chapa ficaria sempre do tamanho da mais alta.
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

  // No celular a pessoa arrasta a chapa com o dedo, como num carrossel.
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
    <div className="relative">
      {band.recommended && (
        <span className="badge-ruby absolute -top-3 right-5 z-10">
          {c.viralPage.bandRecommended}
        </span>
      )}

      <MetalPlate kind={band.metal} className="h-full">
        <div className="flex h-full flex-col px-5 pt-7 pb-9 sm:px-7 sm:pt-9 sm:pb-11">
          {/* Cabeçalho fixo: a faixa não muda quando a pessoa folheia. */}
          <h3 className="display-caps text-xl text-onmetal sm:text-2xl">
            {band.name}
          </h3>
          <p className="mt-2 text-[0.82rem] leading-snug text-pretty text-onmetal-soft/80">
            {band.tagline}
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
              {band.packages.map((pkg, index) => (
                <div
                  key={pkg.id}
                  ref={(el) => {
                    pages.current[index] = el;
                  }}
                  className="w-full shrink-0 self-start"
                  aria-hidden={page !== index}
                >
                  <PackageFace pkg={pkg} c={c} f={f} />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-7 flex-1">
            <div className="flex items-center gap-2">
              {!single && !paying && (
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label={c.viralPage.prevLabel}
                  className="btn btn-key btn-arrow min-h-12 w-12 shrink-0"
                >
                  <ChevronIcon className="rotate-90" />
                </button>
              )}

              {/* A chave é o id da meta: ao folhear, a escolha de pagamento
                  fecha sozinha em vez de seguir aberta na meta seguinte. */}
              <PlanCta
                key={offer.id}
                plan={offer}
                c={c}
                label={c.viralPage.cta}
                onOpenChange={setPaying}
                className="flex-1 px-2 text-[0.62rem] sm:text-[0.7rem]"
              />

              {!single && !paying && (
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label={c.viralPage.nextLabel}
                  className="btn btn-key btn-arrow min-h-12 w-12 shrink-0"
                >
                  <ChevronIcon className="-rotate-90" />
                </button>
              )}
            </div>

            {/* Onde a pessoa está no folheio. */}
            {!single && (
              <div className="mt-4 flex items-center justify-center gap-2">
                {band.packages.map((pkg, index) => (
                  <button
                    key={pkg.id}
                    type="button"
                    onClick={() => setPage(index)}
                    aria-label={`${pkg.followers} ${pkg.followersUnit}`}
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
            )}

            <div className="mt-5 flex items-end justify-between gap-3">
              <p className="text-[0.82rem] leading-snug text-pretty text-onmetal-soft/85">
                {band.pitch}
              </p>
              <SparkIcon className="display-3d shrink-0 translate-y-[-2px]" />
            </div>
          </div>
        </div>
      </MetalPlate>
    </div>
  );
}

/**
 * Lista de comparação, fechada por padrão: as nove metas numa tela só, para
 * quem quer comparar preço sem folhear. São blocos e não tabela, porque no
 * celular uma tabela de nove colunas exigiria rolagem lateral.
 *
 * Aqui cada bloco leva o metal da sua faixa, e não o da sua posição: a lista
 * existe para comparar, e três metais dentro da mesma faixa dariam a
 * entender uma hierarquia que não é a da página.
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

                  {/* Na comparação entra só o resumo: a soma das visualizações
                      dos três vídeos virais não diz nada, então o que aparece
                      é o vídeo mais forte e a faixa dos vídeos já publicados.
                      Em duas colunas, como no card: numa linha só,
                      "Compartilhamentos" mais "300 a 500" não cabe na largura
                      de um terço da tela. */}
                  <ul className="mt-3 grid flex-1 grid-cols-2 content-start gap-x-3 gap-y-2">
                    <StatCell
                      stat={{
                        label: pkg.videos[0].title,
                        value: pkg.videos[0].views,
                      }}
                      icon={metricIconOrder[0]}
                      f={finishes.intermediate}
                    />
                    {pkg.recent.map((stat, i) => (
                      <StatCell
                        key={stat.label}
                        stat={stat}
                        icon={recentIcons[i]}
                        f={finishes.intermediate}
                      />
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
