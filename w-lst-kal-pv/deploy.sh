#!/usr/bin/env bash
# Worker w-lst-kal-pv: /p/kal-pv01..05 (rotas por slug, mais específicas que /p/*; não toca o w-lst-paginas).
# Uso: ./deploy.sh (só checa) | CONFIRMO=sim ./deploy.sh (aplica) | ROLLBACK=sim ./deploy.sh (apaga só este Worker)
set -euo pipefail
cd "$(dirname "$0")"
D=~/.config/apolo/cf-deploy.sh; O=https://leandrostecca.com.br
chk() { local bad=0 c s; for s in $(ls ../dist | grep -v _headers); do
  c=$(curl -sL -A "Mozilla/5.0" -o /dev/null -w "%{http_code}" "$O/p/$s/?h=$RANDOM"); [ "$c" = 200 ] || { echo "  $s -> $c"; bad=1; }; done; return $bad; }
new() { local s c; for s in $(cat slugs.list); do
  curl -sL -A "Mozilla/5.0" "$O/p/$s/?h=$RANDOM" | grep -q 'kal-bundle-preco.webp' || { echo "  $s sem bundle novo"; return 1; }
  c=$(curl -sL -o /dev/null -w "%{http_code}" "$O/p/$s/assets/img/kal-bundle-preco.webp?h=$RANDOM"); [ "$c" = 200 ] || { echo "  $s img $c"; return 1; }; done; }
del() { ( set -a; . ~/.config/apolo/cf-deploy-tokens.env; set +a; CLOUDFLARE_API_TOKEN="$CF_DEPLOY_LST" npx wrangler delete --name w-lst-kal-pv --force ); }
[ "${ROLLBACK:-}" = sim ] && { del; exit 0; }
node build.mjs
$D . --check
echo "ANTES:"; chk && echo "  todas 200"
[ "${CONFIRMO:-}" = sim ] || { echo "CHECK_ONLY: nada publicado."; exit 0; }
$D .
sleep 25
echo "DEPOIS:"
if chk && new; then echo "OK: kal-pv01-05 com bundle novo; todas as páginas /p/ em 200"; else echo "FALHOU: revertendo só w-lst-kal-pv"; del; exit 1; fi
