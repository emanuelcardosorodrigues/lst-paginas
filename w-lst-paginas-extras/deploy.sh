#!/usr/bin/env bash
# Publica o Worker das 36 páginas restauradas. Uso: ./deploy.sh  (só checa)  |  CONFIRMO=sim ./deploy.sh  (aplica)
# Rollback: ROLLBACK=sim ./deploy.sh  (apaga só w-lst-paginas-extras; as 33 páginas do w-lst-paginas não são tocadas)
set -euo pipefail
cd "$(dirname "$0")"
O=https://leandrostecca.com.br
chk() { # $1=rótulo $2=esperado ; confere TODOS os slugs
  local bad=0 c s
  for s in $(cat slugs.list); do
    c=$(curl -sL -A "Mozilla/5.0" -o /dev/null -w "%{http_code}" "$O/p/$s/?h=$RANDOM")
    [ "$c" = "$2" ] || { echo "  $1 $s -> $c (esperado $2)"; bad=$((bad+1)); }
  done
  for s in $(ls ../dist | grep -v _headers); do
    c=$(curl -sL -A "Mozilla/5.0" -o /dev/null -w "%{http_code}" "$O/p/$s/?h=$RANDOM")
    [ "$c" = 200 ] || { echo "  PROTEGIDA $s -> $c"; bad=$((bad+1)); }
  done
  return $bad
}
if [ "${ROLLBACK:-}" = sim ]; then npx wrangler delete --name w-lst-paginas-extras --force; exit 0; fi
node build-dist.mjs && node gen-config.mjs
npx wrangler deploy --dry-run >/dev/null
echo "ANTES (36 devem dar 404; 33 protegidas 200):"; chk ANTES 404 || true
[ "${CONFIRMO:-}" = sim ] || { echo "CHECK_ONLY: nada publicado. Rode: CONFIRMO=sim ./deploy.sh"; exit 0; }
npx wrangler deploy
sleep 8
echo "DEPOIS (todas 200):"
if ! chk DEPOIS 200; then echo "FALHOU: revertendo"; npx wrangler delete --name w-lst-paginas-extras --force; exit 1; fi
echo "OK: 36 restauradas e 33 protegidas em 200"
