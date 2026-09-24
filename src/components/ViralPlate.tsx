import Link from "next/link";
import type { Content } from "@/content/types";

/**
 * A chapa do Crescimento Viral que fica na página principal, logo antes dos
 * planos, e leva para a página da estratégia.
 *
 * Desenhada em cima da arte que o Leudair mandou em 24/09/2026: moldura de
 * ouro polido larga, miolo de obsidiana com brilho de ouro nas quinas, o
 * símbolo da WeCare em ouro à esquerda do título, e o botão redondo de
 * apertar no canto de baixo. O acabamento está em `.viral-bezel`,
 * `.viral-face` e `.viral-knob`, em `globals.css`.
 */

/**
 * O símbolo da WeCare em ouro.
 *
 * É desenho vetorial e não a logomarca de `public/logo-wecare.png`, que é
 * vermelha, tem o nome escrito junto e é imagem de pixel: em ouro ela teria
 * de ser recolorida, e o símbolo sozinho não existe recortado. Aqui ele
 * nasce na cor certa e continua nítido em qualquer tamanho.
 */
function WeCareMark({ className = "" }: { className?: string }) {
  const parts = [0, 120, 240];
  return (
    <svg viewBox="-64 -64 128 128" aria-hidden className={className}>
      <defs>
        <linearGradient id="viral-mark" x1="0" y1="0" x2="0.45" y2="1">
          <stop offset="0" stopColor="#f8e7bd" />
          <stop offset="0.36" stopColor="#dcbd7e" />
          <stop offset="0.68" stopColor="#a9854a" />
          <stop offset="1" stopColor="#e6cb96" />
        </linearGradient>
      </defs>
      <g>
        {parts.map((angle) => (
          <g key={angle} transform={`rotate(${angle})`}>
            <path
              d="M -6.9 -32.3 A 33 33 0 0 1 31.4 -10.2 L 16.2 -5.3 A 17 17 0 0 0 -3.5 -16.6 Z"
              fill="url(#viral-mark)"
            />
            <circle cx="0" cy="-47" r="14" fill="url(#viral-mark)" />
          </g>
        ))}
      </g>
    </svg>
  );
}

export function ViralPlate({ c, href }: { c: Content; href: string }) {
  return (
    <div className="viral-bezel">
      <div className="viral-face px-5 py-4 sm:px-8 sm:py-6">
        <div className="flex items-center gap-3 sm:gap-5">
          <WeCareMark className="size-20 shrink-0 sm:size-24" />
          {/* Sem trava de largura aqui. O título é pintado com um degradê
              recortado no texto, e recorte só pinta o que está dentro da
              caixa: limitar a largura corta a palavra pela metade em vez de
              quebrar a linha. No celular, que é onde a arte foi desenhada,
              ele já cai em duas linhas sozinho. */}
          <h2 className="display gold-relief text-[1.45rem] leading-[1.05] tracking-wide uppercase sm:text-[2.4rem]">
            {c.viral.title}
          </h2>
        </div>

        <div className="mt-4 flex items-end justify-between gap-4 sm:mt-5 sm:gap-8">
          <div className="min-w-0">
            <p className="text-[0.62rem] font-bold tracking-[0.2em] text-[#c9a077] uppercase sm:text-[0.72rem]">
              {c.viral.eyebrow}
            </p>
            <p className="mt-2 text-[0.72rem] leading-snug tracking-wide text-paper-dim uppercase sm:text-sm">
              {c.viral.lead}
            </p>
          </div>

          {/* O botão é redondo e fixo: na arte ele é uma peça, não uma barra
              que estica com o texto. O tamanho mínimo de toque vem daí. */}
          <Link
            href={href}
            className="viral-knob mr-1 size-[4.6rem] shrink-0 sm:size-24"
          >
            <span className="px-2 text-center text-[0.48rem] leading-tight font-bold text-balance uppercase sm:text-[0.6rem]">
              {c.viral.cta}
              <span aria-hidden> →</span>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
