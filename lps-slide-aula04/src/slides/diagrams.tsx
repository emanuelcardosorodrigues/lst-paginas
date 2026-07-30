import { motion } from "motion/react";
import type { ReactNode } from "react";
import {
  AirplaneTakeoff,
  Calculator,
  Check,
  Compass,
  GraduationCap,
  Headset,
  Megaphone,
  Receipt,
  UsersThree,
  WhatsappLogo,
  type Icon,
} from "@phosphor-icons/react";
import { EASE, FADE, SPRING_SOFT, brl, useSlideVariants } from "@/lib/motion";
import { useCountUp } from "@/lib/useCountUp";
import { Item, MarkFoot, Rule } from "@/components/pieces";
import { useSlideActive } from "@/components/SlideFrame";
import { Statement } from "./text";

/* Peso único de ícone em todo o deck. "regular" e não "light" porque
   projetor lava traço fino: a 12 metros um stroke light desaparece. */
const W = "regular" as const;

/* ═══ Escada de 4 degraus (slides 2 e 37) ═══════════════════════════
   O mesmo diagrama abre a aula com dois furos resolvidos e fecha com os
   quatro. Reaproveitar o desenho é o ponto: a plateia reconhece o quadro
   e lê o progresso sem precisar de legenda.

   Os quatro furos são sempre os mesmos quatro, na nomenclatura fechada
   pelo Leandro (ver FUROS abaixo). O roteiro trazia três conjuntos
   divergentes; isso foi resolvido, não harmonizado por conta própria.
   ═══════════════════════════════════════════════════════════════════ */
export function Ladder({
  steps,
  payoff,
}: {
  steps: { label: string; done: boolean }[];
  payoff?: ReactNode;
}) {
  const { item, grow } = useSlideVariants();
  const H = 460;

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", gap: payoff ? 44 : 64 }}>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 40, height: H }}>
          {steps.map((s, i) => {
            const h = Math.round(H * (0.28 + (i / (steps.length - 1)) * 0.72));
            return (
              <motion.div
                key={s.label}
                variants={item}
                style={{ flex: 1, display: "flex", flexDirection: "column", gap: 24, minWidth: 0 }}
              >
                <motion.div
                  variants={grow}
                  style={{
                    height: h,
                    /* Degrau estreito e centrado na coluna. Na largura cheia
                       da coluna os degraus liam como blocos de gráfico de
                       barras, não como uma escada. */
                    width: 280,
                    margin: "0 auto",
                    transformOrigin: "bottom center",
                    borderRadius: "var(--r-card)",
                    background: s.done ? "var(--accent-display)" : "var(--bg-2)",
                    border: s.done ? "none" : "1px solid var(--line-strong)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {/* Charcoal sobre ouro, nunca branco. */}
                  {s.done ? <Check size={52} weight="bold" color="#1A1A1A" aria-hidden /> : null}
                </motion.div>
                <span
                  className="d-s"
                  style={{
                    fontSize: 40,
                    textAlign: "center",
                    color: s.done ? "var(--fg)" : "var(--fg-3)",
                  }}
                >
                  {s.label}
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* O check amarra a palavra aos quatro degraus. Solta e longe, ela
            lia como uma sobra no canto do slide. */}
        {payoff ? (
          <Item style={{ display: "flex", alignItems: "center", gap: 22, justifyContent: "center" }}>
            <Check size={54} weight="bold" color="var(--accent)" aria-hidden />
            <span className="d-m" style={{ color: "var(--accent)" }}>
              {payoff}
            </span>
          </Item>
        ) : null}
      </div>
      <MarkFoot />
    </>
  );
}

/* ═══ Slide-mapa dos 6 movimentos ═══════════════════════════════════
   Uma única section para o slide 17 e para as cinco voltas (19, 21, 23,
   26, 28). O item em foco vem por prop; nada é duplicado.

   Na volta, os seis entram iguais e só depois o foco se resolve: o item
   ganha anel dourado e os outros caem pra 38%. Isso conta "o mapa que
   você acabou de ver, agora no item 2" em vez de mostrar um mapa novo.
   ═══════════════════════════════════════════════════════════════════ */

const MOVIMENTOS: { n: number; label: string; icon: Icon }[] = [
  { n: 1, label: "Decolagem", icon: AirplaneTakeoff },
  { n: 2, label: "GPS", icon: Compass },
  { n: 3, label: "Grupo", icon: UsersThree },
  { n: 4, label: "Tributário", icon: Receipt },
  { n: 5, label: "Área didática", icon: GraduationCap },
  { n: 6, label: "Central de Consultores", icon: Headset },
];

export function MapaMovimentos({ highlight }: { highlight?: number }) {
  const { item } = useSlideVariants();
  const active = useSlideActive();

  return (
    <>
      <ul
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          gridTemplateRows: "repeat(2, 1fr)",
          gap: 40,
          /* 660 e não 800: com célula de 380 sobrava um vazio grande entre o
             número no topo e o rótulo embaixo, e os seis cards liam como
             caixas vazias. */
          height: 660,
          /* Folga lateral pro "pop" de 3% da célula em foco: sem ela a
             célula da direita passava 14px da área segura ao destacar. */
          padding: "0 14px",
          boxSizing: "border-box",
        }}
      >
        {MOVIMENTOS.map(({ n, label, icon: Glyph }) => {
          const on = highlight === n;
          const dim = highlight !== undefined && !on;
          return (
            <motion.li key={n} variants={item} style={{ minWidth: 0 }}>
              <motion.div
                animate={{ opacity: dim ? 0.38 : 1, scale: on ? 1.03 : 1 }}
                transition={{ delay: active ? 0.32 : 0, ...SPRING_SOFT }}
                style={{
                  position: "relative",
                  height: "100%",
                  borderRadius: "var(--r-card)",
                  background: "var(--bg-2)",
                  border: "1px solid var(--line)",
                  padding: 40,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                {/* Anel e véu de foco: opacidade e transform apenas, então
                    o destaque não repinta o card inteiro. */}
                <motion.span
                  aria-hidden
                  animate={{ opacity: on ? 1 : 0, scale: on ? 1 : 1.05 }}
                  transition={{ delay: active && on ? 0.32 : 0, duration: 0.5, ease: EASE }}
                  style={{
                    position: "absolute",
                    inset: -2,
                    borderRadius: "calc(var(--r-card) + 2px)",
                    border: "3px solid var(--accent-display)",
                    pointerEvents: "none",
                  }}
                />
                <motion.span
                  aria-hidden
                  animate={{ opacity: on ? 1 : 0 }}
                  transition={{ delay: active && on ? 0.32 : 0, ...FADE }}
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: "var(--r-card)",
                    background: "var(--accent-soft)",
                    pointerEvents: "none",
                  }}
                />

                <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  {/* O número é a âncora visual do card, então ele carrega o
                      peso em vez de sobrar espaço no meio. */}
                  <span className="num" style={{ fontSize: 128 }}>
                    {n}
                  </span>
                  <Glyph size={52} weight={W} color="var(--accent)" aria-hidden />
                </div>
                <span
                  className="d-s"
                  style={{ position: "relative", fontSize: 38, color: on ? "var(--fg)" : "var(--fg-2)" }}
                >
                  {label}
                </span>
              </motion.div>
            </motion.li>
          );
        })}
      </ul>
      <MarkFoot />
    </>
  );
}

/* ═══ Contador (slide 5) ════════════════════════════════════════════ */

export function Contador({
  fatores,
  to,
  suffix,
}: {
  fatores: [string, string];
  to: number;
  suffix: string;
}) {
  const v = useCountUp(to);
  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", gap: 56 }}>
        <Item style={{ display: "flex", alignItems: "center", gap: 30 }}>
          <span className="chip" style={{ fontSize: 30, padding: "14px 24px" }}>
            {fatores[0]}
          </span>
          <span className="d-s" style={{ color: "var(--fg-4)", fontSize: 44 }} aria-hidden>
            ×
          </span>
          <span className="chip" style={{ fontSize: 30, padding: "14px 24px" }}>
            {fatores[1]}
          </span>
        </Item>

        <Rule width={140} />

        <Item style={{ display: "flex", alignItems: "baseline", gap: 30, flexWrap: "wrap" }}>
          {/* Formatado em reais durante toda a contagem, não só no fim:
              um número cru subindo não lê como dinheiro. */}
          <span className="d-xl" style={{ color: "var(--accent-display)", fontVariantNumeric: "tabular-nums" }}>
            {brl(v)}
          </span>
          <span className="d-l" style={{ color: "var(--fg-3)" }}>
            {suffix}
          </span>
        </Item>
      </div>
      <MarkFoot />
    </>
  );
}

/* ═══ Recap discreto dos furos (slide 8) ════════════════════════════
   O Leandro está em câmera, então o conteúdo fica à esquerda e os quatro
   ícones num canto, pequenos, como o roteiro pede.
   ═══════════════════════════════════════════════════════════════════ */

/* Os quatro furos, na nomenclatura fechada pelo Leandro. O roteiro trazia
   três conjuntos diferentes (slide 2: Agenda/Base · 8: Parceiro/Agenda ·
   37: Parceiro/Base); este é o conjunto único, usado nos três slides. */
const FUROS: { label: string; icon: Icon }[] = [
  { label: "Precificação", icon: Calculator },
  { label: "Imposto", icon: Receipt },
  { label: "Dentista parceiro", icon: UsersThree },
  { label: "Captação errada", icon: Megaphone },
];

export function FurosRecap({ statement }: { statement: string }) {
  const { item } = useSlideVariants();
  return (
    <>
      <div style={{ position: "absolute", top: "var(--pad-y)", right: "var(--pad-x)", display: "flex", gap: 16 }}>
        {FUROS.map(({ label, icon: Glyph }) => (
          <motion.div
            key={label}
            variants={item}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 10,
              /* 168 e não 120: "Dentista parceiro" e "Captação errada" não
                 cabem em 120px e quebravam em três linhas. */
              width: 168,
              padding: "18px 10px",
              borderRadius: "var(--r-chip)",
              background: "var(--bg-2)",
              border: "1px solid var(--line)",
            }}
          >
            <Glyph size={30} weight={W} color="var(--accent)" aria-hidden />
            <span style={{ fontSize: 18, fontWeight: 600, color: "var(--fg-3)" }}>{label}</span>
          </motion.div>
        ))}
      </div>

      <Statement lines={[statement]} size="xl" maxWidth={900} />
    </>
  );
}

/* ═══ Duas tarefas (slide 39) ═══════════════════════════════════════ */

export function DuasTarefas({
  headline,
  tarefas,
}: {
  headline: string;
  tarefas: { label: string; icon: Icon }[];
}) {
  const { item } = useSlideVariants();
  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", gap: 72 }}>
        <motion.h2 variants={item} className="d-l">
          {headline}
        </motion.h2>

        <ul style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
          {tarefas.map(({ label, icon: Glyph }, i) => (
            <motion.li
              key={label}
              variants={item}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 32,
                padding: 44,
                borderRadius: "var(--r-card)",
                background: "var(--bg-2)",
                border: "1px solid var(--line)",
                minWidth: 0,
              }}
            >
              <span className="num" style={{ fontSize: 88, flex: "none" }}>
                {i + 1}
              </span>
              <Glyph size={54} weight={W} color="var(--accent)" aria-hidden style={{ flex: "none" }} />
              <span className="d-s" style={{ fontSize: 40 }}>
                {label}
              </span>
            </motion.li>
          ))}
        </ul>
      </div>
      <MarkFoot />
    </>
  );
}
