# MANUAL — lst-paginas

Páginas de `leandrostecca.com.br/p/*`, todas servidas por um único Worker: `w-lst-paginas`.

## Criar uma página nova
1. Pasta `extra-pages/<slug>/` com `index.html`, `t.js` (atribuição, copiar de outra página) e `images/`.
2. `node scripts/build-full-dist.mjs`: monta `dist/` (espelho do ar + extra-pages), gera `slugs-todos.list` e `w-lst-paginas/src/sck-slugs.js`, injeta Sentinela e 1 beacon `/r/i?p=_abp` por página (aborta se não for 1).
3. Testes: `node --test scripts/*.test.mjs` e `node --test w-lst-paginas/test/*.test.mjs` (este precisa de miniflare 3; o lockfile está fora de sincronia, então na KVM4 use `npm i --no-save miniflare@3`).
4. Deploy: `cd w-lst-paginas && ./deploy-full.sh` (só checa) e `CONFIRMO=sim ./deploy-full.sh` (publica tudo, confere todos os slugs, reverte se um cair). Nunca deploy parcial de `dist/`.

## Padrão de página de vendas
- Botões acima do preço levam para `#oferta`; do preço para baixo, os botões têm `data-checkout` e recebem `CHECKOUT_URL` (variável no fim do HTML).
- Placeholders entre colchetes (`[LINK-CHECKOUT]`, `[CNPJ]`, `[PRINT 01]`) até o dado real chegar.
- Indexação: `robots` no head (`index,follow` só quando o Chefe pede; padrão `noindex`).

## Páginas
- `cptel-pv01`: Curso Prático Transformando Excelência em Lucro (R$ 62, lote 02). Indexável. Ver `docs/ai/cptel.md`.
