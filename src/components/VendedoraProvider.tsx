"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { VendedoraData } from "@/content/vendedoras-data";
import {
  acharVendedora,
  CHAVE_VENDEDORA,
  DIAS_DE_VALIDADE,
  PARAMETRO_VENDEDORA,
} from "@/lib/vendedora";

const VendedoraContext = createContext<VendedoraData | null>(null);

/** Quem vendeu esta visita, ou nada quando a pessoa chegou pelo site geral. */
export function useVendedora(): VendedoraData | null {
  return useContext(VendedoraContext);
}

const UM_DIA = 24 * 60 * 60 * 1000;

/** Lê o código guardado, se ainda estiver dentro do prazo. */
function codigoGuardado(): string | null {
  try {
    const bruto = window.localStorage.getItem(CHAVE_VENDEDORA);
    if (!bruto) return null;
    const { codigo, quando } = JSON.parse(bruto) as {
      codigo?: unknown;
      quando?: unknown;
    };
    if (typeof codigo !== "string" || typeof quando !== "number") return null;
    if (Date.now() - quando > DIAS_DE_VALIDADE * UM_DIA) return null;
    return codigo;
  } catch {
    // Navegador anônimo, armazenamento bloqueado ou conteúdo estragado: a
    // visita vale como se fosse a primeira, que é o comportamento certo.
    return null;
  }
}

function guardarCodigo(codigo: string): void {
  try {
    window.localStorage.setItem(
      CHAVE_VENDEDORA,
      JSON.stringify({ codigo, quando: Date.now() }),
    );
  } catch {
    // Sem onde guardar: o código ainda vale nesta visita, só não sobrevive a
    // uma volta sem o endereço completo.
  }
}

/**
 * Descobre por qual vendedora a pessoa chegou.
 *
 * O site é estático, então o endereço só pode ser lido aqui, no navegador. A
 * primeira pintura sai sempre com os links gerais e, logo depois, a troca
 * acontece. Ninguém vê a diferença, porque o link só é usado no clique.
 */
export function VendedoraProvider({ children }: { children: React.ReactNode }) {
  const [vendedora, setVendedora] = useState<VendedoraData | null>(null);

  useEffect(() => {
    const doEndereco = new URLSearchParams(window.location.search).get(
      PARAMETRO_VENDEDORA,
    );
    const achada = acharVendedora(doEndereco);
    if (achada) {
      guardarCodigo(achada.codigo);
      setVendedora(achada);
      return;
    }
    setVendedora(acharVendedora(codigoGuardado()));
  }, []);

  return (
    <VendedoraContext.Provider value={vendedora}>
      {children}
    </VendedoraContext.Provider>
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
  return <span className="text-paper-weak/60">{vendedora.codigo}</span>;
}
