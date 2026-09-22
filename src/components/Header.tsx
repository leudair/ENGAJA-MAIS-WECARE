"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Content, Locale } from "@/content";
import { engagementPath, viralGrowthPath } from "@/lib/routes";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { Logo } from "./Logo";

/**
 * Barra do topo em ouro escovado, de ponta a ponta: logo à esquerda, menu no
 * meio e o CTA de conversão à direita. No celular o menu recolhe num botão,
 * para não tomar metade da tela.
 */
export function Header({
  locale,
  content,
}: {
  locale: Locale;
  content: Content;
}) {
  const [open, setOpen] = useState(false);
  const home = engagementPath(locale);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const links = [
    { href: `${home}#planos`, label: content.nav.plans },
    { href: `${home}#como-funciona`, label: content.nav.howItWorks },
    { href: viralGrowthPath(locale), label: content.nav.viralGrowth },
    { href: `${home}#faq`, label: content.nav.faq },
  ];

  return (
    <header className="px-4 pt-4 sm:px-6 sm:pt-6">
      <div className="metal metal-gold mx-auto flex max-w-6xl items-center gap-3 rounded-[16px] px-3 py-2.5 shadow-[0_18px_36px_-22px_rgba(0,0,0,0.95)] ring-1 ring-black/40 sm:gap-5 sm:px-5 sm:py-3">
        <Link
          href={home}
          className="relative shrink-0"
          onClick={() => setOpen(false)}
        >
          <Logo alt={content.hero.logoAlt} />
        </Link>

        <nav
          aria-label={content.nav.plans}
          className="relative hidden flex-1 items-center justify-center gap-7 lg:flex"
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[0.68rem] font-bold tracking-[0.16em] whitespace-nowrap text-onmetal/85 uppercase transition-colors hover:text-onmetal"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="relative ml-auto flex items-center gap-2 sm:gap-3">
          <LocaleSwitcher current={locale} label={content.nav.languageLabel} />

          <Link
            href={`${home}#planos`}
            className="btn btn-ruby min-h-[2.5rem] px-3 py-2 text-[0.6rem] tracking-[0.1em] sm:min-h-[2.75rem] sm:px-5 sm:text-[0.7rem]"
            onClick={() => setOpen(false)}
          >
            {content.nav.cta}
          </Link>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="menu-principal"
            aria-label={content.nav.plans}
            className="inline-flex size-10 items-center justify-center rounded-[9px] border border-black/35 bg-black/15 text-onmetal transition-colors hover:bg-black/25 lg:hidden"
          >
            <svg viewBox="0 0 20 20" fill="none" aria-hidden className="size-5">
              {open ? (
                <path
                  d="m5 5 10 10M15 5 5 15"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M3 6h14M3 10h14M3 14h14"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div
          id="menu-principal"
          className="surface-gold mx-auto mt-2 max-w-6xl px-4 py-3 lg:hidden"
        >
          <nav className="flex flex-col">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-white/5 py-3 text-[0.72rem] font-bold tracking-[0.16em] text-gold-bright uppercase last:border-0"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
