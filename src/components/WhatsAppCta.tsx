"use client";

import { useParams } from "next/navigation";
import type { Content, Locale } from "@/content";
import { isLocale } from "@/lib/routes";
import { siteConfig } from "@/content/site";
import { codigoDaOrigem, linkDoWhatsApp } from "@/lib/rastreio";
import { LedButton } from "./ui";
import { useVendedora, useVisita } from "./VisitaProvider";

/**
 * Monta o endereço que abre a conversa no WhatsApp com a mensagem já escrita.
 *
 * O número é o da vendedora, quando a visita veio pelo endereço dela, e o
 * geral no resto dos casos. O código no fim da mensagem é o que o atendimento
 * usa para saber de onde a pessoa veio.
 */
export function useWhatsAppHref(c: Content, oferta?: string): string {
  const visita = useVisita();
  const locale = useLocale();
  const vendedora = useVendedora();
  const numero = vendedora?.whatsapp ?? siteConfig.whatsappNumber;
  const abertura = oferta ? c.whatsapp.offer : c.whatsapp.general;
  const codigo = c.whatsapp.code.replace(
    "{code}",
    codigoDaOrigem(visita, locale, oferta),
  );
  return linkDoWhatsApp(numero, `${abertura}\n\n${codigo}`);
}

/**
 * O idioma da página, lido da rota.
 *
 * Vem daqui em vez de descer como propriedade porque o botão de oferta está
 * no fundo de três camadas de card, e carregar o idioma por todas elas só
 * para montar um endereço não se paga.
 */
function useLocale(): Locale {
  const bruto = useParams().locale;
  const valor = Array.isArray(bruto) ? bruto[0] : bruto;
  return isLocale(valor ?? "") ? (valor as Locale) : "pt";
}

/** O botão de conversa que fecha a página, já com a mensagem pronta. */
export function WhatsAppCta({ c, label }: { c: Content; label: string }) {
  return <LedButton href={useWhatsAppHref(c)}>{label}</LedButton>;
}
