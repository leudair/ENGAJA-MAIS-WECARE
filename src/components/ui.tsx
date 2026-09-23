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

/**
 * Botão obsidiana com moldura de bronze polido: o acabamento único que o
 * Leudair fechou pela arte de referência. Usado no trio do topo, no botão
 * grande da primeira tela e em qualquer peça que precise do mesmo tratamento.
 */
export function ObsidianButton({
  href,
  children,
  className = "",
}: ButtonProps) {
  return (
    <Link href={href} className={`btn obsidian obsidian-label ${className}`}>
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

/** Chapa de ouro com filete de LED vermelho: o botão do combo de topo. */
export function LedButton({ href, children, className = "" }: ButtonProps) {
  return (
    <Link href={href} className={`btn btn-led ${className}`}>
      {children}
    </Link>
  );
}

/**
 * Botão preto para usar em cima da chapa de ouro, onde o botão de metal
 * some no fundo. O texto sai em ouro, e o relevo é o mesmo dos outros.
 */
export function OnMetalButton({ href, children, className = "" }: ButtonProps) {
  return (
    <Link href={href} className={`btn btn-onmetal ${className}`}>
      {children}
    </Link>
  );
}

/**
 * Tecla física no metal do card: o botão de contratar dentro do plano. Herda o
 * metal do card, então sai em ouro, aço ou bronze sem precisar de variante.
 */
export function KeyButton({ href, children, className = "" }: ButtonProps) {
  return (
    <Link href={href} className={`btn btn-key ${className}`}>
      {children}
    </Link>
  );
}

/** Estrela de quatro pontas do rodapé do card, só enfeite. */
export function SparkIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="currentColor"
      aria-hidden
      className={`size-3.5 ${className}`}
    >
      <path d="M8 0c.5 3.6 3.9 7 7.5 8-3.6 1-7 4.4-7.5 8-.5-3.6-3.9-7-7.5-8 3.6-1 7-4.4 7.5-8Z" />
    </svg>
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

export type MetalKind = "gold" | "silver" | "bronze";

const metalClass: Record<MetalKind, string> = {
  gold: "metal-gold",
  silver: "metal-silver",
  bronze: "metal-bronze",
};

/**
 * Chapa de metal escovado. É a superfície dos cards de família e do card
 * de exemplo: o degradê, a estria e a espessura são CSS, então preço e
 * métrica seguem sendo texto que dá para selecionar e traduzir.
 */
export function MetalPlate({
  kind,
  children,
  className = "",
}: {
  kind: MetalKind;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`metal plate ${metalClass[kind]} ${className}`}>
      {/* Quina de dentro: aresta escura por fora e fio claro logo depois. */}
      <div className="plate-rim relative">{children}</div>
    </div>
  );
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

/**
 * Seta saindo de um quadrado: o sinal de que o botão leva a pessoa para
 * outra página. Fica nos botões que abrem o Crescimento Viral.
 */
export function ExternalIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      className={`size-3.5 shrink-0 ${className}`}
    >
      <path
        d="M9.5 2.5H13.5V6.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.5 2.5 7.5 8.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M12 9.8v2.7a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 2 12.5v-7A1.5 1.5 0 0 1 3.5 4h2.7"
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
