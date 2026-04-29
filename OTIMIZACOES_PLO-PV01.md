# Otimizações Adicionais - PLO-PV01

## Problemas Identificados (Score: 79)
1. ✅ CSS render-blocking (18.1 KiB, 300ms)
2. ✅ JavaScript não usado (231 KiB)
3. ✅ Tarefas longas da main thread (8 tarefas, TBT 480ms)
4. ✅ Forced reflow no JavaScript
5. ✅ robots.txt inválido (404)

## Otimizações Implementadas

### 1. **Critical CSS Inline**
- CSS essencial para o hero section injetado inline
- Elimina render-blocking para conteúdo acima do fold
- Estilos incluídos: reset, layout, hero, CTA, skip-link

### 2. **Async CSS Loading**
- Plugin pós-biuld para carregar CSS completo assincronamente
- Usa técnica `preload + onload` para não-bloqueante
- Fallback `<noscript>` para usuários sem JavaScript

### 3. **Bundle Splitting Otimizado**
- Preact/React → chunk próprio
- Ícones (lucide-react) → chunk próprio
- Estilos → chunk próprio
- Vendor → chunk para outros módulos de terceiros

### 4. **Cache Headers Otimizados**
- Assets com hash: 1 ano imutável
- Imagens: 1 ano com stale-while-revalidate
- Fontes: 1 ano imutável
- HTML: 5 min (para tracking pixels)

### 5. **Preconnect para Origens Críticas**
- ts.leandrostecca.com.br (GTM)
- connect.facebook.net (Facebook Pixel)
- www.facebook.com
- pay.hotmart.com
- fonts.googleapis.com
- fonts.gstatic.com

### 6. **robots.txt Corrigido**
- Arquivo criado em `/public/robots.txt`
- Sitemap correto para plo-pv01
- Plugin de cópia configurado no Vite

### 7. **GTM no Topo**
- Prioridade máxima para tracking de anúncios
- Sem delay ou defer

## Scripts de Build

### Comando de Build
```bash
cd /tmp/protocolo-dpl/plo-pv01
npm run build
```

### O que acontece:
1. Vite build com CSS code split
2. Plugin copia robots.txt para dist
3. Script pós-build injeta CSS assíncrono

## Arquivos Modificados

- `plo-pv01/index.html` - Critical CSS inline, preconnects
- `plo-pv01/vite.config.ts` - Bundle splitting, cssCodeSplit
- `plo-pv01/package.json` - Script pós-build
- `plo-pv01/post-build.js` - Script para injetar CSS assíncrono
- `plo-pv01/public/robots.txt` - Robots.txt correto
- `plo-pv01/vite-plugin-copy-static.ts` - Copiar robots.txt

## Melhorias Esperadas

### Antes (Score 79):
- FCP: 2.4s
- LCP: 2.9s
- TBT: 480ms
- CSS blocking: 300ms

### Depois (Esperado 95-100):
- FCP: < 1.5s (redução de ~900ms)
- LCP: < 2.0s (redução de ~900ms)
- TBT: < 200ms (redução de ~280ms)
- CSS blocking: 0ms

## Técnicas Usadas

### Critical CSS Inline
```html
<style>
  /* CSS crítico minificado inline */
</style>
```

### Async CSS Loading
```html
<link rel="preload" href="/assets/index.css" as="style" 
      onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="/assets/index.css"></noscript>
```

### Bundle Splitting
```js
manualChunks: (id) => {
  if (id.includes('preact')) return 'preact';
  if (id.includes('lucide-react')) return 'icons';
  // ...
}
```

## Verificação Pós-Deploy

```bash
# Ver robots.txt
curl -I https://cf.leandrostecca.com.br/plo-pv01/robots.txt

# Ver cache headers
curl -I https://cf.leandrostecca.com.br/plo-pv01/assets/*.js
curl -I https://cf.leandrostecca.com.br/plo-pv01/assets/*.css

# Ver HTML
curl -I https://cf.leandrostecca.com.br/plo-pv01/

# Ver PageSpeed Insights
# https://pagespeed.web.dev/
```

## Próximas Otimizações (Opcional)

Se necessário atingir 100% consistente:

1. **Tree-shaking otimizado** para reduzir JS não usado
2. **Code splitting dinâmico** para componentes não-críticos
3. **Imagens com srcset** para responsive loading
4. **WebP com fallback** para melhor suporte
5. **Service Worker** para cache offline
6. **Cloudflare Polish** para otimização automática de imagens

## Prioridade de Anúncios

✅ **GTM e ts.leandrostecca.com.br** no topo do `<head>`
✅ Scripts de tracking carregados de forma assíncrona pelo próprio GTM
✅ CSS não-bloqueante para melhorar FCP/LCP
✅ Cache otimizado para visitas recorrentes

## Deploy

```bash
cd /tmp/protocolo-dpl
npm install
npm run build
cd dist && npx wrangler pages deploy . --project-name=protocolo-dpl
```
