# Slides ao vivo · Aula 6 · Imersão Lucro Clínico

Pitch final, domingo à noite. **69 slides.** Refeito por cima do deck de
57 do mesmo slug, a partir do roteiro revisado do Leandro. Terceiro deck
desta família, depois de `lps-slide-aula04` (Aula 2 do Águia) e
`lps-slide-aula05` (Aula 5 da Imersão), e herda a infra dos dois.

**URLs:** `leandrostecca.com.br/p/lps-slide-aula06/` (projeção) e
`…/?presenter=1` (notebook dele). Abriu as duas, sincroniza.

## O que mudou em relação ao deck de 57

**O gancho virou matemático.** Antes abria com narrativa; agora abre com
a conta da semana somando na tela, item por item, cada um carregando a
thumbnail da aula que produziu aquele número:

| Item | Valor | Aula |
|---|---|---|
| Imposto | R$ 7.700 | 1 |
| Precificação | R$ 2.500 | 2 |
| Dentista parceiro | R$ 3.000 | 3 |
| Reativação | R$ 8.000 | 4 |
| Redes sociais | R$ 4.000 | 5 |
| **Total (slide 3)** | **R$ 25.200** | |

A thumbnail é o ponto: sem ela a pilha seria cinco valores afirmados;
com ela, cada valor aponta pra uma noite que a pessoa passou assistindo.
A conta é conferível pela sala, e é isso que sustenta o "o evento tá
pago?" do slide 4.

**A mecânica de entrada é R$ 799, não reembolsável, 30 dias de teste.**
Não existe uma palavra de garantia ou devolução em nenhum slide. O
slide 59 fecha a lógica que a tela levantou — "no dia 31, você escolhe:
continuar com a gente ou seguir sozinho" — em vez de deixar a pergunta
no ar até o Q&A.

**Hierarquia de mídia mais agressiva:** vídeo real > foto real > print
real > ícone. Ícone só quando nenhum asset existe ou quando o vazio é o
argumento (slides 4, 53, 59).

## Passos dentro do slide

**A primeira tecla completa o slide, a seguinte troca de slide.** É build
de Keynote, e é o certo ao vivo — ele não precisa acertar um botão no
palco, é sempre a mesma tecla, e funciona igual do clicker.

| Slide | Passos | O que revela |
|---|---|---|
| 2 | 4 | um item da conta por tecla |
| 14 | 1 | R$ 16 mil (Maria Emília) |
| 28 | 1 | R$ 13 mil (Ana Beatriz) |
| 29 | 1 | R$ 16 mil (Maria Emília, de novo) |
| 30 | 1 | R$ 22 mil (José Ronaldo) |
| 48 | 2 | + R$ 7 mil, + R$ 8 mil |

O passo viaja pelo `BroadcastChannel` junto com o slide, então revelar no
presenter revela na projeção. Com estado local de componente, as duas
janelas contariam histórias diferentes.

Duas regras de direção que não são iguais:

- **Voltar** um slide entra nele COMPLETO: quem volta quer rever o que já
  mostrou, não refazer o reveal na frente da sala.
- **Saltar** pela âncora (`#s30`) entra no passo ZERO: ensaiar um slide
  com build é ver o build acontecer.

O presenter avisa antes: quando há passo pendente, o rodapé troca "a
seguir" por **"a próxima tecla revela → R$ 22 mil"**, em dourado.

**Maria Emília aparece duas vezes com reveal** (14 e 29). No deck de 57 a
segunda aparição vinha sem reveal, pra não repetir a tensão. Aqui repete
de propósito: o bloco de prova são três cards seguidos, e um sem reveal
no meio de três leria como erro, não como contenção.

## Atalhos

`→ ↓ PageDown Espaço Enter` avança (ou completa o passo) · `← ↑ PageUp
Backspace` volta · `R` zera o cronômetro · `F` tela cheia · `E` edita o
roteiro do presenter · clique avança.

## Temperatura

Três zonas, duas viradas: **1-31 quente** (gancho, autoridade, problema,
prova), **32-57 frio** (demonstração, ancoragem, preço, mecânica),
**58-69 quente** (bônus, resumo, fechamento). O fundo vive no `.deck` com
`transition` de 800ms; na cor do slide seria um corte junto com o
crossfade, em vez de lavada por baixo.

O presenter é navy sólido SEMPRE, inclusive quando a projeção também está
navy: em compartilhamento de tela errado, as duas telas não podem ser
confundidas.

## Mídia

`AssetSlot` é o mesmo dos decks anteriores: solta o arquivo em
`src/assets/<id>.<ext>`, rebuilda, o placeholder some.

**Vieram prontos** (7 do deck da Aula 2, mais o site do Google e a vela):
`movimento-1-disc-proposta`, `movimento-2-copiloto`,
`movimento-3-grupo-whatsapp`, `movimento-4-tributario`,
`movimento-5a-area-didatica`, `movimento-5b-central-consultores`,
`movimento-5c-treinamento-secretaria`, `bonus-site-google`,
`leandro-vela`.

**Entraram nesta revisão**, da pasta `ID Visual` do HD e da pasta de
thumbnails do funil:

| Slide | `id` | Origem |
|---|---|---|
| 1, 2, 3 | `aula-1` … `aula-5` | thumbnails das 5 aulas |
| 9 | `leandro-viagem` | ID Visual |
| 12 | `curriculo-inicio`, `curriculo-palco`, `leandro-viagem` | ID Visual |
| 13 | `mao-atendimento` | ID Visual |
| 22 | `leandro-reflexivo` | ID Visual |
| 55 | `restauracao-procedimento` | ID Visual |
| 68 | `leandro-retrato` | ID Visual |
| 14, 28-31 | `caso-ana-beatriz`, `caso-maria-emilia`, `caso-jose-ronaldo` | página do Alex Barreira |

**Nenhum asset pendente.** Os dois prints de investimento
(`ancoragem-ortodontia`, `ancoragem-dentistica`) entraram da pasta
`Slides/Aula 06 : Pitch`.

A terceira foto da tira do slide 12 é `leandro-viagem`, a mesma do slide
9: a tira é começo → palco → a clínica rodando sem ele, e o eco fecha o
arco em vez de abrir um quarto assunto.

Slides de mídia levam `data-bleed`: sangram até perto da borda de
propósito, porque ali o quadro É o conteúdo. Camadas de fundo levam
`data-decor` e ficam fora da medição.

## Revisão de conteúdo (2ª rodada)

- **Saiu o bloco "pra quem NÃO é"** (os antigos slides 42 e 43, "só quer
  mais paciente?" e o CHAT "eu sou"). O Águia serve pro dentista de uma
  cadeira e pro de várias, e riscar um perfil na tela fecha uma porta
  que a oferta não fecha.
- **Um slide por bônus** (59, 60, 61), cada um com a condição que o
  trava em faixa própria, pulsando: `SÓ OS 5 PRIMEIROS`,
  `ATÉ 8H DE SEGUNDA`, `ATÉ 23H59 DE SEGUNDA`. A escada de três degraus
  num slide só conta o que existe; ela não dá tempo de tela pra cada
  prêmio. O 62 fica como recap das três janelas.
- **O slide 46 virou pergunta.** Era "e não trouxe retorno nenhum", que
  é uma afirmação contra o esforço dele. Agora é "tanto dinheiro, tempo
  e esforço. Pra sobrar tão pouco?" — devolve a conta pra quem investiu.
- **R$ 12.000 leva a águia e o nome do programa.** Número solto não diz
  de que programa é o preço. E os R$ 6.000 dizem na tela que são o valor
  de quem está na imersão.
- **Os 6 meses viraram o número do bloco** (slide 49): corpo maior, cor
  de acento, moldura dourada e respiração — os outros degraus ficam
  parados.
- **O grid da oferta perdeu as thumbnails.** Sete dos dezesseis
  apontavam pra um asset, mas seis são `.mp4` e não renderizam num
  `<img>`: só o print do WhatsApp aparecia, e um card diferente dos
  outros quinze lê como defeito.

## A conta da ancoragem (slides 45-47)

Os valores saem dos prints reais do roteiro, e a soma tem que fechar na
tela porque a plateia confere:

| Curso | Conta | Total |
|---|---|---|
| Especialização em Ortodontia | 36 × R$ 2.250 | R$ 81.000 |
| Mestrado em Dentística | R$ 1.997 + 25 × R$ 1.997 | R$ 51.922 |
| **Slide 47** | | **R$ 132.922** |

O rascunho anterior usava R$ 2.200 de mensalidade e chegava a R$ 131.122
com o rótulo "quase R$ 130 mil". O print diz R$ 2.250, o que dá R$ 81.000
em Ortodontia e leva o total pra cima dos 130 mil. Projetar um print que
diz 2.250 enquanto a fala diz 79.200 destrói exatamente a credibilidade
que o print existe pra construir.

## Rodar e publicar

```bash
cd ~/Projects/protocolo-dpl/lps-slide-aula06
npm run dev            # http://localhost:5202/p/lps-slide-aula06/
npm run build          # ou `npm run build:slide-aula06` na raiz

cd ~/Projects/protocolo-dpl/w-lst-paginas
npx wrangler deploy    # SEM --name
```

## Componentes

Reaproveitados: `AssetSlot`, `SlideFrame`, `PresenterView` (com o editor
de roteiro), `useDeck`/`sync`, `Isolada`, `Chat`, `Sozinho`, `Midia`,
`MapaMovimentos`, `Comparacao`, `DuasLinhas`, `FraseComSimbolo`,
`FraseRiscada`, `PilhaPorPasso`, tokens e fontes.

Novos nesta revisão:

- `SomaComThumb` / `TotalGancho` (`gancho.tsx`) — a conta da semana
- `CasoProva` / `MiniaturasCasos` (`prova.tsx`) — o card de prova no
  tratamento da página do Alex: foto, "antes" cinza, seta, contagem até o
  "depois", barra com o marcador do antes
- `ComFundo` / `MosaicoAulas` / `TiraFotos` / `PaginasEsmaecidas`
  (`fundo.tsx`) — mídia atrás do texto
- `GridChecklist` / `TresColunas` / `BuildEtapas` / `GradeInclusos` /
  `ValorComCondicao` / `SlideBonus` / `PrecoDoPrograma` (`oferta.tsx`)
- `GradeRiscada` (`aula6.tsx`)

## Verificado

- 69/69 sem vazar a área segura a 1920x1080, zero erro de console
- Os 4 reveals de prova e a conta do gancho: revelam sem avançar, avançam
  na tecla seguinte, voltam completos
- Passo sincronizado entre as janelas nas duas direções
- Salto por âncora entra no passo 0
- Presenter reaberto no meio da aula sincroniza no slide certo

## Decisões que valem saber

- **React 19 + Motion, não Preact + GSAP.** Mesma decisão dos dois decks
  anteriores, e o próprio briefing manda priorizar a convenção do repo:
  a navegação é por teclado, o `ScrollTrigger` ficaria desligado, e o
  resto o Motion já faz.
- **Sem scroll-snap.** Snap e crossfade não coexistem; ao vivo, scroll
  livre deixaria ele entre dois slides.
- **Corte seco só no slide 4.** O crossfade é o certo em 67 dos 68: ele
  suaviza a troca e o olho não é arrancado do palestrante. Na pergunta
  isolada o efeito desejado é o oposto — a tela tem que MUDAR pra que o
  silêncio depois pese.
- **Slide 1 não tem vídeo de ambiente.** No lugar, as 5 thumbnails da
  semana desfocadas derivando atrás da frase. É melhor que um vídeo
  genérico de sala: "cinco dias depois" fica literalmente escrito no
  fundo, com as imagens que essa plateia passou a semana vendo.
- **Slide 17 não usa print de concorrente.** Formas abstratas com
  hierarquia de página de venda. Print real de outro produto é briga que
  ele não precisa comprar, e print falso de produto que não existe é pior.
- **Slide 22 é foto pura, não fundo esmaecido.** O briefing pedia
  `fundoMidia`, mas fundo a 22% sem texto por cima é foto lavada sem
  motivo: o tratamento de fundo existe pra dar contraste a um texto, e
  esse slide não tem texto.
- **`x`/`rotate` como props do Motion, nunca `transform` inline.** O
  Motion escreve a transform inteira a partir dos valores que controla e
  sobrescreve a string inline — as três páginas do slide 17 empilhavam
  todas no centro.
- **Imagem em moldura leva `position: absolute; inset: 0`.** Com
  `height: 100%` dentro de um grid de linha implícita `auto`, o 100% não
  resolve e a razão de aspecto do arquivo passa a ditar a altura: as
  fotos do slide 12 vinham 351px de altura numa moldura de 330.
- **A chave do `localStorage` do roteiro carrega slug E versão.** Ela
  nasceu copiada do deck da Aula 5 e ficou apontando pra `aula05`: o
  presenter da Aula 6 lia e gravava as edições do outro deck. E as
  edições são indexadas por número de slide, então refazer o deck faria
  o texto salvo no slide 14 antigo aparecer no 14 novo, que é outro
  assunto. Refez o deck, bumpa a versão.
- **O card de prova foi medido, não estimado.** Com foto de 660 e o
  "depois" a 152px, a coluna direita pedia 1064px e tinha 780 — o número
  era cortado pelo `overflow: hidden` do card. Está em 540/128 com ~75px
  de folga no maior string do deck.
