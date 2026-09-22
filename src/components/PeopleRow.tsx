import type { Content } from "@/content";

/**
 * Fileira de pessoas do topo: discos de metal sobrepostos numa cápsula
 * preta com fio dourado.
 *
 * Os discos são um desenho, não retratos: não usamos foto de banco de
 * imagem fingindo ser cliente nem foto de gente de verdade, porque a
 * identidade de quem contrata fica preservada. E a frase ao lado é um
 * fato já definido, não um número de clientes que a gente não tem.
 */
const discMetal = ["metal-gold", "metal-silver", "metal-bronze", "metal-gold"];

function PersonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className="size-4">
      <circle cx="12" cy="8.2" r="3.6" fill="currentColor" />
      <path
        d="M4.6 20.4c0-3.9 3.3-6.6 7.4-6.6s7.4 2.7 7.4 6.6"
        fill="currentColor"
      />
    </svg>
  );
}

export function PeopleRow({ c }: { c: Content }) {
  return (
    <div className="people-row">
      <div className="flex items-center">
        {discMetal.map((metal, index) => (
          <span
            key={index}
            className={`people-disc metal ${metal} ${index > 0 ? "-ml-2.5" : ""}`}
            style={{ zIndex: discMetal.length - index }}
            aria-hidden
          >
            <span className="text-onmetal/80">
              <PersonIcon />
            </span>
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
