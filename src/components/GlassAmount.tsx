"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

// O three.js é pesado, então ele desce depois da página, e não junto com ela.
const GlassObject = dynamic(
  () => import("./glass-object/GlassObject").then((m) => m.GlassObject),
  { ssr: false },
);

/**
 * O "até 30" da chapa do topo, levantado em vidro maciço e flutuando devagar.
 *
 * O número continua escrito no HTML e só some quando o vidro termina de
 * carregar. Assim quem estiver num aparelho sem placa de vídeo, ou com
 * animação desligada no sistema, continua vendo o dado mais importante da
 * página.
 *
 * A peça de cada idioma é `public/selo-30-<idioma>.png`, o mesmo texto escrito
 * na capitular dos títulos, com fundo vazado. As três têm a mesma moldura, por
 * isso as letras saem do mesmo tamanho em português, inglês e espanhol.
 */
export function GlassAmount({ text, src }: { text: string; src: string }) {
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
        <GlassObject
          src={src}
          tint="#2c0508"
          tintDensity={5.5}
          highlight="#f2d993"
          environmentIntensity={1.25}
          ior={1.62}
          thickness={2.6}
          roughness={0.08}
          dispersion={1.4}
          clearcoat={0.7}
          depth={0.12}
          bevel={0.06}
          scale={10.4}
          floatIntensity={1}
          rotationIntensity={0.3}
          floatSpeed={1.6}
          orbit={false}
          zoom={false}
          onLoad={() => setPronto(true)}
          className="h-full w-full"
        />
      </div>
    </div>
  );
}

export default GlassAmount;
