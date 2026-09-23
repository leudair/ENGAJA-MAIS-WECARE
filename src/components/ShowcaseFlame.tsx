"use client";

import type { ReactNode } from "react";
import { FlameWrap } from "./flame-wrap/FlameWrap";

/**
 * Fogo em volta do card do Executivo Black.
 *
 * O componente original vem em azul neon e com o fogo bem alto. Aqui ele sai
 * no vermelho da página, mais baixo e mais calmo, para o card continuar sendo
 * a coisa mais forte da tela e não virar um efeito com um plano atrás.
 *
 * O desenho é feito pela placa de vídeo e só roda quando o card está na tela.
 * Quem pediu menos animação no sistema vê o card parado, sem fogo se mexendo.
 */
export function ShowcaseFlame({ children }: { children: ReactNode }) {
  return (
    <FlameWrap
      color={[0.82, 0.14, 0.07]}
      intensity={0.55}
      height={110}
      spread={12}
      radius={23}
      speed={0.22}
      scale={0.7}
      turbulence={0.5}
      turbulenceScale={0.5}
      sparks={1.2}
      sparkSize={0.3}
      sparkDensity={0.9}
      rim={2}
      melt={3}
      distortion={6}
      smoke={0.7}
      ember={1.5}
      scorch={0}
    >
      {children}
    </FlameWrap>
  );
}
