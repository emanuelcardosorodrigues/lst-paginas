# Slides ao vivo · Aula 6 · Imersão Lucro Clínico

Pitch final, domingo à noite. 57 slides. Terceiro deck desta família,
depois de `lps-slide-aula04` (Aula 2 do Águia) e `lps-slide-aula05`
(Aula 5 da Imersão), e herda a infra dos dois.

**URLs:** `leandrostecca.com.br/p/lps-slide-aula06/` (projeção) e
`…/?presenter=1` (notebook dele). Abriu as duas, sincroniza.

## Passos dentro do slide: o mecanismo novo deste deck

Os reveals (slides 3, 15, 24, 26) e a pilha que cresce (40) são a mesma
coisa: **a primeira tecla completa o slide, a seguinte troca de slide.**
É build de Keynote, e é o certo ao vivo — ele não precisa acertar um botão
no palco, é sempre a mesma tecla, e funciona igual do clicker.

O passo viaja pelo `BroadcastChannel` junto com o slide, então revelar no
presenter revela na projeção. Com estado local de componente, as duas
janelas contariam histórias diferentes.

Duas regras de direção que não são iguais:

- **Voltar** um slide entra nele COMPLETO: quem volta quer rever o que já
  mostrou, não refazer o reveal na frente da sala.
- **Saltar** pela âncora (`#s40`) entra no passo ZERO: ensaiar um slide
  com build é ver o build acontecer.

O presenter avisa antes: quando há passo pendente, o rodapé troca "a
seguir" por **"a próxima tecla revela → R$ 22 mil"**, em dourado. Ele não
pode ser pego de surpresa por uma tecla que não avança.

| Slide | Passos | O que revela |
|---|---|---|
| 3 | 1 | completa a seta do José Ronaldo |
| 15 | 1 | R$ 16 mil (Maria Emília) |
| 24 | 1 | R$ 22 mil (José Ronaldo) |
| 26 | 1 | R$ 13 mil (Ana Beatriz) |
| 40 | 3 | + R$ 3 mil, + R$ 5 mil, + R$ 3 mil |

O slide 25 repete Maria Emília **sem** reveal: a tensão já foi usada no
15, repetir viraria maneirismo.

## Atalhos

`→ ↓ PageDown Espaço Enter` avança (ou completa o passo) · `← ↑ PageUp
Backspace` volta · `R` zera o cronômetro · `F` tela cheia · `E` edita o
roteiro do presenter · clique avança.

## Temperatura

Duas viradas, ambas em fronteira de bloco: **1-27 quente** (creme, conta
emocional), **28-54 frio** (navy, demonstração e oferta), **55-57 quente**
(fechamento). O fundo vive no `.deck` com `transition` de 800ms; na cor do
slide seria um corte junto com o crossfade, em vez de lavada por baixo.

O presenter é navy sólido SEMPRE, inclusive quando a projeção também está
navy: em compartilhamento de tela errado, as duas telas não podem ser
confundidas.

## Mídia

`AssetSlot` é o mesmo dos decks anteriores: solta o arquivo em
`src/assets/<id>.<ext>`, rebuilda, o placeholder some.

**8 dos 9 assets vieram prontos do deck da Aula 2** e já estão no bundle:

| Slide | `id` |
|---|---|
| 13 | `leandro-vela` |
| 29 | `movimento-1-disc-proposta` |
| 30 | `movimento-2-copiloto` |
| 31 | `movimento-3-grupo-whatsapp` |
| 32 | `movimento-4-tributario` |
| 33 | `movimento-5a-area-didatica` |
| 34 | `movimento-5b-central-consultores` |
| 35 | `movimento-5c-treinamento-secretaria` |

**Falta um:** `bonus-site-google` (slide 50), print do site já entregue e
posicionado no Google.

Slides de mídia levam `data-bleed`: sangram até perto da borda de
propósito, porque ali o quadro É o conteúdo. O verificador sabe disso e
mede esses pela moldura inteira, não pela área segura de texto.

## Rodar e publicar

```bash
cd ~/Projects/protocolo-dpl/lps-slide-aula06
npm run dev            # http://localhost:5202/p/lps-slide-aula06/
npm run build          # ou `npm run build:slide-aula06` na raiz

cd ~/Projects/protocolo-dpl/w-lst-paginas
npx wrangler deploy    # SEM --name
```

## Componentes

Reaproveitados dos decks anteriores: `AssetSlot`, `SlideFrame`,
`PresenterView` (com o editor de roteiro), `useDeck`/`sync`, `Isolada`,
`Chat`, `Sozinho`, `Respira`/`Flutua`/`IconeGrande`, tokens e fontes.

Novos aqui: `CardAntesDepois` e `NomeIncompleto` (reveal), `PilhaPorPasso`,
`TresEtapas`, `FraseRiscada`, `FraseComSimbolo`, `Multiplicacao`,
`Comparacao`, `Escada`, `IconesEsmaecidos`, `IconeTremendo`,
`NumeroComLinhas`, `ContrastePergunta`, `BaldePingando`, `QuatroIcones`,
`FaixaContada`, `MapaMovimentos`, `Midia`, `TelaDeMarca`.

## Verificado

- 57/57 sem vazar a área segura a 1920x1080, zero erro de console
- Os 4 reveals: revela sem avançar, avança na tecla seguinte, volta completo
- A pilha do 40: um valor por tecla, a quarta avança pro 41
- Passo sincronizado entre as janelas nas duas direções
- Salto por âncora entra no passo 0

## Decisões que valem saber

- **React 19 + Motion, não Preact + GSAP.** Mesma decisão dos dois decks
  anteriores: a navegação é por teclado, o `ScrollTrigger` ficaria
  desligado, e o resto o Motion já faz.
- **Sem scroll-snap.** Snap e crossfade não coexistem; ao vivo, scroll
  livre deixaria ele entre dois slides.
- **Tamanho de fonte tem que caber COM o movimento.** O slide 47 é o único
  com brilho forte (2,2% contra 0,8%) e por isso precisa de mais folga:
  a 122px os glifos passavam 7px da área segura, está em 112px.
- **O slide 42 conta os dois extremos da faixa.** O roteiro pede "contagem
  de 0 até o valor", mas o valor é "R$ 4 a 8 mil": os dois números contam
  juntos, senão a contagem não teria o que fazer.
