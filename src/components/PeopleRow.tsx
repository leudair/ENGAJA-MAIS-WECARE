import type { Content } from "@/content";

/**
 * Fileira de quem atende, no topo: quatro retratos redondos sobrepostos
 * numa cápsula preta com fio dourado.
 *
 * Os retratos são desenho, não fotografia. O Leudair pediu pessoas
 * fictícias, e desenho deixa isso honesto: ninguém olha e acredita que
 * está vendo a foto de um funcionário. Quando as fotos de verdade da
 * equipe chegarem, é só trocar cada <Retrato> por uma <img>.
 *
 * O cabelo é uma elipse desenhada antes do rosto, e o rosto é uma elipse
 * menor e mais baixa por cima dela. A sobra do cabelo em volta é o que
 * desenha o corte, o que evita os contornos à mão livre que fecham a cara
 * inteira num borrão quando a peça tem trinta pixels.
 */
type Pessoa = {
  pele: string;
  peleSombra: string;
  cabelo: string;
  roupa: string;
  fundo: string;
  tipo: "longo" | "curto" | "coque" | "barba";
};

const equipe: Pessoa[] = [
  {
    pele: "#edc19c",
    peleSombra: "#d5a67f",
    cabelo: "#33200f",
    roupa: "#7b2a2f",
    fundo: "#cfc2ae",
    tipo: "longo",
  },
  {
    pele: "#b57d51",
    peleSombra: "#9c6742",
    cabelo: "#191108",
    roupa: "#2b2b32",
    fundo: "#b9ae9c",
    tipo: "barba",
  },
  {
    pele: "#e0aa78",
    peleSombra: "#c89160",
    cabelo: "#452a15",
    roupa: "#6d4a24",
    fundo: "#c7b9a4",
    tipo: "coque",
  },
  {
    pele: "#96653f",
    peleSombra: "#7d5231",
    cabelo: "#20160c",
    roupa: "#35332f",
    fundo: "#b2a795",
    tipo: "curto",
  },
];

function Retrato({ pessoa, id }: { pessoa: Pessoa; id: string }) {
  const { pele, peleSombra, cabelo, roupa, fundo, tipo } = pessoa;

  return (
    <svg viewBox="0 0 40 40" aria-hidden className="size-full">
      <defs>
        <clipPath id={`${id}-disco`}>
          <circle cx="20" cy="20" r="20" />
        </clipPath>
        <clipPath id={`${id}-queixo`}>
          <rect x="11" y="18.6" width="18" height="12" />
        </clipPath>
      </defs>

      <g clipPath={`url(#${id}-disco)`}>
        <rect width="40" height="40" fill={fundo} />
        <rect width="40" height="40" fill="#000" opacity="0.08" />

        {/* ombros */}
        <path d="M0 40c0-7.8 8.9-12.4 20-12.4S40 32.2 40 40z" fill={roupa} />
        {/* pescoço */}
        <rect x="16.4" y="21" width="7.2" height="7" fill={peleSombra} />

        {/* cabelo por trás, com as mechas longas quando for o caso */}
        {tipo === "longo" && (
          <path
            d="M11.3 14.8h17.4c.5 5.6.2 9.6-.9 13.2h-3.1c.9-3.6 1.2-7.2 1-11H14c-.2 3.8.1 7.4 1 11h-3.1c-1.1-3.6-1.4-7.6-.9-13.2z"
            fill={cabelo}
          />
        )}
        {tipo === "coque" && <circle cx="20" cy="6" r="3.2" fill={cabelo} />}
        <ellipse cx="20" cy="15.1" rx="7.9" ry="8.5" fill={cabelo} />

        {/* rosto: menor e mais baixo, deixando o cabelo aparecer por cima */}
        <ellipse cx="20" cy="16.9" rx="6.5" ry="7.4" fill={pele} />

        {tipo === "barba" && (
          <ellipse
            cx="20"
            cy="16.9"
            rx="6.5"
            ry="7.4"
            fill={cabelo}
            opacity="0.9"
            clipPath={`url(#${id}-queixo)`}
          />
        )}

        {/* olhos e boca, só o suficiente para ler como rosto */}
        <ellipse cx="17.4" cy="16.2" rx="0.85" ry="1" fill="#241a12" />
        <ellipse cx="22.6" cy="16.2" rx="0.85" ry="1" fill="#241a12" />
        <path
          d="M17.8 20.1c.7.6 1.4.9 2.2.9s1.5-.3 2.2-.9"
          stroke="#3a2415"
          strokeWidth="0.8"
          strokeLinecap="round"
          fill="none"
          opacity={tipo === "barba" ? 0.35 : 0.75}
        />
      </g>
    </svg>
  );
}

export function PeopleRow({ c }: { c: Content }) {
  return (
    <div className="people-row obsidian obsidian-pill">
      <div className="flex items-center">
        {equipe.map((pessoa, index) => (
          <span
            key={index}
            className={`people-face ${index > 0 ? "-ml-2" : ""}`}
            style={{ zIndex: equipe.length - index }}
          >
            <Retrato pessoa={pessoa} id={`retrato-${index}`} />
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
