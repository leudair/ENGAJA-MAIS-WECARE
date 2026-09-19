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
  const [scrolled, setScrolled] = useState(false);
  const home = engagementPath(locale);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
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
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? "border-b border-white/10 bg-ink-950/85 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:h-20 sm:px-8">
        <Link
          href={home}
          className="shrink-0"
          onClick={() => setOpen(false)}
        >
          <Logo alt={content.hero.logoAlt} />
        </Link>

        <nav
          aria-label={content.nav.plans}
          className="hidden items-center gap-7 lg:flex"
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-white/60 transition-colors hover:text-gold-100"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <LocaleSwitcher
            current={locale}
            label={content.nav.languageLabel}
            className="hidden sm:flex"
          />
          <Link
            href={viralGrowthPath(locale)}
            className="hidden rounded-full border border-gold-400/35 px-4 py-2 text-xs font-semibold text-gold-100 transition-colors hover:border-gold-300/70 hover:bg-gold-400/10 md:inline-flex"
          >
            {content.nav.viralGrowth}
          </Link>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="menu-mobile"
            className="inline-flex size-10 items-center justify-center rounded-full border border-white/10 text-white/80 lg:hidden"
          >
            <span className="sr-only">{content.nav.plans}</span>
            <svg viewBox="0 0 24 24" fill="none" aria-hidden className="size-5">
              {open ? (
                <path
                  d="m6 6 12 12M18 6 6 18"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M4 7h16M4 12h16M4 17h16"
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
          id="menu-mobile"
          className="border-t border-white/10 bg-ink-950/95 px-5 pt-4 pb-8 backdrop-blur-xl lg:hidden"
        >
          <ul className="flex flex-col">
            {links.map((link) => (
              <li key={link.href} className="border-b border-white/[0.07]">
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-4 text-base text-white/75"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href={viralGrowthPath(locale)}
                onClick={() => setOpen(false)}
                className="block py-4 text-base font-semibold text-gold-100"
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
