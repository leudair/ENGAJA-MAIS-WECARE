import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowIcon,
  CheckIcon,
  Eyebrow,
  GhostButton,
  GoldButton,
  Lead,
  SectionTitle,
} from "@/components/ui";
import { Logo } from "@/components/Logo";
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
      {/* Hero                                                              */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative overflow-hidden px-5 pt-24 pb-0 sm:px-8 sm:pt-32">
        <div
          className="glow -top-44 left-1/2 size-[34rem] -translate-x-1/2 bg-gold-500/25"
          aria-hidden
        />
        <div
          className="glow top-52 -right-32 size-80 bg-gold-700/25 sm:size-96"
          aria-hidden
        />
        <div
          className="glow top-64 -left-32 size-72 bg-gold-800/30 sm:size-80"
          aria-hidden
        />

        <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center">
          <Logo variant="stacked" alt={c.hero.logoAlt} />

          {/* O maior texto da página: a metodologia que dá nome ao serviço. */}
          <h1 className="brushed-text mt-10 text-[2.4rem] leading-[1.05] font-semibold tracking-tight text-balance sm:text-6xl lg:text-7xl">
            {c.hero.method}
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-pretty text-white/50 sm:text-base">
            {c.hero.methodNote}
          </p>

          <span
            className="brushed-rule mt-10 h-px w-16 rounded-full opacity-70"
            aria-hidden
          />

          <p className="mt-10 max-w-3xl text-2xl leading-[1.2] font-semibold text-balance text-white sm:text-3xl lg:text-4xl">
            <span className="block">{c.hero.title}</span>
            <span className="brushed-text mt-1.5 block">{c.hero.highlight}</span>
          </p>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-pretty text-white/60 sm:text-lg">
            {c.hero.subtitle}
          </p>

          <div className="mt-9 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center sm:justify-center">
            <GoldButton href="#planos">{c.hero.primaryCta}</GoldButton>
            <GhostButton href={viralHref}>
              {c.hero.secondaryCta}
              <ArrowIcon />
            </GhostButton>
          </div>

          <p className="mt-6 text-sm text-white/40">{c.hero.note}</p>
        </div>

        {/* Faixa de provas: só fatos já definidos, nenhum número inventado. */}
        <ul className="relative z-10 mx-auto mt-16 grid max-w-6xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.06] sm:mt-20 lg:grid-cols-4">
          {c.hero.proofs.map((proof) => (
            <li
              key={proof.title}
              className="bg-ink-900/90 px-5 py-6 text-center sm:px-6 sm:py-7"
            >
              <p className="text-base font-semibold text-balance text-gold-200 sm:text-lg">
                {proof.title}
              </p>
              <p className="mt-1.5 text-xs leading-relaxed text-pretty text-white/45 sm:text-sm">
                {proof.description}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Como funciona                                                     */}
      {/* ---------------------------------------------------------------- */}
      <section
        id="como-funciona"
        className="relative px-5 py-20 sm:px-8 sm:py-28"
      >
        <div className="mx-auto max-w-6xl">
          <Eyebrow>{c.howItWorks.eyebrow}</Eyebrow>
          <SectionTitle>{c.howItWorks.title}</SectionTitle>
          <Lead>{c.howItWorks.subtitle}</Lead>

          <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {c.howItWorks.steps.map((step, index) => (
              <li
                key={step.title}
                className="surface relative rounded-2xl p-6 pt-7"
              >
                <span
                  className="brushed-text absolute top-5 right-5 text-3xl font-semibold tabular-nums opacity-40"
                  aria-hidden
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="pr-12 text-lg font-semibold text-white">
                  {step.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-white/55">
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
      <section className="relative px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <Eyebrow>{c.included.eyebrow}</Eyebrow>
          <SectionTitle>{c.included.title}</SectionTitle>
          <Lead>{c.included.subtitle}</Lead>

          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {c.included.items.map((item) => (
              <li key={item.title} className="surface rounded-2xl p-6">
                <span className="mb-4 inline-flex size-9 items-center justify-center rounded-full border border-gold-400/30 bg-gold-400/10 text-gold-200">
                  <CheckIcon />
                </span>
                <h3 className="text-base font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/55">
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
      <section
        id="limite"
        className="relative overflow-hidden px-5 py-20 sm:px-8 sm:py-28"
      >
        <div
          className="glow top-1/2 left-1/2 size-[28rem] -translate-x-1/2 -translate-y-1/2 bg-gold-600/15"
          aria-hidden
        />
        <div className="surface-gold relative z-10 mx-auto max-w-6xl overflow-hidden rounded-3xl p-7 sm:p-12">
          <div className="grid gap-10 lg:grid-cols-[auto_1fr] lg:gap-16">
            <div className="lg:pt-2">
              <span
                className="brushed-text block text-7xl leading-none font-semibold tabular-nums sm:text-8xl"
                aria-hidden
              >
                30
              </span>
              <span className="mt-2 block text-xs font-semibold tracking-[0.2em] text-gold-200/70 uppercase">
                {c.limit.eyebrow}
              </span>
            </div>

            <div>
              <h2 className="text-2xl leading-tight font-semibold text-balance text-white sm:text-3xl lg:text-4xl">
                {c.limit.title}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/65">
                {c.limit.lead}
              </p>

              <ul className="mt-7 space-y-3.5">
                {c.limit.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3">
                    <CheckIcon className="mt-1 text-gold-300" />
                    <span className="text-sm leading-relaxed text-white/65 sm:text-base">
                      {bullet}
                    </span>
                  </li>
                ))}
              </ul>

              <p className="mt-7 border-t border-gold-400/20 pt-5 text-sm text-white/45">
                {c.limit.footnote}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Planos                                                            */}
      {/* ---------------------------------------------------------------- */}
      <section id="planos" className="relative px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <Eyebrow>{c.plans.eyebrow}</Eyebrow>
          <SectionTitle>{c.plans.title}</SectionTitle>
          <Lead>{c.plans.subtitle}</Lead>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {c.plans.items.map((plan) => (
              <article
                key={plan.id}
                className={`relative flex flex-col rounded-3xl p-7 sm:p-8 ${
                  plan.highlighted
                    ? "surface-gold lg:-translate-y-3"
                    : "surface"
                }`}
              >
                {plan.badge && (
                  <span className="absolute -top-3 left-7 rounded-full bg-gold-400 px-3 py-1 text-[0.65rem] font-bold tracking-[0.14em] text-ink-950 uppercase">
                    {plan.badge}
                  </span>
                )}

                <h3 className="text-xl font-semibold text-white">{plan.name}</h3>
                <p className="mt-2 min-h-[3rem] text-sm leading-relaxed text-white/55">
                  {plan.summary}
                </p>

                <div className="mt-6 border-y border-white/10 py-5">
                  {plan.price ? (
                    <>
                      <span className="brushed-text text-4xl font-semibold tracking-tight">
                        {plan.price}
                      </span>
                      <span className="mt-1.5 block text-xs text-white/40">
                        {plan.priceNote}
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="text-2xl font-semibold text-white/80">
                        {c.plans.priceUndefined}
                      </span>
                      <span className="mt-1.5 block text-xs text-white/40">
                        {c.plans.priceUndefinedNote}
                      </span>
                    </>
                  )}
                </div>

                <ul className="mt-6 flex-1 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-2.5">
                      <CheckIcon className="mt-0.5 text-gold-300" />
                      <span className="text-sm leading-relaxed text-white/65">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
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
              </article>
            ))}
          </div>

          <p className="mt-8 text-center text-xs text-white/35">
            {c.plans.disclaimer}
          </p>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Demonstração: perfil da WeCare                                    */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <Eyebrow>{c.demo.eyebrow}</Eyebrow>
            <SectionTitle>{c.demo.title}</SectionTitle>
            <Lead>{c.demo.lead}</Lead>
            {c.demo.paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="mt-4 max-w-2xl text-sm leading-relaxed text-white/50 sm:text-base"
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

          {/* Mock do perfil: ilustração da própria WeCare, sem dados de cliente. */}
          <div className="surface relative mx-auto w-full max-w-sm overflow-hidden rounded-3xl p-6">
            <div
              className="glow -top-10 -right-10 size-48 bg-gold-500/20"
              aria-hidden
            />
            <div className="relative flex items-center gap-4">
              <div className="brushed-rule flex size-14 items-center justify-center rounded-full">
                <span className="flex size-[3.05rem] items-center justify-center rounded-full bg-ink-900 text-sm font-bold text-gold-100">
                  WC
                </span>
              </div>
              <div>
                <p className="font-semibold text-white">WeCare</p>
                <p className="text-xs text-white/40">{c.demo.eyebrow}</p>
              </div>
            </div>

            <div className="relative mt-6 grid grid-cols-3 gap-2" aria-hidden>
              {Array.from({ length: 9 }).map((_, index) => (
                <div
                  key={index}
                  className="aspect-square rounded-lg border border-white/[0.07] bg-linear-to-br from-white/[0.06] to-transparent"
                />
              ))}
            </div>

            <div
              className="brushed-rule relative mt-6 h-px w-full opacity-40"
              aria-hidden
            />
            <p className="relative mt-4 text-xs leading-relaxed text-white/40">
              {c.privacy.bullets[2]}
            </p>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Discrição                                                         */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <Eyebrow>{c.privacy.eyebrow}</Eyebrow>
          <SectionTitle>{c.privacy.title}</SectionTitle>
          <Lead>{c.privacy.lead}</Lead>

          <ul className="mt-10 grid gap-4 md:grid-cols-3">
            {c.privacy.bullets.map((bullet) => (
              <li key={bullet} className="surface rounded-2xl p-6">
                <CheckIcon className="mb-3 text-gold-300" />
                <p className="text-sm leading-relaxed text-white/65">{bullet}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Faixa de Crescimento Viral                                        */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative overflow-hidden px-5 py-14 sm:px-8 sm:py-20">
        <div className="surface-gold relative mx-auto flex max-w-6xl flex-col gap-7 overflow-hidden rounded-3xl p-7 sm:p-11 lg:flex-row lg:items-center lg:justify-between">
          <div
            className="glow -bottom-24 left-10 size-72 bg-gold-500/20"
            aria-hidden
          />
          <div className="relative max-w-xl">
            <Eyebrow>{c.viral.eyebrow}</Eyebrow>
            <h2 className="text-2xl leading-tight font-semibold text-balance text-white sm:text-3xl">
              {c.viral.title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/60 sm:text-base">
              {c.viral.lead}
            </p>
          </div>
          <div className="relative shrink-0">
            <GoldButton href={viralHref} className="w-full lg:w-auto">
              {c.viral.cta}
            </GoldButton>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* FAQ                                                               */}
      {/* ---------------------------------------------------------------- */}
      <section id="faq" className="relative px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-3xl">
          <Eyebrow>{c.faq.eyebrow}</Eyebrow>
          <SectionTitle>{c.faq.title}</SectionTitle>

          <div className="mt-10 divide-y divide-white/[0.08] overflow-hidden rounded-2xl border border-white/[0.08] bg-ink-900/50">
            {c.faq.items.map((item) => (
              <details key={item.question} className="group px-6 py-1">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left text-base font-medium text-white/85 marker:content-none">
                  {item.question}
                  <span
                    className="flex size-7 shrink-0 items-center justify-center rounded-full border border-white/15 text-gold-200 transition-transform duration-200 group-open:rotate-45"
                    aria-hidden
                  >
                    <svg viewBox="0 0 16 16" fill="none" className="size-3.5">
                      <path
                        d="M8 3v10M3 8h10"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </summary>
                <p className="pb-5 text-sm leading-relaxed text-white/55">
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
      <section
        id="contato"
        className="relative overflow-hidden px-5 py-24 text-center sm:px-8 sm:py-32"
      >
        <div
          className="glow bottom-0 left-1/2 size-[30rem] -translate-x-1/2 translate-y-1/3 bg-gold-500/20"
          aria-hidden
        />
        <div className="relative z-10 mx-auto max-w-2xl">
          <h2 className="text-3xl leading-tight font-semibold text-balance text-white sm:text-4xl">
            {c.finalCta.title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-pretty text-white/60">
            {c.finalCta.subtitle}
          </p>
          <div className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:justify-center">
            {siteConfig.contactUrl ? (
              <GoldButton href={siteConfig.contactUrl}>
                {c.finalCta.primaryCta}
              </GoldButton>
            ) : (
              <GoldButton href="#planos">{c.plans.eyebrow}</GoldButton>
            )}
            <GhostButton href={viralHref}>
              {c.finalCta.secondaryCta}
              <ArrowIcon />
            </GhostButton>
          </div>
        </div>
      </section>
    </>
  );
}
