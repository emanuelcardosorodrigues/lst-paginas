import { motion } from "motion/react";
import type { ReactNode } from "react";
import { ClipboardText, WhatsappLogo } from "@phosphor-icons/react";
import type { Theme } from "@/components/SlideFrame";
import { Gold, Mark, Rule, UnitLine } from "@/components/pieces";
import { useSlideVariants } from "@/lib/motion";
import { Build, ListaDupla, Statement, Word } from "@/slides/text";
import { Contador, DuasTarefas, FurosRecap, Ladder, MapaMovimentos } from "@/slides/diagrams";
import { Caso, DuasFotos, Screen } from "@/slides/media";
import { FichaCampos, FichaReveal } from "@/slides/forms";

/* ═══════════════════════════════════════════════════════════════════
   Os 40 slides da Aula 2.

   O texto de cada slide é o do roteiro, ipsis litteris. Onde o roteiro
   escreveu "A · B", as palavras e a ordem são as mesmas e só o separador
   virou forma (ver UnitLine). Onde o roteiro descreveu o formato em vez
   de trazer o texto, o vazio é declarado na tela em vez de preenchido
   por conta própria (hoje sobra só o número final do slide 4).

   `scene` e `media` são a coluna "O que aparece" e "Mídia" do roteiro,
   copiadas para o HUD do apresentador. Não aparecem na projeção.
   ═══════════════════════════════════════════════════════════════════ */

export type Slide = {
  n: number;
  block: string;
  scene: string;
  media: string;
  theme: Theme;
  /** Slide de mídia sem área segura: o quadro é o conteúdo. */
  bleed?: boolean;
  /** Intervalo entre as entradas do conteúdo. 1.0 nos builds de 3 etapas. */
  stagger?: number;
  node: ReactNode;
};

/* ── Arco de tema ───────────────────────────────────────────────────
   Cinco blocos, quatro viradas, todas em fronteira de bloco do roteiro.
   Num deck cada slide é um quadro fechado, então virar o tema num corte
   narrativo lê como intenção; virar no meio de um bloco leria como bug.

     1        escuro  abertura
     2-11     claro   entrega técnica (preço, imposto, R$ 25.000, reativar)
     12-16    escuro  núcleo emocional do bloco 6
     17-32    claro   a oferta: mapa, os 6 movimentos, as telas, o caso
     33-40    escuro  o fechamento: trava, ficha, avisos, frase final
   ────────────────────────────────────────────────────────────────── */

/* ── Composições de uso único ──────────────────────────────────────── */

/** Slide 1. Texto à esquerda porque o Leandro está em câmera na frente. */
function Abertura() {
  const { item } = useSlideVariants();
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 40, alignItems: "flex-start" }}>
      <motion.div variants={item}>
        <Mark size={104} />
      </motion.div>
      <Rule width={120} />
      <motion.h1 variants={item} className="d-xl" style={{ fontSize: 208, letterSpacing: "-0.03em" }}>
        AULA 2
      </motion.h1>
    </div>
  );
}

/**
 * Slide 11. "Tela limpa de novo", sem texto e sem mídia: o Leandro está em
 * câmera e a tela sai da frente.
 *
 * Mas tela literalmente vazia lê como deck quebrado no meio do pitch, então
 * "limpa" aqui é fundo de marca: a águia grande e apagada, sem conteúdo.
 * Nenhum texto foi inventado.
 */
function TelaLimpa() {
  const { item } = useSlideVariants();
  return (
    <motion.div
      variants={item}
      style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}
    >
      <div style={{ opacity: 0.1 }}>
        <Mark size={420} />
      </div>
    </motion.div>
  );
}

/* ── Registro ──────────────────────────────────────────────────────── */

export const SLIDES: Slide[] = [
  /* ═══ Bloco 0 ═══ */
  {
    n: 1,
    block: "Bloco 0 (0:00)",
    scene: "Leandro em câmera, fundo de marca Águia",
    media: "Nenhuma",
    theme: "dark",
    node: <Abertura />,
  },

  /* ═══ Bloco 1 ═══ */
  {
    n: 2,
    block: "Bloco 1 (3:30)",
    scene: "Escada de 4 degraus: Precificação ✓, Imposto ✓, Dentista parceiro, Captação errada",
    media: "Diagrama (motion simples)",
    theme: "light",
    node: (
      <Ladder
        steps={[
          { label: "Precificação", done: true },
          { label: "Imposto", done: true },
          { label: "Dentista parceiro", done: false },
          { label: "Captação errada", done: false },
        ]}
      />
    ),
  },

  /* ═══ Bloco 2 ═══ */
  {
    n: 3,
    block: "Bloco 2 (7:00)",
    scene: 'Calculadora de Precificação real, tela de "Nova precificação" em branco',
    media: "Vídeo de tela",
    theme: "light",
    bleed: true,
    node: (
      <Screen
        id="calculadora-precificacao"
        label="Calculadora de Precificação, tela em branco"
        kind="video"
        fit="contain"
        note="Gravação de tela da Calculadora real."
      />
    ),
  },
  {
    n: 4,
    block: "Bloco 2 (~10:00)",
    scene: "Mesma calculadora preenchida ao vivo com R$15k faturamento / R$6k custo fixo",
    media: "Vídeo de tela (continuação do #3)",
    theme: "light",
    bleed: true,
    node: (
      <Screen
        /* Clipe próprio, e não o mesmo do slide 3: o vídeo reinicia a cada
           entrada de slide, então reaproveitar o clipe faria o slide 4
           voltar pra tela em branco na frente da plateia. Aqui ele já
           começa na conta preenchida. */
        id="calculadora-resultado"
        label="Calculadora preenchida ao vivo"
        kind="video"
        fit="contain"
        note="Começa já com a conta preenchida e termina no Resultado."
        callout={
          <div className="card" style={{ padding: 28, display: "flex", flexDirection: "column", gap: 10 }}>
            <span className="kicker">Copy pendente</span>
            <span style={{ fontSize: 26, fontWeight: 600, color: "var(--fg-2)" }}>
              Número final da conta
            </span>
            <span style={{ fontSize: 18, color: "var(--fg-3)", lineHeight: 1.45 }}>
              O roteiro pede "destaque só no número final" mas não traz o valor: ele sai da conta
              ao vivo com R$ 15k de faturamento e R$ 6k de custo fixo.
            </span>
          </div>
        }
      />
    ),
  },

  /* ═══ Bloco 3 ═══ */
  {
    n: 5,
    block: "Bloco 3 (15:00)",
    scene: "Contador animado: 10 orçamentos × R$2.500 = R$25.000",
    media: "Diagrama/motion",
    theme: "light",
    node: <Contador fatores={["10 orçamentos", "R$ 2.500"]} to={25000} suffix="parados" />,
  },

  /* ═══ Bloco 4 ═══ */
  {
    n: 6,
    block: "Bloco 4 (25:00)",
    scene: "Palavra REATIVAR em tela cheia, ícone WhatsApp",
    media: "Diagrama",
    theme: "light",
    node: <Word text="REATIVAR" size={226} icon={<WhatsappLogo size={104} weight="regular" aria-hidden />} />,
  },
  {
    n: 7,
    block: "Bloco 4 (~27:00)",
    scene: "Painel de resultados da campanha de reativação, legível",
    media: "Print",
    theme: "light",
    bleed: true,
    node: (
      <Screen
        id="mensagens-reativacao"
        /* Sem blur, por decisão do Leandro: o painel entra legível, com o
           R$ 297.524,00 e os 88,2% à vista. O roteiro pedia "blur parcial";
           a capacidade continua no AssetSlot se ele quiser de volta. */
        label="Painel da campanha de reativação"
        kind="print"
        fit="contain"
      />
    ),
  },

  /* ═══ Bloco 5 ═══ */
  {
    n: 8,
    block: "Bloco 5 (29:00)",
    scene: "Leandro em câmera, recap mudo dos 4 furos em ícones pequenos num canto (Precificação, Imposto, Dentista parceiro, Captação errada)",
    media: "Diagrama discreto",
    theme: "light",
    node: <FurosRecap statement="Isso já é seu" />,
  },
  {
    n: 9,
    block: "Bloco 5 (~30:30)",
    scene: "As 3 objeções entrando uma de cada vez",
    media: "Diagrama com build em 3 etapas",
    theme: "light",
    stagger: 1.0,
    node: <Build steps={["Não tenho dinheiro", "Não é a hora", "Não tenho tempo"]} />,
  },
  {
    n: 10,
    block: "Bloco 5 (~32:00)",
    scene: "Corrida dos ratos",
    media: "Vídeo (asset pendente)",
    theme: "light",
    bleed: true,
    node: (
      <Screen
        id="corrida-dos-ratos"
        label="Corrida dos ratos"
        kind="video"
        note="Origem em aberto: banco de imagem ou ícone animado."
      />
    ),
  },
  {
    n: 11,
    block: "Bloco 5 (33:00)",
    scene: "Leandro em câmera, tela limpa de novo",
    media: "Nenhuma",
    theme: "light",
    node: <TelaLimpa />,
  },

  /* ═══ Bloco 6 ═══ */
  {
    n: 12,
    block: "Bloco 6 (~33:15)",
    scene: "Abertura por negação",
    media: "Texto puro, fundo escuro",
    theme: "dark",
    stagger: 0.55,
    node: (
      <Statement
        size="l"
        lines={["Não é chave do paraíso.", "Não é passaporte pra Terra do Nunca."]}
        maxWidth={1340}
      />
    ),
  },
  {
    n: 13,
    block: "Bloco 6 (~33:30)",
    scene: "Declaração central do bloco",
    media: "Texto puro",
    theme: "dark",
    stagger: 0.42,
    node: (
      <Statement
        size="xl"
        align="center"
        lines={["A odontologia que", <Gold key="g">NÃO TE ABANDONA</Gold>]}
      />
    ),
  },
  {
    n: 14,
    block: "Bloco 6 (~34:00)",
    scene: "História pessoal: 30 anos de profissão, começou vendendo vela",
    media: "Foto antiga do Leandro + consultório da época",
    theme: "dark",
    node: (
      <DuasFotos
        text="30 anos. Começou vendendo vela."
        fotos={[
          { id: "leandro-vela", label: "Leandro na época das velas", objectPosition: "center 22%" },
          { id: "leandro-consultorio", label: "Consultório do Leandro na época das velas" },
        ]}
      />
    ),
  },
  {
    n: 15,
    block: "Bloco 6 (~34:30)",
    scene: "Palavra isolada",
    media: "Texto puro",
    theme: "dark",
    node: <Word text="Comprometimento" size={166} letterStagger={0.045} />,
  },
  {
    n: 16,
    block: "Bloco 6 (~35:00)",
    scene: "Pergunta direta, volta pra câmera",
    media: "Nenhuma ou texto mínimo",
    theme: "dark",
    node: <Statement size="l" lines={["Você se compromete?"]} maxWidth={1100} />,
  },
  {
    n: 17,
    block: "Bloco 6 (35:30)",
    scene: "Slide-mapa: os 6 movimentos numerados em visão única",
    media: "Diagrama mestre (reaproveitado nas voltas)",
    theme: "light",
    stagger: 0.07,
    node: <MapaMovimentos />,
  },

  /* ── Movimento 1 ── */
  {
    n: 18,
    block: "Movimento 1",
    scene: "Teste DISC (card na Central) + proposta personalizada tipo a do Alex Barreira, rolando a página",
    media: "Vídeo de tela",
    theme: "light",
    node: (
      <Screen
        id="movimento-1-disc-proposta"
        label="Teste DISC e proposta personalizada"
        kind="video"
        fit="contain"
        side="left"
        text={<UnitLine parts={["Reunião de 2h", "plano só seu"]} />}
      />
    ),
  },
  {
    n: 19,
    block: "volta ao #17, destaca item 2",
    scene: "Slide-mapa",
    media: "Diagrama",
    theme: "light",
    stagger: 0.05,
    node: <MapaMovimentos highlight={2} />,
  },

  /* ── Movimento 2 ── */
  {
    n: 20,
    block: "Movimento 2",
    scene: "Copiloto Águia: Início → Ativação → Dúvidas → Diário de Voo",
    media: "Vídeo de tela",
    theme: "light",
    node: (
      <Screen
        id="movimento-2-copiloto"
        label="Copiloto Águia"
        kind="video"
        fit="contain"
        side="right"
        text="Seu GPS de execução"
      />
    ),
  },
  {
    n: 21,
    block: "volta ao #17, destaca item 3",
    scene: "Slide-mapa",
    media: "Diagrama",
    theme: "light",
    stagger: 0.05,
    node: <MapaMovimentos highlight={3} />,
  },

  /* ── Movimento 3 ── */
  {
    n: 22,
    block: "Movimento 3",
    scene: "Grupo de WhatsApp com Leandro respondendo (nomes tarjados)",
    media: "Print real (asset pendente)",
    theme: "light",
    node: (
      <Screen
        id="movimento-3-grupo-whatsapp"
        label="Grupo de WhatsApp, nomes tarjados"
        kind="print"
        fit="contain"
        side="left"
        text="Máximo 10 dentistas por turma"
        note="Tarjar os nomes antes de subir."
      />
    ),
  },
  {
    n: 23,
    block: "volta ao #17, destaca item 4",
    scene: "Slide-mapa",
    media: "Diagrama",
    theme: "light",
    stagger: 0.05,
    node: <MapaMovimentos highlight={4} />,
  },

  /* ── Movimento 4 ── */
  {
    n: 24,
    block: "Movimento 4",
    scene: "Consultor Tributário + Consultor Financeiro abrindo na Central",
    media: "Vídeo de tela",
    theme: "light",
    node: (
      <Screen
        id="movimento-4-tributario"
        label="Consultor Tributário e Consultor Financeiro"
        kind="video"
        fit="contain"
        side="right"
        text={<UnitLine parts={["Fator R", "imposto mais baixo"]} />}
      />
    ),
  },
  {
    n: 25,
    block: "Bloco 6 (~38:30)",
    scene: 'Transição pras "3 coisas"',
    media: "Texto puro",
    theme: "light",
    node: <Statement size="l" lines={["+ 3 coisas pra quem não tem tempo"]} maxWidth={1300} />,
  },
  {
    n: 26,
    block: "volta ao #17, destaca item 5",
    scene: "Slide-mapa",
    media: "Diagrama",
    theme: "light",
    stagger: 0.05,
    node: <MapaMovimentos highlight={5} />,
  },

  /* ── Movimento 5a ── */
  {
    n: 27,
    block: "Movimento 5a",
    scene: "Área didática, aula de consulta de 10 min",
    media: "Vídeo de tela (asset pendente)",
    theme: "light",
    node: (
      <Screen
        id="movimento-5a-area-didatica"
        label="Área didática, aula de 10 minutos"
        kind="video"
        fit="contain"
        side="left"
        text="Aula de 10 minutos, não curso de 10 horas"
      />
    ),
  },
  {
    n: 28,
    block: "volta ao #17, destaca item 6",
    scene: "Slide-mapa",
    media: "Diagrama",
    theme: "light",
    stagger: 0.05,
    node: <MapaMovimentos highlight={6} />,
  },

  /* ── Movimento 5b/6 ── */
  {
    n: 29,
    block: "Movimento 5b/6",
    scene:
      "Central de Consultores completa: grid dos 13, cursor passa por Comercial e Conversão, Follow-up e Renegociação, Calculadora",
    media: "Vídeo de tela, o mais longo do bloco",
    theme: "light",
    bleed: true,
    node: (
      <Screen
        id="movimento-5b-central-consultores"
        label="Central de Consultores completa"
        kind="video"
        fit="contain"
        overlay
        text="13 consultores. Ilimitado."
      />
    ),
  },

  /* ── Movimento 5c ── */
  {
    n: 30,
    block: "Movimento 5c",
    scene: "Treinamento da secretária, ao vivo e gravado",
    media: "Vídeo de tela ou print (asset pendente)",
    theme: "light",
    node: (
      <Screen
        id="movimento-5c-treinamento-secretaria"
        label="Treinamento da secretária"
        kind="video"
        fit="contain"
        side="right"
        text="O melhor deles"
      />
    ),
  },

  {
    n: 31,
    block: "Bloco 6 (~43:00)",
    scene: '"Pra quem é / não é"',
    media: "Texto puro",
    theme: "light",
    node: (
      <ListaDupla
        colunas={[
          {
            titulo: "Pra quem é",
            tom: "sim",
            itens: [
              "Já tem clínica rodando",
              "Fatura bem e não sobra nada",
              "Quer executar, não colecionar curso",
              "Assume o comprometimento",
            ],
          },
          {
            titulo: "Pra quem não é",
            tom: "nao",
            itens: [
              "Ainda vai abrir a clínica",
              "Quer fórmula, não quer fazer conta",
              "Vai começar depois",
              "Espera que alguém faça no lugar",
            ],
          },
        ]}
      />
    ),
  },
  {
    n: 32,
    block: "Bloco 6 (~44:00)",
    scene: "Caso Dr. José Ronaldo",
    media: "Foto + resultado (asset pendente, requer autorização)",
    theme: "light",
    node: (
      <Caso
        nome="Dr. José Ronaldo"
        cidade="Santa Isabel"
        antes={4}
        depois={22}
        prazo="em poucas semanas"
        assetId="caso-jose-ronaldo"
        assetLabel="Dr. José Ronaldo"
      />
    ),
  },
  {
    n: 33,
    block: "Bloco 6 (~45:00)",
    scene: "Trava de preço",
    media: "Texto puro",
    theme: "dark",
    node: (
      <Statement
        size="xl"
        lines={[<UnitLine key="trava" parts={["Domingo", "20h"]} dotSize={18} />]}
      />
    ),
  },

  /* ═══ Bloco 7 ═══ */
  {
    n: 34,
    block: "Bloco 7 (45:00)",
    scene: "Ficha de interesse, revelação",
    media: "Diagrama ou print do formulário",
    theme: "dark",
    node: <FichaReveal headline="Isso não é compra" />,
  },
  {
    n: 35,
    block: "Bloco 7 (~46:30)",
    scene: "Como preencher: nome, e-mail, telefone",
    media: "Print do formulário ou mockup",
    theme: "dark",
    node: (
      <FichaCampos
        headline={
          <h2 className="d-m">
            <UnitLine parts={["Nome", "e-mail", "telefone"]} />
          </h2>
        }
      />
    ),
  },
  {
    n: 36,
    block: "Bloco 7 (~47:00)",
    scene: "Os 3 avisos entrando um de cada vez",
    media: "Diagrama com build em 3 etapas",
    theme: "dark",
    stagger: 1.0,
    node: <Build steps={["Hoje", "Domingo, 20h", "Prioridade pra quem já preencheu"]} />,
  },

  /* ═══ Bloco 8 ═══ */
  {
    n: 37,
    block: "Bloco 8 (49:00)",
    scene: "Recap dos 4 furos resolvidos",
    media: "Diagrama, ícones marcados",
    theme: "dark",
    node: (
      <Ladder
        steps={[
          { label: "Precificação", done: true },
          { label: "Imposto", done: true },
          { label: "Dentista parceiro", done: true },
          { label: "Captação errada", done: true },
        ]}
        payoff="resolvido"
      />
    ),
  },
  {
    n: 38,
    block: "Bloco 8 (~49:30)",
    scene: "Teaser aula 3",
    media: "Texto puro",
    theme: "dark",
    stagger: 0.4,
    node: (
      <Statement
        size="xl"
        lines={[
          <span key="quando" style={{ fontSize: 76, color: "var(--fg-3)" }}>
            <UnitLine parts={["Amanhã", "7h"]} />
          </span>,
          "o último furo",
        ]}
      />
    ),
  },
  {
    n: 39,
    block: "Bloco 8 (~50:00)",
    scene: "Tarefas finais: REATIVAR + ficha de interesse",
    media: "Diagrama, 2 itens",
    theme: "dark",
    node: (
      <DuasTarefas
        headline="2 coisas antes de amanhã"
        tarefas={[
          { label: "REATIVAR", icon: WhatsappLogo },
          { label: "ficha de interesse", icon: ClipboardText },
        ]}
      />
    ),
  },
  {
    n: 40,
    block: "Bloco 8 (50:45)",
    scene: "Frase de fechamento, fica parada na tela",
    media: "Texto puro",
    theme: "dark",
    stagger: 0.6,
    node: (
      <Statement
        size="l"
        align="center"
        lines={[
          <span key="a" style={{ color: "var(--fg-3)" }}>
            Faturamento é vaidade.
          </span>,
          <Gold key="b">Lucro é sanidade.</Gold>,
        ]}
      />
    ),
  },
];
