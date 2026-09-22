/**
 * Ícone de cada serviço entregue por publicação, na ordem de
 * `plans.metricLabels`: visualizações, curtidas, compartilhamentos,
 * repostagens e comentários.
 *
 * São desenho, não botão: ninguém clica neles e eles não contam nada. Um
 * contador de curtida numa página de venda seria um número inventado.
 */
export type MetricIconName =
  | "views"
  | "likes"
  | "shares"
  | "reposts"
  | "comments";

/** Na mesma ordem de `plans.metricLabels`, para casar pelo índice. */
export const metricIconOrder: readonly MetricIconName[] = [
  "views",
  "likes",
  "shares",
  "reposts",
  "comments",
];

const paths: Record<MetricIconName, React.ReactNode> = {
  views: (
    <>
      <path
        d="M1.6 8S4 3.6 8 3.6 14.4 8 14.4 8 12 12.4 8 12.4 1.6 8 1.6 8Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="8" cy="8" r="2.1" fill="currentColor" />
    </>
  ),
  likes: (
    <path
      d="M8 13.4S2.2 10 2.2 6.3a3 3 0 0 1 5.8-1.1 3 3 0 0 1 5.8 1.1c0 3.7-5.8 7.1-5.8 7.1Z"
      fill="currentColor"
    />
  ),
  shares: (
    <>
      <circle cx="12.2" cy="3.9" r="1.9" fill="currentColor" />
      <circle cx="3.8" cy="8" r="1.9" fill="currentColor" />
      <circle cx="12.2" cy="12.1" r="1.9" fill="currentColor" />
      <path
        d="m5.5 7.1 5-2.4m-5 4.2 5 2.4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </>
  ),
  reposts: (
    <>
      <path
        d="M3.4 6.2V5a1.6 1.6 0 0 1 1.6-1.6h6.2M12.6 9.8V11a1.6 1.6 0 0 1-1.6 1.6H4.8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="m9.6 1.8 2 1.6-2 1.6M6.4 10.6l-2 1.6 2 1.6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
  comments: (
    <path
      d="M2.4 7.3c0-2.3 2.5-4.1 5.6-4.1s5.6 1.8 5.6 4.1-2.5 4.2-5.6 4.2c-.5 0-1-.1-1.5-.2l-2.8 1.4.7-2.3a3.9 3.9 0 0 1-2-3.1Z"
      fill="currentColor"
    />
  ),
};

export function MetricIcon({ name }: { name: MetricIconName }) {
  return (
    <span className="metric-icon" aria-hidden>
      <svg viewBox="0 0 16 16" fill="none" className="size-3.5">
        {paths[name]}
      </svg>
    </span>
  );
}
