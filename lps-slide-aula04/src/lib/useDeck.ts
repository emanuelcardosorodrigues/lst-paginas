import { useCallback, useEffect, useState } from "react";

/* ── Modo apresentador ──────────────────────────────────────────────
   Só com ?presenter=1. Lido uma vez, no load: a plateia nunca pode ver
   o contador nem a direção de cena aparecerem por acidente no meio do
   pitch, então isto não é estado reativo.
   ────────────────────────────────────────────────────────────────── */
export const IS_PRESENTER =
  typeof window !== "undefined" && new URLSearchParams(window.location.search).get("presenter") === "1";

/**
 * Vídeo do slide que está no ar.
 *
 * Buscado no DOM em vez de passado por ref/contexto: o handler de teclado
 * vive no useDeck e o <video> nasce lá embaixo no AssetSlot. Uma query no
 * momento da tecla é mais simples e não amarra a árvore inteira num
 * registro de refs. Só existe um slide com aria-hidden="false".
 */
function activeVideo(): HTMLVideoElement | null {
  return document.querySelector<HTMLVideoElement>('.slide[aria-hidden="false"] video');
}

function hashIndex(total: number): number {
  if (typeof window === "undefined") return 0;
  const m = window.location.hash.match(/^#s(\d+)$/);
  if (!m) return 0;
  return Math.min(Math.max(Number(m[1]) - 1, 0), total - 1);
}

/**
 * Navegação do deck: teclado, clique e âncora na URL.
 *
 * A âncora (#s23) é pra ensaio: recarregar a página não joga o Leandro
 * de volta pro slide 1.
 */
export function useDeck(total: number) {
  const [index, setIndex] = useState(() => hashIndex(total));
  /* Só pra HUD do apresentador saber dizer que ele mesmo pausou. */
  const [videoPaused, setVideoPaused] = useState(false);

  const goTo = useCallback(
    (n: number) => setIndex(() => Math.min(Math.max(n, 0), total - 1)),
    [total]
  );
  const next = useCallback(() => setIndex((i) => Math.min(i + 1, total - 1)), [total]);
  const prev = useCallback(() => setIndex((i) => Math.max(i - 1, 0)), []);

  /* Trocar de slide zera o indicador: o AssetSlot dá play de novo no vídeo
     do slide que entra. */
  useEffect(() => setVideoPaused(false), [index]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.metaKey || e.ctrlKey || e.altKey) return;

      const fwd = ["ArrowRight", "ArrowDown", "PageDown", " ", "Spacebar", "Enter"];
      const back = ["ArrowLeft", "ArrowUp", "PageUp", "Backspace"];

      if (fwd.includes(e.key)) {
        // Espaço e PageDown rolariam o documento. Aqui não existe scroll,
        // mas o preventDefault evita que o navegador invente um.
        e.preventDefault();
        next();
      } else if (back.includes(e.key)) {
        e.preventDefault();
        prev();
      } else if (e.key === "Home") {
        e.preventDefault();
        goTo(0);
      } else if (e.key === "End") {
        e.preventDefault();
        goTo(total - 1);
      } else if (e.key === "f" || e.key === "F") {
        // Projetar do notebook praticamente exige tela cheia.
        e.preventDefault();
        if (document.fullscreenElement) void document.exitFullscreen();
        else void document.documentElement.requestFullscreen().catch(() => {});
      } else if (e.key === "p" || e.key === "P") {
        e.preventDefault();
        const v = activeVideo();
        if (!v) return;
        /* Lê a intenção ANTES de agir: pause() já deixa v.paused === true
           na mesma linha, e play() é assíncrono e ainda deixa true por um
           instante. Ler depois inverteria o indicador nos dois casos. */
        const estavaPausado = v.paused;
        if (estavaPausado) void v.play().catch(() => {});
        else v.pause();
        setVideoPaused(!estavaPausado);
      } else if (e.key === "r" || e.key === "R") {
        e.preventDefault();
        const v = activeVideo();
        if (!v) return;
        v.currentTime = 0;
        void v.play().catch(() => {});
        setVideoPaused(false);
      }
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, goTo, total]);

  /* Espelha o slide na âncora sem empilhar histórico: com pushState, uma
     hora de pitch deixaria 40 entradas e o "voltar" do navegador viraria
     uma armadilha. */
  useEffect(() => {
    const want = `#s${index + 1}`;
    if (window.location.hash !== want) {
      window.history.replaceState(null, "", want);
    }
  }, [index]);

  /* Editar a âncora na barra de endereço pula pro slide. Serve pra ensaio
     ("deixa eu ver o 22 de novo") sem ter que avançar 21 vezes.
     Não faz laço com o efeito acima: replaceState não emite hashchange. */
  useEffect(() => {
    const onHash = () => goTo(hashIndex(total));
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, [goTo, total]);

  return { index, next, prev, goTo, total, videoPaused };
}

/**
 * Escala o palco de 1920x1080 pra caber na viewport, preservando o
 * aspecto.
 *
 * Deck projetado não pode reflowar. Se o layout fosse fluido, o que o
 * Leandro ensaiou no notebook não seria o que a plateia vê no projetor:
 * uma headline que cabia em duas linhas viraria três e empurraria o
 * resto do slide. Com um palco de tamanho fixo escalado por transform,
 * cada slide é sempre a mesma composição, só maior ou menor.
 */
export function useStageScale(w = 1920, h = 1080) {
  const [scale, setScale] = useState(() =>
    typeof window === "undefined" ? 1 : Math.min(window.innerWidth / w, window.innerHeight / h)
  );

  useEffect(() => {
    // resize cobre também a entrada e a saída de tela cheia e a troca de
    // monitor/projetor no meio da apresentação.
    const onResize = () => setScale(Math.min(window.innerWidth / w, window.innerHeight / h));
    onResize();
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
    };
  }, [w, h]);

  return scale;
}
