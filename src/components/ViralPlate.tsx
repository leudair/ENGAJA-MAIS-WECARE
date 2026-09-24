import Link from "next/link";
import type { Content } from "@/content/types";

/**
 * A chapa do Crescimento Viral que fica na página principal, logo antes dos
 * planos, e leva para a página da estratégia.
 *
 * Copiada da arte que o Leudair mandou em 24/09/2026, peça por peça:
 *
 * - moldura de bronze com perfil de porta-retrato, em dois degraus;
 * - o miolo de obsidiana NÃO vai até a borda. Ele para antes, e a faixa de
 *   bronze que sobra à direita é onde o botão se assenta. Na arte o botão
 *   não fica em cima do preto, e é isso que dá o ar de painel de máquina;
 * - o botão é um cilindro assentado num colar afundado;
 * - o símbolo da WeCare em ouro à esquerda do título.
 *
 * O acabamento está em `.viral-frame`, `.viral-frame-in`, `.viral-face`,
 * `.viral-knob-base` e `.viral-knob`, em `globals.css`.
 */
export function ViralPlate({ c, href }: { c: Content; href: string }) {
  return (
    <div className="viral-frame">
      <div className="viral-frame-in flex items-center">
        <div className="viral-face min-w-0 flex-1 px-3.5 py-4 sm:px-6 sm:py-6">
          <div className="flex items-center gap-2 sm:gap-4">
            {/*
             * O símbolo da WeCare em ouro. É a logomarca do projeto com o
             * vermelho trocado por uma rampa de bronze, e não um desenho
             * novo: a peça tem verniz, parede e sombra próprios, e desenhar
             * isso de novo em vetor nunca fica igual.
             */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/marca-wecare-ouro.webp"
              alt=""
              aria-hidden
              width={400}
              height={425}
              className="h-14 w-auto shrink-0 sm:h-24"
            />
            <h2 className="display gold-relief text-[1.2rem] leading-[1.05] tracking-wide uppercase sm:text-[2.1rem]">
              {c.viral.title}
            </h2>
          </div>

          <p className="mt-4 text-[0.58rem] font-bold tracking-[0.2em] text-[#d3a97e] uppercase sm:mt-6 sm:text-[0.72rem]">
            {c.viral.eyebrow}
          </p>
          <p className="mt-1.5 text-[0.66rem] leading-snug tracking-wide text-paper-dim uppercase sm:text-sm">
            {c.viral.lead}
          </p>
        </div>

        {/* A faixa de bronze da direita: é o fundo do `.viral-frame-in` que
            aparece aqui, e é onde o botão se apoia, como na arte. */}
        <div className="-ml-6 shrink-0 pr-0.5 sm:-ml-10 sm:pr-2">
          <span className="viral-knob-base size-[4.9rem] sm:size-32">
            <Link
              href={href}
              className="viral-knob size-[3.9rem] sm:size-[6.6rem]"
            >
              <span className="px-1 text-center text-[0.42rem] leading-tight font-bold text-balance uppercase sm:text-[0.6rem]">
                {c.viral.cta}
                <span aria-hidden> →</span>
              </span>
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}
