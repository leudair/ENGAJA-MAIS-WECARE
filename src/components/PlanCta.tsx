"use client";

import { useState } from "react";
import type { Content } from "@/content";
import type { PlanCard } from "@/lib/plans";
import { KeyButton, RubyButton } from "./ui";

/** Ícone de cartão de crédito. */
function CardIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      className="size-3.5 shrink-0"
    >
      <rect
        x="1.5"
        y="3.5"
        width="13"
        height="9"
        rx="1.6"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path d="M1.5 6.5h13" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

/** Ícone do Pix: o losango com o corte no meio. */
function PixIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      className="size-3.5 shrink-0"
    >
      <path
        d="M8 1.6 14.4 8 8 14.4 1.6 8z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M5.4 5.4 8 8l2.6-2.6M5.4 10.6 8 8l2.6 2.6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Botão de contratar um plano.
 *
 * Quando o plano tem cartão e Pix, o botão abre a escolha ali mesmo, sem sair
 * da página nem empurrar o card para baixo de repente. Quando só um dos dois
 * existe, ele leva direto, e quando nenhum existe leva para o contato: assim
 * a página nunca promete um pagamento que ainda não foi configurado.
 */
export function PlanCta({
  plan,
  c,
  className = "",
  variant = "key",
  label,
  onOpenChange,
}: {
  plan: PlanCard;
  c: Content;
  className?: string;
  /**
   * Avisa quando a escolha abre e fecha. O card de plano usa isso para tirar
   * as setas do caminho: escolher como pagar e folhear plano ao mesmo tempo
   * não faz sentido, e as setas ficariam tortas ao lado de um bloco mais alto.
   */
  onOpenChange?: (open: boolean) => void;
  /** "key" é a tecla no metal do card; "ruby" é o botão do card de exemplo. */
  variant?: "key" | "ruby";
  /** Texto do botão, quando aquele lugar usa um diferente do padrão. */
  label?: string;
}) {
  const [open, setOpen] = useState(false);
  const toggle = (next: boolean) => {
    setOpen(next);
    onOpenChange?.(next);
  };
  const both = Boolean(plan.payment.card && plan.payment.pix);
  const Button = variant === "ruby" ? RubyButton : KeyButton;
  const text = label ?? c.plans.cta;

  if (!both) {
    return (
      <Button href={plan.href} className={className}>
        {text}
      </Button>
    );
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => toggle(true)}
        className={`btn btn-${variant} ${className}`}
      >
        {text}
      </button>
    );
  }

  return (
    <div className={`${className} flex flex-col gap-2`}>
      <p
        className={`text-center text-[0.58rem] font-bold tracking-[0.18em] uppercase ${
          variant === "ruby" ? "text-gold-label" : "text-onmetal-soft"
        }`}
      >
        {c.plans.pay.question}
      </p>

      <Button
        href={plan.payment.card as string}
        className="w-full gap-2 px-2 text-[0.62rem]"
      >
        <CardIcon />
        {c.plans.pay.card}
      </Button>

      <Button
        href={plan.payment.pix as string}
        className="w-full gap-2 px-2 text-[0.62rem]"
      >
        <PixIcon />
        {c.plans.pay.pix}
      </Button>

      <button
        type="button"
        onClick={() => toggle(false)}
        className={`pt-0.5 text-[0.58rem] font-bold tracking-[0.16em] uppercase transition-colors ${
          variant === "ruby"
            ? "text-gold-label/70 hover:text-gold-bright"
            : "text-onmetal-soft/70 hover:text-onmetal"
        }`}
      >
        {c.plans.pay.cancel}
      </button>
    </div>
  );
}
