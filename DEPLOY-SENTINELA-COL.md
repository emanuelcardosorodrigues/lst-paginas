# col-pvia-sentinela (F5 do Sentinela) — piloto sem GTM

**O que mudou.** Cópia de `col-pvia06` em `/p/col-pvia-sentinela/`, gerada por `scripts/build-col-pvia-sentinela.mjs` (saída em `extra-pages/col-pvia-sentinela/`, no `.gitignore` de propósito: só vai ao ar gerada com valores reais). Saem: GTM (`gtm.js`, noscript), `dataLayer`, `t.js`, `__cfg/__pending`, preconnects de Meta/Google/TikTok/Clarity e o corretor de sck embutido (o Worker injeta o mesmo para slugs de `extra-pages/`). Entra um bloco: stub `window.sentinel` + `<script async src="$TRACKER_ORIGIN/api/t/tracker.js?tid=$SENTINEL_TID">`. Os 6 links de checkout (`leandrostecca.com.br/r/check/tob-micha-0807`) ganham `data-sentinel-checkout`: são same-origin, e o tracker só os trata como checkout com esse atributo. A página não carrega `fbq`; pixel (1446152707568415) e produto (6899431) são cadastrados pelo Chefe em `/api/capi/pixels` e `/api/capi/pixel-produtos`; o `test_event_code` também fica no Sentinela.

**Como o Purchase casa.** O tracker põe `stl_<sessão>` no `sck` do link (sempre vence valor existente), repassa os parâmetros da chegada (UTM, fbclid) e, sem `fbc`/`fbp`, cria os cookies. Hotmart devolve o `sck` no webhook; é isso que liga a venda à visita. Para Hotmart, a área precisa estar com plataforma `hotmart` (aí o tracker também preenche `xcod` com as UTMs).

## ATENÇÃO: pixel cadastrado = fbq no navegador, direto ao Meta
Se a área do Sentinela tiver pixel cadastrado, o `tracker.js` carrega o `fbq` e dispara PageView/InitiateCheckout no navegador **direto ao Meta**, independente de a CAPI estar `off`/em teste. O HTML não tem `fbq`, mas o runtime tem. Portanto: **só cadastre o pixel 1446152707568415 na área COL no momento do teste, com Test Events do Meta aberto**; remover/desativar o pixel na área devolve o silêncio (a página volta a só gravar no Sentinela, sem Meta). Verificação: com pixel descadastrado, `curl "<tracker>/api/t/tracker.js?tid=<uuid>" | grep -c fbevents` = 0; com pixel cadastrado, o mesmo grep > 0 (é o pixel ligando).

## Ligar (Chefe)
Pré-requisitos: DNS `track.<dominio>` no ar, `tid` da área, `SENTINEL_ALLOWED_HOSTS` com o host. O valor `https://track.leandrostecca.com.br` no script é placeholder **a confirmar**; sem `TRACKER_ORIGIN`/`SENTINEL_TID` reais o build aborta. Com `ALLOW_PLACEHOLDER=1` (só teste) a pasta recebe o marcador `.placeholder` e `build-full-dist.mjs` **recusa** montar o dist (exit 1), tal como se o HTML contiver o UUID zero ou o origin placeholder (`scripts/guard-sentinela.mjs`; teste: `node scripts/test-guard-sentinela.mjs`).

O `deploy-full.sh` lê o cofre sozinho e **não passa pelo `--check` do `cf-deploy.sh`**: o `--check` é pré-condição separada, por isso o `set -e` abaixo aborta tudo se ele falhar. `REQUIRE_SENTINELA_COL=1` faz o deploy exigir a página no inventário; sem a flag o deploy é idêntico ao de hoje.

```bash
set -e; cd ~/orca/projects/lst-paginas
~/.config/apolo/cf-deploy.sh --slug LST --check
TRACKER_ORIGIN=https://track.<dominio> SENTINEL_TID=<uuid> node scripts/build-col-pvia-sentinela.mjs
cd w-lst-paginas && REQUIRE_SENTINELA_COL=1 CONFIRMO=sim ./deploy-full.sh
```
Não altera `wrangler.*` nem rotas: a página entra pela rota `/p/*` do `w-lst-paginas`. **O deploy regenera `w-lst-paginas/src/sck-slugs.js` e `slugs-todos.list` e deixa o repo sujo**: confira `git diff` desses dois arquivos (deve ser só a linha/slug `col-pvia-sentinela`), depois commite.

## Verificação pós-deploy (comando único)
```bash
cd ~/orca/projects/lst-paginas && O=https://leandrostecca.com.br; bad=0
for s in $(cat slugs-todos.list); do c=$(curl -sL -A "Mozilla/5.0" -o /dev/null -w "%{http_code}" "$O/p/$s/?h=$RANDOM"); [ "$c" = 200 ] || { echo "FALHA $s $c"; bad=1; }; done
grep -qx col-pvia-sentinela slugs-todos.list || { echo "FALHA: slug fora do inventário"; bad=1; }
curl -sL "$O/p/col-pvia-sentinela/" | tee /tmp/sent.html | grep -qiE 'googletagmanager|fbq\(' && { echo "FALHA: GTM/fbq na página"; bad=1; }
grep -q '/api/t/tracker.js?tid=' /tmp/sent.html || { echo "FALHA: tracker ausente"; bad=1; }
curl -s "$(grep -o 'https://[^"]*/api/t/tracker.js?tid=[0-9a-f-]*' /tmp/sent.html)" | grep -q __stlLoaded || { echo "FALHA: tracker.js não serve o script"; bad=1; }
echo "bad=$bad"
```
Inventário: antes de publicar, `git diff slugs-todos.list` deve mostrar só `+col-pvia-sentinela`. Depois, no navegador real: PageView e clique no CTA no Sentinela, `sck=stl_...` no link que chega ao `/r/check` e ao Hotmart, e compra de teste com `test_event_code`.

## Rollback
Re-rodar `deploy-full.sh` sem a pasta `extra-pages/col-pvia-sentinela/` (apagar a gerada) remove a página; ou `wrangler rollback` do w-lst-paginas (o script já o faz se algum slug cair). `col-pvia06` e demais slugs não são tocados.

## Não provado
Nenhum navegador real nem envio real; DNS/host do tracker inexistentes; que o roteador `/r/check/<tck>` repassa o `sck=stl_...` ao Hotmart (o Worker dele não está neste repo; a nota em `w-lst-paginas/src/index.js` diz que repassa como está); coexistência com o corretor de sck injetado (análise de código: o tracker, registrado depois, vence no clique; sem teste).
