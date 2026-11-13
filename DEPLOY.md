# Deploy — Protocolo DPL na Cloudflare Pages

URL final: `cf.leandrostecca.com.br/dpl-pv01/`

---

## PASSO 1 — Instalar Wrangler (só na primeira vez)

```bash
npm install -g wrangler
```

---

## PASSO 2 — Fazer login na Cloudflare

```bash
wrangler login
```

> Vai abrir o navegador. Faça login com sua conta Cloudflare e autorize o acesso.

---

## PASSO 3 — Build da página

```bash
cd "/Users/emanuelcardoso/Documents/Claude/Projects/protocolo-dpl"
npm run build
```

O build gera a pasta `dist/dpl-pv01/` com HTML + CSS + JS minificados.

---

## PASSO 4 — Criar o projeto no Cloudflare Pages (só na primeira vez)

```bash
wrangler pages project create protocolo-dpl
```

---

## PASSO 5 — Deploy

```bash
wrangler pages deploy ./dist --project-name=protocolo-dpl
```

> A URL padrão será algo como: `https://protocolo-dpl.pages.dev/dpl-pv01/`

---

## PASSO 6 — Apontar o domínio `cf.leandrostecca.com.br`

### 6a. No painel DNS do seu registrador de domínio (onde leandrostecca.com.br está registrado)

Adicione este registro DNS:

| Tipo   | Nome | Valor                         |
|--------|------|-------------------------------|
| CNAME  | cf   | protocolo-dpl.pages.dev       |

> Se o domínio principal já usa Cloudflare como nameserver, faça isso pelo painel DNS da Cloudflare.

### 6b. No painel do Cloudflare Pages

1. Acesse: [dash.cloudflare.com](https://dash.cloudflare.com)
2. Vá em **Workers & Pages** → **protocolo-dpl**
3. Aba **Custom Domains**
4. Clique em **Set up a custom domain**
5. Digite: `cf.leandrostecca.com.br`
6. Confirme

> A Cloudflare vai verificar o DNS automaticamente. Pode levar até 24h para propagar, mas geralmente resolve em minutos.

---

## PASSO 7 — Acessar a página

```
https://cf.leandrostecca.com.br/dpl-pv01/
```

---

## Redeploy futuro (após editar a página)

Sempre que atualizar o código:

```bash
cd "/Users/emanuelcardoso/Documents/Claude/Projects/protocolo-dpl"
npm run build
wrangler pages deploy ./dist --project-name=protocolo-dpl
```

---

## Preview local antes de fazer deploy

```bash
npm run dev
```

Abre em: `http://localhost:5173/dpl-pv01/`

---

## Pendências para finalizar a página

- [ ] **URL de Checkout** — Substituir `href="#checkout"` pela URL real (Hotmart/Kiwify/Ticto)
- [ ] **Mockups DPL** — Screenshots reais da planilha Excel do produto (9 imagens no Showroom)
- [ ] **Vídeo Passo a Passo** — Link ou thumbnail do vídeo tutorial da calculadora
- [ ] **Consultor de Precificação IA** — Mockup ou imagem representativa
- [ ] **Como Dobrar Seu Lucro** — Mockup ou imagem representativa
- [ ] **5 Perigos da Reforma Tributária** — Mockup ou imagem representativa
- [ ] **Bundle** — Imagem do bundle de produtos (seção Re-engajamento)
- [ ] **Foto do Leandro** — Verificar se a foto da página de referência pode ser reutilizada ou precisa de nova
- [ ] **Política de Privacidade / Termos de Uso** — Links reais no rodapé

---

## Relay de eventos de página (`POST /p/_evt`, WP 1.3b)

O browser nunca vê o segredo. A página (`snippets/pagina-evt.js`) envia `{t,type,pct,event_id,page_slug,utm_*}` para `/p/_evt`; o Worker valida (corpo ≤ 2 KB, campos fixos, origem só `leandrostecca.com.br`/`www`), injeta `X-QUIZ-SECRET` e repassa ao quiz-intake com `mode:"pagina_evento"` (contrato: `megacrm/docs/agente-plo/contrato-pagina-evento.md`). Não grava nada; 5xx tenta mais 1 vez; 401/4xx descarta; a página sempre recebe 202/204.

Usa os mesmos secrets da inscrição: `CRM_QUIZ_INTAKE_URL` e `CRM_QUIZ_INTAKE_SECRET`. Sem eles o relay responde 503 e a página segue normal. Se ainda não existirem no Worker (comando do Chefe, com o token do cofre LST via `cf-deploy.sh`, nunca o token solto do ambiente; o valor é digitado no prompt, nunca em arquivo):

```bash
cd w-lst-paginas
npx wrangler secret put CRM_QUIZ_INTAKE_URL
npx wrangler secret put CRM_QUIZ_INTAKE_SECRET
```

Uso na página: copiar `snippets/pagina-evt.js` para a pasta da página (ou inline), marcar a oferta com `data-evt="oferta"` e os botões com `data-evt="cta"`. O link do agente leva `?t=<token>`; sem token nada é enviado. Pós-deploy: `scripts/smoke-slugs.sh` (76 slugs x 4 formas) e `curl -i -X POST https://leandrostecca.com.br/p/_evt` deve dar 403 (sem Origin).
Não verificado: a API do VTurb (`smartplayer.instances[0].on("play"|"timeupdate")`) nunca rodou em navegador real; conferir numa página com vídeo antes de confiar nos marcos 25/50/75/100 (fallback: `PagEvt.send("video_progress", 50)`).
