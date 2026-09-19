"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, localeLabels, localeShortLabels, type Locale } from "@/content";
import { switchLocalePath } from "@/lib/routes";

export function LocaleSwitcher({
  current,
  label,
  className = "",
}: {
  current: Locale;
  label: string;
  className?: string;
}) {
  const pathname = usePathname() ?? `/${current}`;

  return (
    <nav
      aria-label={label}
      className={`flex items-center gap-0.5 rounded-full border border-white/10 bg-white/[0.04] p-1 ${className}`}
    >
      {locales.map((locale) => {
        const active = locale === current;
        return (
          <Link
            key={locale}
            href={switchLocalePath(pathname, locale)}
            hrefLang={locale}
            lang={locale}
            aria-current={active ? "true" : undefined}
            title={localeLabels[locale]}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold tracking-wide transition-colors ${
              active
                ? "bg-gold-400/20 text-gold-100"
                : "text-white/50 hover:text-white/80"
            }`}
          >
            <span aria-hidden>{localeShortLabels[locale]}</span>
            <span className="sr-only">{localeLabels[locale]}</span>
          </Link>
        );
      })}
    </nav>
  );
}
