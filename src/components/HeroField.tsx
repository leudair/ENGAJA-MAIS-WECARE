"use client";

import { useEffect, useRef } from "react";
import {
  createForceField,
  type ForceFieldInstance,
  type ForceFieldOptions,
} from "./force-field/ForceField";

/**
 * Campo de energia atrás do topo da página: uma colmeia de hexágonos que
 * acende em volta do dedo e solta um anel quando a pessoa toca na tela.
 *
 * O código original vem em azul neon e cobre a página inteira. Aqui ele é
 * dourado, fraco, e só existe atrás do topo, por três motivos:
 *
 * 1. A direção visual da página proíbe brilho neon, e a página é preta com
 *    metais. Azul brigaria com o ouro dos planos.
 * 2. O efeito desenha a tela inteira pela placa de vídeo a cada quadro. Preso
 *    ao topo, ele para sozinho assim que a pessoa rola para os planos, então
 *    não esquenta o celular enquanto ela lê os preços.
 * 3. Os preços e as chapas de metal precisam ficar limpos. Fundo animado atrás
 *    de número é o tipo de coisa que faz a pessoa desconfiar do valor.
 *
 * Quem tem "reduzir movimento" ligado no aparelho vê a colmeia parada, e quem
 * está num navegador sem WebGL2 não vê nada, sem quebrar o topo.
 */
const options: ForceFieldOptions = {
  shape: "hexagon",
  // Ouro da página, não o azul do código original.
  color: [1, 0.79, 0.4],
  edgeColor: [1, 0.93, 0.74],
  opacity: 0.46,
  cellScale: 13,
  lineWidth: 0.045,
  // Fraco parado, acende no toque: fundo, não protagonista.
  gridOpacity: 0.09,
  gridReveal: "both",
  gridRevealStrength: 0.95,
  gridRevealRadius: 260,
  gridFade: 0.5,
  flashSpeed: 0.35,
  flashIntensity: 0.05,
  // Sem névoa e sem ruído de energia: são os dois trechos mais caros do
  // desenho, e aqui não há página por baixo para deformar.
  flowIntensity: 0,
  haze: 0,
  refraction: 0,
  aberration: 0,
  pageReact: 0,
  tint: 0,
  dim: 0,
  edgeGlow: 0.3,
  edgeFalloff: 0.3,
  rippleSpeed: 0.55,
  rippleWidth: 0.05,
  rippleDuration: 1.8,
  rippleIntensity: 0.55,
  rippleMaxRadius: 0.95,
  impactRadius: 0.2,
  hoverGlow: 0.35,
  hoverRadius: 320,
  hoverCharge: 1.2,
  bloom: 0.55,
  bloomThreshold: 0.35,
  grain: 0.1,
  clickRipples: true,
};

export function HeroField() {
  const layer = useRef<HTMLDivElement | null>(null);
  const canvas = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const output = canvas.current;
    // O toque é lido na seção inteira do topo, não só na área do desenho, para
    // o anel nascer embaixo do dedo mesmo em cima do texto e do botão.
    const content = layer.current?.parentElement;
    if (!output || !content) return;

    let field: ForceFieldInstance | null = null;
    // Quadro em branco só para satisfazer a interface: a captura do HTML pela
    // tela depende de um recurso experimental que nenhum celular tem hoje, e
    // sem ele o campo desenha sozinho, que é o que queremos aqui.
    const source = document.createElement("canvas");

    // Espera o primeiro desenho da página para medir a altura certa do topo.
    const id = requestAnimationFrame(() => {
      field = createForceField({ source, content, output }, options);
    });

    return () => {
      cancelAnimationFrame(id);
      field?.destroy();
    };
  }, []);

  return (
    <div
      ref={layer}
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      <canvas ref={canvas} className="h-full w-full" />
    </div>
  );
}
