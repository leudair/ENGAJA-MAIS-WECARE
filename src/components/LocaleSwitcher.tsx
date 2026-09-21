"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  locales,
  localeLabels,
  localeShortLabels,
  type Locale,
} from "@/content";
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
      className={`flex items-center gap-0.5 rounded-[9px] border border-black/30 bg-black/12 p-1 ${className}`}
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
            className={`rounded-[6px] px-2.5 py-1.5 text-[0.64rem] font-bold tracking-[0.14em] transition-colors ${
              active
                ? "bg-ink-950 text-gold-bright"
                : "text-onmetal-soft/75 hover:text-onmetal"
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
