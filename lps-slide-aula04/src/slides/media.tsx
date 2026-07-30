import { motion } from "motion/react";
import type { ReactNode } from "react";
import { ArrowRight } from "@phosphor-icons/react";
import { useSlideVariants } from "@/lib/motion";
import { useCountUp } from "@/lib/useCountUp";
import { AssetSlot, type AssetFit, type AssetKind } from "@/components/AssetSlot";
import { Item, Mark, MarkFoot, Rule } from "@/components/pieces";

/* ═══ Slide de tela (vídeo de tela, print) ══════════════════════════
   Um componente, três composições, escolhidas pelo que o slide tem:

   - sem texto        → quadro emoldurado no centro, o vídeo é o slide;
   - com texto        → split, e o lado alterna slide a slide (deck.tsx),
                        porque três "texto à esquerda, mídia à direita"
                        em sequência viram papel de parede;
   - `overlay`        → quase sangrado com legenda sobre scrim, pro clipe
                        mais longo do bloco (slide 29).
   ═══════════════════════════════════════════════════════════════════ */
export function Screen({
  id,
  label,
  kind,
  note,
  text,
  lead,
  side = "left",
  overlay = false,
  blur = false,
  fit = "cover",
  callout,
  objectPosition,
}: {
  id: string;
  label: string;
  kind: AssetKind;
  note?: string;
  /** Texto do slide. Ausente = quadro sozinho. */
  text?: ReactNode;
  lead?: ReactNode;
  side?: "left" | "right";
  overlay?: boolean;
  blur?: boolean;
  fit?: AssetFit;
  /** Chamada sobreposta ao quadro (slide 4: o número final da conta). */
  callout?: ReactNode;
  objectPosition?: string;
}) {
  const { item } = useSlideVariants();

  const media = (
    <motion.div variants={item} style={{ position: "relative", width: "100%", height: "100%", minWidth: 0, minHeight: 0 }}>
      <AssetSlot id={id} label={label} kind={kind} note={note} blur={blur} fit={fit} objectPosition={objectPosition} />
      {callout ? (
        <div style={{ position: "absolute", right: 40, bottom: 40, maxWidth: 460, zIndex: 2 }}>{callout}</div>
      ) : null}
    </motion.div>
  );

  /* Quadro sozinho. */
  if (!text && !overlay) {
    return (
      <div style={{ position: "absolute", inset: 64, display: "flex" }}>
        {media}
      </div>
    );
  }

  /* Quase sangrado, legenda sobre scrim. */
  if (overlay) {
    return (
      <div style={{ position: "absolute", inset: 32 }}>
        {media}
        {text ? (
          <div
            style={{
              position: "absolute",
              inset: "auto 0 0 0",
              /* 96px de folga embaixo: a legenda é o texto do slide e não
                 pode encostar na borda arredondada do quadro. */
              padding: "130px 64px 96px",
              borderRadius: "0 0 var(--r-frame) var(--r-frame)",
              /* Scrim pra legenda passar AA sobre qualquer frame do vídeo. */
              background: "linear-gradient(to top, rgba(16,16,16,0.92) 0%, rgba(16,16,16,0.7) 45%, transparent 100%)",
              pointerEvents: "none",
            }}
          >
            <Item>
              <h2 className="d-m" style={{ color: "#FFFFFF" }}>
                {text}
              </h2>
            </Item>
          </div>
        ) : null}
      </div>
    );
  }

  /* Split. */
  const copy = (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 30,
        justifyContent: "center",
        minWidth: 0,
      }}
    >
      <Rule width={88} />
      <motion.h2 variants={item} className="d-m">
        {text}
      </motion.h2>
      {lead ? (
        <motion.p variants={item} className="lede">
          {lead}
        </motion.p>
      ) : null}
    </div>
  );

  return (
    <>
      <div
        style={{
          display: "grid",
          /* 40/60 e não 34/66: em 34fr a headline "Reunião de 2h · plano só
             seu" quebrava e sobrava pouco pra unidade de trás. */
          gridTemplateColumns: side === "left" ? "minmax(0, 40fr) minmax(0, 60fr)" : "minmax(0, 60fr) minmax(0, 40fr)",
          /* gridTemplateRows explícito: com linha implícita `auto`, o
             height:100% dos filhos não resolve, a imagem passa a mandar na
             altura (largura 100% + altura auto) e estica a linha muito além
             de 888px, empurrando a coluna de texto pra fora da área segura.
             Medido: o frame ia a 1609px de altura no slide 22. */
          gridTemplateRows: "1fr",
          gap: 72,
          height: 888,
          alignItems: "stretch",
        }}
      >
        {side === "left" ? (
          <>
            {copy}
            {media}
          </>
        ) : (
          <>
            {media}
            {copy}
          </>
        )}
      </div>
      {/* A marca vai no rodapé do slide, igual em todos os outros. Dentro da
          coluna de texto ela lia como um respingo solto embaixo da headline. */}
      <MarkFoot />
    </>
  );
}

/* ═══ Caso (slide 32) ═══════════════════════════════════════════════
   Os números são os mesmos que já estão publicados na proposta do Alex
   Barreira (pda-proposta-alex-barreira), liberados pelo Leandro. Não são
   estimativa nem projeção: é o resultado de uma pessoa real, então a tela
   diz isso com todas as letras.

   O "depois" conta na entrada; o "antes" fica parado. O movimento é o
   próprio argumento: a plateia vê a distância entre os dois números.
   ═══════════════════════════════════════════════════════════════════ */
export function Caso({
  nome,
  cidade,
  antes,
  depois,
  prazo,
  assetId,
  assetLabel,
  assetNote,
}: {
  nome: string;
  cidade: string;
  /** Lucro antes, em milhares de reais. */
  antes: number;
  /** Lucro depois, em milhares de reais. */
  depois: number;
  prazo: string;
  assetId: string;
  assetLabel: string;
  assetNote?: string;
}) {
  const { item } = useSlideVariants();
  const v = useCountUp(depois, 1400);

  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 44fr) minmax(0, 56fr)",
          gridTemplateRows: "1fr",
          gap: 72,
          height: 888,
        }}
      >
        <motion.div variants={item} style={{ minWidth: 0, minHeight: 0 }}>
          <AssetSlot id={assetId} label={assetLabel} kind="print" note={assetNote} objectPosition="center 25%" />
        </motion.div>

        <div style={{ display: "flex", flexDirection: "column", gap: 30, justifyContent: "center", minWidth: 0 }}>
          <Rule width={88} />

          <motion.div variants={item}>
            <h2 className="d-l" style={{ fontSize: 88 }}>
              {nome}
            </h2>
            <p className="meta" style={{ marginTop: 10, color: "var(--fg-4)" }}>
              {cidade}
            </p>
          </motion.div>

          <motion.div variants={item} style={{ display: "flex", alignItems: "flex-end", gap: 40, marginTop: 12 }}>
            <div>
              <span className="kicker" style={{ color: "var(--fg-4)" }}>
                Lucro antes
              </span>
              <div className="d-m" style={{ marginTop: 12, color: "var(--fg-4)" }}>
                R$ {antes} mil
              </div>
            </div>

            <ArrowRight size={52} weight="regular" color="var(--accent-display)" aria-hidden style={{ marginBottom: 14 }} />

            <div>
              <span className="kicker">Lucro depois, {prazo}</span>
              <div
                className="d-l"
                style={{ marginTop: 12, color: "var(--accent-display)", fontVariantNumeric: "tabular-nums" }}
              >
                R$ {Math.round(v)} mil
              </div>
            </div>
          </motion.div>

          {/* Resultado de gente real numa tela projetada num pitch de vendas:
              a ressalva anda junto do número, não no rodapé. */}
          <motion.p variants={item} style={{ fontSize: 20, color: "var(--fg-4)", lineHeight: 1.5, maxWidth: "46ch" }}>
            Resultado individual do {nome}. Não é promessa nem garantia de resultado.
          </motion.p>
        </div>
      </div>
      <MarkFoot />
    </>
  );
}

/* ═══ Duas fotos (slide 14) ══════════════════════════════════════════
   "30 anos. Começou vendendo vela." O Leandro pediu a foto dele E a do
   consultório da época. As duas são retrato, então ficam lado a lado em
   colunas estreitas com `cover`: aqui o enquadramento da pessoa e do
   lugar é o assunto, não o arquivo inteiro.
   ═══════════════════════════════════════════════════════════════════ */
export function DuasFotos({
  text,
  fotos,
}: {
  text: ReactNode;
  fotos: { id: string; label: string; objectPosition?: string }[];
}) {
  const { item } = useSlideVariants();
  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 38fr) minmax(0, 62fr)",
          gridTemplateRows: "1fr",
          gap: 72,
          height: 888,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 30, justifyContent: "center", minWidth: 0 }}>
          <Rule width={88} />
          <motion.h2 variants={item} className="d-m">
            {text}
          </motion.h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${fotos.length}, minmax(0, 1fr))`,
            gridTemplateRows: "1fr",
            gap: 28,
            minHeight: 0,
          }}
        >
          {fotos.map((f) => (
            <motion.div key={f.id} variants={item} style={{ minWidth: 0, minHeight: 0, height: "100%" }}>
              <AssetSlot
                id={f.id}
                label={f.label}
                kind="print"
                fit="cover"
                objectPosition={f.objectPosition ?? "center 30%"}
              />
            </motion.div>
          ))}
        </div>
      </div>
      <MarkFoot />
    </>
  );
}
