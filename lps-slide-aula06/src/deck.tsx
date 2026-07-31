import type { ReactNode } from "react";
import {
  AirplaneTakeoff,
  ArrowRight,
  Calculator,
  ChatCircleDots,
  Compass,
  Copy,
  GraduationCap,
  Hand,
  Headset,
  PaintBucket,
  PaperPlaneTilt,
  Receipt,
  Table,
  Tooth,
  UserPlus,
  UsersThree,
} from "@phosphor-icons/react";
import type { Theme } from "@/components/SlideFrame";
import { Chat, Isolada, Sozinho } from "@/slides/basicos";
import { CardAntesDepois, NomeIncompleto } from "@/slides/reveal";
import {
  BaldePingando,
  Comparacao,
  ContrastePergunta,
  DuasLinhas,
  Escada,
  FaixaContada,
  FraseComSimbolo,
  FraseRiscada,
  IconeComSeta,
  IconeTremendo,
  IconesEsmaecidos,
  MapaMovimentos,
  Midia,
  Multiplicacao,
  NumeroComLinhas,
  PilhaPorPasso,
  QuatroIcones,
  TelaDeMarca,
  TresEtapas,
} from "@/slides/aula6";

/* ═══════════════════════════════════════════════════════════════════
   Os 57 slides da Aula 6 da Imersão Lucro Clínico: o pitch final.

   Duas camadas no mesmo registro:
   - o que a PLATEIA vê (`node`): um elemento central, muito respiro,
     nunca bullet e nunca a frase que ele fala;
   - o que só o LEANDRO vê (`diz`/`tom`/`proximo`): batimento de fala, 4 a
     10 palavras, pra ler de relance sem tirar o olho da câmera.

   `passos` é o build DENTRO do slide. Os reveals (3, 15, 24, 26) e a
   pilha (40) usam o mesmo gesto de avançar: a primeira tecla completa o
   slide, a seguinte troca de slide.
   ═══════════════════════════════════════════════════════════════════ */

export type Slide = {
  n: number;
  bloco: string;
  tema: Theme;
  /** Passos internos. 0 = o slide entra pronto. */
  passos?: number;
  /** O que cada passo faz, mostrado no presenter pra ele não ser pego de surpresa. */
  passoRotulo?: string[];
  stagger?: number;
  diz: string;
  tom: string;
  proximo: string;
  node: ReactNode;
};

/* ── Temperatura ─────────────────────────────────────────────────────
   1 a 27 quente (conta emocional), 28 a 54 frio (demonstração e
   oferta), 55 a 57 quente de novo (fechamento). Duas viradas, ambas em
   fronteira de bloco do roteiro.
   ─────────────────────────────────────────────────────────────────── */

/* Os quatro furos da semana, na ordem em que foram entregues. */
const FUROS = [Calculator, Receipt, UsersThree, PaperPlaneTilt];

/* Os seis movimentos. Mesma lista alimenta os slides 36 e 55. */
const MOVIMENTOS = [
  { n: 1, label: "Decolagem", icon: AirplaneTakeoff },
  { n: 2, label: "GPS", icon: Compass },
  { n: 3, label: "Grupo", icon: UsersThree },
  { n: 4, label: "Tributário", icon: Receipt },
  { n: 5, label: "Didática", icon: GraduationCap },
  { n: 6, label: "Consultores", icon: Headset },
];

export const SLIDES: Slide[] = [
  /* ═══ Bloco 1 ═══ */
  { n: 1, bloco: "1", tema: "warm",
    diz: "Cinco dias depois, hoje fecha o ciclo", tom: "fecha, não abre", proximo: "Promessa",
    node: <Isolada texto="DOMINGO. CINCO DIAS DEPOIS." tamanho="d-xl" px={116} /> },

  { n: 2, bloco: "1", tema: "warm",
    diz: "O que fazer com tudo que já descobriu", tom: "direto", proximo: "José Ronaldo",
    node: <Isolada texto="O que fazer com tudo que você já sabe" tamanho="d-l" px={96} /> },

  { n: 3, bloco: "1", tema: "warm", passos: 1, passoRotulo: ["completa a seta"],
    diz: "José Ronaldo, cem mil e quatro de lucro. Guarda o nome", tom: "expectativa, sem contar ainda", proximo: "Balde furado",
    node: <NomeIncompleto nome="José Ronaldo" /> },

  { n: 4, bloco: "1", tema: "warm",
    diz: "Enquanto o problema for faturamento, o balde continua furado", tom: "retomando a semana", proximo: "Gancho do conteúdo",
    node: <BaldePingando texto="BALDE FURADO" glyph={PaintBucket} /> },

  { n: 5, bloco: "1", tema: "warm",
    diz: "Tem mais, mas é lá na frente", tom: "segura a curiosidade", proximo: "CHAT furos",
    node: <Sozinho texto="hoje tem mais" /> },

  { n: 6, bloco: "1", tema: "warm",
    diz: "Qual furo mais doeu? Guarda a resposta", tom: "convite leve", proximo: "Segunda-feira 7h",
    node: <Chat texto="Qual furo mais te doeu essa semana?" glyph={ChatCircleDots} /> },

  /* ═══ Bloco 2 ═══ */
  { n: 7, bloco: "2", tema: "warm",
    diz: "Te levo de volta pra segunda, sete da manhã", tom: "recap, memória", proximo: "Recap furos",
    node: <Isolada texto="SEGUNDA-FEIRA, 7H" tamanho="d-xl" /> },

  { n: 8, bloco: "2", tema: "warm", stagger: 0.15,
    diz: "Furos, precificação, parceiro, reativação", tom: "ritmo rápido", proximo: "CHAT clique forte",
    node: <QuatroIcones glyphs={FUROS} /> },

  { n: 9, bloco: "2", tema: "warm",
    diz: "Qual dia te fez o clique mais forte", tom: "convite", proximo: "Pergunta que importa",
    node: <Chat texto="Qual dos 5 dias te fez o clique mais forte?" glyph={ChatCircleDots} /> },

  { n: 10, bloco: "2", tema: "warm", stagger: 0.4,
    diz: "Sozinho ou com alguém do lado?", tom: "pausa antes da pergunta", proximo: "Autoridade",
    node: <ContrastePergunta fraco="SOZINHO OU" forte="COM ALGUÉM DO LADO?" /> },

  /* ═══ Bloco 3 ═══ */
  { n: 11, bloco: "3", tema: "warm",
    diz: "Já sabe quem eu sou, hoje quero que saiba de onde eu falo", tom: "abertura pessoal", proximo: "Currículo seco",
    node: <TelaDeMarca /> },

  { n: 12, bloco: "3", tema: "warm",
    diz: "Trinta anos, mas nada disso importa agora", tom: "seco, vira rápido", proximo: "A vela",
    node: <NumeroComLinhas numero="30 ANOS" linhas={["clínica em mais de um estado", "aula em graduação e pós", "OdontoSummit"]} /> },

  { n: 13, bloco: "3", tema: "warm",
    diz: "Minha mãe fazia vela, eu vendia porta em porta", tom: "vulnerável, sem drama", proximo: "A mão que dói",
    node: <Midia id="leandro-vela" label="Leandro na época das velas" kind="print" /> },

  { n: 14, bloco: "3", tema: "warm",
    diz: "A odontologia larga aos poucos, não abandona de uma vez", tom: "verdade incômoda, devagar", proximo: "Maria Emília",
    node: <IconeTremendo glyph={Hand} /> },

  { n: 15, bloco: "3", tema: "warm", passos: 1, passoRotulo: ["revela R$ 16 mil"],
    diz: "Raio-X da clínica, parceiro, base. Seis pra dezesseis", tom: "prova concreta, sem pressa", proximo: "Alguém do lado",
    node: <CardAntesDepois nome="Maria Emília" antes={6} depois={16} /> },

  { n: 16, bloco: "3", tema: "warm",
    diz: "Curso não muda clínica, ter alguém do lado muda", tom: "firme, sem venda", proximo: "O que é o Águia",
    node: <Isolada texto="ALGUÉM DO LADO" tamanho="d-xl" cor="var(--accent-display)" peso /> },

  /* ═══ Bloco 4.1 ═══ */
  { n: 17, bloco: "4.1", tema: "warm",
    diz: "O que eu queria ter tido quando era aquele dentista perdido", tom: "emocional, breve", proximo: "Definição objetiva",
    node: <Sozinho texto="o que eu queria ter tido" /> },

  { n: 18, bloco: "4.1", tema: "warm",
    diz: "Seis meses, a ordem certa, o lucro que já existe", tom: "seco, definição", proximo: "O grande problema",
    node: <Isolada texto="6 MESES. A ORDEM CERTA." tamanho="d-xl" px={130} /> },

  /* ═══ Bloco 4.2 ═══ */
  { n: 19, bloco: "4.2", tema: "warm",
    diz: "Dentista e dono de clínica são duas profissões", tom: "firme", proximo: "Analogia da cárie",
    node: <FraseComSimbolo antes="DENTISTA" simbolo="≠" depois="DONO DE CLÍNICA" /> },

  { n: 20, bloco: "4.2", tema: "warm",
    diz: "Cárie: trata a causa, não só a dor", tom: "didático", proximo: "O que já tentou",
    node: <IconeComSeta glyph={Tooth} seta={ArrowRight} rotulo="causa" /> },

  { n: 21, bloco: "4.2", tema: "warm", stagger: 0.2,
    diz: "Planilha, copiar colega, contratar gente, curso técnico", tom: "reconhecimento, sem julgar", proximo: "O mecanismo único",
    node: <IconesEsmaecidos glyphs={[Table, Copy, UserPlus, GraduationCap]} /> },

  /* ═══ Bloco 4.3 ═══ */
  { n: 22, bloco: "4.3", tema: "warm",
    diz: "Lucro Primeiro, a diferença do que eu construí", tom: "virada de bloco", proximo: "A ordem certa",
    node: <Isolada texto="LUCRO PRIMEIRO" tamanho="d-xl" cor="var(--accent-display)" peso /> },

  { n: 23, bloco: "4.3", tema: "warm", stagger: 0.8,
    diz: "Tampa o vazamento, organiza, só depois constrói. Nessa ordem", tom: "devagar, deixa assentar", proximo: "José Ronaldo (prova)",
    node: <TresEtapas etapas={["Vazamento", "Organização", "Construção"]} /> },

  /* ═══ Bloco 4.4 ═══ */
  { n: 24, bloco: "4.4", tema: "warm", passos: 1, passoRotulo: ["revela R$ 22 mil"],
    diz: "Fecha a história do José Ronaldo. Quatro pra vinte e dois", tom: "fecha o loop do Bloco 1", proximo: "Maria Emília",
    node: <CardAntesDepois nome="José Ronaldo" antes={4} depois={22} /> },

  { n: 25, bloco: "4.4", tema: "warm",
    diz: "Maria Emília de novo, seis pra dezesseis", tom: "reforço rápido", proximo: "Ana Beatriz",
    node: <CardAntesDepois nome="Maria Emília" antes={6} depois={16} comReveal={false} /> },

  { n: 26, bloco: "4.4", tema: "warm", passos: 1, passoRotulo: ["revela R$ 13 mil"],
    diz: "Ana Beatriz, sete pra treze. Nenhum atendeu mais gente", tom: "reforço", proximo: "CHAT qual caso",
    node: <CardAntesDepois nome="Ana Beatriz" antes={7} depois={13} /> },

  { n: 27, bloco: "4.4", tema: "warm",
    diz: "Qual desses parece com sua clínica", tom: "convite", proximo: "Promessa do método",
    node: <Chat texto="Qual desses casos parece com sua clínica?" glyph={ChatCircleDots} /> },

  /* ═══ Bloco 5 · aqui o fundo vira frio ═══ */
  { n: 28, bloco: "5", tema: "cold",
    diz: "Não faturar mais, dobrar o que sobra. Seis movimentos agora", tom: "vira a chave pra demonstração", proximo: "Movimento 1",
    node: <Isolada texto="MAIS QUE DOBRAR O QUE SOBRA" tamanho="d-xl" px={118} /> },

  { n: 29, bloco: "5", tema: "cold",
    diz: "Decolagem e DISC, o insumo das duas horas comigo", tom: "mostra a tela, sem pressa", proximo: "GPS",
    node: <Midia id="movimento-1-disc-proposta" label="Ficha de decolagem e teste DISC" kind="video" /> },

  { n: 30, bloco: "5", tema: "cold",
    diz: "Seu GPS, espaço só seu", tom: "mostra a tela", proximo: "Grupo",
    node: <Midia id="movimento-2-copiloto" label="Navegação pelo GPS / Guia de Voo" kind="video" /> },

  { n: 31, bloco: "5", tema: "cold",
    diz: "Grupo de no máximo dez, eu leio, eu respondo", tom: "mostra o print", proximo: "Tributário",
    node: <Midia id="movimento-3-grupo-whatsapp" label="Grupo de WhatsApp" kind="print" /> },

  { n: 32, bloco: "5", tema: "cold",
    diz: "Fator R, já vi pagar a parcela sozinho", tom: "mostra a tela", proximo: "Área didática",
    node: <Midia id="movimento-4-tributario" label="Consultor Tributário e Financeiro" kind="video" legenda="Fator R + equipe de contabilidade" /> },

  { n: 33, bloco: "5", tema: "cold",
    diz: "Aula de dez minutos, não curso de dez horas", tom: "mostra a tela", proximo: "Central completa",
    node: <Midia id="movimento-5a-area-didatica" label="Lista de aulas da área didática" kind="video" /> },

  { n: 34, bloco: "5", tema: "cold",
    diz: "Central inteira, sem limite, tudo já pronto", tom: "orgulho de produto, deixa rodar", proximo: "Secretária",
    node: <Midia id="movimento-5b-central-consultores" label="Grid dos 13 consultores" kind="video" /> },

  { n: 35, bloco: "5", tema: "cold",
    diz: "Treino sua secretária, ao vivo e gravado", tom: "mostra o print", proximo: "Slide-mapa",
    node: <Midia id="movimento-5c-treinamento-secretaria" label="Treinamento da secretária" kind="video" /> },

  { n: 36, bloco: "5", tema: "cold", stagger: 0.1,
    diz: "Seis meses assim, do meu lado, não um PDF", tom: "fecha a demonstração", proximo: "Pra quem é",
    node: <MapaMovimentos itens={MOVIMENTOS} /> },

  { n: 37, bloco: "5", tema: "cold",
    diz: "Dono de consultório ou clínica, cansado de trabalhar muito", tom: "direto", proximo: "Pra quem não é",
    node: <Isolada texto="DONO DE CONSULTÓRIO OU CLÍNICA" tamanho="d-xl" px={108} /> },

  { n: 38, bloco: "5", tema: "cold",
    diz: "Só quer mais paciente? Não é pra você", tom: "claro, sem rodeio", proximo: "CHAT eu sou",
    node: <FraseRiscada texto="SÓ QUER MAIS PACIENTE?" /> },

  { n: 39, bloco: "5", tema: "cold",
    diz: "Se você se enxergou, escreve EU SOU", tom: "convite", proximo: "Ancoragem das peças",
    node: <Chat texto="EU SOU" glyph={ChatCircleDots} /> },

  /* ═══ Bloco 6 ═══ */
  { n: 40, bloco: "6", tema: "cold", passos: 3,
    passoRotulo: ["+ R$ 3 mil", "+ R$ 5 mil", "+ R$ 3 mil"],
    diz: "Quanto isso custaria montado sozinho, peça por peça", tom: "constrói a conta", proximo: "Total das peças",
    node: <PilhaPorPasso valores={["R$ 4 mil", "+ R$ 3 mil", "+ R$ 5 mil", "+ R$ 3 mil"]} /> },

  { n: 41, bloco: "6", tema: "cold",
    diz: "Passa dos quinze mil. Guarda esse número", tom: "pausa", proximo: "Retorno mensal",
    node: <Isolada texto="R$ 15 MIL" tamanho="d-hero" cor="var(--fg-2)" /> },

  { n: 42, bloco: "6", tema: "cold",
    diz: "Só ajustando preço e parceiro, quatro a oito mil por mês", tom: "virada da conta", proximo: "Retorno em 6 meses",
    node: <FaixaContada de={4} ate={8} sufixo="/ mês" /> },

  { n: 43, bloco: "6", tema: "cold",
    diz: "Vinte a quarenta mil limpos em seis meses", tom: "ancoragem forte", proximo: "Pergunta de temperatura",
    node: <Multiplicacao de="R$ 4 a 8 mil / mês" fator="x6" para="R$ 20 a 40 mil" /> },

  { n: 44, bloco: "6", tema: "cold",
    diz: "Sem olhar o investimento, quem entraria?", tom: "mede a sala antes de seguir", proximo: "Preço de mercado",
    node: <Chat texto="SEM OLHAR O INVESTIMENTO, VOCÊ ENTRARIA?" glyph={ChatCircleDots} forte /> },

  /* ═══ Bloco 7 ═══ */
  { n: 45, bloco: "7", tema: "cold",
    diz: "No mercado, isso custa quinze a vinte mil", tom: "referência neutra", proximo: "Preço cheio",
    node: <Isolada texto="R$ 15 a 20 mil" tamanho="d-xl" cor="var(--fg-3)" /> },

  { n: 46, bloco: "7", tema: "cold",
    diz: "Pra quem chega do zero, dez mil em doze vezes", tom: "neutro", proximo: "Condição da turma",
    node: <Isolada texto="R$ 10 mil / 12x" tamanho="d-xl" cor="var(--fg-3)" /> },

  { n: 47, bloco: "7", tema: "cold",
    diz: "Pra quem garante nessa turma: quinhentos e cinquenta ou seis mil", tom: "reveal, sem pressa", proximo: "Garantia",
    /* 112 e não 122: este é o único slide com brilho forte (2,2% contra
       0,8%), então precisa de mais folga que os outros pra caber COM o
       movimento. Medido: a 122px os glifos passavam 7px da área segura. */
    node: <Isolada texto="R$ 550/mês OU R$ 6 mil à vista" tamanho="d-xl" px={112} cor="var(--accent-display)" peso brilha /> },

  /* ═══ Bloco 8 ═══ */
  { n: 48, bloco: "8", tema: "cold",
    diz: "Trinta dias, incondicional. Use a garantia", tom: "tira o risco primeiro", proximo: "Reserva",
    node: <Isolada texto="30 DIAS. INCONDICIONAL." tamanho="d-xl" px={128} /> },

  { n: 49, bloco: "8", tema: "cold", stagger: 0.5,
    diz: "Amanhã é reserva de mil, reembolsável em sete dias", tom: "devagar, é o ponto novo", proximo: "Bônus do site",
    node: <NumeroComLinhas numero="RESERVA DE R$ 1.000" linhas={["100% reembolsável em 7 dias"]} /> },

  { n: 50, bloco: "8", tema: "cold",
    diz: "Site pronto, no seu nome, aparecendo no Google", tom: "mostra o print", proximo: "Escada de bônus",
    node: <Midia id="bonus-site-google" label="Site entregue, posicionado no Google" kind="print" /> },

  { n: 51, bloco: "8", tema: "cold", stagger: 0.8,
    diz: "Cinco primeiros, até 8h, até 23h59 de segunda", tom: "build, um de cada vez", proximo: "Escassez",
    node: <Escada degraus={["5 primeiros", "até 8h segunda", "até 23h59 segunda"]} /> },

  { n: 52, bloco: "8", tema: "cold",
    diz: "Turma pequena de propósito", tom: "firme", proximo: "Os 2 grupos",
    node: <Isolada texto="TURMA LIMITADA" tamanho="d-xl" /> },

  { n: 53, bloco: "8", tema: "cold",
    diz: "6h50 quem preencheu, 7h todo mundo. Dez minutos", tom: "urgência real", proximo: "Entrega do conteúdo",
    node: <Comparacao a="6h50" b="7h00" diferenca="10 min" /> },

  { n: 54, bloco: "8", tema: "cold",
    diz: "O material de hoje já está liberado, é seu de qualquer jeito", tom: "fecha o loop-mestre", proximo: "Objeções",
    node: <Isolada texto="SEU MATERIAL JÁ ESTÁ LIBERADO" tamanho="d-xl" px={112} cor="var(--accent-display)" peso /> },

  /* ═══ Blocos 9 e 10 · volta ao quente ═══ */
  { n: 55, bloco: "9", tema: "warm", stagger: 0.1,
    diz: "Objeção por objeção, sem repetir o produto", tom: "acolhedor, paciente", proximo: "O que fazer agora",
    node: <MapaMovimentos itens={MOVIMENTOS} /> },

  { n: 56, bloco: "10", tema: "warm", stagger: 0.45,
    diz: "Hoje é ficha, amanhã é reserva de mil", tom: "leve o peso da decisão", proximo: "Fechamento",
    node: <DuasLinhas linhas={["HOJE: FICHA.", "AMANHÃ: RESERVA."]} /> },

  { n: 57, bloco: "10", tema: "warm",
    diz: "Você apareceu a semana inteira. Faturamento é vaidade, lucro é sanidade", tom: "emocional, fica parado no fim", proximo: "fim da aula",
    node: <Isolada texto="FATURAMENTO É VAIDADE. LUCRO É SANIDADE." tamanho="d-xl" px={104} cor="var(--accent-display)" peso /> },
];

/** Passos por slide, na ordem. O useDeck precisa disso pra navegar. */
export const PASSOS = SLIDES.map((s) => s.passos ?? 0);
