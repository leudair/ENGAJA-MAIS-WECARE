import Link from "next/link";
import type { ReactNode } from "react";

/* ------------------------------------------------------------------ */
/* Títulos                                                             */
/* ------------------------------------------------------------------ */

export function Eyebrow({
  children,
  center = false,
  className = "",
}: {
  children: ReactNode;
  center?: boolean;
  className?: string;
}) {
  return (
    <p className={`eyebrow ${center ? "text-center" : ""} ${className}`}>
      {children}
    </p>
  );
}

export function SectionTitle({
  children,
  center = false,
  className = "",
}: {
  children: ReactNode;
  center?: boolean;
  className?: string;
}) {
  return (
    <h2
      className={`display-caps mt-4 text-[1.75rem] text-balance text-paper sm:text-4xl lg:text-[2.6rem] ${
        center ? "text-center" : ""
      } ${className}`}
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
      className={`mt-5 max-w-2xl text-base leading-relaxed text-pretty text-paper-dim sm:text-lg ${
        center ? "mx-auto text-center" : ""
      }`}
    >
      {children}
    </p>
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

/** CTA de conversão: preto na moldura rubi. Um por tela, no máximo. */
export function RubyButton({ href, children, className = "" }: ButtonProps) {
  return (
    <Link href={href} className={`btn btn-ruby ${className}`}>
      {children}
    </Link>
  );
}

/** Botão de metal escovado, o padrão da página. */
export function MetalButton({ href, children, className = "" }: ButtonProps) {
  return (
    <Link href={href} className={`btn btn-metal ${className}`}>
      {children}
    </Link>
  );
}

/** Filete dourado sobre preto: o botão dos cards escuros. */
export function OutlineButton({ href, children, className = "" }: ButtonProps) {
  return (
    <Link href={href} className={`btn btn-outline ${className}`}>
      {children}
    </Link>
  );
}

/** Botão secundário, só com o fio dourado. */
export function QuietButton({ href, children, className = "" }: ButtonProps) {
  return (
    <Link href={href} className={`btn btn-quiet ${className}`}>
      {children}
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/* Superfícies                                                         */
/* ------------------------------------------------------------------ */

/** A cor da moldura de cada família: ouro, prata e bronze. */
export type MetalKind = "gold" | "silver" | "bronze";

const cardClass: Record<MetalKind, string> = {
  gold: "card-gold",
  silver: "card-silver",
  bronze: "card-bronze",
};

/**
 * Card escuro com moldura fina na cor da família. Substituiu a chapa de
 * metal claro depois da referência que o Leudair mandou em 21/09/2026:
 * fundo preto, moldura dourada e a espessura desenhada por sombras.
 */
export function DarkCard({
  kind,
  children,
  className = "",
}: {
  kind: MetalKind;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`card-dark ${cardClass[kind]} ${className}`}>
      {children}
    </div>
  );
}

/** Placa de ouro maciça: o limite de 30 e o selo do topo. */
export function GoldPlate({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`plate-gold ${className}`}>{children}</div>;
}

/** Painel escuro com fio dourado. */
export function Surface({
  children,
  gold = false,
  className = "",
}: {
  children: ReactNode;
  gold?: boolean;
  className?: string;
}) {
  return (
    <div className={`${gold ? "surface-gold" : "surface"} ${className}`}>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Ícones e detalhes                                                   */
/* ------------------------------------------------------------------ */

/** Marcador circular rubi das listas. */
export function Bullet() {
  return <span className="bullet-ruby mt-2" aria-hidden />;
}

/** Visto dourado que abre cada linha de serviço. */
export function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      className={`mt-[0.3rem] size-3.5 shrink-0 text-gold-line ${className}`}
    >
      <path
        d="m3 8.5 3.2 3.2L13 5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      className={`size-3.5 ${className}`}
    >
      <path
        d="M3 8h9m0 0-3.5-3.5M12 8l-3.5 3.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ChevronIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      className={`size-3.5 shrink-0 ${className}`}
    >
      <path
        d="m3 6 5 5 5-5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Fio dourado que separa as seções. */
export function Rule({ className = "" }: { className?: string }) {
  return (
    <div className={`mx-auto flex max-w-6xl items-center px-4 ${className}`}>
      <span className="rule-gold h-px flex-1 opacity-30" aria-hidden />
    </div>
  );
}
