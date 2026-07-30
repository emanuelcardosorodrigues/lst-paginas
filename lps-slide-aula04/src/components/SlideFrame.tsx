import { motion } from "motion/react";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { IN, OUT, useSlideVariants } from "@/lib/motion";

/* O slide ativo é distribuído por contexto em vez de prop: sem isso todo
   componente de slide teria que receber e repassar `active`, e o registro
   dos 40 slides em deck.tsx viraria uma parede de props. */
const ActiveCtx = createContext(false);
export const useSlideActive = () => useContext(ActiveCtx);

export type Theme = "light" | "dark";

export function SlideFrame({
  theme,
  active,
  near,
  bleed = false,
  stagger = 0.09,
  delayChildren = 0.06,
  children,
}: {
  theme: Theme;
  active: boolean;
  /** Vizinho imediato do slide ativo: fica no DOM pra ter animação de saída
   *  e pra pré-carregar a mídia do próximo. */
  near: boolean;
  bleed?: boolean;
  stagger?: number;
  delayChildren?: number;
  children: ReactNode;
}) {
  const { container } = useSlideVariants(stagger, delayChildren);

  /* Estado de entrada, para que a animação de conteúdo:
     - não rode adiantada no slide que ainda vai entrar (ele está no DOM);
     - não pisque de volta pro estado inicial durante o fade de saída;
     - rode de novo quando o Leandro voltar num slide no ensaio.
     Por isso o reset só acontece quando o slide sai da janela de vizinhos,
     ou seja, quando já está invisível. */
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (active) setShown(true);
  }, [active]);

  useEffect(() => {
    if (!near) setShown(false);
  }, [near]);

  return (
    <motion.section
      data-theme={theme}
      className={bleed ? "slide slide--bleed" : "slide"}
      aria-hidden={!active}
      inert={!active ? true : undefined}
      initial={false}
      animate={{ opacity: active ? 1 : 0 }}
      transition={active ? IN : OUT}
      style={{
        // Fora da janela de vizinhos o slide sai do fluxo de paint por
        // completo: 40 camadas empilhadas custariam composição a cada frame.
        display: near ? "flex" : "none",
        pointerEvents: active ? "auto" : "none",
        zIndex: active ? 2 : 1,
      }}
    >
      <ActiveCtx.Provider value={active}>
        <motion.div
          variants={container}
          initial="hide"
          animate={shown ? "show" : "hide"}
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {children}
        </motion.div>
      </ActiveCtx.Provider>
    </motion.section>
  );
}
