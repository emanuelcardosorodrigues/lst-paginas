import { motion } from "motion/react";
import type { ReactNode } from "react";
import { useSlideVariants } from "@/lib/motion";
import { BASE } from "@/lib/base";

/* ── Marca ─────────────────────────────────────────────────────────
   Fica em todo slide de conteúdo, no rodapé esquerdo. Não é decoração:
   é o que marca clipe e print da aula quando circularem depois.
   Sai dos slides de mídia sangrada, onde tomaria espaço do quadro.
   ────────────────────────────────────────────────────────────────── */
export function Mark({ size = 44 }: { size?: number }) {
  return (
    <img
      className="mark"
      src={`${BASE}images/eagle.png`}
      alt="Programa Águia"
      width={size}
      height={size}
      style={{ width: size, height: size, objectFit: "contain" }}
    />
  );
}

/** Rodapé de marca, posicionado na área segura do slide. */
export function MarkFoot() {
  return (
    <div data-foot style={{ position: "absolute", left: "var(--pad-x)", bottom: 56, zIndex: 1 }}>
      <Mark />
    </div>
  );
}

/** Ênfase dentro de headline: mesma família, cor de acento. */
export function Gold({ children }: { children: ReactNode }) {
  return <span style={{ color: "var(--accent)" }}>{children}</span>;
}

/** Régua de ouro que se desenha da esquerda. */
export function Rule({ width = 96, height = 3 }: { width?: number; height?: number }) {
  const { rule } = useSlideVariants();
  return <motion.div className="rule" variants={rule} style={{ width, height }} />;
}

/**
 * Ponto de ouro para uso dentro de uma headline.
 *
 * O `·` do roteiro é um separador que precisa existir como forma, não como
 * caractere de 100px que a plateia não vê. As palavras não mudam.
 * Na prática use o `UnitLine` abaixo, que já cuida da quebra de linha.
 */
export function Dot({ size = 12 }: { size?: number }) {
  return (
    <span
      aria-hidden
      style={{
        display: "inline-block",
        width: size,
        height: size,
        borderRadius: "50%",
        background: "var(--accent-display)",
        verticalAlign: "middle",
        margin: "0 0.34em",
        position: "relative",
        top: "-0.12em",
      }}
    />
  );
}

/**
 * Linha de unidades separadas por ponto, para dentro de uma headline.
 *
 * O ponto é sempre o ÚLTIMO elemento da unidade que vem antes, e cada
 * unidade é nowrap. Assim, quando a linha quebra numa coluna estreita, a
 * quebra cai entre as unidades e o ponto termina a primeira linha em vez
 * de começar a segunda pendurado no vazio.
 */
export function UnitLine({ parts, dotSize = 12 }: { parts: string[]; dotSize?: number }) {
  return (
    <>
      {parts.map((p, i) => {
        const ultima = i === parts.length - 1;
        return (
        <span key={i}>
          {/* nowrap só na unidade que CARREGA o ponto, pra ele não sobrar
             pendurado no começo da linha seguinte. A última unidade não tem
             ponto, então pode quebrar por dentro: presa em nowrap ela
             estourava a coluna estreita ("imposto mais baixo" passava 8px
             da área segura no slide 24). */}
          <span style={{ whiteSpace: ultima ? "normal" : "nowrap" }}>
            {p}
            {ultima ? null : <Dot size={dotSize} />}
          </span>
          {/* oportunidade de quebra entre unidades */}
          {ultima ? null : " "}
        </span>
        );
      })}
    </>
  );
}

/** Bloco de conteúdo que entra como um item do stagger do slide. */
export function Item({
  children,
  style,
  className,
}: {
  children: ReactNode;
  style?: React.CSSProperties;
  className?: string;
}) {
  const { item } = useSlideVariants();
  return (
    <motion.div variants={item} style={style} className={className}>
      {children}
    </motion.div>
  );
}
