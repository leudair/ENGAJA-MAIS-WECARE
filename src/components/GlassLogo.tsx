"use client";

import dynamic from "next/dynamic";

// O componente carrega o three.js inteiro, que é pesado. Com ssr: false e
// carregamento tardio ele só desce quando a pessoa chega perto do fim da
// página, e o primeiro carregamento do site continua leve.
const GlassObject = dynamic(
  () => import("./glass-object/GlassObject").then((m) => m.GlassObject),
  { ssr: false },
);

/**
 * O nome WeCare em vidro maciço, balançando devagar, no fecho da página.
 *
 * A peça é `public/marca-wecare.png`, o nome escrito na mesma capitular dos
 * títulos do site, com fundo vazado. A logo original não serve aqui: o vidro
 * é levantado a partir do contorno da imagem, e as letras miúdas dela viram
 * um borrão.
 *
 * Duas mudanças em relação ao que ele mandou: o realce vinha azul, que a
 * direção visual da página proíbe, e passou para o ouro; e o giro pelo dedo
 * está desligado, junto com `pointerEvents: none`, porque a tela do
 * componente usa `touch-action: none` e prenderia a rolagem do celular em
 * cima dela.
 */
export function GlassLogo({ alt }: { alt: string }) {
  return (
    <div
      aria-label={alt}
      role="img"
      className="pointer-events-none mx-auto h-28 w-full max-w-3xl select-none sm:h-36"
    >
      <GlassObject
        src="/marca-wecare.png"
        tint="#b5181f"
        tintDensity={1.7}
        highlight="#f2d993"
        environmentIntensity={0.95}
        ior={1.6}
        thickness={2.4}
        roughness={0.06}
        dispersion={1.6}
        clearcoat={0.6}
        depth={0.09}
        bevel={0.05}
        scale={8.2}
        floatIntensity={0.45}
        rotationIntensity={0.14}
        floatSpeed={1.3}
        orbit={false}
        zoom={false}
        className="h-full w-full"
      />
    </div>
  );
}

export default GlassLogo;
