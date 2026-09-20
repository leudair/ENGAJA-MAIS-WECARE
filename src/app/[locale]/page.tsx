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
import { getPlanFamilies, type PlanCard } from "@/lib/plans";
import { isLocale, viralGrowthPath } from "@/lib/routes";

/** Lista de entrega por publicação, usada aberta no desktop e no expansor. */
function PlanMetrics({ metrics }: { metrics: PlanCard["metrics"] }) {
  return (
    <ul className="space-y-px bg-gold-700/25 text-left">
      {metrics.map((metric) => (
        <li
          key={metric.label}
          className="flex flex-col gap-0.5 bg-black py-1.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-3 sm:px-1 sm:py-2"
        >
          <span className="hyphens-auto text-[0.5rem] leading-snug text-pretty text-white/62 sm:text-xs">
            {metric.label}
          </span>
          <span className="display text-[0.55rem] leading-tight break-words text-gold-200 sm:shrink-0 sm:text-sm sm:whitespace-nowrap">
            {metric.value}
          </span>
        </li>
      ))}
    </ul>
  );
}

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
  const families = getPlanFamilies(locale, c);

  return (
    <>
      {/* ---------------------------------------------------------------- */}
      {/* Abertura: moldura da metodologia                                  */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative overflow-hidden px-4 pt-8 pb-4 sm:px-6 sm:pt-12">
        {/* Halo dourado só atrás da abertura, para o topo pesar mais que o
            resto da página. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -top-40 h-[34rem] bg-[radial-gradient(52%_60%_at_50%_45%,rgba(208,173,79,0.22),transparent_72%)]"
        />

        <div className="relative mx-auto max-w-5xl">
          {/* A logo abre a página, no tamanho que ela merece. */}
          <div className="flex justify-center pb-8 sm:pb-10">
            <Logo variant="stacked" alt={c.hero.logoAlt} />
          </div>

          <GoldFrame label={c.hero.method}>
            <h1 className="display brushed-text sheen text-center text-[2rem] leading-[1.1] text-balance sm:text-5xl lg:text-[4rem]">
              {c.hero.frameTitle}
            </h1>
          </GoldFrame>

          <p className="mx-auto mt-10 max-w-3xl text-center text-[1.4rem] leading-tight font-semibold text-balance text-white/94 sm:text-3xl lg:text-[2.1rem]">
            <span className="block">{c.hero.title}</span>
            <span className="brushed-text sheen mt-1.5 block">
              {c.hero.highlight}
            </span>
          </p>

          <p className="mx-auto mt-5 max-w-2xl text-center text-sm leading-relaxed text-pretty text-white/72 sm:text-base">
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
                <p className="mt-2 text-xs leading-relaxed text-pretty text-white/62">
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
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-pretty text-white/72 sm:text-base">
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
          <Eyebrow center>{c.plans.eyebrow}</Eyebrow>
          <SectionTitle center>{c.plans.title}</SectionTitle>
          <Lead center>{c.plans.subtitle}</Lead>

          {families.map((family) => (
            <div key={family.id} className="mt-14 first:mt-12">
              {/* Cabeçalho da família: o nome quebra o filete de ouro. */}
              <div className="flex items-center gap-4 sm:gap-6">
                <span className="brushed-rule-soft h-px flex-1" aria-hidden />
                <h3 className="display text-lg text-gold-200 sm:text-2xl">
                  {family.name}
                </h3>
                <span className="brushed-rule-soft h-px flex-1" aria-hidden />
              </div>
              <p className="mx-auto mt-4 max-w-2xl text-center text-xs leading-relaxed text-pretty text-white/62 sm:text-sm">
                {family.tagline}
              </p>

              {/* Três cards por família, lado a lado também no celular:
                  cada família ocupa uma linha só e a página não estica. */}
              <div className="mt-6 grid grid-cols-3 gap-2 sm:mt-7 sm:gap-4 lg:gap-5">
                {family.plans.map((plan) => (
                  <OrnateCard key={plan.id} highlighted={plan.featured} compact>
                    <div className="flex h-full flex-col px-1.5 py-5 text-center sm:px-6 sm:py-9">
                      {/* Cor cheia, não gradiente: em texto curto o ouro
                          escovado deixa metade da palavra escura. */}
                      <h4 className="eyebrow-caps min-h-[2.2rem] text-[0.46rem]! leading-[1.45] tracking-[0.04em]! text-balance text-gold-200 sm:min-h-0 sm:text-[0.7rem]! sm:tracking-[0.2em]!">
                        {plan.name}
                      </h4>

                      <p className="display brushed-text mt-2 text-[0.95rem] whitespace-nowrap sm:mt-4 sm:text-2xl lg:text-[2.3rem]">
                        {plan.price}
                      </p>
                      <p className="mt-1.5 text-[0.55rem] leading-tight tracking-wide text-white/56 sm:mt-2 sm:text-[0.7rem]">
                        {c.plans.priceNote}
                      </p>
                      <p className="mt-1 text-[0.55rem] leading-tight tracking-wide text-balance text-gold-300/70 sm:text-[0.7rem]">
                        {c.plans.cycleNote}
                      </p>

                      {/* No desktop a entrega fica aberta; no celular vai para
                          um expansor, para a página não esticar com 9 cards. */}
                      <div className="mt-6 hidden lg:block">
                        <p className="eyebrow-caps mb-3 text-[0.6rem] text-white/52">
                          {c.plans.metricsTitle}
                        </p>
                        <PlanMetrics metrics={plan.metrics} />
                      </div>

                      <details className="group mt-4 text-left sm:mt-6 lg:hidden">
                        <summary className="flex cursor-pointer list-none items-center justify-center gap-1.5 border border-gold-700/35 bg-white/[0.02] px-1.5 py-2 text-center text-[0.5rem] leading-tight font-semibold tracking-[0.08em] text-gold-100/80 uppercase marker:content-none sm:justify-between sm:gap-3 sm:px-4 sm:py-3 sm:text-[0.62rem] sm:tracking-[0.16em]">
                          {c.plans.metricsTitle}
                          <svg
                            viewBox="0 0 16 16"
                            fill="none"
                            aria-hidden
                            className="size-2.5 shrink-0 transition-transform duration-200 group-open:rotate-180 sm:size-3.5"
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
                        <div className="border-x border-b border-gold-700/25 px-0.5 py-2 sm:px-4 sm:py-4">
                          <PlanMetrics metrics={plan.metrics} />
                        </div>
                      </details>

                      <div className="mt-4 flex flex-1 items-end justify-center sm:mt-6">
                        {plan.featured ? (
                          <GoldButton
                            href={contactHref}
                            className="w-full px-1.5! text-[0.5rem]! leading-tight! tracking-[0.06em]! sm:px-5! sm:text-[0.72rem]! sm:tracking-[0.12em]!"
                          >
                            {c.plans.cta}
                          </GoldButton>
                        ) : (
                          <GhostButton
                            href={contactHref}
                            className="w-full px-1.5! text-[0.5rem]! leading-tight! tracking-[0.06em]! sm:px-5! sm:text-[0.72rem]! sm:tracking-[0.12em]!"
                          >
                            {c.plans.cta}
                          </GhostButton>
                        )}
                      </div>
                    </div>
                  </OrnateCard>
                ))}
              </div>
            </div>
          ))}

          <p className="mt-12 text-center text-sm text-pretty text-gold-100/70">
            {c.plans.noFollowers}
          </p>
          <p className="mx-auto mt-4 max-w-3xl text-center text-xs leading-relaxed text-pretty text-white/52">
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
                <h3 className="text-[0.62rem] font-semibold tracking-[0.2em] text-white/88 uppercase sm:text-[0.68rem] sm:tracking-[0.34em]">
                  {step.title}
                </h3>
                <p className="mt-2.5 text-xs leading-relaxed text-pretty text-white/66 sm:mt-3 sm:text-sm">
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
                <h3 className="text-[0.62rem] font-semibold tracking-[0.2em] text-white/88 uppercase sm:text-[0.68rem] sm:tracking-[0.34em]">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-xs leading-relaxed text-white/66 sm:mt-3 sm:text-sm">
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
                <p className="mt-5 text-base leading-relaxed text-white/82">
                  {c.limit.lead}
                </p>

                <ul className="mt-7 space-y-3.5">
                  {c.limit.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3">
                      <CheckIcon className="mt-1 text-gold-400" />
                      <span className="text-sm leading-relaxed text-white/76 sm:text-base">
                        {bullet}
                      </span>
                    </li>
                  ))}
                </ul>

                <p className="mt-7 border-t border-gold-700/35 pt-5 text-sm text-white/56">
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
                className="mt-4 max-w-2xl text-sm leading-relaxed text-white/62 sm:text-base"
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
              <p className="mt-4 text-center text-xs leading-relaxed text-white/62">
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
                <p className="text-xs leading-relaxed text-white/76 sm:text-sm">
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
                <summary className="flex cursor-pointer list-none items-start justify-between gap-3 py-4 text-left text-xs leading-snug font-medium text-white/88 marker:content-none sm:py-5 sm:text-sm">
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
                <p className="border-t border-gold-700/25 py-4 text-xs leading-relaxed text-white/66 sm:text-sm">
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
              <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-pretty text-white/72 sm:text-base">
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
