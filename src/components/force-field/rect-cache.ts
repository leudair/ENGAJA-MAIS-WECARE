/**
 * Guarda a posição de um elemento na tela e só mede de novo quando ela pode ter
 * mudado, ou seja, quando a página rola, a janela muda de tamanho ou o próprio
 * elemento cresce.
 *
 * Medir é caro: `getBoundingClientRect` obriga o navegador a recalcular o
 * desenho da página inteira. O campo de energia consulta essa posição a cada
 * movimento do dedo ou do cursor, então medir na hora travaria a rolagem no
 * celular.
 */
export interface RectCache {
  /** Última posição conhecida do elemento. */
  readonly current: DOMRect;
  /** Para de observar e solta os ouvintes. */
  destroy: () => void;
}

export function createRectCache(element: Element): RectCache {
  let rect = element.getBoundingClientRect();

  const measure = () => {
    rect = element.getBoundingClientRect();
  };

  window.addEventListener("scroll", measure, { passive: true, capture: true });
  window.addEventListener("resize", measure, { passive: true });

  const observer = new ResizeObserver(measure);
  observer.observe(element);

  return {
    get current() {
      return rect;
    },
    destroy() {
      window.removeEventListener("scroll", measure, { capture: true });
      window.removeEventListener("resize", measure);
      observer.disconnect();
    },
  };
}
