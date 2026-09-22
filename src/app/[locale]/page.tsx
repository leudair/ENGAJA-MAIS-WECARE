import { notFound } from "next/navigation";
import { Logo } from "@/components/Logo";
import { PeopleRow } from "@/components/PeopleRow";
import { PlanComparison, PlanFamilyCard } from "@/components/PlanFamilyCard";
import {
  ArrowIcon,
  Bullet,
  ExternalIcon,
  Eyebrow,
  Lead,
  LedButton,
  MetalButton,
  MetalPlate,
  OnMetalButton,
  QuietButton,
  RubyButton,
  Rule,
  SectionTitle,
} from "@/components/ui";
import { getContent, siteConfig, type Locale } from "@/content";
import { getPlanFamilies, getShowcasePlan, type PlanCard } from "@/lib/plans";
import { isLocale, viralGrowthPath } from "@/lib/routes";

/** Lista de entrega por publicação, com o valor alinhado à direita. */
function PlanMetrics({
  metrics,
  tone = "dark",
}: {
  metrics: PlanCard["metrics"];
  tone?: "dark" | "metal";
}) {
  const label = tone === "metal" ? "text-onmetal-soft/85" : "text-paper-dim";
  const value = tone === "metal" ? "text-onmetal" : "text-gold-bright";
  const line = tone === "metal" ? "border-black/15" : "border-white/8";

  return (
    <ul className="space-y-0">
      {metrics.map((metric) => (
        <li
          key={metric.label}
          className={`flex flex-col gap-0.5 border-b py-2 last:border-0 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4 sm:py-2.5 ${line}`}
        >
          <span
            className={`text-[0.78rem] leading-snug sm:text-[0.82rem] ${label}`}
          >
            {metric.label}
          </span>
          <span
            className={`display text-[0.95rem] sm:shrink-0 sm:text-right ${value}`}
          >
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
  const showcase = getShowcasePlan(locale, c);

  return (
    <>
      {/* ---------------------------------------------------------------- */}
      {/* Hero: texto à esquerda, chapa de bronze à direita                 */}
      {/* ---------------------------------------------------------------- */}
      <section className="px-4 pt-10 pb-6 sm:px-6 sm:pt-16 sm:pb-10">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[3fr_2fr] lg:items-center lg:gap-14">
          <div>
            <Eyebrow>{c.hero.eyebrow}</Eyebrow>

            <h1 className="display-caps mt-5 text-[2.1rem] text-balance sm:text-5xl lg:text-[3.6rem]">
              <span className="block text-paper">{c.hero.titleTop}</span>
              <span className="text-metal-gold mt-1 block">
                {c.hero.titleBottom}
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-pretty text-paper-dim sm:text-lg">
              {c.hero.paragraph}
            </p>

            <div className="mt-9">
              <RubyButton href="#planos">{c.hero.cta}</RubyButton>
            </div>

            <div className="mt-6">
              <PeopleRow c={c} />
            </div>
          </div>

          {/* Chapa de bronze com o limite do ciclo, o dado que mais pesa. */}
          <MetalPlate kind="bronze" className="mx-auto w-full max-w-sm">
            <div className="px-7 py-9 text-center sm:px-9 sm:py-11">
              <p className="text-[0.66rem] font-bold tracking-[0.3em] text-onmetal-soft/80 uppercase">
                {c.hero.badge.brand}
              </p>
              <p className="display mt-4 text-[3.4rem] leading-none text-onmetal sm:text-[4rem]">
                {c.hero.badge.amount}
              </p>
              <p className="mt-3 text-[0.72rem] font-bold tracking-[0.2em] text-onmetal-soft uppercase">
                {c.hero.badge.unit}
              </p>
              <span className="mx-auto mt-6 block h-px w-16 bg-black/25" />
              <p className="mt-4 text-sm text-onmetal-soft/90">
                {c.hero.badge.note}
              </p>
            </div>
          </MetalPlate>
        </div>

        {/* Faixa de selos: só fatos já definidos. */}
        <ul className="mx-auto mt-12 grid max-w-6xl grid-cols-2 gap-3 sm:mt-14 sm:gap-4 lg:grid-cols-4">
          {c.hero.proofs.map((proof) => (
            <li key={proof.title} className="surface px-4 py-5 sm:px-5 sm:py-6">
              <p className="display-caps hyphens-auto text-[0.82rem] text-balance text-gold-bright sm:text-base">
                {proof.title}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-pretty text-paper-faint sm:text-sm">
                {proof.description}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Banner Crescimento Viral, antes dos planos                        */}
      {/* ---------------------------------------------------------------- */}
      <section className="px-4 py-8 sm:px-6 sm:py-12">
        <div className="mx-auto max-w-5xl">
          {/* Moldura de ouro espessa, com o anel rubi e o interior preto. */}
          <div className="metal metal-gold rounded-[24px] p-[3px] shadow-[0_0_40px_-14px_rgba(181,24,31,0.5)]">
            <div className="relative rounded-[22px] ring-1 ring-ruby-500/70 ring-inset">
              <div className="rounded-[21px] bg-ink-950 px-6 py-11 text-center sm:px-14 sm:py-14">
                <Eyebrow center>{c.viral.eyebrow}</Eyebrow>
                <h2 className="display-caps mt-4 text-[1.8rem] text-balance text-paper sm:text-4xl">
                  {c.viral.title}
                </h2>
                <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-pretty text-paper-dim">
                  {c.viral.lead}
                </p>
                <div className="mt-9">
                  <MetalButton href={viralHref}>
                    {c.viral.cta}
                    <ExternalIcon />
                  </MetalButton>
                </div>
                <p className="mt-6 text-xs text-paper-weak">{c.viral.note}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Planos: três famílias, cada uma abrindo três opções               */}
      {/* ---------------------------------------------------------------- */}
      <section id="planos" className="px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <Eyebrow center>{c.plans.eyebrow}</Eyebrow>
          {/* Corpo menor no celular para o título caber numa linha só. */}
          <SectionTitle center className="!text-[1.45rem] sm:!text-4xl">
            {c.plans.title}
          </SectionTitle>
          <Lead center>{c.plans.subtitle}</Lead>

          {/* O teto do ciclo é a dúvida número um de quem compra, então ele
              aparece numa chapa própria, antes dos preços. */}
          <div className="mx-auto mt-9 max-w-2xl">
            <MetalPlate kind="gold">
              <div className="flex items-center gap-4 px-4 py-4 sm:gap-6 sm:px-7 sm:py-6">
                <p className="display shrink-0 text-[3.2rem] leading-none text-onmetal sm:text-[4rem]">
                  {c.plans.highlight.amount}
                </p>
                <span className="w-px shrink-0 self-stretch bg-black/30" />
                <div className="min-w-0">
                  <p className="text-[0.66rem] font-bold tracking-[0.18em] text-onmetal uppercase sm:text-xs sm:tracking-[0.2em]">
                    {c.plans.highlight.unit}
                  </p>
                  <p className="mt-1.5 text-[0.78rem] leading-snug text-pretty text-onmetal-soft/85 sm:text-sm">
                    {c.plans.highlight.note}
                  </p>
                </div>
              </div>
            </MetalPlate>
          </div>

          <div className="mt-12 grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-3 lg:gap-7">
            {families.map((family) => (
              <PlanFamilyCard key={family.id} family={family} c={c} />
            ))}
          </div>

          <PlanComparison families={families} c={c} />

          <p className="mt-12 text-center text-sm text-pretty text-gold-label">
            {c.plans.noFollowers}
          </p>
          <p className="mx-auto mt-4 max-w-3xl text-center text-xs leading-relaxed text-pretty text-paper-weak">
            {c.plans.disclaimer}
          </p>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Exemplo de plano real                                             */}
      {/* ---------------------------------------------------------------- */}
      <section className="px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[2fr_3fr] lg:items-center lg:gap-14">
          <div>
            <Eyebrow>{c.showcase.eyebrow}</Eyebrow>
            <SectionTitle>{c.showcase.title}</SectionTitle>
            <Lead>{c.showcase.lead}</Lead>
          </div>

          {/* Chapa de ouro com borda rubi: o card de exemplo do documento. */}
          <div className="rounded-[23px] p-[2px] shadow-[0_0_44px_-16px_rgba(181,24,31,0.55)] ring-2 ring-ruby-500/80">
            <MetalPlate kind="gold">
              <div className="px-6 py-8 sm:px-9 sm:py-10">
                <h3 className="display-caps text-2xl text-onmetal sm:text-[2rem]">
                  {showcase.name}
                </h3>
                <p className="display mt-3 text-[3rem] leading-none text-onmetal sm:text-[3.6rem]">
                  {showcase.price}
                </p>
                <p className="mt-3 text-[0.68rem] font-bold tracking-[0.2em] text-onmetal-soft/85 uppercase">
                  {c.showcase.planNote}
                </p>

                <span className="mt-6 block h-px bg-black/20" />

                <div className="mt-4">
                  <PlanMetrics metrics={showcase.metrics} tone="metal" />
                </div>

                <div className="mt-7">
                  <RubyButton href={showcase.href} className="w-full">
                    {c.showcase.cta}
                  </RubyButton>
                </div>
              </div>
            </MetalPlate>
          </div>
        </div>
      </section>

      <Rule className="my-4" />

      {/* ---------------------------------------------------------------- */}
      {/* Como funciona                                                     */}
      {/* ---------------------------------------------------------------- */}
      <section id="como-funciona" className="px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <Eyebrow center>{c.howItWorks.eyebrow}</Eyebrow>
          <SectionTitle center>{c.howItWorks.title}</SectionTitle>
          <Lead center>{c.howItWorks.subtitle}</Lead>

          {/* A parede da moldura ocupa espaço embaixo: por isso o vão
              vertical é maior que o horizontal. */}
          <ol className="mt-10 grid grid-cols-2 gap-x-3 gap-y-5 sm:mt-12 sm:gap-x-4 sm:gap-y-6 lg:grid-cols-4">
            {c.howItWorks.steps.map((step, index) => (
              <li
                key={step.title}
                className="gold-frame px-4 py-6 sm:px-6 sm:py-7"
              >
                <span
                  className="display text-metal-gold block text-2xl sm:text-3xl"
                  aria-hidden
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-[0.68rem] font-bold tracking-[0.18em] text-gold-bright uppercase sm:text-[0.72rem]">
                  {step.title}
                </h3>
                <p className="mt-2.5 text-xs leading-relaxed text-pretty text-paper sm:text-sm">
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

          <ul className="mt-10 grid grid-cols-2 gap-x-3 gap-y-5 sm:mt-12 sm:gap-x-4 sm:gap-y-6 lg:grid-cols-3">
            {c.included.items.map((item) => (
              <li
                key={item.title}
                className="gold-frame px-4 py-6 sm:px-6 sm:py-7"
              >
                <div className="flex items-start gap-2.5">
                  <Bullet />
                  <h3 className="text-[0.68rem] font-bold tracking-[0.18em] text-gold-bright uppercase sm:text-[0.72rem]">
                    {item.title}
                  </h3>
                </div>
                <p className="mt-2.5 text-xs leading-relaxed text-paper sm:text-sm">
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
          {/* O limite é a regra que vale para todos os planos, então ele fica
              na própria chapa de ouro, e não num painel escuro. */}
          <MetalPlate kind="gold">
            <div className="grid gap-8 px-5 py-10 sm:px-12 sm:py-14 lg:grid-cols-[auto_1fr] lg:gap-14">
              <div className="text-center lg:pt-1 lg:text-left">
                <span
                  className="display num-emboss block text-[5.5rem] leading-[0.85] text-onmetal sm:text-8xl"
                  aria-hidden
                >
                  30
                </span>
                <span className="mt-3 block text-[0.68rem] font-bold tracking-[0.28em] text-onmetal-soft uppercase lg:mt-4">
                  {c.limit.eyebrow}
                </span>
              </div>

              <div>
                <h2 className="display-caps text-2xl text-balance text-onmetal sm:text-3xl">
                  {c.limit.title}
                </h2>
                <p className="mt-5 text-base leading-relaxed font-medium text-onmetal-soft">
                  {c.limit.lead}
                </p>

                <ul className="mt-7 space-y-3.5">
                  {c.limit.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3">
                      <Bullet />
                      <span className="text-sm leading-relaxed font-medium text-onmetal-soft sm:text-base">
                        {bullet}
                      </span>
                    </li>
                  ))}
                </ul>

                <p className="mt-7 border-t border-black/30 pt-5 text-sm font-medium text-onmetal-soft/85">
                  {c.limit.footnote}
                </p>
              </div>
            </div>
          </MetalPlate>
        </div>
      </section>

      <Rule className="my-4" />

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
                className="mt-4 max-w-2xl text-sm leading-relaxed text-paper-faint sm:text-base"
              >
                {paragraph}
              </p>
            ))}

            {siteConfig.wecareProfileUrl && (
              <div className="mt-8">
                <QuietButton href={siteConfig.wecareProfileUrl}>
                  {c.demo.cta}
                  <ArrowIcon />
                </QuietButton>
              </div>
            )}
          </div>

          {/* Vitrine do perfil da própria WeCare, sem dado de cliente. */}
          <div className="gold-frame mx-auto w-full max-w-sm px-7 py-9">
            <div className="flex flex-col items-center text-center">
              <Eyebrow>{c.demo.eyebrow}</Eyebrow>
              <div className="mt-5">
                <Logo alt={c.hero.logoAlt} className="max-w-[12rem]" />
              </div>
              <span className="rule-gold mt-6 h-px w-full opacity-60" />
            </div>

            {/* Mosaico do perfil: um marcador rubi no centro, sem nenhuma
                imagem de cliente. */}
            <div className="mt-6 grid grid-cols-3 gap-1.5" aria-hidden>
              {Array.from({ length: 9 }).map((_, index) => {
                const center = index === 4;
                return (
                  <div
                    key={index}
                    className={`flex aspect-square items-center justify-center rounded-[6px] border ${
                      center
                        ? "border-ruby-500/60 bg-linear-to-br from-ruby-500/20 to-transparent"
                        : "border-white/8 bg-linear-to-br from-white/[0.05] to-transparent"
                    }`}
                  >
                    {center && (
                      <span className="bullet-ruby size-2" aria-hidden />
                    )}
                  </div>
                );
              })}
            </div>

            <span className="rule-gold mt-6 block h-px w-full opacity-30" />
            <p className="mt-4 text-center text-xs leading-relaxed text-paper">
              {c.privacy.bullets[2]}
            </p>
          </div>
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

          <ul className="mt-10 grid grid-cols-2 gap-x-3 gap-y-5 sm:mt-12 sm:gap-x-4 sm:gap-y-6 md:grid-cols-3">
            {c.privacy.bullets.map((bullet, index) => (
              <li
                key={bullet}
                className={`gold-frame px-4 py-6 sm:px-6 sm:py-7 ${
                  index === c.privacy.bullets.length - 1 && index % 2 === 0
                    ? "col-span-2 md:col-span-1"
                    : ""
                }`}
              >
                <div className="flex items-start gap-2.5">
                  <Bullet />
                  <p className="text-xs leading-relaxed text-paper sm:text-sm">
                    {bullet}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Rule className="my-4" />

      {/* ---------------------------------------------------------------- */}
      {/* Dúvidas                                                           */}
      {/* ---------------------------------------------------------------- */}
      <section id="faq" className="px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <Eyebrow center>{c.faq.eyebrow}</Eyebrow>
          <SectionTitle center>{c.faq.title}</SectionTitle>

          <div className="mt-10 grid grid-cols-2 gap-x-3 gap-y-5 sm:mt-12 sm:gap-x-4 sm:gap-y-6">
            {c.faq.items.map((item, index) => (
              <details
                key={item.question}
                className={`gold-frame group px-4 py-1 sm:px-5 ${
                  index === c.faq.items.length - 1 && index % 2 === 0
                    ? "col-span-2"
                    : ""
                }`}
              >
                <summary className="flex cursor-pointer list-none items-start justify-between gap-3 py-4 text-left text-xs leading-snug font-semibold text-paper marker:content-none sm:py-5 sm:text-sm">
                  {item.question}
                  <span
                    className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-[6px] border border-gold-edge/60 text-gold-bright transition-transform duration-200 group-open:rotate-45 sm:size-7"
                    aria-hidden
                  >
                    <svg viewBox="0 0 16 16" fill="none" className="size-3">
                      <path
                        d="M8 3v10M3 8h10"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </summary>
                <p className="border-t border-white/8 py-4 text-xs leading-relaxed text-paper sm:text-sm">
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
          {/* O fecho da página é a chapa de ouro inteira, com o botão de
              conversão em cima dela. */}
          <MetalPlate kind="gold">
            <div className="px-6 py-12 text-center sm:px-14 sm:py-16">
              <h2 className="display-caps text-2xl text-balance text-onmetal sm:text-4xl">
                {c.finalCta.title}
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-pretty font-medium text-onmetal-soft sm:text-base">
                {c.finalCta.subtitle}
              </p>
              <div className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:justify-center">
                <LedButton href={siteConfig.contactUrl ?? "#planos"}>
                  {siteConfig.contactUrl ? c.finalCta.primaryCta : c.hero.cta}
                </LedButton>
                <OnMetalButton href={viralHref}>
                  {c.finalCta.secondaryCta}
                  <ExternalIcon />
                </OnMetalButton>
              </div>
            </div>
          </MetalPlate>
        </div>
      </section>
    </>
  );
}
