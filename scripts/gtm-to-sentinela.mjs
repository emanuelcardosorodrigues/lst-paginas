// Troca GTM (loader Stape/gtm.js, noscript, preconnect/dns-prefetch, comentários) pela tag Sentinela. Função pura e idempotente.
// Não toca em Pixel, gtag (third-party.js), Hotmart, t.js/utm.js nem em dns-prefetch/preconnect de clarity/google-analytics.
// Também remove o código morto que sobrou do GTM (dataLayer em JS de página, holder do Clarity, data-gtm-id, comentários).
export const TAG = '<script async src="https://track.leandrostecca.com.br/api/t/tracker.js?tid=faafca5a-fb53-404f-8469-499d8869944c"></script>';
// Remove a tag Sentinela (script /api/t/tracker.js), linha inteira se ela a ocupa sozinha. Não toca no GTM.
export const stripTag = (h) => h.replace(/^[ \t]*<script\b[^>]*\/api\/t\/tracker\.js[^>]*><\/script>[ \t]*\r?\n/gm, "").replace(/<script\b[^>]*\/api\/t\/tracker\.js[^>]*><\/script>/g, "");
const esc = (x) => x.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const TRY_PUSH = String.raw`try\s*\{\s*\(window\.dataLayer=window\.dataLayer\|\|\[\]\)\.push\(\{[^{}]*\}\);?\s*\}\s*catch\s*\(\w+\)\s*\{\s*\}`;
// remove um statement: linha inteira se ele a ocupa sozinho, senão só o trecho
const rmStmt = (h, re) => h.replace(new RegExp(`^[ \\t]*${re}[ \\t]*\\r?\\n`, "gm"), "").replace(new RegExp(re, "g"), "");
const WRAPPERS = { push: "function push(o){ try{ (window.dataLayer=window.dataLayer||[]).push(o); }catch(e){} }", dl: "function dl(o){try{(window.dataLayer=window.dataLayer||[]).push(o)}catch(x){}}" };
const IN = (re) => `(?:(?!${re})[\\s\\S])*?`; // qualquer coisa sem atravessar o fechamento
export function transform(html) {
  let h = html;
  // loader: <script>...gtm.start...</script> (cobre Stape e gtm.js padrão, minificado ou não)
  h = h.replace(new RegExp(`[ \\t]*<script[^>]*>${IN("</script>")}gtm\\.start${IN("</script>")}</script>[ \\t]*\\r?\\n?`, "g"), "");
  // noscript com iframe do GTM/Stape (ns.html)
  h = h.replace(new RegExp(`[ \\t]*<noscript>${IN("</noscript>")}(?:ns\\.html\\?id=GTM-|googletagmanager\\.com/ns\\.html)${IN("</noscript>")}</noscript>[ \\t]*\\r?\\n?`, "gi"), "");
  // preconnect/dns-prefetch do GTM
  h = h.replace(/[ \t]*<link\b[^>]*\brel="(?:preconnect|dns-prefetch)"[^>]*googletagmanager\.com[^>]*>[ \t]*\r?\n?/gi, "");
  // comentários que citam GTM (antes do check do Stape: comentário com o domínio não pode manter o preconnect)
  h = h.replace(new RegExp(`[ \\t]*<!--${IN("-->")}(?:googletagmanager|Google Tag Manager|\\bGTM\\b|ts\\.leandrostecca)${IN("-->")}-->[ \\t]*\\r?\\n?`, "gi"), "");
  // preconnect ao domínio Stape só se nada mais o usa (o loader já saiu)
  if (!/ts\.leandrostecca\.com\.br(?!"\s*(?:crossorigin\s*)?\/?>)/.test(h))
    h = h.replace(/[ \t]*<link\b[^>]*\brel="preconnect"[^>]*href="https:\/\/ts\.leandrostecca\.com\.br"[^>]*>[ \t]*\r?\n?/gi, "");
  // par solto pv_event_id (só este texto exato; qualquer outro dataLayer fica)
  h = h.replace(/[ \t]*window\.dataLayer\s*=\s*window\.dataLayer\s*\|\|\s*\[\]\s*;\s*window\.dataLayer\.push\(\s*\{\s*event:\s*'pv_event_id'\s*,\s*pv_event_id:\s*window\.__pvEventID\s*\}\s*\)\s*;[ \t]*\r?\n?/g, "");
  h = removeDeadGtm(h);
  if (!h.includes("/api/t/tracker.js")) h = h.replace(/<\/head>/i, TAG + "\n</head>");
  return h;
}

// Código morto do GTM: nada aqui toca Pixel, gtag, checkout, sck nem utm. Cada regra é um texto/forma exata; o que não casa fica.
function removeDeadGtm(h) {
  // holder do Clarity (o Clarity vinha do GTM; ninguém mais o carrega nessas páginas) + comentário
  h = h.replace(new RegExp(`[ \\t]*(?:<!--[^\\n]*Clarity fora do caminho crítico${IN("-->")}-->[ \\t]*\\r?\\n)?[ \\t]*<script>${IN("</script>")}var RX = /clarity\\\\\\.ms/;${IN("</script>")}</script>[ \\t]*\\r?\\n?`, "g"), "");
  // atributo data-gtm-id (estático; t.js ainda cria em runtime, só para o payload dele)
  h = h.replace(/\sdata-gtm-id=(?:"[^"]*"|'[^']*')/g, "");
  // comentário sobre pv_event_id/CAPI/ts.leandrostecca (4 linhas, idêntico nas lps-pv*)
  h = h.replace(/[ \t]*\/\/ eventID no mesmo formato do template do GTM[^\n]*\r?\n(?:[ \t]*\/\/[^\n]*\r?\n)*?[ \t]*\/\/ em que uma tag CAPI[^\n]*\r?\n/g, "");
  // presenca_submit
  h = rmStmt(h, String.raw`window\.dataLayer=window\.dataLayer\|\|\[\];\s*window\.dataLayer\.push\(\{event:"presenca_submit",aula:AULA\}\);`);
  // lead_capturado direto (INUP)
  h = rmStmt(h, String.raw`try\{\(window\.dataLayer=window\.dataLayer\|\|\[\]\)\.push\(\{event:"lead_capturado",pagina:SLUG\}\)\}catch\(x\)\{\}`);
  // click tracker do testewslp (o handler só empurra no dataLayer)
  h = h.replace(new RegExp(String.raw`[ \t]*// click tracker universal \(padrão LST\)\r?\n[ \t]*document\.addEventListener\('click',function\(ev\)\{${IN("\\},true\\);")}\(window\.dataLayer=window\.dataLayer\|\|\[\]\)\.push\(\{event:'click_tracker'[^{}]*\}\);\s*\},true\);[ \t]*\r?\n?`, "g"), "");
  // listener do simulador (frufru01: try/dataLayer; 02/03: push())
  h = h.replace(new RegExp(String.raw`[ \t]*var (\w+)=false;\s*document\.getElementById\("sim"\)\.addEventListener\("input",function\(\)\{\s*if\(\1\)\s*return;\s*\1=true;\s*(?:${TRY_PUSH}|push\(\{event:"simulador_uso"\}\);)\s*\}\);[ \t]*\r?\n?`, "g"), "");
  h = rmStmt(h, TRY_PUSH); // quiz_frase (frufru01)
  // wrappers push()/dl(): só sai se TODA chamada saiu (nunca deixa referência solta)
  for (const [name, def] of Object.entries(WRAPPERS)) {
    if (!h.includes(def)) continue;
    let g = h.replace(new RegExp(`\\s*if\\(!open\\)\\s*${name}\\(\\{event:"faq_abre"[^{}]*\\}\\);`, "g"), "");
    g = g.replace(new RegExp(String.raw`[ \t]*r\.addEventListener\("pointerdown",function\(\)\{\s*if\(c\.dataset\.u\)\s*return;\s*c\.dataset\.u="1";\s*${name}\(\{event:"comparativo_arrasta"[^{}]*\}\);\s*\}\);[ \t]*\r?\n?`, "g"), "");
    g = g.replace(new RegExp(`[ \\t]*var seen=\\{\\};\\s*var so=new IntersectionObserver\\(function\\(es\\)\\{ es\\.forEach\\(function\\(e\\)\\{ var k=e\\.target\\.dataset\\.sec; if\\(e\\.isIntersecting && !seen\\[k\\]\\)\\{ seen\\[k\\]=1; ${name}\\(\\{event:"secao_vista", secao:k\\}\\); \\} \\}\\); \\},\\{rootMargin:"-45% 0px -45% 0px"\\}\\);\\s*document\\.querySelectorAll\\("\\[data-sec\\]"\\)\\.forEach\\(function\\(el\\)\\{ so\\.observe\\(el\\); \\}\\);[ \\t]*\\r?\\n`, "g"), "");
    g = g.replace("/* retenção: evento por seção vista + profundidade; CTA com origem */", "/* CTA: rola ao preço */");
    g = g.replace(new RegExp(`if\\(push\\)${name}\\(\\{event:"[^"]*"[^{}]*\\}\\);`, "g"), "");
    g = rmStmt(g, `(?<![.\\w$])${name}\\(\\{event:"[^"]*"[^{}]*\\}\\);?`);
    g = g.replace(new RegExp(`[ \\t]*${esc(def)}[ \\t]*\\r?\\n`), "").replace(def, "");
    if (!new RegExp(`(?<![.\\w$])${name}\\(`).test(g)) h = g; // sem referência solta
  }
  // produtores __pending/__pendingPush: ninguém lê (só o t.js, que perdeu o drain) nem chama
  h = rmStmt(h, String.raw`window\.__pending = window\.__pending \|\| \[\];`);
  h = rmStmt(h, String.raw`window\.__pendingPush = function \((?:p|payload)\) \{\s*try \{ window\.__pending\.push\((?:p|payload)\); \}\s*(?:catch \(e\) \{\}\s*)?\};`);
  h = h.replace(/[ \t]*<!-- Pre-hydration click queue \(pending-shim\) -->[ \t]*\r?\n/g, "").replace(/[ \t]*<script>\s*<\/script>[ \t]*\r?\n?/g, "");
  return h;
}

// t.js "tracker 1.0.0": fica só a atribuição (sessionStorage/localStorage/cookie __attrib e window.__attrib, lidos por utm.js).
// Sai: dataLayer, uuid, data-gtm-id em runtime, captura de clique e drain de __pending. Forma desconhecida ou já limpo: devolve igual.
export function transformTracker(js) {
  if (!js.startsWith("/* tracker 1.0.0") || !js.includes("var DL = (W.dataLayer")) return js;
  const cut = (t, a, b) => { const i = t.indexOf(a), j = t.indexOf(b, i); return i < 0 || j < 0 ? t : t.slice(0, i) + t.slice(j); };
  let t = js.replace(/ *var CFG = W\.__cfg \|\| \{\};\r?\n/, "").replace(/ *var DL = \(W\.dataLayer = W\.dataLayer \|\| \[\]\);\r?\n/, "");
  t = cut(t, "  function uuid()", "  function readSearch");
  t = cut(t, "  function targetKind", "})();");
  return t.replace("/* tracker 1.0.0 — captura de clique delegada + atribuição (Meta/Google) */", "/* tracker 1.0.0 — só atribuição (utm/gclid/fbclid -> __attrib) */");
}
