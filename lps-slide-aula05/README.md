# Slides ao vivo · Aula 5 · Imersão Lucro Clínico

Deck de 29 slides que o Leandro projeta na Aula 5, às 7h. Não é landing
page: sem tracking, sem pixel, sem SEO, `noindex` desde o primeiro deploy.

O deck tem duas funções, nesta ordem: **guiar o Leandro pelo roteiro** (ele
não decora o script) e **sustentar a fala pro público**. Daí a regra dura
do projeto: **o texto que a plateia vê nunca é a frase que ele fala.** A
tela pública tem palavra isolada, número grande ou ícone; o apoio dele vive
no presenter, que a plateia não vê.

## As duas janelas

| Janela | URL | Onde fica |
|---|---|---|
| Projeção | `leandrostecca.com.br/p/lps-slide-aula05/` | compartilhamento de tela / projetor |
| Apresentador | `…/p/lps-slide-aula05/?presenter=1` | notebook dele, **fora** do compartilhamento |

Abriu as duas, funciona. Sem setup, sem pareamento, sem código de sessão,
sem login. Avançar em qualquer uma move as duas.

**Se ele fechar e reabrir o presenter no meio da aula, a janela nova entra
no slide atual, não no slide 1.** Ao montar, ela pergunta `whereAreWe` no
canal e quem já estava aberto responde `here` com o índice. Testado: com a
projeção no slide 13, o presenter reaberto entrou no 13 e a projeção não
foi puxada de volta.

Sem `BroadcastChannel` (navegador antigo), cada janela funciona sozinha:
perde a sincronia, não quebra a aula. A âncora da URL (`#s14`) é a segunda
rede: recarregar qualquer uma das janelas volta no slide certo.

## Atalhos

| Tecla | Ação |
|---|---|
| `→` `↓` `PageDown` `Espaço` `Enter` | avança |
| `←` `↑` `PageUp` `Backspace` | volta |
| `R` | zera o cronômetro |
| `F` | tela cheia |
| `E` | abre/fecha o editor do roteiro (só no presenter) |
| `Esc` | sai do editor |
| clique em qualquer ponto | avança |

Clique dentro de campo de texto, de botão, ou em qualquer lugar com o
editor aberto **não** avança o slide.

Sem timer automático em slide nenhum: as pausas de chat têm duração
imprevisível ao vivo, então o avanço é sempre manual.

`F` está fora da lista mínima do briefing. Ficou por consistência com o
deck da Aula 2, onde ele já usa esse dedo pra projetar do notebook.

## Editar o roteiro ao vivo

Tecla `E` no presenter abre o editor dos três campos (DIZ, TOM, a seguir).
As quebras de linha são preservadas: o ponto de editar é quebrar o texto
do jeito que ele lê, e a tela renderiza com `white-space: pre-wrap`.

Salva sozinho, em `localStorage`. Não existe backend: o deck é estático
num Worker, e o texto fica no notebook onde o presenter roda, que é
exatamente onde ele precisa estar. Um ponto dourado ao lado da seção
marca os slides que ele ajustou.

**O preço:** limpar o navegador leva as edições junto. Por isso existe o
botão **exportar edições**, que copia um JSON assim:

```json
{ "5": { "diz": "Ontem,\nprocesso inteiro,\nscript pronto" } }
```

Esse JSON volta pro `deck.tsx` e vira código. localStorage é o rascunho;
o código é o original. "restaurar este slide" e "restaurar tudo"
descartam o rascunho.

Só os campos do presenter são editáveis. **O texto público não**: ele é
literal do roteiro, e mexer ali muda o que a plateia lê.

## Rodar e publicar

```bash
cd ~/Projects/protocolo-dpl/lps-slide-aula05
npm run dev            # http://localhost:5201/p/lps-slide-aula05/
npm run build          # ou `npm run build:slide-aula05` na raiz do repo

# deploy: SEM --name, senão sobrescreve outro worker
cd ~/Projects/protocolo-dpl/w-lst-paginas
npx wrangler deploy
```

## Como o deck é montado

```
src/
  deck.tsx              os 29 slides: texto público + diz/tom/próximo
  App.tsx               palco, letterbox, barra de progresso, grão
  lib/
    sync.ts             BroadcastChannel e o protocolo de 3 mensagens
    useDeck.ts          navegação, teclado, âncora, cronômetros, escala
    motion.ts           springs e variants compartilhados
  components/
    SlideFrame.tsx      crossfade, janela de 3 slides, contexto de ativo
    PresenterView.tsx   DIZ, TOM, a seguir, relógios, miniatura
    pieces.tsx          Respira, Flutua, IconeGrande, Regua
  slides/
    basicos.tsx         Titulo, Isolada, Sozinho, IconeRecap, Grade4,
                        Chat, Particulas, TresLinhas, CTA
    conta.tsx           Base, SomaAcumulada, Total, Ancoragem
    racional.tsx        ObjecaoRespondida, LogicaVazamento, BonusTravado
```

Sete tipos de slide cobrem os 29. O slide 18 do roteiro foi cortado (repetia o texto do 17), então o campo `n` pula de 17 pra 19; o contador do presenter mostra a posição. Os quatro furos são **uma** lista que
alimenta tanto os recaps (2 a 5) quanto a grade do slide 6, então o mapa
nunca diverge do recap. A sequência da conta é **uma** lista: o recibo do
slide 14 é literalmente os itens dos slides anteriores, não uma cópia
mantida à mão.

### A soma acumulada (11 a 15)

O valor novo entra grande e depois assenta no topo da pilha, reduzido,
abrindo espaço pro próximo. Quem entrou atrasado no slide 14 entende a
conta só de olhar o recibo.

O "assentar" é o **mesmo nó do DOM** indo de um estado a outro por
transform (escala 2,2 e deslocamento pra baixo → escala 1 na própria
vaga), com a pilha subindo 44px enquanto o valor está grande. Não é
crossfade entre dois elementos, então nunca existe um frame com o valor
duplicado. E é transform puro: nada de animar `font-size`, que faria
relayout a cada frame.

No 15 o recibo colapsa (as linhas convergem pro centro e apagam) e o total
nasce no lugar, maior que tudo que veio antes.

### Micro-animação contínua

A aula é às 7h e cada slide fica de 1 a 3 minutos no ar. Slide parado por
3 minutos morre na tela, então **todo** slide tem movimento contínuo além
da animação de entrada: respiração de escala, flutuação do ícone, halo
pulsando, e uma camada de grão que anda devagar em `transform` (nunca em
`background-position`, que repinta).

Duas exceções de propósito:

- **Slide 7 (SOZINHO)** não tem respiração, nem halo, nem ícone. Entra só
  em fade lento de 1,4s, cinza claro, muito vazio. É quebra de objeção que
  precisa soar como comentário de passagem, não argumento.
- **Slide 26** não tem gota caindo, ao contrário do 24 e do 25. Ali a ideia
  é dinheiro **parado**, não dinheiro vazando. A quebra de padrão é o
  argumento e não deve ser "consertada".

### A virada de temperatura

Slides 1 a 19 são quentes (creme `#FAF9F7`), 20 a 30 são frios (navy
`#151922`). Uma virada só, no corte do roteiro, sinalizando a passagem de
emocional pra racional.

O fundo vive no `.deck` e não em cada slide, com `transition` de 800ms. Se
a cor morasse no slide, a virada seria um corte de 280ms junto com o
crossfade do conteúdo, em vez de uma lavada de temperatura por baixo dele.

## Decisões que valem saber

- **React 19 + Motion, não Preact + GSAP.** O briefing pedia Preact+GSAP
  mas também mandava copiar a config de um sub-projeto irmão, que é React
  19 + `motion/react` + Tailwind v4. Como a navegação é por teclado, o
  `ScrollTrigger` (a única coisa que só o GSAP faz) ficaria desligado de
  qualquer forma. Mesma decisão do deck da Aula 2.
- **Partiu do `lps-slide-aula04`, não do `pda-proposta-alex-barreira`.** É
  a mesma infra de deck já validada a 1920x1080 (palco fixo, crossfade,
  fontes auto-hospedadas, tokens), então herda o que já foi medido.
- **Sem scroll-snap.** O briefing pedia `scroll-snap-type: x mandatory` e
  também um crossfade entre slides; os dois não coexistem. Ficou o
  crossfade, com os slides empilhados. Ao vivo, scroll livre é risco: um
  swipe de trackpad deixaria ele entre dois slides.
- **Tokens vieram do código, não da captura de tela.** Os valores
  estimados no briefing (navy `#14141F`, ouro `#A8862F`) estão errados
  para a marca: ela é charcoal + creme + ouro `#C8A84E`. O tema frio é a
  única cor nova, e existe só pra virada do slide 20.
- **Fontes auto-hospedadas** (`public/fonts/`, 225 kB). A aula é ao vivo e
  não pode cair pro fallback porque a rede do local não alcançou
  `fonts.gstatic.com`. O `post-build.js` falha o build se elas não
  chegarem no `dist/`.
- **Tamanho de fonte tem que caber COM o movimento.** No slide 27 a frase
  a 140px media exatamente os 1640px da área segura, e a respiração
  (1,008x) empurrava 13px pra fora. Está em 134px.

## Verificado

- 29/29 slides sem vazar a área segura a 1920x1080, zero erro de console
- Sincronia nas duas direções, incluindo reabrir o presenter no meio
- Editor: digitar espaço e seta não navega, quebras de linha preservadas,
  persiste no reload, restaura, exporta, e o texto do presenter não
  aparece na projeção
- Virada de temperatura medida: creme até o 19, navy do 20 em diante
- Build limpo (`npm run build:slide-aula05` na raiz)


