import Link from "next/link";
import type { Content, Locale } from "@/content";
import { siteConfig } from "@/content";
import { engagementPath, viralGrowthPath } from "@/lib/routes";
import { Logo } from "./Logo";

export function Footer({
  locale,
  content,
}: {
  locale: Locale;
  content: Content;
}) {
  return (
    <footer className="relative mt-8 border-t border-gold-edge/40 bg-ink-900/80">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-12 sm:px-8 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm">
          <Logo alt={content.hero.logoAlt} />
          <p className="mt-4 text-sm leading-relaxed text-paper-dim">
            {content.footer.tagline}
          </p>
        </div>

        <nav
          aria-label={content.footer.engagement}
          className="flex flex-col gap-3"
        >
          <Link
            href={engagementPath(locale)}
            className="eyebrow transition-colors hover:text-gold-bright"
          >
            {content.footer.engagement}
          </Link>
          <Link
            href={viralGrowthPath(locale)}
            className="eyebrow transition-colors hover:text-gold-bright"
          >
            {content.footer.viralGrowth}
          </Link>
          <Link
            href={`${engagementPath(locale)}#faq`}
            className="eyebrow transition-colors hover:text-gold-bright"
          >
            {content.nav.faq}
          </Link>
        </nav>
      </div>

      <div className="rule-gold h-px w-full opacity-30" aria-hidden />

      <p className="mx-auto max-w-6xl px-5 py-6 text-xs text-paper-weak sm:px-8">
        © {new Date().getFullYear()} {siteConfig.brand}. {content.footer.rights}
      </p>
    </footer>
  );
}
