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
      className={`flex items-center gap-0.5 border border-gold-700/35 bg-white/[0.03] p-1 ${className}`}
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
            className={`px-3 py-1.5 text-[0.68rem] font-semibold tracking-[0.18em] transition-colors ${
              active
                ? "bg-gold-500/20 text-gold-100"
                : "text-white/45 hover:text-white/75"
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
