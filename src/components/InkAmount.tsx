"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

// O three.js é pesado, então ele desce depois da página, e não junto com ela.
const InkObject = dynamic(
  () => import("./ink-object/InkObject").then((m) => m.InkObject),
  { ssr: false },
);

/**
 * O "até 30" da chapa do topo, levantado em relevo e desenhado a traço, como
 * uma gravura, flutuando devagar.
 *
 * O número continua escrito no HTML e só some quando o desenho termina de
 * carregar. Assim quem estiver num aparelho sem placa de vídeo, ou com animação
 * desligada no sistema, continua vendo o dado mais importante da página.
 *
 * A peça de cada idioma é `public/selo-30-<idioma>.svg`, o mesmo texto escrito
 * na capitular dos títulos, com fundo vazado. As três têm a mesma moldura, por
 * isso as letras saem do mesmo tamanho em português, inglês e espanhol. O
 * arquivo é SVG e não PNG de propósito: o componente só acende a luz do estúdio
 * em peça vetorial, e sem luz o relevo não tem sombra nenhuma para o traço
 * seguir, o que deixaria as letras como manchas chapadas.
 */
export function InkAmount({ text, src }: { text: string; src: string }) {
  const [pronto, setPronto] = useState(false);

  return (
    <div className="relative mt-5 h-[5.2rem] sm:h-[6rem]">
      <span
        className={`display num-emboss absolute inset-0 flex items-center justify-center text-[3.4rem] leading-none text-onmetal transition-opacity duration-500 sm:text-[4rem] ${
          pronto ? "opacity-0" : "opacity-100"
        }`}
        aria-hidden={pronto}
      >
        {text}
      </span>

      {/* pointer-events-none: a tela do componente usa touch-action none para
          poder girar com o dedo, e isso prenderia a rolagem do celular. */}
      <div
        className="pointer-events-none absolute inset-0 select-none"
        aria-label={pronto ? text : undefined}
        role={pronto ? "img" : undefined}
      >
        <InkObject
          src={src}
          inkColor="#150c06"
          lineSpacing={2.6}
          strokeWeight={1.1}
          angle={-18}
          dashLength={40}
          variation={0}
          bleed={0.08}
          grain={0.03}
          wobble={0.05}
          relief={0.35}
          depth={0.05}
          contrast={4.2}
          threshold={0.05}
          softness={0.25}
          highlight="#f2d993"
          environmentIntensity={0.7}
          roughness={0.45}
          scale={10.4}
          floatIntensity={0.7}
          rotationIntensity={0.12}
          floatSpeed={1.4}
          fov={26}
          cameraDistance={9.5}
          orbit={false}
          zoom={false}
          onLoad={() => setPronto(true)}
          className="h-full w-full"
        />
      </div>
    </div>
  );
}

export default InkAmount;
