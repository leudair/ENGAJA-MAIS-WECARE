"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Pega a chapa inteira e deixa ela girar com o dedo, sem mexer em nada do
 * que está dentro dela.
 *
 * O Leudair mandou o componente `DitheredObject`, em three.js, e pediu esse
 * movimento. Aquele componente desenha um arquivo pronto, imagem ou modelo,
 * dentro de uma tela de WebGL: o "até 30" e as outras linhas virariam
 * textura, e o efeito de pontinhos ainda apaga a cor e o contraste. Como ele
 * mesmo colocou a legibilidade como condição, o giro aqui é feito na própria
 * chapa, em CSS 3D. O texto continua texto, o bronze continua sendo o mesmo
 * da paleta, e o movimento é exatamente o que ele descreveu.
 *
 * Duas armadilhas de celular resolvidas aqui:
 *
 * 1. `touch-action: pan-y` na caixa de fora. Sem isso, a chapa engole o
 *    arrasto vertical e a pessoa não consegue mais rolar a página com o dedo
 *    em cima dela. Com isso, arrastar para o lado gira e arrastar para cima
 *    e para baixo rola a página, que é o que se espera.
 * 2. O giro é limitado a `MAX_TILT` graus. Passando disso o texto deita
 *    demais e deixa de ser legível numa tela pequena.
 *
 * A deriva parada é lenta de propósito, e só existe para a peça convidar ao
 * toque. Ela some com `prefers-reduced-motion` e quando a chapa sai da tela.
 */
const MAX_TILT = 15;
const DRAG_SENSITIVITY = 0.32;
const IDLE_TILT_Y = 3.5;
const IDLE_TILT_X = 2;
const IDLE_PERIOD = 17000;
const DECIDE_THRESHOLD = 6;
const GRAB_EASE = 0.35;
const RELEASE_EASE = 0.12;

export function TiltPlate({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const frameRef = useRef<HTMLDivElement>(null);
  const plateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const frame = frameRef.current;
    const plate = plateRef.current;
    if (!frame || !plate) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    let dragX = 0;
    let dragY = 0;
    let currentX = 0;
    let currentY = 0;
    let pointerId: number | null = null;
    let holding = false;
    let startX = 0;
    let startY = 0;
    let inView = true;
    let raf = 0;
    let lastTime = 0;

    const clamp = (value: number) =>
      Math.max(-MAX_TILT, Math.min(MAX_TILT, value));

    // A volta para o lugar é feita aqui, a cada quadro, e não com uma
    // transição de CSS. Como este laço reescreve o `transform` sempre, uma
    // transição ficaria sendo reapontada quadro a quadro e a chapa nunca
    // terminava de voltar.
    //
    // O amortecimento é corrigido pelo tempo entre quadros, senão a chapa
    // volta mais devagar num aparelho lento do que num rápido.
    const draw = (time: number) => {
      raf = requestAnimationFrame(draw);
      const delta = lastTime ? Math.min((time - lastTime) / 1000, 0.1) : 1 / 60;
      lastTime = time;

      let targetX = dragX;
      let targetY = dragY;

      if (!holding && !motionQuery.matches) {
        const phase = (time / IDLE_PERIOD) * Math.PI * 2;
        targetX += Math.sin(phase) * IDLE_TILT_X;
        targetY += Math.cos(phase * 0.7) * IDLE_TILT_Y;
      }

      const base = holding ? GRAB_EASE : RELEASE_EASE;
      const ease = 1 - Math.pow(1 - base, delta * 60);
      currentX += (targetX - currentX) * ease;
      currentY += (targetY - currentY) * ease;

      plate.style.transform = `rotateX(${currentX.toFixed(2)}deg) rotateY(${currentY.toFixed(2)}deg)`;
    };

    const start = () => {
      if (raf || !inView) return;
      raf = requestAnimationFrame(draw);
    };

    const stop = () => {
      if (!raf) return;
      cancelAnimationFrame(raf);
      raf = 0;
      lastTime = 0;
    };

    const onPointerDown = (event: PointerEvent) => {
      if (pointerId !== null) return;
      pointerId = event.pointerId;
      startX = event.clientX;
      startY = event.clientY;
      // No mouse a chapa já é minha: não existe rolagem competindo com o
      // arrasto. No dedo eu espero para ver para onde a pessoa foi.
      if (event.pointerType === "mouse") {
        holding = true;
        frame.setPointerCapture(pointerId);
      } else {
        holding = false;
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerId !== pointerId) return;
      const dx = event.clientX - startX;
      const dy = event.clientY - startY;

      // Até decidir, o dedo não é meu. Se a pessoa foi para cima ou para
      // baixo, ela quer rolar a página, e eu saio da frente. Prender o
      // ponteiro antes disso é o que trava a rolagem em cima da chapa.
      if (!holding) {
        if (
          Math.abs(dx) < DECIDE_THRESHOLD &&
          Math.abs(dy) < DECIDE_THRESHOLD
        ) {
          return;
        }
        if (Math.abs(dy) >= Math.abs(dx)) {
          pointerId = null;
          return;
        }
        holding = true;
        frame.setPointerCapture(event.pointerId);
      }

      dragY = clamp(dx * DRAG_SENSITIVITY);
      dragX = clamp(-dy * DRAG_SENSITIVITY);
    };

    // Solta e volta sozinha para a posição de descanso, que é o que faz a
    // peça parecer presa por uma mola e não largada de qualquer jeito.
    const onPointerEnd = (event: PointerEvent) => {
      if (event.pointerId !== pointerId) return;
      if (holding && frame.hasPointerCapture(pointerId)) {
        frame.releasePointerCapture(pointerId);
      }
      pointerId = null;
      holding = false;
      dragX = 0;
      dragY = 0;
    };

    const viewObserver = new IntersectionObserver((entries) => {
      inView = entries[entries.length - 1]?.isIntersecting ?? true;
      if (inView) start();
      else stop();
    });
    viewObserver.observe(frame);

    frame.addEventListener("pointerdown", onPointerDown);
    frame.addEventListener("pointermove", onPointerMove);
    frame.addEventListener("pointerup", onPointerEnd);
    frame.addEventListener("pointercancel", onPointerEnd);
    start();

    return () => {
      stop();
      viewObserver.disconnect();
      frame.removeEventListener("pointerdown", onPointerDown);
      frame.removeEventListener("pointermove", onPointerMove);
      frame.removeEventListener("pointerup", onPointerEnd);
      frame.removeEventListener("pointercancel", onPointerEnd);
    };
  }, []);

  return (
    <div
      ref={frameRef}
      className={`tilt-frame ${className}`}
      style={{ touchAction: "pan-y" }}
    >
      <div ref={plateRef} className="tilt-plate">
        {children}
      </div>
    </div>
  );
}
