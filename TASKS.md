# TASKS — lst-paginas (atualizado 28/10/2026)

## Estado
- `w-lst-paginas` (assets em `dist/`): serve 33 páginas `/p/*`. Deploy de assets BLOQUEADO (`directory` inválido); nunca publicar assets daqui.
- `w-lst-paginas-extras`: Worker das 36 páginas restauradas (rota por slug). Fontes versionadas em `w-lst-paginas-extras/pages/`.
  - Deploy: `cd w-lst-paginas-extras && CONFIRMO=sim ./deploy.sh` (token do cofre CF_DEPLOY_LST; checa 69 slugs; reverte se algum cair).
  - Rollback: `ROLLBACK=sim ./deploy.sh` (apaga só o extras).
- Cópias `protocolo-dpl` e `protocolo-dpl-frufru`: deploy de assets bloqueado (commits c5c57a1 / 54bdeee). Não publicam.

## Incidente 28/10/2026
36 páginas deram 404: deploy de assets do w-lst-paginas a partir de dist sem elas. Corrigido com o extras. Regras: CLAUDE.md "Produção compartilhada" + PADRAO-CONSTRUCAO D11–D12.

## Pendências
- `/ativos-d` na raiz do domínio ainda é rota do w-lst-paginas e dá 404; a página vive em `/p/ativos-d`.
- Monitor externo: alerta vermelho se qualquer slug de `/p/*` cair (hoje só avisa; não bloqueia).
- Chave anon Supabase nas páginas está liberada no `.gitleaks.toml` (pública por desenho); rodar gitleaks com `-c .gitleaks.toml`.
