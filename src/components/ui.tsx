import Link from "next/link";
import type { ReactNode } from "react";

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="mb-4 flex items-center gap-3 text-[0.7rem] font-semibold tracking-[0.22em] text-gold-300 uppercase">
      <span className="brushed-rule h-px w-6 shrink-0 rounded-full" aria-hidden />
      {children}
    </p>
  );
}

export function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-3xl leading-[1.15] font-semibold text-balance text-white sm:text-4xl lg:text-[2.75rem]">
      {children}
    </h2>
  );
}

export function Lead({ children }: { children: ReactNode }) {
  return (
    <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg">
      {children}
    </p>
  );
}

type ButtonProps = {
  href: string;
  children: ReactNode;
  className?: string;
};

/** Botão principal em ouro escovado. */
export function GoldButton({ href, children, className = "" }: ButtonProps) {
  return (
    <Link
      href={href}
      className={`group relative inline-flex min-h-12 items-center justify-center overflow-hidden rounded-full px-7 py-3.5 text-sm font-semibold text-ink-950 shadow-[0_18px_40px_-18px_rgba(212,175,55,0.75)] transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0 ${className}`}
    >
      <span className="brushed-rule absolute inset-0" aria-hidden />
      <span
        className="absolute inset-0 bg-linear-to-b from-white/45 to-transparent to-45%"
        aria-hidden
      />
      <span className="relative">{children}</span>
    </Link>
  );
}

/** Botão secundário com contorno dourado discreto. */
export function GhostButton({ href, children, className = "" }: ButtonProps) {
  return (
    <Link
      href={href}
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-gold-400/35 bg-white/[0.03] px-7 py-3.5 text-sm font-semibold text-gold-100 backdrop-blur-sm transition-colors duration-200 hover:border-gold-300/70 hover:bg-gold-400/10 ${className}`}
    >
      {children}
    </Link>
  );
}

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
