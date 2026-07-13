# Baseline: Meta Pixel PageView (2026-07-12)

**Data**: 2026-07-12  
**URL**: https://leandrostecca.com.br/p/lps-pv01/  
**Método**: Playwright CDP, janela 13s, contra produção  

## Resultados

| Perfil  | Run 1 | Run 2 | Run 3 | Mediana |
|---------|-------|-------|-------|---------|
| slow4g  | 2999  | 2651  | 2683  | 2683    |
| fast4g  | 1302  | 1097  | 1108  | 1108    |
| wifi    | 592   | 355†  | 439   | 439     |

†wifi run 2 disparou HITS=2 em ambas as tentativas (anomalia de reload duplo). Valor usado: primeira hit (355ms).

## Anomalias

- **wifi run 1 (original)**: HITS=2 (349, 416) → re-rodado → HITS=1 (592) ✓
- **wifi run 2 (original)**: HITS=2 (382, 450) → re-rodado → HITS=2 (355, 425) ⚠
- **wifi run 3**: HITS=1 (439) ✓

Padrão: Em WiFi desregulado (LAT=0, THR=0), Meta Pixel refaz o request ou há reload duplo no document. Investigar: GTM diferido ou segundo fbevents listener na página.

## F1 pós Early Hints (preload fbevents.js) — 2026-07-12

**Mudança**: `public/_headers` bloco `/p/lps-pv01/` — adicionado ao `Link:` existente `<https://connect.facebook.net>; rel=preconnect` + `<https://connect.facebook.net/en_US/fbevents.js>; rel=preload; as=script` (sem crossorigin, sem fetchpriority). Nenhum código/GTM tocado. Deploy via `wrangler deploy` em `w-lst-paginas/`.

**Validação estrutural**: 103 confirma o preload do fbevents; hero count = 1 por viewport (412px e 1440px); `fbevents.js` baixado exatamente 1x em todos os runs (o preload casou — sem duplicidade de download).

### Resultados (mediana da 1ª hit /tr?ev=PageView por run, mesma janela 13s)

| Perfil  | Run 1 | Run 2 | Run 3 | Mediana |
|---------|-------|-------|-------|---------|
| slow4g  | 2460  | 1796  | 1588  | 1796    |
| fast4g  | 724   | 478   | 485   | 485     |
| wifi    | 331   | 331   | 352   | 331     |

Antes → depois: slow4g 2683→1796ms (‑33%), fast4g 1108→485ms (‑56%), wifi 439→331ms (‑25%). Meta slow4g ≤2500ms **atingida**.

### ⚠ ANOMALIA AGRAVADA — PageView disparando 2x, agora sistemático (não mais raro)

No baseline F0, o double-hit só aparecia no wifi (2/3 tentativas). Pós preload do fbevents, o double-hit passou a aparecer em **8 de 9 runs**, em TODOS os perfis:

| Perfil | Runs com 2 hits | ec=0 (com eid) | ec=1 (sem eid, Δt do 1º) |
|--------|------------------|----------------|---------------------------|
| slow4g | 3/3 | 2460/1796/1588ms | 3269/3030/2408ms (Δ~800-1200ms) |
| fast4g | 2/3 (run1 só 1 hit) | 478/485ms | 619/600ms (Δ~140ms) |
| wifi   | 3/3 | 331/331/352ms | 414/408/419ms (Δ~70-80ms) |

Padrão: mesmo pixel (mesmo fbevents.js, 1 download só), `fbq('track','PageView')` disparando duas vezes na mesma sessão — 1ª com `eid` preenchido, 2ª sem `eid`. Não houve segundo download do script nem segundo document load. Hipótese: preload deixa `fbevents.js` pronto mais cedo, mudando a ordem de execução entre o init inline do Pixel e algum outro disparo (possivelmente a própria tag de Pixel do GTM competindo com o init manual da página) — antes essa corrida quase sempre perdia a 2ª chamada fora da janela/estado; agora as duas completam. **Não mexi no GTM nem no código — só no `_headers`.** Isso é uma regressão de exatidão de tracking (double counting de PageView/connect rate), mais grave que o ganho de velocidade. Não revertido (conforme instrução); registrado para caracterização na F2, prioridade alta dado que passou de raro (wifi 2/3 no F0) para sistemático (8/9 em todos os perfis no F1).

## F2 — Missão A: PageView duplo RESOLVIDO (2026-07-12)

### Causa raiz (caracterizada com stack trace + CDP initiator em produção)

O 2º `/tr?ev=PageView` (ec=1, SEM eid, com `a=tmSimo-GTM-WebTemplate-2.0.8-fcg`) **não vem de nenhuma chamada `fbq(...)`**:

1. PageView legítimo (ec=0, com eid) sai do init inline — stack: `lps-pv01/:65`.
2. A tag do GTM (template tmSimo) reescreve a URL para `?xcod=...&utm_source=...&sck=...` via `history.replaceState` ~1-2s após o load. O `dl=` do 2º hit sempre carrega essa URL reescrita (fingerprint do replaceState).
3. O `fbevents.js` instala hook em `pushState`/`replaceState` e dispara PageView "automático" quando `location.href` muda (fonte, fbevents v2.9.349: `t.fbq.disablePushState!==!0 && ... injectMethod(history,"replaceState",...) → automaticPageView.trigger()`).

Por que virou sistemático pós-F1: com o preload, o fbevents carrega ANTES do replaceState do GTM → hook instalado a tempo. Antes, em rede rápida, o replaceState rodava antes do fbevents (sem hook) — por isso era raro e só no wifi.

Descartadas com evidência: (a) guard do stub tem furo — NÃO, o `trackSingle PageView` do GTM é BLOQUEADO pelo guard (logado); (b) `autoConfig=false` — deployado e testado, NÃO resolveu (o caminho é o hook de history, não o signals/config); (c) wrapper de `fbq.callMethod` via defineProperty — deployado e testado, NÃO resolveu (o disparo automático não passa pelo callMethod público). Ambos revertidos.

Nota: `assets/js/utm.js` e `t.js` NÃO contêm `replaceState`/`pushState`/`xcod` (grep no fonte + md5 prod==local) — o decorador xcod é a tag tmSimo DENTRO do GTM (intocável). Fix 100% page-side.

### Fix

`lps-pv01/index.html`, stub inline do head: `fbq.disablePushState = true` setado ANTES do fbevents executar. É o flag que o próprio fbevents checa antes de instalar o hook de history. Página estática, sem navegação SPA: zero perda. O guard de dedup original do stub fica (continua segurando o `trackSingle PageView` explícito da tag do GTM). GTM não tocado.

### Validação (produção, Playwright CDP, janela 15s, 6 runs)

| Perfil | Run 1 | Run 2 | Run 3 | Mediana | Hits/run |
|--------|-------|-------|-------|---------|----------|
| slow4g (LAT=150, THR=209715) | 1770 | 1376 | 1457 | 1457 | 1,1,1 |
| wifi (sem throttle) | 604 | 1548 | 1367 | 1367 | 1,1,1 |

- **6/6 runs com EXATAMENTE 1 `/tr?ev=PageView`** (antes: 8/9 com 2). Mediana slow4g 1457ms ≤ 1900 (não regrediu vs 1796 F1).
- URL continua ganhando `?xcod=...` (replaceState do GTM funciona — só invisível pro fbevents): 6/6 runs.
- Links de checkout continuam decorados: `cta-lote-checkout` href com `xcod`+`utm_source`+`sck` em 6/6 runs.
- Clique no `cta-hero-ancora` → push no dataLayer confirmado (`{event:'click', click_id:'cta-hero-ancora'}`; dataLayer 4→7). Obs.: teste precisa de `click({force:true})` — a animação ctaPulse infinita impede o "element is stable" do Playwright (artefato de teste, não bug).

MD5 finais: `index.html` = 271d434959a00e207fb54ef28376c352 (prod == local, conferido); `utm.js` = 4487412f9653faa9892fe7f38ea47d76 (INALTERADO); `t.js` = 99f80ed5d019286de37b3aa805348171 (INALTERADO).
