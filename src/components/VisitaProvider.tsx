"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { VendedoraData } from "@/content/vendedoras-data";
import { acharVendedora } from "@/lib/vendedora";
import {
  CHAVE_VISITA,
  DIAS_DE_VALIDADE,
  lerVisita,
  visitaVaga,
  visitaVazia,
  type Visita,
} from "@/lib/rastreio";

const VisitaContext = createContext<Visita>(visitaVazia);

/** De onde esta visita veio: vendedora, variante e campanha do anúncio. */
export function useVisita(): Visita {
  return useContext(VisitaContext);
}

/** A vendedora desta visita, já achada na lista. */
export function useVendedora(): VendedoraData | null {
  return acharVendedora(useVisita().vendedora);
}

const UM_DIA = 24 * 60 * 60 * 1000;

/** Lê a visita guardada, se ainda estiver dentro do prazo. */
function visitaGuardada(): Visita | null {
  try {
    const bruto = window.localStorage.getItem(CHAVE_VISITA);
    if (!bruto) return null;
    const salvo = JSON.parse(bruto) as { visita?: unknown; quando?: unknown };
    if (typeof salvo.quando !== "number") return null;
    if (Date.now() - salvo.quando > DIAS_DE_VALIDADE * UM_DIA) return null;
    const visita = salvo.visita as Partial<Visita> | undefined;
    if (!visita || typeof visita !== "object") return null;
    return { ...visitaVazia, ...visita };
  } catch {
    // Navegador anônimo, armazenamento bloqueado ou conteúdo estragado: a
    // visita vale como se fosse a primeira, que é o comportamento certo.
    return null;
  }
}

function guardarVisita(visita: Visita): void {
  try {
    window.localStorage.setItem(
      CHAVE_VISITA,
      JSON.stringify({ visita, quando: Date.now() }),
    );
  } catch {
    // Sem onde guardar: a origem ainda vale nesta página, só não sobrevive a
    // uma volta sem os parâmetros no endereço.
  }
}

/**
 * Descobre de onde a pessoa chegou e lembra disso.
 *
 * O site é estático, então o endereço só pode ser lido aqui, no navegador. A
 * primeira pintura sai sempre sem origem e a troca acontece logo depois.
 * Ninguém vê a diferença, porque a origem só é usada no clique.
 *
 * Endereço com parâmetro ganha do que estava guardado, porque é a visita mais
 * recente. Endereço limpo não apaga nada: quem recebeu o link no WhatsApp,
 * pensou e voltou dias depois pelo histórico continua contando para a mesma
 * vendedora e para o mesmo anúncio.
 */
export function VisitaProvider({ children }: { children: React.ReactNode }) {
  const [visita, setVisita] = useState<Visita>(visitaVazia);

  useEffect(() => {
    const doEndereco = lerVisita(window.location.search);
    if (!visitaVaga(doEndereco)) {
      guardarVisita(doEndereco);
      setVisita(doEndereco);
      return;
    }
    setVisita(visitaGuardada() ?? visitaVazia);
  }, []);

  return (
    <VisitaContext.Provider value={visita}>{children}</VisitaContext.Provider>
  );
}

/**
 * Fixa a variante da página para o rastreio.
 *
 * A versão B mora num endereço próprio e não traz `?ab=` nenhum, então quem
 * diz que aquilo é a B é a própria página. Um `?ab=` no endereço continua
 * ganhando, para dar para forçar uma variante na hora de conferir.
 */
export function VarianteFixa({
  valor,
  children,
}: {
  valor: string;
  children: React.ReactNode;
}) {
  const visita = useVisita();
  const comVariante = useMemo(
    () => ({ ...visita, variante: visita.variante ?? valor }),
    [visita, valor],
  );
  return (
    <VisitaContext.Provider value={comVariante}>
      {children}
    </VisitaContext.Provider>
  );
}

/**
 * A marca discreta no rodapé, com o código de quem trouxe a visita.
 *
 * Só aparece quando há vendedora. Serve para conferir que o endereço pegou,
 * sem dizer nada a quem está comprando.
 */
export function VendedoraMarca() {
  const vendedora = useVendedora();
  if (!vendedora) return null;
  return <span className="text-paper-weak/60"> {vendedora.codigo}</span>;
}
