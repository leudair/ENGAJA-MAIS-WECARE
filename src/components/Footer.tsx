import Link from "next/link";
import type { Content, Locale } from "@/content";
import { siteConfig } from "@/content";
import { engagementPath, viralGrowthPath } from "@/lib/routes";

export function Footer({
  locale,
  content,
}: {
  locale: Locale;
  content: Content;
}) {
  return (
    <footer className="relative border-t border-white/10 bg-ink-900/60">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-12 sm:px-8 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm">
          <span className="block text-[0.62rem] font-semibold tracking-[0.3em] text-white/45 uppercase">
            Engaja Mais
          </span>
          <span className="brushed-text text-xl font-semibold tracking-tight">
            WeCare
          </span>
          <p className="mt-3 text-sm leading-relaxed text-white/50">
            {content.footer.tagline}
          </p>
        </div>

        <nav aria-label={content.footer.engagement} className="flex flex-col gap-3">
          <Link
            href={engagementPath(locale)}
            className="text-sm text-white/60 transition-colors hover:text-gold-100"
          >
            {content.footer.engagement}
          </Link>
          <Link
            href={viralGrowthPath(locale)}
            className="text-sm text-white/60 transition-colors hover:text-gold-100"
          >
            {content.footer.viralGrowth}
          </Link>
          <Link
            href={`${engagementPath(locale)}#faq`}
            className="text-sm text-white/60 transition-colors hover:text-gold-100"
          >
            {content.nav.faq}
          </Link>
        </nav>
      </div>

      <div className="brushed-rule h-px w-full opacity-25" aria-hidden />

      <p className="mx-auto max-w-6xl px-5 py-6 text-xs text-white/35 sm:px-8">
        © {new Date().getFullYear()} {siteConfig.brand}. {content.footer.rights}
      </p>
    </footer>
  );
}
