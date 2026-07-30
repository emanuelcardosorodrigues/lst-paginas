# Slides ao vivo · Aula 2 · Programa Águia

Tela de fundo que o Leandro projeta atrás dele durante a Aula 2. Não é
landing page: sem tracking, sem pixel, sem SEO, `noindex` desde o primeiro
deploy. Só ele e a produção acessam.

**URL:** https://leandrostecca.com.br/p/lps-slide-aula04/
**Modo apresentador:** `?presenter=1` (contador e direção de cena, nunca na projeção)

## Como apresentar

| Tecla | Ação |
|---|---|
| `→` `↓` `PageDown` `Espaço` `Enter` | avança |
| `←` `↑` `PageUp` `Backspace` | volta |
| `Home` / `End` | primeiro / último slide |
| `F` | tela cheia |
| clique em qualquer ponto | avança (clicker e mouse) |

A URL guarda o slide na âncora (`#s23`), então recarregar no meio do ensaio
não volta pro slide 1. Editar a âncora na barra de endereço pula direto pro
slide, o que é o atalho de ensaio quando você quer rever um slide específico
sem avançar até ele.

O palco é um canvas fixo de 1920x1080 escalado por `transform` pra caber na
viewport. Deck projetado não pode reflowar: o que foi ensaiado no notebook é
exatamente o que aparece no projetor. Em telas 16:10 sobra uma faixa fina em
cima e embaixo, na cor do slide.

## Rodar e publicar

```bash
# local
cd ~/Projects/protocolo-dpl/lps-slide-aula04
npm run dev            # http://localhost:5199/p/lps-slide-aula04/

# build (ou `npm run build:slide-aula04` na raiz do repo)
npm run build

# deploy: SEM --name, senão sobrescreve outro worker
cd ~/Projects/protocolo-dpl/w-lst-paginas
npx wrangler deploy
```

## Mídia: todos os slots preenchidos

Os arquivos vêm de `~/Documents/Trabalho/LST/LPS/Slides/Aula 02` (espelhado
no HD externo em `Clientes/LST - Leandro Stecca/Funis/LPS - Lançamento Pago
Semanal/Slides/Aula 02`).

São 14 arquivos, 24 MB no total, todos versionados no bundle: o deck não
depende de rede nenhuma além do próprio Worker.

Para trocar um slot: solte o arquivo em `src/assets/<id>.<ext>` e rebuilde. O `import.meta.glob` acha pelo nome, o placeholder desaparece e
nenhum componente de slide muda.

| Slide | `id` | Estado |
|---|---|---|
| 3 | `calculadora-precificacao` | Calculadora OdontoLucro limpa (print) |
| 4 | `calculadora-resultado` | Calculadora preenchida com exemplo (print) |
| 7 | `mensagens-reativacao` | painel de resultados da campanha, com blur de teaser |
| 10 | `corrida-dos-ratos` | recorte de 20s do clipe, sem áudio |
| 14 | `leandro-vela` + `leandro-consultorio` | as duas fotos da época |
| 18 | `movimento-1-disc-proposta` | vídeo de tela, 10s (resultado do DISC) |
| 20 | `movimento-2-copiloto` | vídeo de tela, 35s |
| 22 | `movimento-3-grupo-whatsapp` | print do grupo |
| 24 | `movimento-4-tributario` | vídeo de tela, 76s |
| 27 | `movimento-5a-area-didatica` | vídeo de tela, 28s (reescalado de 2842px pra 1920px) |
| 29 | `movimento-5b-central-consultores` | vídeo de tela, 76s |
| 30 | `movimento-5c-treinamento-secretaria` | vídeo de tela, 34s |
| 32 | `caso-jose-ronaldo` | foto do caso |

### Tratamento dos arquivos

- **Vídeo entra como mp4/h264/30fps, sem áudio.** Os originais são `.mov` a
  75fps: container QuickTime não é garantido em todo navegador, e o deck muta
  de qualquer forma. Transcodificar é obrigatório, não otimização.
- **`fit="contain"` em toda captura de tela e print.** Os arquivos são 4:3
  (1252x948) e retrato (577x963); num quadro 16:9 o `cover` cortaria 30% da
  altura de um vídeo de tela e quase toda a conversa de um print. `cover`
  fica só nas fotos, onde o enquadramento é o assunto.
- Vídeo reinicia a cada entrada no slide e roda em loop, com Ken Burns lento
  (100% a 106% em 20s).

### Dois pontos de atenção nesses assets

1. **Slides 3 e 4 são prints, não vídeo de tela.** O roteiro pedia a conta
   acontecendo ao vivo; hoje são duas telas paradas (limpa e preenchida). A
   conta não anima. Se quiser o movimento, precisa de gravação do consultor
   de Precificação da Central (`/app/consultor/precificacao`: botão "Nova
   precificação" → formulário → "Resultado").
2. **O print do slide 7 é o painel de resultados**, não as mensagens
   prontas: contém "R$ 297.524,00" e "88,2% de fechamento". O blur de teaser
   revela só a faixa do título e borra os números de propósito. Se quiser o
   número legível, é tirar o `blur` no slide 7 de `deck.tsx` — e aí ele
   passa a ser um claim financeiro exposto, que pede ressalva na tela.

## Buraco de conteúdo que sobrou

**Slide 4, número final da calculadora.** O roteiro pede "destaque só no
número final" sem trazer o valor. Hoje o slide mostra o print da calculadora
preenchida com um card de "copy pendente" por cima.

Resolvidos: o slide 31 ("pra quem é / pra quem não é") teve a copy escrita a
pedido do Leandro e está em `deck.tsx`, junto do slide. O slide 32 usa os
números já publicados na proposta do Alex Barreira (R$ 4 mil para R$ 22 mil,
Santa Isabel), liberados por ele, com ressalva de resultado individual na
própria tela.

## Os 4 furos

Nomenclatura fechada pelo Leandro, usada nos três slides que os recapitulam
(2, 8 e 37): **Precificação · Imposto · Dentista parceiro · Captação
errada**. O roteiro original trazia três conjuntos divergentes (slide 2 dizia
Agenda/Base, o 8 dizia Parceiro/Agenda, o 37 dizia Parceiro/Base); está
unificado.

O slug é `lps-slide-aula04` e o slide 1 diz "AULA 2" — confirmado como
intencional.

## Como o deck é montado

```
src/
  deck.tsx            os 40 slides: texto do roteiro, tema, direção de cena
  App.tsx             palco, letterbox, navegação
  lib/
    useDeck.ts        teclado, clique, âncora, escala do palco
    motion.ts         springs e variants compartilhados
  components/
    SlideFrame.tsx    crossfade, janela de 3 slides, contexto de slide ativo
    AssetSlot.tsx     registro de mídia + placeholder + CopyPending
    pieces.tsx        marca, régua, UnitLine, Dot
    PresenterHUD.tsx  contador e direção de cena (só com ?presenter=1)
  slides/
    text.tsx          Statement, Word (letra por letra), Build, ListaDupla
    diagrams.tsx      Ladder, MapaMovimentos, Contador, FurosRecap, DuasTarefas
    media.tsx         Screen (3 composições), Caso, DuasFotos
    forms.tsx         ficha de interesse (representação, não formulário)
```

O slide-mapa dos 6 movimentos é **uma** section com prop `highlight`,
reaproveitada nos slides 17, 19, 21, 23, 26 e 28. A escada de 4 degraus é a
mesma nos slides 2 e 37, mudando só o `done` de cada degrau.

### Decisões que valem saber

- **React 19 + Motion, não Preact + GSAP.** O briefing pedia Preact+GSAP mas
  também mandava copiar a config de `pda-proposta-alex-barreira`, que é
  React 19 + `motion/react` + Tailwind v4. Como a navegação é por teclado, o
  `ScrollTrigger` (a única coisa que só o GSAP faz) ficaria desligado, e o
  resto (timeline, stagger, sequência) o Motion já faz. Misturar GSAP e
  Motion na mesma árvore é contraindicado pelos dois.
- **Tokens vieram do código, não da captura de tela.** Os valores estimados
  no briefing (navy `#14141F`, ouro `#A8862F`) estavam errados: a marca é
  charcoal `#1A1A1A` + creme `#FAF9F7` + ouro `#C8A84E`. Regra herdada do
  original: `#C8A84E` só em display grande, `#A8893A` em texto pequeno sobre
  claro, `#D4B96A` sobre escuro, e nunca branco sobre ouro.
- **Fontes auto-hospedadas** (`public/fonts/`, 225 kB). A apresentação roda
  ao vivo e não pode depender da rede do local alcançar `fonts.gstatic.com`.
  O `post-build.js` falha o build se elas não chegarem no `dist/`.
- **Sem scroll-snap.** O briefing pedia `scroll-snap-type: x mandatory` e
  também um crossfade entre slides; os dois não coexistem (com snap você vê
  o slide vizinho passando de lado, não um crossfade). Ficou o crossfade,
  com os slides empilhados e só o ativo visível. Num pitch ao vivo, scroll
  livre é risco: um swipe de trackpad deixaria o Leandro entre dois slides.
- **CSS bloqueante de propósito.** As páginas de tráfego deste repo carregam
  CSS async pra ganhar connect rate. Aqui não existe connect rate, e um
  flash de conteúdo sem estilo na frente da plateia é pior que 80 ms no
  primeiro paint.
- **Voltar um slide não repete a animação de entrada**, mas voltar de mais
  longe repete. Avançou sem querer e voltou? O slide aparece pronto, sem
  rebuild de 3 segundos no meio da frase. Voltou de propósito lá de trás
  (pro mapa, por exemplo)? A entrada roda de novo.
- **Os nomes no print do grupo ficam à mostra.** O roteiro pedia "nomes
  tarjados" e o print traz nomes completos de duas participantes. Levantei e
  o Leandro decidiu manter.
- **Sem GTM.** Contraria o padrão "GTM em toda página nova" do repo, porque
  o briefing excluiu tracking e esta página não recebe tráfego.
