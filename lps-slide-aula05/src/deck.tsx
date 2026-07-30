import type { ReactNode } from "react";
import {
  ArrowUUpLeft,
  Calculator,
  ChatCircleDots,
  CreditCard,
  Drop,
  Handshake,
  LockKey,
  PaintBucket,
  PaperPlaneTilt,
  Receipt,
  Tag,
  Vault,
} from "@phosphor-icons/react";
import type { Theme } from "@/components/SlideFrame";
import {
  CTA,
  Chat,
  Grade4,
  IconeRecap,
  Isolada,
  Particulas,
  Sozinho,
  TresLinhas,
  Titulo,
} from "@/slides/basicos";
import { Ancoragem, Base, SomaAcumulada, Total, type ItemSoma } from "@/slides/conta";
import { BonusTravado, LogicaVazamento, ObjecaoRespondida } from "@/slides/racional";

/* ═══════════════════════════════════════════════════════════════════
   Os 30 slides da Aula 5 da Imersão Lucro Clínico.

   Duas camadas no mesmo registro:

   - o que a PLATEIA vê (`node`): palavra isolada, número grande ou
     ícone. Nunca bullet, nunca parágrafo, e nunca a frase que ele fala;
   - o que só o LEANDRO vê (`diz`, `tom`, `proximo`): as palavras-chave
     do roteiro, renderizadas exatamente como estão na tabela. Não são
     frase pronta de propósito: ler frase pronta na câmera aparece.

   O texto público é literal. Onde o roteiro escreveu "→", as palavras e
   a ordem continuam as mesmas e só o separador virou forma (uma seta de
   48px), porque um "→" tipográfico dentro de uma frase de 62px some na
   projeção.
   ═══════════════════════════════════════════════════════════════════ */

export type Slide = {
  n: number;
  secao: string;
  tema: Theme;
  /** Intervalo entre as entradas do conteúdo. */
  stagger?: number;
  /** Palavras-chave da fala. Só no presenter. */
  diz: string;
  /** Registro/entrega. Só no presenter. */
  tom: string;
  /** O que vem depois. Só no presenter. */
  proximo: string;
  node: ReactNode;
};

/* ── Temperatura ─────────────────────────────────────────────────────
   1 a 19 quente, 20 a 30 frio. Uma virada só, no corte do roteiro: é o
   sinal visual de que o registro passou de emocional pra racional.
   ─────────────────────────────────────────────────────────────────── */

/* Os quatro furos da semana. A mesma lista alimenta os recaps (2 a 5) e
   a grade do slide 6, então o mapa nunca diverge do recap. */
const FUROS = [
  { texto: "FUROS DO BALDE", glyph: PaintBucket },
  { texto: "PRECIFICAÇÃO REAL", glyph: Calculator },
  { texto: "DENTISTA PARCEIRO", glyph: Handshake },
  { texto: "REATIVAÇÃO DE BASE", glyph: PaperPlaneTilt },
];

/* A sequência da conta. Slides 11 a 14 mostram um item cada, o 15 soma.
   Uma lista só: o recibo do slide 14 é literalmente os itens anteriores,
   não uma cópia mantida à mão. */
const SOMA: ItemSoma[] = [
  { id: "preco", valor: "+ R$ 1.000", glyph: Tag },
  { id: "imposto", valor: "+ alguns milhares", glyph: Receipt },
  { id: "maquininha", valor: "+ R$ 400", glyph: CreditCard },
  { id: "reativacao", valor: "+ R$ 5.000", glyph: ArrowUUpLeft },
];

/* `n` segue a numeração do roteiro, não a posição. O slide 18 foi
   cortado (ele repetia o texto do 17), então há um buraco entre 17 e 19.
   O contador do presenter mostra a POSIÇÃO (1..29), que é o que importa
   ao vivo. */
export const SLIDES: Slide[] = [
  {
    n: 1,
    secao: "Validar progresso",
    tema: "warm",
    diz: "Chão que você andou essa semana, você nem parou pra ver o tamanho",
    tom: "professor orgulhoso, não vendedor",
    proximo: "Furos",
    node: <Titulo titulo="5 dias." sub="O que você já destravou." />,
  },
  {
    n: 2,
    secao: "Recap furos",
    tema: "warm",
    diz: "Segunda e terça, achou os furos do balde vazando sem saber onde",
    tom: "recap, ritmo rápido",
    proximo: "Precificação",
    node: <IconeRecap texto={FUROS[0].texto} glyph={FUROS[0].glyph} furoFechando />,
  },
  {
    n: 3,
    secao: "Recap precificação",
    tema: "warm",
    diz: "Terça e quarta, conta de verdade, o que achava que era lucro não era",
    tom: "mesmo ritmo",
    proximo: "Parceiro",
    node: <IconeRecap texto={FUROS[1].texto} glyph={FUROS[1].glyph} />,
  },
  {
    n: 4,
    secao: "Recap parceiro",
    tema: "warm",
    diz: "Quarta e quinta, parceria sangrando ou virando renda",
    tom: "mesmo ritmo",
    proximo: "Reativação",
    node: <IconeRecap texto={FUROS[2].texto} glyph={FUROS[2].glyph} />,
  },
  {
    n: 5,
    secao: "Recap reativação",
    tema: "warm",
    diz: "Ontem, processo inteiro, script pronto, régua na ordem certa",
    tom: "fecha o recap",
    proximo: "Mapa da semana",
    node: <IconeRecap texto={FUROS[3].texto} glyph={FUROS[3].glyph} />,
  },
  {
    n: 6,
    secao: "Mapa da semana",
    tema: "warm",
    /* Stagger rápido: o mapa tem que fechar como uma imagem só. */
    stagger: 0.15,
    diz: "Tudo isso numa semana só",
    tom: "pausa, deixa respirar",
    proximo: "SOZINHO",
    node: <Grade4 glyphs={FUROS.map((f) => f.glyph)} />,
  },
  {
    n: 7,
    secao: "Quebra de objeção indireta",
    tema: "warm",
    diz: "Sozinho tem resultado sim. Com alguém do lado, mais rápido e sem gastar energia. Guarda esse comentário, não é sobre hoje",
    tom: "observação de passagem, nunca venda",
    proximo: "CHAT furos",
    node: <Sozinho texto="SOZINHO" />,
  },
  {
    n: 8,
    secao: "CHAT",
    tema: "warm",
    diz: "Qual furo você já colocou a mão: preço, imposto, parceiro ou reativação",
    tom: "convite leve. Espera resposta, comenta 2 ou 3 nomes reais",
    proximo: "A CONTA",
    node: <Chat texto="Qual furo você já destravou? Comenta aí." glyph={ChatCircleDots} />,
  },
  {
    n: 9,
    secao: "Abertura da conta",
    tema: "warm",
    diz: "Ninguém fez isso com você essa semana: somar tudo numa conta só, ao vivo",
    tom: "anúncio, cria expectativa",
    proximo: "R$ 30 mil",
    node: <Isolada texto="A CONTA" />,
  },
  {
    n: 10,
    secao: "Base do cálculo",
    tema: "warm",
    diz: "Consultório exemplo, custo fixo 30 mil, só empilhar o que já mostrei, sem inventar nada",
    tom: "calmo, construindo",
    proximo: "Soma preço",
    node: <Base valor={30000} sufixo="/ mês" legenda="clínica exemplo" />,
  },

  /* ── A soma acumulada: um item por slide, o recibo cresce ── */
  {
    n: 11,
    secao: "Soma preço",
    tema: "warm",
    diz: "Profilaxia de 290 pra 350. 60 reais em 10 a 15 procedimentos, quase mil reais",
    tom: "didático",
    proximo: "Imposto",
    node: <SomaAcumulada itens={SOMA} index={0} />,
  },
  {
    n: 12,
    secao: "Soma imposto",
    tema: "warm",
    diz: "27,5% contra 6% com CNPJ organizado. Alguns milhares por mês, dentro da lei",
    tom: "didático",
    proximo: "Maquininha",
    node: <SomaAcumulada itens={SOMA} index={1} />,
  },
  {
    n: 13,
    secao: "Soma maquininha",
    tema: "warm",
    diz: "Taxa de 4,5 pra 2,9. Mais de 400 reais que ficavam na maquininha",
    tom: '"olha isso"',
    proximo: "Reativação",
    node: <SomaAcumulada itens={SOMA} index={2} />,
  },
  {
    n: 14,
    secao: "Soma reativação",
    tema: "warm",
    diz: "25 mil parados. Não prometo que volta tudo. Se voltar 20%, são 5 mil sem gastar em anúncio",
    tom: "honesto, sem exagero",
    proximo: "TOTAL",
    node: <SomaAcumulada itens={SOMA} index={3} />,
  },
  {
    n: 15,
    secao: "Total",
    tema: "warm",
    diz: "7 a 8 mil por mês. Por mês, não uma vez só. Não inventei número nenhum, cada valor é seu",
    tom: "firmeza, sem euforia",
    proximo: "CHAT sua conta",
    node: <Total itens={SOMA} valor="R$ 7.000 a R$ 8.000" sufixo="/ mês" />,
  },

  {
    n: 16,
    secao: "CHAT",
    tema: "warm",
    diz: "Faz com os SEUS números, não os meus. Escreve a estimativa",
    tom: "convite",
    proximo: "TÁ PAGO",
    node: <Chat texto="Faz a sua conta. Quanto isso dá aí na sua clínica?" glyph={ChatCircleDots} />,
  },
  {
    n: 17,
    secao: "Tá pago",
    tema: "warm",
    diz: "Valeu a pena essas manhãs de 7h? Ingresso baixo de propósito. Preciso saber se o retorno bateu",
    tom: "leve, conversa de bar",
    proximo: "Chat enchendo",
    node: <Isolada texto="TÁ PAGO?" />,
  },
  {
    n: 19,
    secao: "Chat enchendo",
    tema: "warm",
    diz: "Olha isso enchendo. Fico feliz de ver. E é por isso que eu não paro por aqui hoje",
    tom: "alegria real. Segura 15 a 20 segundos",
    proximo: "A jornada de verdade",
    node: <Particulas glyph={ChatCircleDots} />,
  },

  /* ── Virada de temperatura: daqui até o fim, frio ── */
  {
    n: 20,
    secao: "Virada de tom",
    tema: "cold",
    diz: "Ontem foi coração, os 6 movimentos, minha história. Hoje é frio e objetivo. Você merece o porquê lógico também",
    tom: "vira a chave, mais frio",
    proximo: "O que é o Águia",
    /* Quebra em duas linhas equilibradas; a 108px os glifos usavam só 49%
       da largura da tela. */
    node: <Isolada texto="Agora, a jornada vai começar de verdade" tamanho="d-xl" px={132} />,
  },
  {
    n: 21,
    secao: "O que é o Águia",
    tema: "cold",
    stagger: 0.42,
    diz: "6 meses comigo, grupo de até 10, ordem certa aplicada na sua realidade, com prazo, tarefa e revisão",
    tom: "seco, sem enfeite",
    proximo: "Objeção 1",
    node: (
      <TresLinhas
        marca="Programa Águia de Aceleração de Clínicas"
        linhas={["6 MESES.", "GRUPO DE ATÉ 10.", "ORDEM CERTA."]}
      />
    ),
  },
  {
    n: 22,
    secao: "Objeção 1",
    tema: "cold",
    diz: "Chegou pergunta: não sei por onde começar. Você não decide sozinho, a gente decide na reunião de 2h olhando o SEU consultório",
    tom: "respondendo pergunta real",
    proximo: "Objeção 2",
    node: <ObjecaoRespondida pergunta="Por onde começar?" resposta="Reunião de 2h" />,
  },
  {
    n: 23,
    secao: "Objeção 2",
    tema: "cold",
    diz: "E se eu travar no meio. Grupo pequeno e quinzenal. Travar sozinho é fácil, travar com alguém cobrando prazo é difícil",
    tom: "mesmo registro",
    proximo: "Lógica 1",
    node: <ObjecaoRespondida pergunta="Travar no meio?" resposta="Grupo + quinzenal" />,
  },
  {
    n: 24,
    secao: "Lógica 1",
    tema: "cold",
    diz: "Preço sem imposto: o ganho vaza no imposto",
    tom: "devagar, deixa a lógica fechar sozinha",
    proximo: "Lógica 2",
    node: <LogicaVazamento causa="Ajusta preço, não olha imposto" consequencia="vaza" glyph={Drop} vazando />,
  },
  {
    n: 25,
    secao: "Lógica 2",
    tema: "cold",
    diz: "Imposto sem parceiro: vaza na parceria mal calculada",
    tom: "devagar",
    proximo: "Lógica 3",
    node: <LogicaVazamento causa="Ajusta imposto, não olha parceiro" consequencia="vaza" glyph={Drop} vazando />,
  },
  {
    n: 26,
    secao: "Lógica 3",
    tema: "cold",
    diz: "Tudo ajustado sem reativar: dinheiro que já é seu fica parado",
    tom: "devagar",
    proximo: "SEQUÊNCIA",
    /* Sem gota e sem halo: aqui é dinheiro parado, não vazando. A quebra
       do padrão é o argumento. */
    node: <LogicaVazamento causa="Ajusta tudo, não reativa" consequencia="fica parado" glyph={Vault} vazando={false} />,
  },
  {
    n: 27,
    secao: "Síntese",
    tema: "cold",
    diz: "O Águia é essa sequência na ordem, com alguém garantindo que você não destampa um furo abrindo outro. Não tem sorte, tem sequência",
    tom: "conclusão firme",
    proximo: "Ancoragem",
    node: <Isolada texto="SEQUÊNCIA, NÃO SORTE." tamanho="d-xl" cor="var(--accent-display)" peso />,
  },
  {
    n: 28,
    secao: "Ancoragem",
    tema: "cold",
    diz: "7 a 8 mil vezes 12: 80 a 90 mil que ou vazam ou ficam com você. Não é investimento agora, isso é domingo",
    tom: "ancorando, sem pressa",
    proximo: "Bônus",
    node: <Ancoragem mes="R$ 7-8 mil/mês" fator="x12" ano="R$ 80-90 mil/ano" />,
  },
  {
    n: 29,
    secao: "Seeding do bônus",
    tema: "cold",
    diz: "Sementinha: domingo eu abro tudo, valor, condição, garantia, e revelo o bônus do Google Meu Negócio. Guarda essa palavra",
    tom: "curiosidade, não entrega nada",
    proximo: "CTA ficha",
    node: <BonusTravado texto="Acelerador de Google Meu Negócio" selo="revelado domingo" glyph={LockKey} />,
  },
  {
    n: 30,
    secao: "CTA",
    tema: "cold",
    stagger: 0.3,
    diz: "Mais de 100 inscritos, máximo 10 por turma, preciso saber quem tem interesse. Preencher não compromete a nada, você só me diz que quer que eu te acompanhe",
    tom: "sincero, sem pressão",
    proximo: "fim do bloco, entra Google e redes",
    node: (
      <CTA
        chamada="Tome a primeira ação AGORA"
        titulo="FICHA DE INTERESSE"
        linha2="+100 inscritos, até 10 por turma"
        linha3="não te compromete a nada"
      />
    ),
  },
];
