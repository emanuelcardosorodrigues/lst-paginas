import type { Slide } from "@/deck";

/**
 * HUD do apresentador. Só existe com ?presenter=1.
 *
 * Duas razões pra ela nunca aparecer na URL principal:
 * um contador "14/40" em cima de um pitch de vendas conta pra plateia
 * quanto tempo ainda falta, e a direção de cena é anotação de produção.
 *
 * pointer-events fica desligado no CSS, então o clique pra avançar
 * atravessa a HUD normalmente.
 */
export function PresenterHUD({ slide, index, total }: { slide: Slide; index: number; total: number }) {
  return (
    <>
      <div className="hud hud--scene">
        <span className="hud__label">
          {slide.block} · mídia: {slide.media}
        </span>
        {slide.scene}
      </div>
      <div className="hud hud--count">
        {index + 1}
        <span className="hud__dim">/{total}</span>
      </div>
    </>
  );
}
