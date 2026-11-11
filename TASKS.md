# TASKS — lst-paginas (atualizado 09/11/2026)

## Regra: UM Worker só
Tudo de `leandrostecca.com.br/p/*` vive no `w-lst-paginas`. Não criar Worker novo para página.

## Estado
- Fonte das páginas: `dist/` = espelho do ar (`scripts/mirror-current-p-pages.mjs`) + `extra-pages/` (36 restauradas + frufru01/02/03, versionadas) + clone `col-pvia07-ck-hba`. Monte com `node scripts/build-full-dist.mjs` (gera `slugs-todos.list` e `w-lst-paginas/src/sck-slugs.js`).
- Deploy: `cd w-lst-paginas && CONFIRMO=sim ./deploy-full.sh` (sem CONFIRMO só checa; verifica todos os slugs; reverte se algum cair; remove o `w-lst-paginas-extras`).
- `wrangler.jsonc` do w-lst-paginas segue com `directory` bloqueado: deploy de assets só via `deploy-full.sh` (`--assets ../dist`).
- Nova página: copiar para `extra-pages/<slug>/`, rodar o deploy-full. Nunca deploy de dist parcial.
- `w-lst-paginas-extras/`: Worker transitório; some depois do deploy-full. Cópias `protocolo-dpl*` bloqueadas para deploy de assets.

## Incidente 28/10/2026
36 páginas deram 404 (deploy de assets sem elas). Regras: CLAUDE.md "Produção compartilhada" + PADRAO-CONSTRUCAO D11–D12.

## Incidente 09/11/2026 (loop com query)
`/p/<slug>?qualquer-query` dava loop 301 em TODAS as 74 páginas (`toString() + "/"` no w-lst-paginas). Fix: `url.pathname += "/"`.
Trava: `w-lst-paginas/test/barra-final.test.mjs` roda no início do `deploy-full.sh`; `chk` agora testa 4 formas por slug.
Deploy do fix pendente (Chefe). Depois: confirmar 74×4 em 200 com ≤ 1 redirect.

## GTM → Sentinela (Chefe 11/11/2026, NO AR: w-lst-paginas e7bb1ac3, GTM_MODO=sem)
- 76/76 em 200, 0 GTM, tag Sentinela 1x (curl 11/11 ~15:25Z). kal-pv01..05 agora vêm do w-lst-paginas; w-lst-kal-pv APAGADO (rota cai no w-lst-paginas).
- Baseline 24h (capi_events, 11/11 15:18Z): PageView 24, InitiateCheckout 12, Purchase 5, todos sent.
- Sentinela (11/11): ativas Clarity LST + G1 Meta hero_click, viu_preco, quiz_start, Quiz_View, Quiz->VSL, Completou o Quiz (URLs /q/ reais sem GTM, curl). PAUSADA: G1 Meta Lead (sem filtro de página; ativar quando as A/B WordPress saírem). `meta_mirror_browser=false`: sem PageView de navegador nos pixels KAL/PLO; ligar = decisão do Chefe (`update sentinel.workspace_config set meta_mirror_browser=true`, rollback =false).
- CHECKOUT_HIT_SECRET definido (dashboard-6c); sentinel:a5b497b1 no ar (rollback sentinel:bak-pre-g3-20261111T153230Z). Provado: checkout-hit sem header 401, header errado 401, certo 204.
- Prova 30 min (15:3xZ): capi PageView 16 sent (baseline 24/24h), 0 duplicata por pixel, ga4 PageView 1 sent. Falta ver ViewContent/IC/TikTok com mais tráfego, Events Manager e Clarity (fora do meu alcance).
- ROLLBACK: `echo com > w-lst-paginas/GTM_MODO && git commit -am rollback && cd w-lst-paginas && CONFIRMO=sim ./deploy-full.sh` (ou `npx wrangler rollback 383f49ac-87ec-4fd3-89fa-cf1596c29351`, via cf-deploy); kal: `cd w-lst-kal-pv && ~/.config/apolo/cf-deploy.sh .` (NÃO deploy.sh); tag: `update sentinel.tags set status='pausada' where nome like 'G1 Meta%' and nome<>'G1 Meta Lead' or nome='Clarity LST'`.

- **11/11 16:33Z: pixel Meta inline FORA das 11 páginas** (kal-pv01..07, lps-pv01, lps-pvia02/05/06; fonte única = Sentinela, Chefe). w-lst-paginas 36b7b29a (commit 316416f), 76/76 em 200, 0 fbq. `meta_mirror_browser=true` (tracker-px usa o roteamento da CAPI, mesmo eventID). kal-pv06/07, lps-* vêm de `overrides/<slug>/index.html`; kal-pv01..05 de extra-pages. Rollback: `wrangler rollback e7bb1ac3` via cf-deploy (tem fbq inline: desligar o espelho antes) e `update sentinel.workspace_config set meta_mirror_browser=false`. Provado: servidor roteia 1 envio por pixel, event_id único (plo-pv01, 6 eventos em 2 pixels). FALTA: Pixel Helper numa kal-pv (eventID = capi_events); kal/lps sem tráfego na janela. Aberto do Chefe: remover `sentinel.pixel_padrao` da LST (LPS caem no COL 1446152707568415 além da Contingência). s11 no ar (sentinel:c57845ef, GA4 _ga próprio, TikTok external_id+ip+ua); Google Ads PageView sem label (P10).

## GTM → Sentinela + kal-pv no w-lst-paginas (09/11/2026, NO AR: deploy 42b5ba5 21:05Z, w-lst-kal-pv apagado; 74/74 em 200, tag 1x, 0 GTM)
- **09/11 ~22:00Z: VOLTOU AO GTM (Chefe).** w-lst-paginas em rollback para c82d8597 (estado de 18:53Z: GTM + tag Sentinela via Worker); w-lst-kal-pv recriado (versão f91cef33, dist 05/11 com GTM). Conferido no ar: 74/74 em 200; 69 com GTM (68 inline + dpl-pv01 via third-party.js); 5 nunca tiveram GTM (frufru03-teste-track, laudo-le-69bae975, lps-slide-aula04/05/06). O estado sem GTM está salvo na tag `pos-limpeza-gtm-20261109` (versão a0f27bd6). `deploy-full.sh` agora mantém o GTM (GTM_MODO=com, ver abaixo).
- **GTM_MODO (10/11): todo deploy mantém o GTM por padrão.** Arquivo versionado `w-lst-paginas/GTM_MODO` = `com` (padrão) | `sem`; env `GTM_MODO` sobrescreve numa execução; outro valor aborta (build e deploy-full.sh). `com`: build sem transform/transformTracker/guard de GTM (dist = espelho + fonte versionada), aborta se tag >1; chktag exige 200 + tag 1x, só imprime GTM, e falha se slug que tinha GTM antes ficar com 0. `sem` = comportamento de 09/11 (remove GTM + guards). Virar: `echo sem > w-lst-paginas/GTM_MODO`, commit, `./deploy-full.sh`. Teste: `node --test scripts/gtm-modo.test.mjs`. Dist `com` bate com o ar (c82d8597): contagem de GTM igual nos 74 slugs; tag no ar = 1 (Worker), no dist 0 ou 1 (idempotente).
- `scripts/gtm-to-sentinela.mjs` (testes: `node --test scripts/gtm-to-sentinela.test.mjs`) roda no `build-full-dist.mjs`: tira GTM (Stape `ts.leandrostecca` e gtm.js padrão, noscript, preconnect, comentários, push solto `pv_event_id`) e escreve a tag Sentinela 1x no `<head>`. Build aborta se sobrar GTM ou tag != 1. 70/74 páginas tinham GTM no ar (a maioria sem a string googletagmanager).
- Código morto do GTM (09/11, NO AR: deploy 05dab5b, versão a0f27bd6; 74/74 em 200, tag 1x, 0 resíduo): o transform tira dataLayer do JS de página, holder do Clarity, data-gtm-id, comentários ts.leandrostecca e produtores `__pending`; `transformTracker` reduz todo t.js a atribuição (`__attrib` storage/cookie/window, lido por utm.js; teste com harness antes×depois). FICAM: t.js (só atribuição), utm.js, dns-prefetch/preconnect clarity/GA, fbq, third-party.js. Guard do build cobre html e t.js. Rollback: versão anterior 42b5ba5. Resíduo aceito: dataLayer em bundles React do espelho; lps-pv-turbo02b/index-dossie.bak.html com loader antigo.
- kal-pv01..05 viraram `extra-pages/` (cópia byte a byte do `w-lst-kal-pv/dist` no ar). Ordem: 1) `CONFIRMO=sim ./deploy-full.sh` (kal ainda servido pelo w-lst-kal-pv; chktag acusa só elas); 2) `cd ../w-lst-kal-pv && ROLLBACK=sim ./deploy.sh` (apaga o Worker; tráfego cai no w-lst-paginas).
- Rollback: tag git `pre-gtm-sentinela-20261109`; `wrangler rollback c82d8597-4a15-4fb3-ae24-fa11a309ff3d` (w-lst-paginas); kal: `~/.config/apolo/cf-deploy.sh w-lst-kal-pv` (dist de 05/11 + rotas; NÃO rodar build.mjs).

## Tag Sentinela removida, GTM mantido (Chefe 09/11)
- `SENTINELA_TAG "0"` no w-lst-paginas; build `com` tira o script `/api/t/tracker.js` do HTML (`stripTag`) e aborta se sobrar `track.leandrostecca`; `chktag` (com) exige 0 ocorrências. Build local: 74 páginas, 0 HTML com a tag, 68 com gtm.start (+dpl-pv01 via third-party.js).
- NO AR 10/11: w-lst-paginas versão a28bea81 (74/74 em 200; só teste-track com tag). kal-pv01..05 saem pelo w-lst-kal-pv: `SENTINELA_TAG "0"` NO AR (versão 7363d6ab, via `cf-deploy.sh .`; NÃO usar `deploy.sh`, ele roda build.mjs). Conferido 10/11: 74/74 em 200, track.leandrostecca só na teste-track (1x).

- Exceção (Chefe 10/11): `sentinela-slugs.list` = páginas que LEVAM a tag no modo `com` (hoje só `col-pvia-frufru03-teste-track`, tag logo após `<meta charset>`, sem GTM). Build e chktag exigem 1 nelas e 0 nas demais. Controle negativo 10/11: teste-track sem a tag -> build ABORTADO; com a tag -> 74 páginas.

## Pendências
- `col-pvia-frufru03` no ar (02/11/2026, 72/72 em 200). Faltam: bloco "Dúvidas?" (escopo a definir), bio do Leandro (formação/anos), pipeline de copy nos textos novos; "Lucro é Liberdade" só nesta página.
- `/ativos-d` na raiz ainda é rota do w-lst-paginas (404); página em `/p/ativos-d`.
- Monitor externo: vermelho se qualquer slug cair.
- Chave anon Supabase liberada em `.gitleaks.toml` (`extra-pages/`); rodar gitleaks com `-c .gitleaks.toml`.

## pel-pv01 (11/11/2026, NO AR, noindex; v5: estrutura do mapa mental (head→prova→dores→mecanismo→saída→solução→para quem→programa→pilares→entregáveis→bônus→âncoras→stack→preço oficial R$5.000/Virada 12x199,98→2 garantias→Leandro→faca→FAQ penúltima→3 caminhos); sem 58/64; Elisa com foto; auditoria LIMPO; 76/76 em 200)
- v5 pendências: prints do Lucro/Placar do Lucro (usa calculadora provisória), autorização escrita dos alunos, contrato da garantia, 7 dias na plataforma, contador (CBS), história da mão, âncora Águia, direitos de prints de terceiros, valores do stack a confirmar. Depoimentos 2 ficam após as 3 viradas (resultados da solução).
- /p/pel-pv01 (extra-pages/pel-pv01). 12x R$ 199,98 / R$ 2.000 à vista; todo CTA (8) -> https://l.leandrostecca.com.br/pel-garantir-vaga-pv; botão do hero rola para #corrida.
- Faltam do Chefe: print novo do Lucro (hoje app-home provisório, legenda "em breve" — trocar), prints de Léo no WhatsApp, Placar do Lucro, estoque, fluxo de caixa, contratos, treino de secretária, mentoria mensal, grade de trilhas.
- Pendências de conteúdo: contrato da garantia, garantia 7 dias na plataforma, contador (CBS/PIS-Cofins), autorização/foto dos alunos (só José Ronaldo e Thais têm foto), história da mão, âncora Águia, prints de terceiros (CNN, UNIFRAN, faculdades) com direitos/crédito, "Dr. Rafael" no print app-membros (pilar 1). Remover noindex só após isso.

## pel-pv01 v6 (11/11/2026, NO AR, noindex; 76/76 em 200; auditoria Sonnet: 2 achados tratados)
- v6: contraste (--ink escuro em chip/seal/pbox), negrito aninhado inline, bullets em barra dourada, stack com miniatura e preço riscado (soma R$ 15.200, VALORES INVENTADOS: Chefe/Leandro validar), R$ 5.000 oficial riscado, bônus 15/10/5 com imagem, depoimentos em balões com foto, FAQ de objeções (36-doc), faca reescrita, Léo corpo inteiro, Leandro retrato.
- Dúvidas: nome do Igor (foto "Raitelli" × copy "Mazzioli": página usa "Dr. Igor"); "#51"/imagem 48/"Mais trabalho" interpretados; sem render em navegador (contraste não medido); aviso de resultado individual adicionado.
- Seguem pendentes: autorização dos alunos, contrato da garantia, 7 dias na plataforma, contador, história da mão, âncora Águia, R$28 mil receita×lucro, direitos de prints de terceiros.

## pel-pv01 v7 (11/11/2026, NO AR, noindex; 76/76 em 200; auditoria Sonnet: 1 achado tratado, R$100 mil no H1 mantido)
- v7: fonte menor no desktop, selos iguais, check no lugar da barra, lista numerada sem círculo, tabela com coluna Mentoria, seção "Faturamento não é lucro" (azul), bloco da faca amarelo no fim, balões "Lucro com um ajuste", Mara na Plurale, Leandro em frente ao painel Sinpla, tag dos bônus fora da imagem, sem "na mentoria".
- Dúvidas: imagem "#51" do bônus 15 (usei entardecer), R$ 12 mil da Plurale sem fonte, "+X%" sem dados, R$100 mil no H1 vs garantia, sem render em navegador.

## pel-pv01 v8–v9 (11/11/2026, NO AR, noindex; 76/76 em 200)
- v8: botões antes do preço → #oferta (dock também, antes do preço); balões centralizados; bônus 15 com G1+iHP (direitos de terceiros pendentes); Leandro Sinpla; estímulo visual por dobra. v9: movimento/3D (tilt, parallax, reveal, brilho), respeita reduced-motion. Sem render em navegador.
- Deploy usou GTM_MODO=sem (commit do Chefe 67abf19).
