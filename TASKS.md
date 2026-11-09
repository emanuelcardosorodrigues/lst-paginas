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

## GTM → Sentinela + kal-pv no w-lst-paginas (09/11/2026, NO AR: deploy 42b5ba5 21:05Z, w-lst-kal-pv apagado; 74/74 em 200, tag 1x, 0 GTM)
- `scripts/gtm-to-sentinela.mjs` (testes: `node --test scripts/gtm-to-sentinela.test.mjs`) roda no `build-full-dist.mjs`: tira GTM (Stape `ts.leandrostecca` e gtm.js padrão, noscript, preconnect, comentários, push solto `pv_event_id`) e escreve a tag Sentinela 1x no `<head>`. Build aborta se sobrar GTM ou tag != 1. 70/74 páginas tinham GTM no ar (a maioria sem a string googletagmanager).
- Código morto do GTM (09/11, NÃO publicado): o mesmo transform tira `dataLayer` do JS de página (17 páginas; wrapper push()/dl() só sai se toda chamada saiu), holder do Clarity, `data-gtm-id` do HTML, comentários ts.leandrostecca. FICAM: `t.js` (45 páginas; grava `__attrib` em cookie/storage/`window.__attrib`, lido por `utm.js` em lps-pv01/pvia02; cria data-gtm-id em runtime), utm.js, dns-prefetch/preconnect de clarity/GA, fbq, third-party.js. Guard do build acusa dataLayer/data-gtm-id/ts.leandrostecca/gtm.start/push({event solto. Falta: deploy (Chefe).
- kal-pv01..05 viraram `extra-pages/` (cópia byte a byte do `w-lst-kal-pv/dist` no ar). Ordem: 1) `CONFIRMO=sim ./deploy-full.sh` (kal ainda servido pelo w-lst-kal-pv; chktag acusa só elas); 2) `cd ../w-lst-kal-pv && ROLLBACK=sim ./deploy.sh` (apaga o Worker; tráfego cai no w-lst-paginas).
- Rollback: tag git `pre-gtm-sentinela-20261109`; `wrangler rollback c82d8597-4a15-4fb3-ae24-fa11a309ff3d` (w-lst-paginas); kal: `~/.config/apolo/cf-deploy.sh w-lst-kal-pv` (dist de 05/11 + rotas; NÃO rodar build.mjs).

## Pendências
- `col-pvia-frufru03` no ar (02/11/2026, 72/72 em 200). Faltam: bloco "Dúvidas?" (escopo a definir), bio do Leandro (formação/anos), pipeline de copy nos textos novos; "Lucro é Liberdade" só nesta página.
- `/ativos-d` na raiz ainda é rota do w-lst-paginas (404); página em `/p/ativos-d`.
- Monitor externo: vermelho se qualquer slug cair.
- Chave anon Supabase liberada em `.gitleaks.toml` (`extra-pages/`); rodar gitleaks com `-c .gitleaks.toml`.
