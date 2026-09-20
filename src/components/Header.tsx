"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Content, Locale } from "@/content";
import { engagementPath, viralGrowthPath } from "@/lib/routes";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { Logo } from "./Logo";

export function Header({
  locale,
  content,
}: {
  locale: Locale;
  content: Content;
}) {
  const [open, setOpen] = useState(false);
  // A logo da barra só aparece depois que a logo grande da abertura sai da
  // tela, para as duas não ficarem uma embaixo da outra.
  const [scrolled, setScrolled] = useState(false);
  const home = engagementPath(locale);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 200);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const links = [
    { href: `${home}#como-funciona`, label: content.nav.howItWorks },
    { href: `${home}#planos`, label: content.nav.plans },
    { href: `${home}#limite`, label: content.nav.limit },
    { href: `${home}#faq`, label: content.nav.faq },
  ];

  return (
    <header className="px-4 pt-4 sm:px-6 sm:pt-6">
      {/* Barra: um painel com filete dourado e a marca no centro. */}
      <div className="panel mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4">
        <div className="flex flex-1 items-center justify-start">
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="menu-principal"
            className="inline-flex size-10 items-center justify-center border border-gold-600/35 text-gold-100/80 transition-colors hover:border-gold-400/60 xl:hidden"
          >
            <span className="sr-only">{content.nav.plans}</span>
            <svg viewBox="0 0 24 24" fill="none" aria-hidden className="size-5">
              {open ? (
                <path
                  d="m6 6 12 12M18 6 6 18"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>

          <nav
            aria-label={content.nav.plans}
            className="hidden items-center gap-7 xl:flex"
          >
            {links.slice(0, 2).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[0.66rem] font-semibold tracking-[0.2em] whitespace-nowrap text-white/62 uppercase transition-colors hover:text-gold-100"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <Link
          href={home}
          className={`shrink-0 transition-opacity duration-300 ${
            scrolled ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={!scrolled}
          tabIndex={scrolled ? undefined : -1}
          onClick={() => setOpen(false)}
        >
          <Logo alt={content.hero.logoAlt} />
        </Link>

        <div className="flex flex-1 items-center justify-end gap-4">
          <nav
            aria-label={content.nav.faq}
            className="hidden items-center gap-7 xl:flex"
          >
            {links.slice(2).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[0.66rem] font-semibold tracking-[0.2em] whitespace-nowrap text-white/62 uppercase transition-colors hover:text-gold-100"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <LocaleSwitcher
            current={locale}
            label={content.nav.languageLabel}
            className="hidden sm:flex"
          />
        </div>
      </div>

      {open && (
        <div
          id="menu-principal"
          className="panel mx-auto mt-2 max-w-6xl px-5 pt-2 pb-6 xl:hidden"
        >
          <ul className="flex flex-col">
            {links.map((link) => (
              <li key={link.href} className="border-b border-gold-700/25">
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="eyebrow-caps block py-4 text-white/80"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href={viralGrowthPath(locale)}
                onClick={() => setOpen(false)}
                className="eyebrow-caps block py-4 text-gold-200"
              >
                {content.nav.viralGrowth}
              </Link>
            </li>
          </ul>
          <LocaleSwitcher
            current={locale}
            label={content.nav.languageLabel}
            className="mt-4 w-fit sm:hidden"
          />
        </div>
      )}
    </header>
  );
}
