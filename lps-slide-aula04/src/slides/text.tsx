import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";
import { SPRING_POP, useSlideVariants } from "@/lib/motion";
import { MarkFoot, Rule } from "@/components/pieces";

type Size = "xl" | "l" | "m" | "s";
type Align = "left" | "center";

/**
 * Slide de declaração.
 *
 * Cada linha é um item do stagger, então uma frase de duas sentenças entra
 * no ritmo em que é falada em vez de aparecer inteira de uma vez. O
 * movimento é contido de propósito: estes são os momentos emocionais do
 * pitch e um bounce aqui soaria como piada.
 */
export function Statement({
  lines,
  size = "l",
  align = "left",
  kicker,
  lead,
  rule = false,
  mark = true,
  maxWidth,
}: {
  lines: ReactNode[];
  size?: Size;
  align?: Align;
  kicker?: string;
  lead?: ReactNode;
  rule?: boolean;
  mark?: boolean;
  maxWidth?: number;
}) {
  const { item } = useSlideVariants();
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 26,
          alignItems: align === "center" ? "center" : "flex-start",
          textAlign: align,
          maxWidth,
        }}
      >
        {kicker ? (
          <motion.span variants={item} className="kicker">
            {kicker}
          </motion.span>
        ) : null}

        {rule ? <Rule /> : null}

        <h2 className={`d-${size}`} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {lines.map((l, i) => (
            <motion.span key={i} variants={item} style={{ display: "block" }}>
              {l}
            </motion.span>
          ))}
        </h2>

        {lead ? (
          <motion.p variants={item} className="lede" style={{ maxWidth: 30 * 16 }}>
            {lead}
          </motion.p>
        ) : null}
      </div>
      {mark ? <MarkFoot /> : null}
    </>
  );
}

/**
 * Slide da palavra isolada (REATIVAR, Comprometimento).
 *
 * Entrada letra por letra: é o clímax do bloco, então pode carregar mais
 * peso de movimento que os outros slides de texto. As letras são
 * aria-hidden e a palavra inteira vai no aria-label, senão um leitor de
 * tela soletraria.
 */
export function Word({
  text,
  size = 220,
  letterStagger = 0.05,
  icon,
  caption,
}: {
  text: string;
  size?: number;
  letterStagger?: number;
  icon?: ReactNode;
  caption?: ReactNode;
}) {
  const { item, reduce } = useSlideVariants();

  const letters: Variants = {
    hide: {},
    show: { transition: { staggerChildren: reduce ? 0 : letterStagger, delayChildren: 0.08 } },
  };
  const letter: Variants = {
    hide: { opacity: 0, y: reduce ? 0 : 36, scale: reduce ? 1 : 0.9 },
    show: { opacity: 1, y: 0, scale: 1, transition: SPRING_POP },
  };

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 40 }}>
        {icon ? (
          <motion.div variants={item} style={{ color: "var(--accent-display)", display: "flex" }}>
            {icon}
          </motion.div>
        ) : null}

        <motion.div
          variants={letters}
          aria-label={text}
          role="heading"
          aria-level={2}
          style={{ display: "flex", justifyContent: "center", flexWrap: "nowrap" }}
        >
          {[...text].map((ch, i) => (
            <motion.span
              key={i}
              variants={letter}
              aria-hidden
              className="d-xl"
              style={{ fontSize: size, display: "inline-block", letterSpacing: "0.005em" }}
            >
              {ch === " " ? " " : ch}
            </motion.span>
          ))}
        </motion.div>

        {caption ? (
          <motion.p variants={item} className="meta" style={{ textAlign: "center" }}>
            {caption}
          </motion.p>
        ) : null}
      </div>
      <MarkFoot />
    </>
  );
}

/**
 * Build de 3 etapas (as 3 objeções, os 3 avisos).
 *
 * Uma tecla só: o Leandro avança o slide uma vez e as três linhas entram
 * em sequência, com ~1s entre elas, no ritmo de quem está falando. O
 * intervalo é o `stagger` que deck.tsx passa pro SlideFrame, não um
 * delay hard-coded aqui.
 */
export function Build({ steps }: { steps: string[] }) {
  const { item, rule } = useSlideVariants();
  return (
    <>
      <ul style={{ display: "flex", flexDirection: "column", gap: 56 }}>
        {steps.map((s, i) => (
          <motion.li key={i} variants={item} style={{ display: "flex", alignItems: "center", gap: 40 }}>
            <motion.div
              className="rule"
              variants={rule}
              style={{ width: 88, height: 3, flex: "none" }}
            />
            <span className="d-m">{s}</span>
          </motion.li>
        ))}
      </ul>
      <MarkFoot />
    </>
  );
}

/**
 * Slide 31, "pra quem é / pra quem não é".
 *
 * O roteiro descrevia só o formato ("lista curta em tela"). A copy foi
 * escrita a pedido do Leandro e está em deck.tsx, junto do slide, pra ele
 * editar sem caçar componente.
 *
 * Cada coluna é uma lista de orações com sujeito implícito ("pra quem já
 * tem clínica rodando"), então os itens não repetem "quem". A coluna do
 * "não é" é o filtro que melhora a fila da ficha de interesse: quem se
 * reconhece ali não preenche, e isso é ganho, não perda.
 */
export function ListaDupla({
  colunas,
}: {
  colunas: { titulo: string; itens: string[]; tom: "sim" | "nao" }[];
}) {
  const { item } = useSlideVariants();
  return (
    <>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 90 }}>
        {colunas.map((c) => (
          <motion.div key={c.titulo} variants={item} style={{ display: "flex", flexDirection: "column", gap: 40, minWidth: 0 }}>
            <span className="d-m" style={{ fontSize: 60, color: c.tom === "sim" ? "var(--fg)" : "var(--fg-3)" }}>
              {c.titulo}
            </span>
            <ul style={{ display: "flex", flexDirection: "column", gap: 30 }}>
              {c.itens.map((t) => (
                <motion.li key={t} variants={item} style={{ display: "flex", gap: 22, alignItems: "flex-start" }}>
                  {/* Marca de linha em vez de bullet: ponto dourado no "é",
                      traço apagado no "não é". Lê de longe sem precisar de
                      ícone de check/x, que num pitch soa a tabela de plano. */}
                  <span
                    aria-hidden
                    style={{
                      flex: "none",
                      marginTop: c.tom === "sim" ? 18 : 24,
                      width: c.tom === "sim" ? 14 : 26,
                      height: c.tom === "sim" ? 14 : 3,
                      borderRadius: c.tom === "sim" ? "50%" : 2,
                      background: c.tom === "sim" ? "var(--accent-display)" : "var(--fg-4)",
                    }}
                  />
                  <span
                    className="d-s"
                    style={{ fontSize: 42, color: c.tom === "sim" ? "var(--fg)" : "var(--fg-3)" }}
                  >
                    {t}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
      <MarkFoot />
    </>
  );
}
