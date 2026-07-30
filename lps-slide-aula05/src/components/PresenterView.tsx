import { AnimatePresence, motion } from "motion/react";
import type { Slide } from "@/deck";
import { SlideAtivo } from "@/components/SlideFrame";
import { mmss, useTique } from "@/lib/useDeck";

/* ═══════════════════════════════════════════════════════════════════
   Presenter view. Só existe em ?presenter=1 e nunca aparece na URL
   pública.

   Hierarquia de leitura, de cima pra baixo, na ordem em que ele precisa:

     1. DIZ       o que ele fala agora. É a única coisa que ele precisa
                  bater o olho e captar em meio segundo, então ocupa a
                  maior parte da tela e nada compete com ela;
     2. TOM       como entrega, em ouro, menor;
     3. A SEGUIR  o que vem depois, no rodapé;
     4. relógios  contador exato e tempo, no canto oposto.

   Fundo navy sólido, nunca creme: a aula é às 7h e tela clara na cara
   cansa e reflete em quem está em câmera.
   ═══════════════════════════════════════════════════════════════════ */

export function PresenterView({
  slide,
  proximoSlide,
  index,
  total,
  inicioAula,
  entrouNoSlide,
}: {
  slide: Slide;
  proximoSlide: Slide | undefined;
  index: number;
  total: number;
  inicioAula: number | null;
  entrouNoSlide: number;
}) {
  /* Um tique por segundo só aqui: a janela projetada não re-renderiza
     por causa de relógio. */
  useTique(true);
  const agora = Date.now();

  return (
    <div className="pv">
      <div className="pv__topo">
        <div>
          <span className="pv__rotulo">Aula 5 · Imersão Lucro Clínico</span>
          <div style={{ marginTop: 10, fontSize: 20, fontWeight: 600, color: "#8B93A3" }}>{slide.secao}</div>
        </div>

        {/* Miniatura da projeção: o slide de verdade escalado, não uma
            representação que pode divergir do que está no projetor. */}
        <div className="pv__mini" data-theme={slide.tema} style={{ background: "var(--bg)" }}>
          <div className="pv__mini-palco">
            <SlideAtivo>
              <div
                className="slide"
                data-theme={slide.tema}
                style={{ position: "absolute", inset: 0, background: "var(--bg)" }}
              >
                {slide.node}
              </div>
            </SlideAtivo>
          </div>
        </div>
      </div>

      {/* O DIZ troca com um corte curto: no meio da fala, transição longa
          atrapalha mais do que ajuda. */}
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", minHeight: 0 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.n}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            {/* Palavras-chave, não frase pronta: ler frase pronta na
                câmera aparece pro público. */}
            <div className="pv__diz">{slide.diz}</div>
            <div className="pv__tom">{slide.tom}</div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="pv__rodape">
        <div style={{ minWidth: 0 }}>
          <span className="pv__rotulo">a seguir</span>
          <div className="pv__proximo" style={{ marginTop: 8 }}>
            {proximoSlide ? slide.proximo : "fim"}
          </div>
        </div>

        <div className="pv__relogios">
          <div>
            <span className="pv__rotulo">slide</span>
            <div className="pv__numero" style={{ marginTop: 6 }}>
              {index + 1}
              <span style={{ color: "#6F7686", fontWeight: 600 }}>/{total}</span>
            </div>
          </div>
          <div>
            <span className="pv__rotulo">aula</span>
            <div className="pv__numero" style={{ marginTop: 6 }}>
              {inicioAula === null ? "--:--" : mmss(agora - inicioAula)}
            </div>
          </div>
          <div>
            <span className="pv__rotulo">neste slide</span>
            <div className="pv__numero" style={{ marginTop: 6, color: "#D4B96A" }}>
              {mmss(agora - entrouNoSlide)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
