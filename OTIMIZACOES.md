# Otimizações de Performance - Protocolo DPL

## Resumo das Otimizações Implementadas

### ✅ **PLO-PV01** (Protocolo Lucro Oculto)
Score atual: 87 → **Objetivo: 100**

#### Otimizações Realizadas:
1. **GTM no topo do head** - Prioridade máxima para performance de anúncios
2. **Preconnect para origens críticas**:
   - `https://ts.leandrostecca.com.br` (GTM)
   - `https://connect.facebook.net` (Facebook Pixel)
   - `https://www.facebook.com`
   - `https://pay.hotmart.com`
3. **Bundle splitting otimizado** no Vite:
   - Separar Preact/React em chunk próprio
   - Separar ícones (lucide-react) em chunk próprio
   - Separar estilos em chunk próprio
   - Vendor chunk para outros módulos de terceiros
4. **Cache headers otimizados** (1 ano para assets estáticos)
5. **Robots.txt correto** com sitemap apropriado
6. **Target ESNext** para código moderno sem transpilação desnecessária
7. **Minificação com esbuild** para build mais rápido

---

### ✅ **DPL-PV01** (Protocolo Dentista Parceiro Lucrativo)
Score atual: 81 → **Objetivo: 100**

#### Otimizações Realizadas:
1. **GTM no topo do head** - Prioridade máxima para performance de anúncios
2. **Critical CSS inline** para conteúdo acima do fold (hero section):
   - Reset CSS
   - Layout básico
   - Estilos do hero
   - Botão CTA
   - Tipografia essencial
3. **CSS não-bloqueante** - Carregamento assíncrono do CSS completo
4. **Preload da imagem LCP** com `fetchpriority="high"`
5. **Preconnect para origens críticas**:
   - `https://ts.leandrostecca.com.br` (GTM)
   - `https://connect.facebook.net` (Facebook Pixel)
   - `https://www.facebook.com`
   - `https://fonts.googleapis.com`
   - `https://fonts.gstatic.com`
6. **Google Fonts não-bloqueantes** (preload + media="print" + onload)
7. **Bundle splitting** no Vite:
   - Vendor chunk para node_modules
8. **Cache headers otimizados** (1 ano para assets estáticos)
9. **Robots.txt correto** com sitemap apropriado
10. **Caminhos de imagens corrigidos** com prefixo `/dpl-pv01/`

---

### ✅ **Cache Headers Cloudflare** (Aplicado a ambos)

```http
# Assets com hash (JS/CSS) - 1 ano imutável
/assets/*
  Cache-Control: public, max-age=31536000, immutable

# Imagens - 1 ano com stale-while-revalidate
/images/*
  Cache-Control: public, max-age=31536000, stale-while-revalidate=86400

# Fontes - 1 ano imutável
*.woff2
  Cache-Control: public, max-age=31536000, immutable

# HTML - Cache curto para tracking pixels
/
  Cache-Control: public, max-age=300, s-maxage=600, stale-while-revalidate=60

# Robots.txt - 1 dia
/robots.txt
  Cache-Control: public, max-age=86400, s-maxage=86400, stale-while-revalidate=3600
```

---

## Instruções de Deploy

### 1. Instalar dependências
```bash
cd /tmp/protocolo-dpl
npm install
cd plo-pv01
npm install
cd ..
```

### 2. Fazer build
```bash
npm run build
```

### 3. Deploy no Cloudflare
```bash
cd dist
npx wrangler pages deploy . --project-name=protocolo-dpl
```

### 4. Verificar
- Acesse `https://cf.leandrostecca.com.br/plo-pv01/`
- Acesse `https://cf.leandrostecca.com.br/dpl-pv01/`
- Execute PageSpeed Insights para confirmar scores de 100

---

## Melhorias Esperadas

### PLO-PV01:
- ✅ **GTM no topo** → Tracking mais preciso
- ✅ **Preconnect Facebook** → Carregamento mais rápido de scripts de terceiros
- ✅ **Bundle splitting** → Menor blocking time
- ✅ **Cache otimizado** → Visitas recorrentes mais rápidas
- ✅ **Robots.txt válido** → SEO score 92 → 100

**Esperado: 87 → 95+** (pode atingir 100)

### DPL-PV01:
- ✅ **GTM no topo** → Tracking mais preciso
- ✅ **Critical CSS inline** → Elimina render-blocking CSS
- ✅ **CSS não-bloqueante** → FCP e LCP melhorados
- ✅ **Preload LCP** → Carregamento prioritário da imagem principal
- ✅ **Preconnect Facebook** → Carregamento mais rápido de scripts de terceiros
- ✅ **Bundle splitting** → Menor blocking time
- ✅ **Cache otimizado** → Visitas recorrentes mais rápidas
- ✅ **Robots.txt válido** → SEO score 92 → 100
- ✅ **Caminhos corrigidos** → CLS reduzido

**Esperado: 81 → 95+** (pode atingir 100)

---

## Notas Importantes

### Prioridade de Anúncios
- **GTM e ts.leandrostecca.com.br** estão no topo do `<head>` em ambos os projetos
- Isso garante máxima prioridade para tracking de anúncios
- Não há delay ou defer nos scripts de tracking

### Scripts de Terceiros
Os scripts de terceiros (GTM, GA, Facebook, Clarity) são carregados de forma assíncrona pelo próprio GTM, o que é a prática recomendada para:
- Não bloquear renderização
- Manter tracking preciso
- Garantir performance máxima de anúncios

### Cache Strategy
- **Assets com hash**: Imutáveis (não mudam quando o conteúdo muda)
- **Imagens**: Cache longo com stale-while-revalidate para atualizações silenciosas
- **HTML**: Cache curto para garantir pixels de tracking sempre atualizados
- **Robots.txt**: Cache de 1 dia para reduzir requests, mas manter atualizações razoavelmente recentes

---

## Próximas Otimizações (Opcional)

Se necessário atingir 100% consistente:

1. **Imagens com srcset e sizes** para responsive loading
2. **WebP com fallback JPEG** para melhor suporte
3. **Service Worker** para cache offline
4. **HTTP/3** no Cloudflare (ativado por padrão)
5. **Cloudflare Polish** para otimização automática de imagens

---

## Verificação Pós-Deploy

Após o deploy, verificar:

```bash
# Ver robots.txt
curl -I https://cf.leandrostecca.com.br/dpl-pv01/robots.txt
curl -I https://cf.leandrostecca.com.br/plo-pv01/robots.txt

# Ver cache headers
curl -I https://cf.leandrostecca.com.br/dpl-pv01/assets/*.js
curl -I https://cf.leandrostecca.com.br/plo-pv01/assets/*.js

# Ver HTML
curl -I https://cf.leandrostecca.com.br/dpl-pv01/
curl -I https://cf.leandrostecca.com.br/plo-pv01/
```

---

## Arquivos Modificados

- `/tmp/protocolo-dpl/package.json` - Scripts de build
- `/tmp/protocolo-dpl/vite.config.js` - Configuração Vite dpl-pv01
- `/tmp/protocolo-dpl/plo-pv01/vite.config.ts` - Configuração Vite plo-pv01
- `/tmp/protocolo-dpl/index.html` - HTML otimizado dpl-pv01
- `/tmp/protocolo-dpl/plo-pv01/index.html` - HTML otimizado plo-pv01
- `/tmp/protocolo-dpl/public/_headers` - Cache headers Cloudflare
- `/tmp/protocolo-dpl/public/robots.txt` - Robots.txt dpl-pv01
- `/tmp/protocolo-dpl/plo-pv01/public/robots.txt` - Robots.txt plo-pv01
- `/tmp/protocolo-dpl/vite-plugin-copy-static.js` - Plugin para copiar arquivos
- `/tmp/protocolo-dpl/plo-pv01/vite-plugin-copy-static.ts` - Plugin TypeScript para plo-pv01
