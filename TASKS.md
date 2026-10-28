# TASKS — lst-paginas (atualizado 28/10/2026)

## Regra: UM Worker só
Tudo de `leandrostecca.com.br/p/*` vive no `w-lst-paginas`. Não criar Worker novo para página.

## Estado
- Fonte das páginas: `dist/` = espelho do ar (`scripts/mirror-current-p-pages.mjs`) + `extra-pages/` (36 restauradas + frufru01/02, versionadas) + clone `col-pvia07-ck-hba`. Monte com `node scripts/build-full-dist.mjs` (gera `slugs-todos.list` e `w-lst-paginas/src/sck-slugs.js`).
- Deploy: `cd w-lst-paginas && CONFIRMO=sim ./deploy-full.sh` (sem CONFIRMO só checa; verifica todos os slugs; reverte se algum cair; remove o `w-lst-paginas-extras`).
- `wrangler.jsonc` do w-lst-paginas segue com `directory` bloqueado: deploy de assets só via `deploy-full.sh` (`--assets ../dist`).
- Nova página: copiar para `extra-pages/<slug>/`, rodar o deploy-full. Nunca deploy de dist parcial.
- `w-lst-paginas-extras/`: Worker transitório; some depois do deploy-full. Cópias `protocolo-dpl*` bloqueadas para deploy de assets.

## Incidente 28/10/2026
36 páginas deram 404 (deploy de assets sem elas). Regras: CLAUDE.md "Produção compartilhada" + PADRAO-CONSTRUCAO D11–D12.

## Pendências
- `/ativos-d` na raiz ainda é rota do w-lst-paginas (404); página em `/p/ativos-d`.
- Monitor externo: vermelho se qualquer slug cair.
- Chave anon Supabase liberada em `.gitleaks.toml` (`extra-pages/`); rodar gitleaks com `-c .gitleaks.toml`.
