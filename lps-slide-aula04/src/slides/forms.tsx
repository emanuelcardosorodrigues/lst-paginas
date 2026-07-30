import { motion } from "motion/react";
import type { ReactNode } from "react";
import { useSlideVariants } from "@/lib/motion";
import { Item, MarkFoot, Rule } from "@/components/pieces";

/* ═══ Ficha de interesse (slides 34 e 35) ═══════════════════════════
   Representação visual, não formulário.

   Tudo aqui é <div>: nada de <input>, nem readonly. Um campo real numa
   tela de projeção convida a equipe de produção a clicar e digitar, e
   ainda entraria na ordem de tabulação. O link real da ficha o Leandro
   coloca depois, fora deste slide.

   O card é claro mesmo nos slides escuros. Não é o tema da seção virando:
   é a representação de uma interface clara, como um print seria.
   ═══════════════════════════════════════════════════════════════════ */

const CARD = {
  bg: "#FFFFFF",
  line: "#E8E4DB",
  fieldBg: "#F7F3EB",
  label: "#3D3A36", // 9.7:1 sobre branco
  placeholder: "#6B6560", // 5.1:1 sobre #F7F3EB
  gold: "#A8893A",
};

function Campo({ label, caret = false }: { label: string; caret?: boolean }) {
  const { item, reduce } = useSlideVariants();
  return (
    <motion.div variants={item} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {/* Rótulo acima do campo, sempre. Placeholder nunca faz o papel de rótulo. */}
      <span
        style={{
          fontSize: 20,
          fontWeight: 600,
          letterSpacing: "0.02em",
          color: CARD.label,
        }}
      >
        {label}
      </span>
      <div
        style={{
          height: 68,
          borderRadius: "var(--r-chip)",
          background: CARD.fieldBg,
          border: `1px solid ${caret ? CARD.gold : CARD.line}`,
          display: "flex",
          alignItems: "center",
          padding: "0 22px",
          gap: 4,
        }}
      >
        {caret ? (
          <motion.span
            aria-hidden
            animate={reduce ? { opacity: 1 } : { opacity: [1, 1, 0, 0] }}
            transition={reduce ? { duration: 0 } : { duration: 1.05, repeat: Infinity, ease: "linear" }}
            style={{ width: 2, height: 30, background: CARD.gold, display: "block" }}
          />
        ) : null}
      </div>
    </motion.div>
  );
}

function FormCard({ fields, activeField }: { fields: string[]; activeField?: number }) {
  return (
    <div
      style={{
        background: CARD.bg,
        border: `1px solid ${CARD.line}`,
        borderRadius: "var(--r-card)",
        padding: 48,
        display: "flex",
        flexDirection: "column",
        gap: 30,
        boxShadow: "0 30px 80px rgba(0,0,0,0.4)",
      }}
    >
      {fields.map((f, i) => (
        <Campo key={f} label={f} caret={activeField === i} />
      ))}
      <Item>
        <div
          style={{
            marginTop: 8,
            height: 72,
            borderRadius: "var(--r-pill)",
            /* Charcoal sobre ouro. Nunca branco sobre ouro. */
            background: "#C8A84E",
            color: "#1A1A1A",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 24,
            fontWeight: 700,
            letterSpacing: "0.01em",
          }}
        >
          Quero saber mais
        </div>
      </Item>
    </div>
  );
}

const CAMPOS = ["Nome", "E-mail", "Telefone"];

/** Slide 34: a revelação. A frase manda, a ficha aparece ao lado. */
export function FichaReveal({ headline, lead }: { headline: ReactNode; lead?: ReactNode }) {
  const { item } = useSlideVariants();
  return (
    <>
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 58fr) minmax(0, 42fr)", gap: 90, alignItems: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 30, minWidth: 0 }}>
          <Rule width={96} />
          <motion.h2 variants={item} className="d-xl">
            {headline}
          </motion.h2>
          {lead ? (
            <motion.p variants={item} className="lede">
              {lead}
            </motion.p>
          ) : null}
        </div>
        <motion.div variants={item} style={{ minWidth: 0 }}>
          <FormCard fields={CAMPOS} />
        </motion.div>
      </div>
      <MarkFoot />
    </>
  );
}

/** Slide 35: os três campos. Agora a ficha manda e a frase legenda. */
export function FichaCampos({ headline }: { headline: ReactNode }) {
  const { item } = useSlideVariants();
  return (
    <>
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 44fr) minmax(0, 56fr)", gap: 90, alignItems: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 26, minWidth: 0 }}>
          <Rule width={96} />
          <motion.div variants={item}>{headline}</motion.div>
        </div>
        <motion.div variants={item} style={{ minWidth: 0 }}>
          <FormCard fields={CAMPOS} activeField={0} />
        </motion.div>
      </div>
      <MarkFoot />
    </>
  );
}
