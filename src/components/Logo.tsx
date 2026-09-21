import { siteConfig } from "@/content";

/**
 * Logo da marca.
 *
 * Enquanto `siteConfig.logoUrl` for `null`, o site usa este lockup tipográfico:
 * monograma em anel de ouro escovado com a assinatura "Engaja Mais WeCare".
 * Assim que o arquivo oficial existir, basta apontar `logoUrl` para ele.
 */
export function Logo({
  variant = "inline",
  alt,
  className = "",
}: {
  variant?: "inline" | "stacked";
  alt: string;
  className?: string;
}) {
  const stacked = variant === "stacked";

  if (siteConfig.logoUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={siteConfig.logoUrl}
        alt={alt}
        width={831}
        height={353}
        className={`${
          stacked ? "h-24 sm:h-40 lg:h-44" : "h-8 sm:h-10"
        } w-auto drop-shadow-[0_6px_14px_rgba(0,0,0,0.45)] ${className}`}
      />
    );
  }

  return (
    <span
      className={`flex ${
        stacked ? "flex-col items-center gap-4" : "flex-row items-center gap-3"
      } ${className}`}
    >
      <span className="sr-only">{alt}</span>

      {/* Monograma: anel de ouro escovado em volta das iniciais. */}
      <span
        aria-hidden
        className={`brushed-rule flex shrink-0 items-center justify-center rounded-full ${
          stacked ? "size-16 sm:size-[4.5rem]" : "size-9"
        }`}
      >
        <span
          className={`flex items-center justify-center rounded-full bg-ink-950 font-semibold tracking-tight text-gold-100 ${
            stacked
              ? "size-[3.6rem] text-lg sm:size-[4.1rem] sm:text-xl"
              : "size-[2.05rem] text-[0.7rem]"
          }`}
        >
          WC
        </span>
      </span>

      <span
        aria-hidden
        className={`flex flex-col leading-none ${stacked ? "items-center gap-1.5" : "gap-0.5"}`}
      >
        <span
          className={`font-semibold text-white/62 uppercase ${
            stacked
              ? "text-[0.7rem] tracking-[0.42em] sm:text-xs"
              : "text-[0.6rem] tracking-[0.3em]"
          }`}
        >
          Engaja Mais
        </span>
        <span
          className={`brushed-text font-semibold tracking-tight ${
            stacked ? "text-3xl sm:text-4xl" : "text-lg sm:text-xl"
          }`}
        >
          WeCare
        </span>
      </span>
    </span>
  );
}
