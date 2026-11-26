# cptel: depoimentos (seção "Será que vale a pena?")

Pedido do Chefe (26/11): os prints não podem ser simplesmente colados. Precisam ser ajustados, tratados, emoldurados e, alguns, combinados. Vale para cptel-pv01, pv02 e pv03, no lugar dos 6 `figure.print` placeholders.

## Fonte
59 arquivos em `/home/emanuel/orca/workspaces/lst-central-consultores/Páginas/.orca/drops/`:
"Captura de Tela 2026-07-28 às 08.0*", "2026-07-29 às 07.5*/08.*", "2026-07-30 às *", "2026-07-31 às *", "2026-08-02 às 20.2*" e "WhatsApp Image 2026-07-29 at 07.34.30 / 08.13.39". São prints reais (YouTube ao vivo, chat da plataforma, WhatsApp). Nunca editar o texto de um comentário nem inventar depoimento.

## Tratamento
- Recortar a interface que não é depoimento: teclado, barra de status, botões do WhatsApp, linhas cortadas de outros comentários, "⋮".
- Juntar no mesmo cartão os comentários da mesma pessoa que contam uma história (ex.: Elisa: "Conversei com os meus dentistas parceiros…" + "Hoje eu recebo mais que o parceiro. E ele aceitou o valor pago.").
- Moldura única da casa: cartão arredondado, sombra suave, fundo escuro original preservado dentro (o print é prova; não repintar), legenda curta opcional só com o nome/handle que já aparece no print.
- Formato webp, largura ~1080, peso < 120 KB cada; `alt` com o texto do comentário.

## Curadoria (ordem sugerida, mais forte primeiro)
1. Resultado concreto: Elisa (recebe mais que o parceiro; mudou de % e aumentou preço), Nathalia ("Fui no contador, recalculei a hora clínica…"), Rubens ("achava que diária era a melhor forma… mudei meu conceito"), Paula ("a conversa vai acontecer"), mthodonto ("esse fator mudou minha realidade").
2. Qualidade da aula: Marcio (WhatsApp, "Foi a melhor aula que tive sobre precificação…", recortar teclado), WhatsApp 07.34 ("parabenizar o Leandro…"), WhatsApp 08.25 ("nenhuma atendeu as minhas necessidades"), Cecília ("32 anos de mocho… faculdades não incluíram"), Emilia (juntar os 3–4 comentários).
3. Ferramentas: Fabiana ("Esta calculadora é muito importante… Adquiri"), Paula ("gostei dessa calculadora"), Cyro ("mais fácil do que a planilha").
4. Volume: mosaico pequeno de "tá pago" / "Valendo muito a pena" / "SENSACIONAL" (vários usuários).
5. Enquete 75% "parceria desequilibrada": fica fora dos depoimentos; pode ir na seção do problema.

Fora: só "Valeu"/"Boa noite"/cidade, ranking "Principais fãs", "Deem like", "redes sociais não fazem parte", "socorro defasado", a dúvida da Cecília e a da Rosana ("difícil… subjetivo"), por não provarem nada ou soarem negativas.

## Risco
Nomes, handles e fotos de perfil são de pessoas reais. Chefe confirmou o direito de uso (26/11).

## Usado (26/11, pv01/pv02/pv03; mesmos 13 arquivos em `images/depo-*.webp`, webp q88)
Índices em `.orca/drops/`, nome do arquivo de origem (data/hora da captura). Recorte feito com PIL; texto dos comentários intocado.
- `depo-elisa`: 2026-07-29 08.08.50 (recorte do topo) + 08.08.36 (corte inferior), empilhados.
- `depo-nathalia`: 2026-07-31 08.07.03 + 07.16.49 + 2026-07-29 08.07.57 (corte inferior).
- `depo-rubens`: 2026-07-29 08.07.35 (4 px de topo cortados).
- `depo-paula`: 2026-07-31 08.08.09 (topo) + 2026-07-29 08.07.39 (corte inferior).
- `depo-mthodonto`: 2026-07-31 07.06.09 + 2026-07-28 08.01.52 (só a 2ª linha) + 2026-07-29 08.07.46.
- `depo-cecilia`: 2026-07-31 07.06.49.
- `depo-marcio`: WhatsApp Image 2026-07-29 at 08.13.39, recorte 20,214,660,685 (sem teclado, barra de status e cabeçalho).
- `depo-aula`: Captura 2026-07-29 08.31.14 ("Bom dia / parabenizar o Leandro").
- `depo-grata`: Captura 2026-07-29 08.31.32 ("GRATA / nenhuma atendeu...").
- Fotos dos vídeos (de `/p/lps-pvia06`, textos literais): `depo-debora` (1-3.webp), `depo-maria` (2-3.webp), `depo-thais` (3-1.webp), `depo-jose` (1-4-816.webp). Debora e Maria Emília: título + fala + nome; Thais e José Orlando: foto + título + nome (a fala da Maria Emília nunca é reusada neles). Sem botão de play.

Sem print de Fabiana, Cyro, enquete 75% e mosaico "tá pago": o mosaico foi testado e descartado (texto ficava com ~6 px, ilegível).

## Layout
4 blocos alternando lado (`.db` / `.db.r`): foto à esquerda (1/3) + pilha de prints (2/3), depois o inverso. Prints largos têm versão mobile `depo-{elisa,nathalia,rubens,paula,mthodonto,cecilia}-m.webp` (480 px, ~13 px CSS em 390), feita reempilhando os pixels originais: cada linha é cortada nos vãos entre palavras (vão >= 5 px) e remontada em linhas de até ~466 px, avatar e handle na 1a linha, continuação recuada no handle, fundo e entrelinha originais; texto nunca redesenhado. Servida por `<picture><source media="(max-width:640px)">`; sem rolagem lateral. Cartão = `.dp` (cantos arredondados, sombra, padding 12). Cada página mantém seus tokens (pv01/02 creme/ouro, pv03 DS v2).
