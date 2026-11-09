// Troca GTM (loader Stape/gtm.js, noscript, preconnect/dns-prefetch, comentários) pela tag Sentinela. Função pura e idempotente.
// Não toca em Pixel, gtag, Hotmart nem em dataLayer.push solto. Só remove o par de linhas pv_event_id (exato, top-level).
export const TAG = '<script async src="https://track.leandrostecca.com.br/api/t/tracker.js?tid=faafca5a-fb53-404f-8469-499d8869944c"></script>';
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
  if (!h.includes("/api/t/tracker.js")) h = h.replace(/<\/head>/i, TAG + "\n</head>");
  return h;
}
