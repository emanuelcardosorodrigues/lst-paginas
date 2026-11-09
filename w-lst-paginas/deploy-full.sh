#!/usr/bin/env bash
# Deploy do dist COMPLETO (70 páginas) no w-lst-paginas. Único Worker de /p/*.
# ./deploy-full.sh = só checa (nada publicado) | CONFIRMO=sim ./deploy-full.sh = publica e verifica TODOS os slugs.
# Se algum slug cair: wrangler rollback do w-lst-paginas e recria o extras (rede de segurança).
set -euo pipefail
cd "$(dirname "$0")"
set -a; . "${CF_DEPLOY_VAULT:-$HOME/.config/apolo/cf-deploy-tokens.env}"; set +a
export CLOUDFLARE_API_TOKEN="${CF_DEPLOY_LST:?CF_DEPLOY_LST ausente no cofre}"
O=https://leandrostecca.com.br
node --test test/barra-final.test.mjs >/dev/null || { echo "ABORTADO: teste de barra final/query falhou"; exit 1; }
node ../scripts/build-full-dist.mjs | tail -1
# Inventário: tudo que o extras serve + tudo que está no ar hoje precisa estar no dist.
miss=0
for s in $(cat ../w-lst-paginas-extras/slugs.list); do [ -f "../dist/$s/index.html" ] || { echo "FALTA no dist: $s"; miss=1; }; done
for s in col-pvia07 col-pvia07-ck-hba col-pvia-frufru01 col-pvia-frufru02 col-inup-cap01-web01; do [ -f "../dist/$s/index.html" ] || { echo "FALTA no dist: $s"; miss=1; }; done
[ "${REQUIRE_SENTINELA_COL:-}" != 1 ] || [ -f ../dist/col-pvia-sentinela/index.html ] || { echo "FALTA no dist: col-pvia-sentinela (REQUIRE_SENTINELA_COL=1)"; miss=1; }
[ "$miss" = 0 ] || { echo "ABORTADO: inventário incompleto"; exit 1; }
# Cada slug em 4 formas (o Meta sempre anexa ?fbclid): exige 200 e no máx. 1 redirect. UA de navegador real.
UA="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36"
chk() { local bad=0 r s q; for s in $(cat ../slugs-todos.list); do
  for q in "?h=$RANDOM" "?fbclid=x$RANDOM" "?utm_source=a&utm_content=b$RANDOM" "/?fbclid=x$RANDOM"; do
    r=$(curl -sL --max-redirs 5 -A "$UA" -o /dev/null -w "%{http_code} %{num_redirects}" "$O/p/$s$q" || true)
    [ "${r% *}" = 200 ] && [ "${r#* }" -le 1 ] || { echo "  $s$q -> $r"; bad=$((bad+1)); }; done; done; return $bad; }
# Sentinela: cada slug em 200 precisa ter a tag UMA vez (0 = não injetou, >1 = duplicou). Só relata; rollback é só para slug caído.
chktag() { local bad=0 n s; for s in $(cat ../slugs-todos.list); do
  n=$(curl -sL -A "$UA" "$O/p/$s/?h=$RANDOM" | grep -o '/api/t/tracker.js' | wc -l); [ "$n" = 1 ] || { echo "  $s tag x$n"; bad=$((bad+1)); }; done; return $bad; }
npx wrangler deploy --dry-run --assets ../dist >/dev/null
echo "ANTES (não-200 listados):"; chk || true
echo "ANTES, tag (informativo):"; chktag || true
[ "${CONFIRMO:-}" = sim ] || { echo "CHECK_ONLY: nada publicado. Rode: CONFIRMO=sim ./deploy-full.sh"; exit 0; }
WHO="deploy-full $(whoami)@$(hostname) $(git rev-parse --short HEAD) $(date -u +%FT%TZ)"; echo "$WHO" >> ../deploys.log
npx wrangler deploy --assets ../dist --message "$WHO" --tag "$(git rev-parse --short HEAD)" 2>&1 | grep -v "Will match assets"
echo "Removendo o extras (agora redundante)"; npx wrangler delete --name w-lst-paginas-extras --force || true
sleep 10
echo "DEPOIS (todas devem ser 200):"
if ! chk; then
  echo "FALHOU: revertendo"; npx wrangler rollback --name w-lst-paginas --message "rollback deploy-full" -y || true
  (cd ../w-lst-paginas-extras && CONFIRMO=sim ./deploy.sh) || true; exit 1
fi
echo "TAG Sentinela (exatamente 1 por slug):"; chktag || { echo "ATENÇÃO: slugs sem tag (ou duplicada) acima; páginas seguem em 200, sem rollback. Cheque o <head> e SENTINELA_TAG"; exit 1; }
echo "OK: $(wc -l < ../slugs-todos.list) páginas em 200 no w-lst-paginas, todas com a tag"
