import { motion } from "motion/react";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { IN, OUT, useSlideVariants } from "@/lib/motion";

/* O slide ativo é distribuído por contexto: sem isso todo componente de
   slide teria que receber e repassar `active`, e o registro dos 30 slides
   em deck.tsx viraria uma parede de props. */
const AtivoCtx = createContext(false);
export const useSlideActive = () => useContext(AtivoCtx);

/** Usado pela miniatura do presenter, que renderiza o slide sempre ativo. */
export function SlideAtivo({ children }: { children: ReactNode }) {
  return <AtivoCtx.Provider value={true}>{children}</AtivoCtx.Provider>;
}

export type Theme = "warm" | "cold";

export function SlideFrame({
  theme,
  active,
  near,
  stagger = 0.09,
  children,
}: {
  theme: Theme;
  active: boolean;
  /** Vizinho imediato do ativo: fica no DOM pra ter animação de saída. */
  near: boolean;
  stagger?: number;
  children: ReactNode;
}) {
  const { container } = useSlideVariants(stagger);

  /* Estado de entrada, pra que a animação de conteúdo não rode adiantada
     no slide que ainda vai entrar, não pisque de volta durante o fade de
     saída, e rode de novo quando ele voltar num slide no ensaio. O reset
     só acontece quando o slide sai da janela de vizinhos, ou seja, quando
     já está invisível. */
  const [entrou, setEntrou] = useState(false);
  useEffect(() => {
    if (active) setEntrou(true);
  }, [active]);
  useEffect(() => {
    if (!near) setEntrou(false);
  }, [near]);

  return (
    <motion.section
      data-theme={theme}
      className="slide"
      aria-hidden={!active}
      inert={!active ? true : undefined}
      initial={false}
      animate={{ opacity: active ? 1 : 0 }}
      transition={active ? IN : OUT}
      style={{
        /* Fora da janela de vizinhos o slide sai do paint por completo:
           30 camadas empilhadas custariam composição a cada frame. */
        display: near ? "flex" : "none",
        pointerEvents: active ? "auto" : "none",
        zIndex: active ? 2 : 1,
      }}
    >
      <AtivoCtx.Provider value={active}>
        <motion.div
          variants={container}
          initial="hide"
          animate={entrou ? "show" : "hide"}
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {children}
        </motion.div>
      </AtivoCtx.Provider>
    </motion.section>
  );
}
