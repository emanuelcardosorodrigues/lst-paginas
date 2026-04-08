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
