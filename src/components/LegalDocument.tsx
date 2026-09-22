import type { Content } from "@/content";
import type { LegalBlock, LegalDocument } from "@/content/legal-data";
import { legalUpdatedAt } from "@/content/legal-data";
import type { Locale } from "@/content";
import { engagementPath } from "@/lib/routes";
import { ArrowIcon, Eyebrow, QuietButton } from "./ui";

/** A data da versão escrita por extenso no idioma de quem está lendo. */
const dateLocale: Record<Locale, string> = {
  pt: "pt-BR",
  en: "en-US",
  es: "es-ES",
};

function Blocks({ blocks }: { blocks: LegalBlock[] }) {
  return (
    <>
      {blocks.map((block, index) =>
        block.kind === "p" ? (
          <p
            key={index}
            className="mt-4 text-sm leading-relaxed text-pretty text-paper-dim first:mt-0"
          >
            {block.text}
          </p>
        ) : (
          <ul key={index} className="mt-4 space-y-2">
            {block.items.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="bullet-ruby mt-2 shrink-0" aria-hidden />
                <span className="text-sm leading-relaxed text-paper-dim">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        ),
      )}
    </>
  );
}

/**
 * Página de um documento legal.
 *
 * O texto vem de `legal-data.ts` palavra por palavra e é o mesmo nos três
 * idiomas, porque é o documento que vale juridicamente. O que troca de idioma
 * é só a moldura: título da aba, rótulo da data, botão de voltar e o aviso de
 * que o documento está em português.
 */
export function LegalDocumentPage({
  document,
  title,
  eyebrow,
  locale,
  c,
}: {
  document: LegalDocument;
  title: string;
  eyebrow: string;
  locale: Locale;
  c: Content;
}) {
  const updated = new Date(`${legalUpdatedAt}T12:00:00Z`).toLocaleDateString(
    dateLocale[locale],
    { day: "numeric", month: "long", year: "numeric" },
  );

  return (
    <section className="px-4 py-12 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-3xl">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="display-caps mt-4 text-[1.9rem] text-balance text-paper sm:text-4xl">
          {title}
        </h1>
        <p className="mt-3 text-xs text-paper-weak">
          {c.legal.updatedLabel}: {updated}
        </p>

        {c.legal.languageNote && (
          <p className="mt-6 rounded-xl border border-gold-edge/50 bg-ink-900/70 px-4 py-3 text-xs leading-relaxed text-paper-dim">
            {c.legal.languageNote}
          </p>
        )}

        <div className="mt-8" lang="pt-BR">
          <Blocks blocks={document.intro} />

          {document.sections.map((section) => (
            <section key={section.number} className="mt-10">
              <h2 className="display-caps text-base text-gold-bright sm:text-lg">
                {section.number}. {section.title}
              </h2>
              <div className="mt-4">
                <Blocks blocks={section.blocks} />
              </div>
            </section>
          ))}
        </div>

        <div className="mt-14">
          <QuietButton href={engagementPath(locale)}>
            <ArrowIcon className="rotate-180" />
            {c.legal.backCta}
          </QuietButton>
        </div>
      </div>
    </section>
  );
}
