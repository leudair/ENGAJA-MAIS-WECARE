import type { Content } from "@/content";

/**
 * Fileira de quem atende, no topo: quatro retratos redondos sobrepostos
 * numa cápsula preta com moldura de bronze e fio dourado em cada rosto.
 *
 * As fotos são de pessoas geradas por IA, não de funcionários reais. Foi o
 * que o Leudair pediu, depois de recusar os retratos desenhados que havia
 * aqui antes. Ficam sem `alt` de propósito: a frase ao lado é quem diz o
 * que a fileira significa, e nenhuma legenda deve dar a entender que ali
 * está o retrato de uma pessoa específica da equipe.
 *
 * Os arquivos são quadrados de 160 pixels em `public/equipe-1..4.webp`,
 * recortados no rosto. Trocar por fotos de verdade é só substituir os
 * quatro arquivos, mantendo o mesmo recorte.
 */
const equipe = [
  "/equipe-1.webp",
  "/equipe-2.webp",
  "/equipe-3.webp",
  "/equipe-4.webp",
];

export function PeopleRow({ c }: { c: Content }) {
  return (
    <div className="people-row obsidian obsidian-pill">
      <div className="flex items-center">
        {equipe.map((src, index) => (
          <span
            key={src}
            className={`people-face ${index > 0 ? "-ml-2" : ""}`}
            style={{ zIndex: equipe.length - index }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt=""
              aria-hidden
              width={160}
              height={160}
              className="size-full object-cover"
            />
          </span>
        ))}
      </div>

      <p className="pr-1.5 text-xs leading-snug text-paper sm:text-[0.82rem]">
        {c.hero.people.text}{" "}
        <span className="font-bold text-gold-bright">
          {c.hero.people.strong}
        </span>
      </p>
    </div>
  );
}
