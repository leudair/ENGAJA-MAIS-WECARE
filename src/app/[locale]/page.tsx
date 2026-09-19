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
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Card da Estratégia Viral                                          */}
      {/* ---------------------------------------------------------------- */}
      <section className="px-4 py-8 sm:px-6 sm:py-10">
        <div className="panel mx-auto max-w-5xl px-6 py-10 text-center sm:px-12 sm:py-12">
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

          <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {c.howItWorks.steps.map((step, index) => (
              <li key={step.title} className="panel-plain px-6 py-7 text-center">
                <span
                  className="display brushed-text block text-2xl"
                  aria-hidden
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span
                  className="brushed-rule-soft mx-auto mt-4 mb-5 block h-px w-10 opacity-70"
                  aria-hidden
                />
                <h3 className="eyebrow-caps text-white/80">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-pretty text-white/50">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* O que está incluso                                                */}
      {/* ---------------------------------------------------------------- */}
      <section className="px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <Eyebrow center>{c.included.eyebrow}</Eyebrow>
          <SectionTitle center>{c.included.title}</SectionTitle>
          <Lead center>{c.included.subtitle}</Lead>

          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {c.included.items.map((item) => (
              <li key={item.title} className="panel-plain px-6 py-7">
                <span className="gold-edge mb-5 inline-flex size-9 items-center justify-center text-gold-200">
                  <CheckIcon />
                </span>
                <h3 className="eyebrow-caps text-white/80">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/50">
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
            <div className="grid gap-10 lg:grid-cols-[auto_1fr] lg:gap-14">
              <div className="text-center lg:pt-1 lg:text-left">
                <span
                  className="display brushed-text block text-7xl leading-none sm:text-8xl"
                  aria-hidden
                >
                  30
                </span>
              </div>

              <div>
                <h2 className="display brushed-text text-xl text-balance sm:text-3xl">
                  {c.limit.title}
                </h2>
                <p className="mt-5 text-base leading-relaxed text-white/60">
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
          <OrnateCard className="mx-auto w-full max-w-sm">
            <div className="px-7 py-9">
              <div className="flex flex-col items-center text-center">
                <Logo alt={c.hero.logoAlt} className="max-w-[12rem]" />
                <span
                  className="brushed-rule-soft mt-6 h-px w-full opacity-50"
                  aria-hidden
                />
              </div>

              <div className="mt-6 grid grid-cols-3 gap-2" aria-hidden>
                {Array.from({ length: 9 }).map((_, index) => (
                  <div
                    key={index}
                    className="aspect-square border border-gold-700/25 bg-linear-to-br from-white/[0.05] to-transparent"
                  />
                ))}
              </div>

              <p className="mt-6 text-center text-xs leading-relaxed text-white/40">
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

          <ul className="mt-12 grid gap-4 md:grid-cols-3">
            {c.privacy.bullets.map((bullet) => (
              <li key={bullet} className="panel-plain px-6 py-7 text-center">
                <CheckIcon className="mx-auto mb-4 text-gold-400" />
                <p className="text-sm leading-relaxed text-white/60">
                  {bullet}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* FAQ                                                               */}
      {/* ---------------------------------------------------------------- */}
      <section id="faq" className="px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <Eyebrow center>{c.faq.eyebrow}</Eyebrow>
          <SectionTitle center>{c.faq.title}</SectionTitle>

          <div className="panel-plain mt-12 divide-y divide-gold-700/25">
            {c.faq.items.map((item) => (
              <details key={item.question} className="group px-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left text-base font-medium text-white/80 marker:content-none">
                  {item.question}
                  <span
                    className="flex size-7 shrink-0 items-center justify-center border border-gold-600/40 text-gold-200 transition-transform duration-200 group-open:rotate-45"
                    aria-hidden
                  >
                    <svg viewBox="0 0 16 16" fill="none" className="size-3.5">
                      <path
                        d="M8 3v10M3 8h10"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </summary>
                <p className="pb-5 text-sm leading-relaxed text-white/50">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

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
