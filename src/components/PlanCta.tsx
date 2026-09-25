"use client";

import { useState } from "react";
import type { Content } from "@/content";
import { paymentCount, type PaymentWays } from "@/lib/pagamento";
import { KeyButton, RubyButton } from "./ui";

/**
 * O que o botão precisa saber de uma oferta: para onde ir e quais caminhos de
 * pagamento ela tem. É só isso de propósito, para que os planos mensais e as
 * ofertas de Crescimento Viral usem o mesmo botão sem herdar um do outro.
 */
export type CtaOffer = {
  href: string;
  payment: PaymentWays;
};

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

/** Estado da tecla: fechada, escolhendo o caminho, ou na tela do código Pix. */
type Modo = "fechado" | "escolha" | "pix";

/**
 * Botão de contratar um plano.
 *
 * São três caminhos possíveis, e a oferta pode ter qualquer combinação deles:
 * o código Pix copia e cola, que a pessoa cola no aplicativo do próprio banco;
 * o cartão brasileiro, que vai para o Mercado Pago em real; e o cartão
 * internacional, que vai para o Stripe em dólar. Os dois primeiros só existem
 * na página em português, porque dependem de banco no Brasil.
 *
 * Quando há mais de um caminho, o botão abre a escolha ali mesmo, sem sair da
 * página. Quando há um só, ele leva direto, e quando não há nenhum leva para o
 * contato: assim a página nunca promete um pagamento que ainda não existe.
 */
export function PlanCta({
  plan,
  c,
  className = "",
  variant = "key",
  label,
  onOpenChange,
}: {
  plan: CtaOffer;
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
  const [modo, setModo] = useState<Modo>("fechado");
  const ir = (proximo: Modo) => {
    setModo(proximo);
    onOpenChange?.(proximo !== "fechado");
  };

  const ways = plan.payment;
  const quantos = paymentCount(ways);
  const Button = variant === "key" ? KeyButton : RubyButton;
  const text = label ?? c.plans.cta;
  const soPix = quantos === 1 && ways.pix !== null;

  // Um caminho só, e ele tem endereço: a tecla leva direto.
  if (quantos <= 1 && !soPix) {
    return (
      <Button href={plan.href} className={className}>
        {text}
      </Button>
    );
  }

  if (modo === "fechado") {
    return (
      <button
        type="button"
        onClick={() => ir(soPix ? "pix" : "escolha")}
        className={`btn btn-${variant} ${className}`}
      >
        {text}
      </button>
    );
  }

  if (modo === "pix" && ways.pix) {
    return (
      <PixPanel
        pix={ways.pix}
        c={c}
        variant={variant}
        className={className}
        onBack={() => ir(soPix ? "fechado" : "escolha")}
      />
    );
  }

  return (
    <div className={`${className} flex flex-col gap-2`}>
      <Legend variant={variant}>{c.plans.pay.question}</Legend>

      {ways.pix && (
        <button
          type="button"
          onClick={() => ir("pix")}
          className={`btn btn-${variant} w-full gap-2 px-2 text-[0.62rem]`}
        >
          <PixIcon />
          {c.plans.pay.pix}
        </button>
      )}

      {ways.cardBR && (
        <Button href={ways.cardBR} className="w-full gap-2 px-2 text-[0.62rem]">
          <CardIcon />
          {c.plans.pay.cardBR}
        </Button>
      )}

      {ways.card && (
        <Button href={ways.card} className="w-full gap-2 px-2 text-[0.62rem]">
          <CardIcon />
          {c.plans.pay.card}
        </Button>
      )}

      <BackLink variant={variant} onClick={() => ir("fechado")}>
        {c.plans.pay.cancel}
      </BackLink>
    </div>
  );
}

/** O título pequeno em maiúsculas que abre a escolha e a tela do Pix. */
function Legend({
  variant,
  children,
}: {
  variant: "key" | "ruby";
  children: React.ReactNode;
}) {
  return (
    <p
      className={`text-center text-[0.58rem] font-bold tracking-[0.18em] uppercase ${
        variant === "ruby" ? "text-gold-label" : "text-onmetal-soft"
      }`}
    >
      {children}
    </p>
  );
}

function BackLink({
  variant,
  onClick,
  children,
}: {
  variant: "key" | "ruby";
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`pt-0.5 text-[0.58rem] font-bold tracking-[0.16em] uppercase transition-colors ${
        variant === "ruby"
          ? "text-gold-label/70 hover:text-gold-bright"
          : "text-onmetal-soft/70 hover:text-onmetal"
      }`}
    >
      {children}
    </button>
  );
}

/**
 * A tela do Pix copia e cola.
 *
 * O código não é um link: quem abre é o aplicativo do banco da pessoa, então o
 * que a página precisa fazer é mostrar o valor, deixar copiar num toque e
 * dizer o que fazer depois. O valor aparece grande de propósito, para a pessoa
 * conferir antes de pagar.
 */
function PixPanel({
  pix,
  c,
  variant,
  className,
  onBack,
}: {
  pix: { code: string; amount: string };
  c: Content;
  variant: "key" | "ruby";
  className: string;
  onBack: () => void;
}) {
  const [copiado, setCopiado] = useState(false);

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(pix.code);
      setCopiado(true);
      window.setTimeout(() => setCopiado(false), 2500);
    } catch {
      // Sem permissão para a área de transferência: o código está na tela e a
      // pessoa consegue selecionar à mão, então não há o que avisar.
      setCopiado(false);
    }
  };

  return (
    <div className={`${className} flex flex-col gap-2`}>
      <Legend variant={variant}>{c.plans.pay.pixTitle}</Legend>

      <p
        className={`text-center text-base font-bold ${
          variant === "ruby" ? "text-gold-bright" : "text-onmetal"
        }`}
      >
        {pix.amount}
      </p>

      <p
        className={`max-h-16 overflow-y-auto rounded-sm px-2 py-1.5 text-center font-mono text-[0.5rem] leading-relaxed break-all ${
          variant === "ruby"
            ? "bg-black/40 text-gold-label"
            : "bg-black/20 text-onmetal-soft"
        }`}
      >
        {pix.code}
      </p>

      <button
        type="button"
        onClick={copiar}
        className={`btn btn-${variant} w-full gap-2 px-2 text-[0.62rem]`}
      >
        <PixIcon />
        {copiado ? c.plans.pay.pixCopied : c.plans.pay.pixCopy}
      </button>

      <p
        className={`text-center text-[0.55rem] leading-relaxed ${
          variant === "ruby" ? "text-gold-label/80" : "text-onmetal-soft"
        }`}
      >
        {c.plans.pay.pixHelp}
      </p>

      <BackLink variant={variant} onClick={onBack}>
        {c.plans.pay.cancel}
      </BackLink>
    </div>
  );
}
