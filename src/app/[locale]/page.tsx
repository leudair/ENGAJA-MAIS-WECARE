import { notFound } from "next/navigation";
import { Logo } from "@/components/Logo";
import {
  ArrowIcon,
  CheckIcon,
  Diamond,
  Eyebrow,
  GhostButton,
  GoldButton,
  GoldFrame,
  Lead,
  OrnateCard,
  SectionTitle,
} from "@/components/ui";
import { contactHref, getContent, siteConfig, type Locale } from "@/content";
import { isLocale, viralGrowthPath } from "@/lib/routes";

export default async function EngagementPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const c = getContent(locale);
  const viralHref = viralGrowthPath(locale);

  return (
    <>
      {/* ---------------------------------------------------------------- */}
      {/* Abertura: moldura da metodologia                                  */}
      {/* ---------------------------------------------------------------- */}
      <section className="px-4 pt-10 pb-4 sm:px-6 sm:pt-16">
        <div className="mx-auto max-w-5xl">
          <GoldFrame label={c.hero.method}>
            <h1 className="display brushed-text text-center text-[1.6rem] leading-[1.15] text-balance sm:text-4xl lg:text-[3.2rem]">
              {c.hero.frameTitle}
            </h1>
          </GoldFrame>

          <p className="mx-auto mt-10 max-w-3xl text-center text-xl leading-snug font-medium text-balance text-white/90 sm:text-2xl lg:text-[1.75rem]">
            <span className="block">{c.hero.title}</span>
            <span className="brushed-text mt-1 block">{c.hero.highlight}</span>
          </p>

          <p className="mx-auto mt-5 max-w-2xl text-center text-sm leading-relaxed text-pretty text-white/55 sm:text-base">
            {c.hero.subtitle}
          </p>

          {/* Faixa de selos: só fatos já definidos, separados por fio de ouro. */}
          <ul className="mt-12 grid grid-cols-2 gap-px bg-gold-700/40 lg:grid-cols-4">
            {c.hero.proofs.map((proof) => (
              <li key={proof.title} className="bg-black px-5 py-6 text-center">
                {/* Cor cheia, não gradiente: em texto curto o ouro escovado
                    deixa metade da palavra escura. */}
                <p className="display flex min-h-[2.6rem] items-center justify-center text-sm text-balance text-gold-200 sm:text-base">
                  {proof.title}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-pretty text-white/45">
                  {proof.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Card da Estratégia Viral                                          */}
      {/* ---------------------------------------------------------------- */}
      <section className="px-4 py-8 sm:px-6 sm:py-10">
        <div className="panel gold-tips mx-auto max-w-5xl px-6 py-10 text-center sm:px-12 sm:py-12">
          <h2 className="display brushed-text text-[1.6rem] text-balance sm:text-4xl">
            {c.viral.title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-pretty text-white/55 sm:text-base">
            {c.viral.lead}
          </p>
          <div className="mt-8 flex justify-center">
            <GoldButton href={viralHref}>{c.viral.cta}</GoldButton>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Planos                                                            */}
      {/* ---------------------------------------------------------------- */}
      <section id="planos" className="px-4 py-10 sm:px-6 sm:py-14">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-5 lg:grid-cols-3">
            {c.plans.items.map((plan) => (
              <OrnateCard key={plan.id} highlighted={plan.highlighted}>
                <div className="flex h-full flex-col px-6 py-9 text-center sm:px-7 sm:py-10">
                  {/* A linha do selo existe nos três cards, mesmo vazia, para
                      nome, resumo e preço ficarem na mesma altura. */}
                  <span className="eyebrow-caps mb-4 block h-4 text-gold-300">
                    {plan.badge ?? "\u00A0"}
                  </span>

                  <h3 className="eyebrow-caps text-white/70">{plan.name}</h3>

                  <p className="mx-auto mt-3 flex min-h-[4.5rem] max-w-[24ch] items-start justify-center text-xs leading-relaxed text-pretty text-white/45 sm:text-sm">
                    {plan.summary}
                  </p>

                  <div className="flex min-h-[6rem] flex-col justify-center">
                    {plan.price ? (
                      <>
                        <p className="display brushed-text text-4xl sm:text-[2.75rem]">
                          {plan.price}
                        </p>
                        <p className="mt-2 text-[0.7rem] tracking-wide text-white/40">
                          {plan.priceNote}
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="display text-2xl text-white/75 sm:text-[1.75rem]">
                          {c.plans.priceUndefined}
                        </p>
                        <p className="mt-2 text-[0.7rem] tracking-wide text-white/40">
                          {c.plans.priceUndefinedNote}
                        </p>
                      </>
                    )}
                  </div>

                  {/* Expansor: mantém o card curto e abre o que inclui. */}
                  <details className="group mt-7 text-left">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-3 border border-gold-700/35 bg-white/[0.02] px-4 py-3 text-[0.68rem] font-semibold tracking-[0.18em] text-gold-100/80 uppercase marker:content-none">
                      {c.plans.detailsLabel}
                      <svg
                        viewBox="0 0 16 16"
                        fill="none"
                        aria-hidden
                        className="size-3.5 shrink-0 transition-transform duration-200 group-open:rotate-180"
                      >
                        <path
                          d="m3 6 5 5 5-5"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </summary>
                    <ul className="space-y-3 border-x border-b border-gold-700/25 px-4 py-4">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex gap-2.5">
                          <CheckIcon className="mt-0.5 text-gold-400" />
                          <span className="text-sm leading-relaxed text-white/60">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </details>

                  <div className="mt-7 flex flex-1 items-end justify-center">
                    {plan.highlighted ? (
                      <GoldButton href={contactHref} className="w-full">
                        {plan.cta}
                      </GoldButton>
                    ) : (
                      <GhostButton href={contactHref} className="w-full">
                        {plan.cta}
                      </GhostButton>
                    )}
                  </div>
                </div>
              </OrnateCard>
            ))}
          </div>

          <p className="mt-8 text-center text-xs text-white/35">
            {c.plans.disclaimer}
          </p>
        </div>
      </section>

      <Diamond className="my-6" />

      {/* ---------------------------------------------------------------- */}
      {/* Como funciona                                                     */}
      {/* ---------------------------------------------------------------- */}
      <section id="como-funciona" className="px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <Eyebrow center>{c.howItWorks.eyebrow}</Eyebrow>
          <SectionTitle center>{c.howItWorks.title}</SectionTitle>
          <Lead center>{c.howItWorks.subtitle}</Lead>

          <ol className="mt-10 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-4 lg:grid-cols-4">
            {c.howItWorks.steps.map((step, index) => (
              <li
                key={step.title}
                className="panel-plain gold-tips px-4 py-6 text-center sm:px-6 sm:py-7"
              >
                <span
                  className="display brushed-text block text-xl sm:text-2xl"
                  aria-hidden
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span
                  className="brushed-rule-soft mx-auto mt-3 mb-4 block h-px w-8 opacity-70 sm:mt-4 sm:mb-5 sm:w-10"
                  aria-hidden
                />
                <h3 className="text-[0.62rem] font-semibold tracking-[0.2em] text-white/80 uppercase sm:text-[0.68rem] sm:tracking-[0.34em]">
                  {step.title}
                </h3>
                <p className="mt-2.5 text-xs leading-relaxed text-pretty text-white/50 sm:mt-3 sm:text-sm">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Diamond className="my-2" />

      {/* ---------------------------------------------------------------- */}
      {/* O que está incluso                                                */}
      {/* ---------------------------------------------------------------- */}
      <section className="px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <Eyebrow center>{c.included.eyebrow}</Eyebrow>
          <SectionTitle center>{c.included.title}</SectionTitle>
          <Lead center>{c.included.subtitle}</Lead>

          <ul className="mt-10 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-4 lg:grid-cols-3">
            {c.included.items.map((item) => (
              <li
                key={item.title}
                className="panel-plain gold-tips px-4 py-6 sm:px-6 sm:py-7"
              >
                <span className="gold-seal mb-4 size-8 sm:mb-5 sm:size-9">
                  <span>
                    <CheckIcon />
                  </span>
                </span>
                <h3 className="text-[0.62rem] font-semibold tracking-[0.2em] text-white/80 uppercase sm:text-[0.68rem] sm:tracking-[0.34em]">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-xs leading-relaxed text-white/50 sm:mt-3 sm:text-sm">
                  {item.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Limite de 30 publicações                                          */}
      {/* ---------------------------------------------------------------- */}
      <section id="limite" className="px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <GoldFrame label={c.limit.eyebrow}>
            <div className="grid gap-8 lg:grid-cols-[auto_1fr] lg:gap-14">
              <div className="text-center lg:pt-1 lg:text-left">
                <span
                  className="display brushed-text block text-[5.5rem] leading-[0.85] sm:text-8xl"
                  aria-hidden
                >
                  30
                </span>
                <span className="eyebrow-caps mt-3 block text-gold-300/70 lg:mt-4">
                  {c.limit.eyebrow}
                </span>
              </div>

              <div>
                <h2 className="display brushed-text text-2xl text-balance sm:text-3xl">
                  {c.limit.title}
                </h2>
                <p className="mt-5 text-base leading-relaxed text-white/70">
                  {c.limit.lead}
                </p>

                <ul className="mt-7 space-y-3.5">
                  {c.limit.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3">
                      <CheckIcon className="mt-1 text-gold-400" />
                      <span className="text-sm leading-relaxed text-white/60 sm:text-base">
                        {bullet}
                      </span>
                    </li>
                  ))}
                </ul>

                <p className="mt-7 border-t border-gold-700/35 pt-5 text-sm text-white/40">
                  {c.limit.footnote}
                </p>
              </div>
            </div>
          </GoldFrame>
        </div>
      </section>

      <Diamond className="my-2" />

      {/* ---------------------------------------------------------------- */}
      {/* Demonstração: perfil da WeCare                                    */}
      {/* ---------------------------------------------------------------- */}
      <section className="px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <Eyebrow>{c.demo.eyebrow}</Eyebrow>
            <SectionTitle>{c.demo.title}</SectionTitle>
            <Lead>{c.demo.lead}</Lead>
            {c.demo.paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="mt-4 max-w-2xl text-sm leading-relaxed text-white/45 sm:text-base"
              >
                {paragraph}
              </p>
            ))}

            {siteConfig.wecareProfileUrl && (
              <div className="mt-8">
                <GhostButton href={siteConfig.wecareProfileUrl}>
                  {c.demo.cta}
                  <ArrowIcon />
                </GhostButton>
              </div>
            )}
          </div>

          {/* Vitrine do perfil da própria WeCare, sem dado de cliente. */}
          <OrnateCard highlighted className="mx-auto w-full max-w-sm">
            <div className="px-7 py-9">
              <div className="flex flex-col items-center text-center">
                <span className="eyebrow-caps mb-5 text-gold-300/80">
                  {c.demo.eyebrow}
                </span>
                <Logo alt={c.hero.logoAlt} className="max-w-[12rem]" />
                <span
                  className="brushed-rule mt-6 h-px w-full opacity-70"
                  aria-hidden
                />
              </div>

              {/* Mosaico do perfil: um losango de ouro no centro e brilho
                  decrescente nas bordas, sem nenhuma imagem de cliente. */}
              <div className="mt-6 grid grid-cols-3 gap-1.5" aria-hidden>
                {Array.from({ length: 9 }).map((_, index) => {
                  const center = index === 4;
                  return (
                    <div
                      key={index}
                      className={`flex aspect-square items-center justify-center border ${
                        center
                          ? "border-gold-400/60 bg-linear-to-br from-gold-500/25 to-transparent"
                          : "border-gold-700/30 bg-linear-to-br from-white/[0.06] to-transparent"
                      }`}
                    >
                      {center && (
                        <svg
                          viewBox="0 0 12 12"
                          className="size-3 text-gold-300"
                          fill="none"
                        >
                          <path d="m6 0 6 6-6 6-6-6z" fill="currentColor" />
                        </svg>
                      )}
                    </div>
                  );
                })}
              </div>

              <span
                className="brushed-rule-soft mt-6 block h-px w-full opacity-40"
                aria-hidden
              />
              <p className="mt-4 text-center text-xs leading-relaxed text-white/45">
                {c.privacy.bullets[2]}
              </p>
            </div>
          </OrnateCard>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Discrição                                                         */}
      {/* ---------------------------------------------------------------- */}
      <section className="px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <Eyebrow center>{c.privacy.eyebrow}</Eyebrow>
          <SectionTitle center>{c.privacy.title}</SectionTitle>
          <Lead center>{c.privacy.lead}</Lead>

          <ul className="mt-10 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-4 md:grid-cols-3">
            {c.privacy.bullets.map((bullet, index) => (
              <li
                key={bullet}
                className={`panel-plain gold-tips px-4 py-6 text-center sm:px-6 sm:py-7 ${
                  index === c.privacy.bullets.length - 1 && index % 2 === 0
                    ? "col-span-2 md:col-span-1"
                    : ""
                }`}
              >
                <span className="gold-seal mx-auto mb-4 size-8 sm:size-9">
                  <span>
                    <CheckIcon />
                  </span>
                </span>
                <p className="text-xs leading-relaxed text-white/60 sm:text-sm">
                  {bullet}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Diamond className="my-2" />

      {/* ---------------------------------------------------------------- */}
      {/* FAQ                                                               */}
      {/* ---------------------------------------------------------------- */}
      <section id="faq" className="px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <Eyebrow center>{c.faq.eyebrow}</Eyebrow>
          <SectionTitle center>{c.faq.title}</SectionTitle>

          <div className="mt-10 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-4">
            {c.faq.items.map((item, index) => (
              <details
                key={item.question}
                className={`panel-plain group px-4 py-1 sm:px-5 ${
                  index === c.faq.items.length - 1 && index % 2 === 0
                    ? "col-span-2"
                    : ""
                }`}
              >
                <summary className="flex cursor-pointer list-none items-start justify-between gap-3 py-4 text-left text-xs leading-snug font-medium text-white/80 marker:content-none sm:py-5 sm:text-sm">
                  {item.question}
                  <span
                    className="mt-0.5 flex size-6 shrink-0 items-center justify-center border border-gold-600/40 text-gold-200 transition-transform duration-200 group-open:rotate-45 sm:size-7"
                    aria-hidden
                  >
                    <svg viewBox="0 0 16 16" fill="none" className="size-3">
                      <path
                        d="M8 3v10M3 8h10"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </summary>
                <p className="border-t border-gold-700/25 py-4 text-xs leading-relaxed text-white/50 sm:text-sm">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <Diamond className="my-2" />

      {/* ---------------------------------------------------------------- */}
      {/* CTA final                                                         */}
      {/* ---------------------------------------------------------------- */}
      <section id="contato" className="px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-4xl">
          <GoldFrame label={c.plans.eyebrow}>
            <div className="text-center">
              <h2 className="display brushed-text text-2xl text-balance sm:text-4xl">
                {c.finalCta.title}
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-pretty text-white/55 sm:text-base">
                {c.finalCta.subtitle}
              </p>
              <div className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:justify-center">
                {siteConfig.contactUrl ? (
                  <GoldButton href={siteConfig.contactUrl}>
                    {c.finalCta.primaryCta}
                  </GoldButton>
                ) : (
                  <GoldButton href="#planos">{c.hero.primaryCta}</GoldButton>
                )}
                <GhostButton href={viralHref}>
                  {c.finalCta.secondaryCta}
                </GhostButton>
              </div>
            </div>
          </GoldFrame>
        </div>
      </section>
    </>
  );
}
