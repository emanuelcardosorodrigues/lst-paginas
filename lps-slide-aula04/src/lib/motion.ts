import { useReducedMotion, type Transition, type Variants } from "motion/react";
import { useMemo } from "react";

/* Curva única do deck. Mesma do pda-proposta-alex-barreira. */
export const EASE = [0.16, 1, 0.3, 1] as const;

/* Springs em vez de duração pra tudo que se move no espaço (regra 2 da
   skill motion-ui). Os valores estão calibrados pra assentar perto dos
   ~0.6s que o roteiro pediu, sem o toque mecânico de um tween. */
export const SPRING_TEXT: Transition = { type: "spring", stiffness: 190, damping: 26 };
export const SPRING_SOFT: Transition = { type: "spring", stiffness: 90, damping: 20 };
export const SPRING_POP: Transition = { type: "spring", stiffness: 320, damping: 24 };

/* Duração só pra opacidade e cor. */
export const FADE: Transition = { duration: 0.42, ease: EASE };

/* Crossfade entre slides. Saída mais curta que a entrada pra não haver
   um vale escuro no meio da troca. */
export const OUT: Transition = { duration: 0.2, ease: "linear" };
export const IN: Transition = { duration: 0.28, ease: EASE };

/**
 * Variants de entrada de conteúdo de slide.
 *
 * O par container/item existe pra orquestrar por herança: o container
 * troca de estado ("hide"/"show") e os filhos herdam, então nenhum slide
 * precisa repetir `animate` item por item.
 *
 * `stagger` é o botão que sincroniza com a fala. 0.09 pra um slide que
 * aparece de uma vez; 1.0 pro build de 3 etapas, onde cada linha tem que
 * esperar o Leandro terminar a anterior.
 */
export function useSlideVariants(stagger = 0.09, delayChildren = 0.06) {
  const reduce = useReducedMotion();

  /* Memoizado porque estes objetos são identidade pro Motion: recriar a
     cada render faz ele reavaliar variants de graça em todos os filhos. */
  return useMemo(() => {
    const container: Variants = {
      hide: {},
      show: {
        transition: { staggerChildren: reduce ? 0 : stagger, delayChildren: reduce ? 0 : delayChildren },
      },
    };

    /* Com reduced motion o conteúdo ainda entra, mas só em opacidade:
       cortar a entrada inteira deixaria o slide chapado sem motivo. */
    const item: Variants = {
      hide: { opacity: 0, y: reduce ? 0 : 24 },
      show: { opacity: 1, y: 0, transition: reduce ? FADE : SPRING_TEXT },
    };

    /* Régua de ouro que se desenha da esquerda. scaleX, nunca width. */
    const rule: Variants = {
      hide: { opacity: 0, scaleX: reduce ? 1 : 0 },
      show: { opacity: 1, scaleX: 1, transition: { duration: reduce ? 0 : 0.6, ease: EASE } },
    };

    /* Degrau / barra que cresce da base. */
    const grow: Variants = {
      hide: { opacity: 0, scaleY: reduce ? 1 : 0 },
      show: { opacity: 1, scaleY: 1, transition: reduce ? FADE : SPRING_SOFT },
    };

    return { container, item, rule, grow, reduce };
  }, [reduce, stagger, delayChildren]);
}

/** Formata em reais sem centavos, do jeito que a plateia lê. */
export function brl(v: number) {
  return `R$ ${Math.round(v).toLocaleString("pt-BR")}`;
}
