import Link from "next/link";
import type { ReactNode } from "react";

/* ------------------------------------------------------------------ */
/* Tipografia                                                          */
/* ------------------------------------------------------------------ */

export function Eyebrow({
  children,
  center = false,
}: {
  children: ReactNode;
  center?: boolean;
}) {
  return (
    <p
      className={`eyebrow-caps mb-5 flex items-center gap-4 text-gold-300 ${
        center ? "justify-center" : ""
      }`}
    >
      <span
        className="brushed-rule-soft h-px w-8 shrink-0 opacity-80"
        aria-hidden
      />
      {children}
      {center && (
        <span
          className="brushed-rule-soft h-px w-8 shrink-0 opacity-80"
          aria-hidden
        />
      )}
    </p>
  );
}

export function SectionTitle({
  children,
  center = false,
}: {
  children: ReactNode;
  center?: boolean;
}) {
  return (
    <h2
      className={`display brushed-text text-[1.75rem] text-balance sm:text-4xl lg:text-[2.6rem] ${
        center ? "text-center" : ""
      }`}
    >
      {children}
    </h2>
  );
}

export function Lead({
  children,
  center = false,
}: {
  children: ReactNode;
  center?: boolean;
}) {
  return (
    <p
      className={`mt-5 max-w-2xl text-base leading-relaxed text-pretty text-white/72 sm:text-lg ${
        center ? "mx-auto text-center" : ""
      }`}
    >
      {children}
    </p>
  );
}

/* ------------------------------------------------------------------ */
/* Moldura de título                                                   */
/* ------------------------------------------------------------------ */

/**
 * Moldura dourada dupla com o rótulo cortando o filete de cima, como nos
 * rótulos gravados: a linha superior abre espaço para o texto.
 */
export function GoldFrame({
  label,
  children,
  className = "",
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <div className="flex items-center gap-4 sm:gap-6">
        <span className="brushed-rule-soft h-px flex-1" aria-hidden />
        <span className="eyebrow-caps shrink-0 text-center text-gold-200">
          {label}
        </span>
        <span className="brushed-rule-soft h-px flex-1" aria-hidden />
      </div>

      <div className="relative -mt-px">
        {/* Filetes laterais e inferior, fechando a moldura. */}
        <span
          className="brushed-rule-soft absolute inset-y-0 left-0 w-px"
          aria-hidden
        />
        <span
          className="brushed-rule-soft absolute inset-y-0 right-0 w-px"
          aria-hidden
        />
        <span
          className="brushed-rule-soft absolute inset-x-0 bottom-0 h-px"
          aria-hidden
        />
        {/* Segundo filete, por dentro, mais discreto. */}
        <span
          className="pointer-events-none absolute inset-2 border border-gold-500/30 sm:inset-2.5"
          aria-hidden
        />
        <div className="px-6 py-8 sm:px-12 sm:py-11">{children}</div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Cantos ornamentais                                                  */
/* ------------------------------------------------------------------ */

function OrnateCorner({
  className,
  compact = false,
}: {
  className: string;
  compact?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 44 44"
      fill="none"
      aria-hidden
      className={`pointer-events-none absolute text-gold-400 sm:size-11 ${
        compact ? "size-5" : "size-9"
      } ${className}`}
    >
      <path
        d="M2 18V6a4 4 0 0 1 4-4h12"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M7 22V11a4 4 0 0 1 4-4h11"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.75"
      />
      <path d="m12 12 4-4 4 4-4 4z" fill="currentColor" opacity="0.9" />
    </svg>
  );
}

/** Card com os quatro cantos ornamentados, no espírito das molduras gravadas. */
export function OrnateCard({
  children,
  highlighted = false,
  compact = false,
  className = "",
}: {
  children: ReactNode;
  highlighted?: boolean;
  /** Encolhe os cantos ornamentados, para cards estreitos no celular. */
  compact?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`relative ${
        highlighted ? "shadow-[0_0_60px_-24px_rgba(208,173,79,0.55)]" : ""
      } ${className}`}
    >
      <div
        className={`relative h-full border bg-ink-900/75 backdrop-blur-sm ${
          highlighted ? "border-gold-400/55" : "border-gold-600/35"
        }`}
      >
        <span
          className={`pointer-events-none absolute inset-[5px] border ${
            highlighted ? "border-gold-500/40" : "border-gold-700/35"
          }`}
          aria-hidden
        />
        <OrnateCorner className="top-0 left-0" compact={compact} />
        <OrnateCorner className="top-0 right-0 rotate-90" compact={compact} />
        <OrnateCorner
          className="right-0 bottom-0 rotate-180"
          compact={compact}
        />
        <OrnateCorner
          className="bottom-0 left-0 -rotate-90"
          compact={compact}
        />
        {children}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Botões                                                              */
/* ------------------------------------------------------------------ */

type ButtonProps = {
  href: string;
  children: ReactNode;
  className?: string;
};

export function GoldButton({ href, children, className = "" }: ButtonProps) {
  return (
    <Link href={href} className={`btn-gold ${className}`}>
      {children}
    </Link>
  );
}

export function GhostButton({ href, children, className = "" }: ButtonProps) {
  return (
    <Link href={href} className={`btn-outline ${className}`}>
      {children}
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/* Ícones                                                              */
/* ------------------------------------------------------------------ */

export function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden
      className={`size-4 shrink-0 ${className}`}
    >
      <path
        d="m4.5 10.5 3.5 3.5 7.5-8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden
      className={`size-4 shrink-0 ${className}`}
    >
      <path
        d="M4 10h11m0 0-4.5-4.5M15 10l-4.5 4.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Losango usado como separador entre blocos. */
export function Diamond({ className = "" }: { className?: string }) {
  return (
    <span
      className={`flex items-center justify-center gap-3 ${className}`}
      aria-hidden
    >
      <span className="brushed-rule-soft h-px w-12 opacity-70" />
      <svg viewBox="0 0 12 12" className="size-2.5 text-gold-400" fill="none">
        <path d="m6 0 6 6-6 6-6-6z" fill="currentColor" />
      </svg>
      <span className="brushed-rule-soft h-px w-12 opacity-70" />
    </span>
  );
}
