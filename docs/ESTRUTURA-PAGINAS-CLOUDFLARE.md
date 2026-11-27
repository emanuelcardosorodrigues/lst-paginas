# Como as páginas do Leandro vão ao ar: estrutura e Cloudflare Workers

Atualizado em 27/11/2026.

## 1. A ideia em uma frase
O domínio `leandrostecca.com.br` não tem servidor nem hospedagem. Desde 06/11/2026, quando o WordPress da Núcleo saiu do caminho, todas as páginas são servidas por **Cloudflare Workers**, na conta Cloudflare do Leandro (conta LST).

## 2. O que é um Worker e por que usamos
Um Worker é um programa pequeno que roda nos servidores da Cloudflare espalhados pelo mundo (a "borda"). Quando alguém abre um link, o Worker do datacenter mais próximo responde direto, sem passar por servidor nosso.

Cada Worker fica "pendurado" numa **rota**, que é um padrão de endereço (ex.: `leandrostecca.com.br/p/*`). Quando duas rotas cobrem o mesmo endereço, vence a **mais específica**.

Por que Workers e não WordPress ou hospedagem:
- **Velocidade:** a página sai da borda, perto do lead. Página rápida = mais gente que clica no anúncio chega a ver a página.
- **Sem servidor para cair, atualizar ou pagar** à parte.
- **Controle total do HTML:** nada de plugin injetando script; a página só chama o que a gente quer.
- **Volta rápida:** cada publicação vira uma versão; voltar para a anterior é um comando.

## 3. O mapa: quem responde cada endereço

| Endereço | Worker | O que serve | Onde está o código |
|---|---|---|---|
| `leandrostecca.com.br/p/*` | `w-lst-paginas` | Todas as páginas de venda, captura, obrigado e calculadoras (77 slugs hoje) | repo `lst-paginas` |
| `/p/bio` | `w-lst-bio` | Link da bio do Instagram | repo `lst-central-consultores`, pasta `linkbio/` |
| `/r/*` | `w-ab-test-tool` | Redirecionadores: `/r/check/<código>` leva ao checkout (Hotmart/Hub.la) carregando a origem da venda; teste A/B; beacon `/r/i` | repo `dashboard`, pasta `w-ab-test-tool/` |
| todo o resto (`/`, `/col-pv01`, `/lps-pv04`, política, termos…) | `w-lst-wp-mirror` | Cópia 1 para 1 das páginas antigas do WordPress, congeladas como arquivo estático | repo `lst-central-consultores`, pasta `wp-mirror/` |

`www.leandrostecca.com.br` responde 301 para o endereço sem `www`.

Existem no repo dois Workers antigos de página única (`w-lst-kal-pv`, `w-col-inup-cap01`). A regra hoje é: **página nova não ganha Worker próprio**, entra no `w-lst-paginas`.

## 4. O caminho de uma página `/p/<slug>`
1. O lead clica no anúncio: `leandrostecca.com.br/p/cptel-pv01?fbclid=…`
2. A Cloudflare vê que o endereço casa com a rota `/p/*` e entrega o pedido ao `w-lst-paginas`.
3. O Worker:
   - se faltar a barra final (`/p/cptel-pv01`), redireciona uma vez para `/p/cptel-pv01/`, mexendo só no caminho e preservando a query (em 09/11 um erro aqui gerou loop em todo clique de anúncio);
   - busca o `index.html` daquele slug nos arquivos publicados e devolve;
   - em algumas páginas, ajusta o HTML na hora (corretor de `sck`, tag de rastreio);
   - em páginas com formulário, recebe a inscrição em `/p/<slug>/api/inscricao` e guarda no KV `INSCRICOES` (o que falhar é reenviado depois).
4. O botão de compra aponta para `/r/check/<código>`. Esse endereço é do `w-ab-test-tool`, que redireciona para o checkout levando a origem (UTM/`sck`), o que permite saber qual anúncio vendeu.

## 5. O que uma página precisa ter
Cada página mora em `extra-pages/<slug>/` no repo `lst-paginas`:
- `index.html`: a página inteira, com CSS e JS embutidos;
- `t.js`: script de atribuição (copiar de outra página);
- `images/`: imagens em `.webp`, servidas do próprio domínio.

Padrões obrigatórios:
- **Nenhuma requisição externa** além do rastreio (pixel Meta/Sentinela). Fonte, CSS, JS, ícone e imagem saem do próprio domínio. Nada de Google Fonts nem CDN de terceiros.
- **Botão de checkout é um link de verdade** (`<a href="/r/check/…">`), nunca um botão que navega por JavaScript. Sem o link, a origem da venda se perde sem avisar.
- **Todo botão tem identificador** (`data-gtm-id`), para saber qual foi clicado.
- **Acima do preço**, os botões levam para `#oferta`; **do preço para baixo**, levam ao checkout (`data-checkout` + `CHECKOUT_URL` no fim do HTML).
- **Indexação:** `noindex` por padrão; `index,follow` só com ordem expressa.
- Rastreio hoje: GTM fora desde 11/11; pixel Meta via Sentinela.

## 6. Como publicar (passo a passo)
Tudo no repo `lst-paginas`:

1. **Montar:** `node scripts/build-full-dist.mjs`
   Gera a pasta `dist/` com **todas** as páginas: baixa um espelho do que está no ar agora, soma as `extra-pages/`, injeta a tag de rastreio e atualiza a lista `slugs-todos.list`.
2. **Testar:** `node --test scripts/*.test.mjs` e `node --test w-lst-paginas/test/*.test.mjs`
3. **Conferir sem publicar:** `cd w-lst-paginas && ./deploy-full.sh`
   Confere se nenhuma página sumiu do pacote e testa todos os endereços no ar.
4. **Publicar:** `CONFIRMO=sim ./deploy-full.sh`
   Publica, espera 10 segundos e abre **cada slug em 4 formatos** (com `?fbclid`, com UTM, com e sem barra final), exigindo resposta 200. **Se uma página cair, volta sozinho para a versão anterior.**
5. Commit e push no GitHub.

A chave da Cloudflare **não fica no projeto**. Fica num cofre local (`~/.config/apolo/cf-deploy-tokens.env`, uma chave por conta) e o script de deploy lê de lá. Nunca se usa `wrangler deploy` direto.

**Voltar uma versão:** `wrangler deployments list` mostra as versões; `wrangler rollback <id>` volta (sempre com a chave do cofre, via `~/.config/apolo/cf-deploy.sh`).

## 7. Por que o processo é assim (o que já deu errado)
- **Publicar troca o pacote inteiro.** O Worker serve um conjunto único de arquivos. Quem publica um `dist/` sem as páginas dos outros apaga essas páginas. Em 26/10 a página INUP caiu três vezes por isso, e em 28/10 caíram 36 páginas de uma vez. Por isso o build sempre começa espelhando o que está no ar, e o deploy confere o inventário antes de publicar.
- **`wrangler deploy --name X` substitui o Worker inteiro** pela configuração da pasta onde você está. Em 16/07 isso derrubou todas as `/p/*` por 3 minutos. Por isso o deploy só roda pela pasta `w-lst-paginas/`, e o `wrangler.jsonc` de lá bloqueia de propósito o deploy direto de arquivos.
- **A chave do ambiente é a do Leandro** e não serve para as outras contas (Thiago, Sidney, Apolo). Daí o cofre com uma chave por conta.

## 8. Não fazer
- Publicar `dist/` parcial.
- Criar Worker novo para uma página.
- Rodar `wrangler deploy` direto ou com `--name`.
- Publicar de uma cópia ou worktree: só do repo dono.
- Tirar o `noindex` sem ordem.
