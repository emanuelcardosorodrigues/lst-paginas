import { SLIDES } from "./deck";
import { SlideFrame } from "@/components/SlideFrame";
import { PresenterHUD } from "@/components/PresenterHUD";
import { IS_PRESENTER, useDeck, useStageScale } from "@/lib/useDeck";

/* Cor do letterbox. Segue o tema do slide ativo, então em 16:9 ela é
   invisível e em 16:10 (notebook) as faixas leem como matte de propósito
   em vez de moldura errada. */
const LETTERBOX: Record<string, string> = { light: "#FAF9F7", dark: "#1A1A1A" };

export default function App() {
  const { index, next, total, videoPaused } = useDeck(SLIDES.length);
  const scale = useStageScale();
  const active = SLIDES[index];

  return (
    <div
      className="deck"
      style={{ background: LETTERBOX[active.theme] }}
      /* Clique em qualquer ponto avança: é o caminho do clicker e do mouse.
         Voltar é pelas setas, como o roteiro pediu. */
      onClick={(e) => {
        if ((e.target as HTMLElement).closest("[data-no-advance]")) return;
        next();
      }}
    >
      {/* translate(-50%,-50%) usa o tamanho não transformado do palco
          (1920x1080), então ele casa com o left/top 50% do CSS e o scale
          acontece em volta do centro já centralizado. */}
      <div className="stage" style={{ transform: `translate(-50%, -50%) scale(${scale})` }}>
        {SLIDES.map((s, i) => (
          <SlideFrame
            key={s.n}
            theme={s.theme}
            active={i === index}
            /* Janela de 3: o vizinho fica no DOM pra ter fade de saída e pra
               o vídeo do próximo slide já estar carregado quando entrar. */
            near={Math.abs(i - index) <= 1}
            bleed={s.bleed}
            stagger={s.stagger}
          >
            {s.node}
          </SlideFrame>
        ))}
      </div>

      {IS_PRESENTER ? <PresenterHUD slide={active} index={index} total={total} videoPaused={videoPaused} /> : null}
    </div>
  );
}
