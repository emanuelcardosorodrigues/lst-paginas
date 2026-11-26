# TASKS — lst-paginas

Atualizado: 2026-11-26 17:00 · Sessão/WP: cptel-pv02 fix + cptel-pv03 · Branch/commit: sentinela-tag-paginas
Progresso: 100% · 2/2 WPs · próximo: auditoria do delta c949de9..HEAD (gate pre-auditoria.sh --base c949de9)
Verificar: local: node --test scripts/*.test.mjs

## Objetivo
Manter todas as páginas `leandrostecca.com.br/p/*` no Worker único `w-lst-paginas`. WP atual: PV do Curso Prático Transformando Excelência em Lucro (`/p/cptel-pv01`), no ar e indexável, com todos os slugs em 200.

## Estado agora
- NO AR (w-lst-paginas 62f84bf4, 26/11, 77 slugs em 200): cptel-pv01 = antiga pv03 (DS v2, indexável); pv02 e pv03 apagadas por ordem do Chefe (404, livres para variações). Rollback: ad8674e9 (antes dos entregáveis do hero); 536d6e4c (pv01/02/03 antigas).
- Auditoria: delta c949de9..HEAD (bônus, A4/A5, checkout, balde, fundo do hero, fonte, dock, depoimentos, ingresso, stack, favicon, selo) NÃO auditado; publicado antes por ordem do Chefe.

## Decisões
- cptel: checkout = /r/check/cptel-tck-padrao (302 Hub.la, cupom CPTELSPECIAL011), nas 3 PVs; direito de uso dos depoimentos confirmado (Chefe, 26/11).
- Um Worker só para `/p/*`; página nova = `extra-pages/<slug>/` + deploy-full (Chefe).
- GTM fora (11/11, Chefe); pixel Meta só via Sentinela, `meta_mirror_browser=true`.
- cptel-pv01: indexável; sem vídeo; CTAs acima do preço → `#oferta`, do preço para baixo → checkout (link virá do Chefe) (Chefe, 25/11).
- cptel-pv03: nova ID (DS v2); 4 entregáveis do protótipo mantidos (R$28 mil, sem custo); 78% mantido; texto das demais seções = pv02 (Chefe, 26/11).

## Feito
- cptel-pv01 auditada (LIMPO) e publicada 25/11; rollback alvo 90ae32d2.
- cptel-pv02 construída e revisada em 390/1440 px.
- WP-10 beacon A/B no ar; pel-pv01 v9 no ar (noindex).

## Em andamento

## Pendente (em ordem)
1. cptel-pv01/02/03: FAQ completa (Chefe).
2. Variações novas podem usar /p/cptel-pv02 e /p/cptel-pv03 (Chefe, 26/11).
3. pel-pv01: autorização dos alunos, contrato da garantia, valores do stack (inventados), direitos de prints de terceiros; tirar noindex só depois — Chefe.
4. col-pvia-frufru03: bloco "Dúvidas?", bio do Leandro — Chefe.
5. Visual: rótulo dourado "BÔNUS DO LOTE 02" e `.selo span` no couro abaixo de AA (2,4–4,0); hero-cena retrato ampliado ~2x em 2140px e og:image retrato (pedir corte paisagem ~2400px).
6. Monitor externo de slugs fora do ar; `/ativos-d` na raiz dá 404.
7. `w-lst-paginas/package-lock.json` fora de sincronia (miniflare 4 no lock × ^3 no package.json): `npm ci` falha.

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
