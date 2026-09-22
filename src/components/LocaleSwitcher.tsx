"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  locales,
  localeLabels,
  localeShortLabels,
  type Locale,
} from "@/content";
import { switchLocalePath } from "@/lib/routes";
import { ChevronIcon } from "./ui";

/**
 * Bandeira de cada idioma. É só sinal visual, por isso fica escondida dos
 * leitores de tela: quem ouve a página recebe o nome do idioma, não um país.
 */
const localeFlags: Record<Locale, string> = {
  pt: "🇧🇷",
  en: "🇺🇸",
  es: "🇪🇸",
};

/**
 * A lista é uma chapa escura opaca de propósito: ela abre por cima do título
 * da página, e qualquer transparência faz as bandeiras sumirem no meio das
 * letras.
 *
 * Troca de idioma: um botão só, com a bandeira do idioma aberto, que abre a
 * lista dos três. Antes eram três abas lado a lado, que não cabiam na barra do
 * celular e por isso ficavam escondidas dentro do menu. Quem compra está nos
 * Estados Unidos, então a troca de idioma precisa estar à vista.
 */
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
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLDivElement | null>(null);

  // Fecha ao clicar fora ou apertar Esc, como qualquer menu suspenso.
  useEffect(() => {
    if (!open) return;
    const onClick = (event: MouseEvent) => {
      if (!box.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={box} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label={label}
        className="flex min-h-10 items-center gap-1.5 rounded-[9px] border border-black/45 bg-linear-to-b from-[#232326] to-[#0c0c0e] px-2.5 text-gold-bright shadow-[inset_0_1px_0_rgb(242_217_147/0.16),0_1px_0_#0a0a0b,0_2px_0_#08080a,0_5px_9px_-3px_rgb(0_0_0/0.6)] transition-colors hover:border-gold-edge/70 sm:px-3"
      >
        <span aria-hidden className="text-sm leading-none">
          {localeFlags[current]}
        </span>
        <span className="text-[0.64rem] font-bold tracking-[0.14em]">
          {localeShortLabels[current]}
        </span>
        <ChevronIcon
          className={`!size-3 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <nav
          aria-label={label}
          className="absolute top-full right-0 z-30 mt-2 min-w-44 overflow-hidden rounded-[11px] border border-gold-edge/60 bg-linear-to-b from-[#141417] to-[#08080a] py-1 shadow-[inset_0_1px_0_rgb(242_217_147/0.1),0_2px_0_#000,0_22px_38px_-10px_rgb(0_0_0/0.95)]"
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
                onClick={() => setOpen(false)}
                className={`flex items-center gap-2.5 px-3 py-2.5 text-[0.78rem] transition-colors ${
                  active
                    ? "bg-white/6 font-bold text-gold-bright"
                    : "text-paper hover:bg-white/5"
                }`}
              >
                <span aria-hidden className="text-base leading-none">
                  {localeFlags[locale]}
                </span>
                {localeLabels[locale]}
              </Link>
            );
          })}
        </nav>
      )}
    </div>
  );
}
