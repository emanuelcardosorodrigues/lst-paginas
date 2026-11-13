#!/usr/bin/env bash
# Smoke de TODOS os slugs de /p/ (somente leitura: só curl GET). Rodar antes e depois de qualquer deploy.
# Por slug, 4 formas: /p/<s>, /p/<s>/ e as duas com ?utm_source=x. Exige 200 final e no máximo 1 redirect.
# Uso: scripts/smoke-slugs.sh [origem]   (padrão https://leandrostecca.com.br). Sai 1 se algum falhar.
set -u
O="${1:-https://leandrostecca.com.br}"
cd "$(dirname "$0")/.." || exit 2
LIST=slugs-todos.list
[ -s "$LIST" ] || { echo "FALTA $LIST" >&2; exit 2; }
UA="Mozilla/5.0 smoke-slugs"
bad=0; total=0
while read -r s; do
  [ -n "$s" ] || continue
  for q in "" "/" "?utm_source=x" "/?utm_source=x"; do
    total=$((total+1))
    r=$(curl -sL --max-redirs 5 -A "$UA" -o /dev/null -w "%{http_code} %{num_redirects}" "$O/p/$s$q" || echo "000 9")
    code=${r% *}; n=${r#* }
    if [ "$code" != "200" ] || [ "$n" -gt 1 ]; then echo "FALHA $s$q -> status=$code redirects=$n"; bad=$((bad+1)); fi
  done
done < "$LIST"
echo "slugs=$(grep -c . "$LIST") checagens=$total falhas=$bad"
[ "$bad" -eq 0 ]
