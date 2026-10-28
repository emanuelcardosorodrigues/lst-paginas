#!/usr/bin/env bash
# Quem fez deploy no w-lst-paginas (audit log da Cloudflare: IP, token, versão do wrangler) e se a página está inteira.
# Uso: scripts/quem-deployou.sh [horas=6]   Deploy legítimo traz mensagem "deploy-full user@host sha" (ver deploy-full.sh).
set -euo pipefail
cd "$(dirname "$0")/.."
set -a; . "${CF_DEPLOY_VAULT:-$HOME/.config/apolo/cf-deploy-tokens.env}"; set +a
A=21e4875f53338100ee74196613471f21; H=${1:-6}
SINCE=$(date -u -d "-$H hours" +%FT%TZ); BEFORE=$(date -u -d "+1 min" +%FT%TZ)
declare -A HOSTS=( [2a01:4f9:c013:2e2d::1]=orca [2a02:4780:6e:eaea::1]=kvm4 )
HOSTS_JSON=$(python3 -c "import json,sys;print(json.dumps({k:v for k,v in [a.split('=') for a in sys.argv[1:]]}))" $(for k in "${!HOSTS[@]}"; do echo "$k=${HOSTS[$k]}"; done))
V=$(curl -s "https://api.cloudflare.com/client/v4/accounts/$A/workers/scripts/w-lst-paginas/versions?deployable=true&per_page=50" -H "Authorization: Bearer $CF_DEPLOY_LST")
curl -s "https://api.cloudflare.com/client/v4/accounts/$A/logs/audit?since=$SINCE&before=$BEFORE&per_page=1000&direction=asc" -H "Authorization: Bearer $CF_DEPLOY_LST" |
python3 -c "
import sys,json
hosts=json.loads(sys.argv[1]); ver={v['id']:v for v in json.loads(sys.argv[2]).get('result',{}).get('items',[])}
bad=0
for r in json.load(sys.stdin).get('result',[]):
  if r['action']['description']!='Create Worker Deployment' or r['resource'].get('id')!='w-lst-paginas': continue
  a=r['actor']; ip=a.get('ip_address'); vid=(r['resource'].get('request',{}).get('versions') or [{}])[0].get('version_id')
  ann=(ver.get(vid,{}).get('annotations') or {}); msg=ann.get('workers/message') or ''
  ok=msg.startswith('deploy-full')
  bad+=not ok
  print(r['action']['time'][5:19], hosts.get(ip,'DESCONHECIDO '+str(ip)), a.get('token',{}).get('name'), r['raw'].get('user_agent'), '|', msg or 'SEM MENSAGEM', '' if ok else '<== NAO IDENTIFICADO')
print('deploys sem identificação:',bad)
" "$HOSTS_JSON" "$V"
bad=0; for s in $(cat slugs-todos.list); do c=$(curl -sL -A Mozilla/5.0 -o /dev/null -w "%{http_code}" "https://leandrostecca.com.br/p/$s/?h=$RANDOM"); [ "$c" = 200 ] || { echo "FORA DO AR: $s $c"; bad=1; }; done; exit $bad
