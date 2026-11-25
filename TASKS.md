# TASKS — lst-paginas

Atualizado: 2026-11-25 20:40 · Sessão/WP: cptel-pv02 · Branch/commit: sentinela-tag-paginas
Progresso: 90% · 1/2 WPs · próximo: auditoria de fechamento da cptel-pv02 e deploy
Verificar: local: node --test scripts/*.test.mjs

## Objetivo
Manter todas as páginas `leandrostecca.com.br/p/*` no Worker único `w-lst-paginas`. WP atual: PV do Curso Prático Transformando Excelência em Lucro (`/p/cptel-pv01`), no ar e indexável, com todos os slugs em 200.

## Estado agora
- cptel-pv01 NO AR e indexável (w-lst-paginas 18f2ff95, 25/11): 77 slugs em 200, Sentinela 1x.
- cptel-pv02 pronta em `extra-pages/cptel-pv02/` (noindex); CNPJ removido do rodapé das duas. Build 78 páginas; testes scripts 32/0. Falta: auditoria, deploy.

## Decisões
- Um Worker só para `/p/*`; página nova = `extra-pages/<slug>/` + deploy-full (Chefe).
- GTM fora (11/11, Chefe); pixel Meta só via Sentinela, `meta_mirror_browser=true`.
- cptel-pv01: indexável; sem vídeo; CTAs acima do preço → `#oferta`, do preço para baixo → checkout (link virá do Chefe) (Chefe, 25/11).
- cptel-pv02: slug novo, PV01 fica; arte de fundo sem texto vem do Chefe (25/11).

## Feito
- cptel-pv01 auditada (LIMPO) e publicada 25/11; rollback alvo 90ae32d2.
- cptel-pv02 construída e revisada em 390/1440 px.
- WP-10 beacon A/B no ar; pel-pv01 v9 no ar (noindex).

## Em andamento
- cptel-pv02 + rodapé sem CNPJ: auditoria Opus, deploy via `deploy-full.sh`.

## Pendente (em ordem)
1. cptel-pv01: LINK-CHECKOUT, 6 prints de depoimento (9:16), revisão das respostas da FAQ — Chefe.
2. cptel-pv02: tirar noindex só se o Chefe pedir.
3. pel-pv01: autorização dos alunos, contrato da garantia, valores do stack (inventados), direitos de prints de terceiros; tirar noindex só depois — Chefe.
4. col-pvia-frufru03: bloco "Dúvidas?", bio do Leandro — Chefe.
5. Monitor externo de slugs fora do ar; `/ativos-d` na raiz dá 404.
6. `w-lst-paginas/package-lock.json` fora de sincronia (miniflare 4 no lock × ^3 no package.json): `npm ci` falha.

## Bloqueios
- Nenhum para a PV01.

## Referências
- Build: `node scripts/build-full-dist.mjs`. Deploy: `cd w-lst-paginas && CONFIRMO=sim ./deploy-full.sh` (sem CONFIRMO só checa).
- Rollback: `wrangler deployments list` / `wrangler rollback <id>` via cofre (`~/.config/apolo/cf-deploy.sh`).
- gitleaks: `gitleaks protect --staged -c .gitleaks.toml` (chave anon Supabase liberada em extra-pages).
- Docs: `docs/MANUAL.md`, `docs/ai/cptel.md`.

## Não fazer
- Deploy de `dist/` parcial (28/10: 36 páginas em 404).
- `wrangler deploy` cru ou Worker novo para página.
- `url.toString()+"/"` no Worker (09/11: loop 301 com query).
- Deploy do w-lst-kal-pv por `deploy.sh` (roda build.mjs).
