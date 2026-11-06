// Injeta a tag do Sentinela (tracker.js) no <head> de toda resposta HTML 200, uma vez só.
// Interruptor: SENTINELA_TAG = "1" liga; qualquer outro valor (ou ausente) desliga, sem novo código (só vars + deploy).
// Idempotente: se a página já traz um script /api/t/tracker.js, não injeta (flag vista antes de </head>).
// shortcut: tag fora do <head> (ex.: só no body) não é vista e duplicaria; hoje as páginas com tag a têm no head.
const TRACKER_PATH = "/api/t/tracker.js";

export function withSentinelaTag(res, env) {
  const tid = env.SENTINELA_TID;
  const origin = env.SENTINELA_TRACKER_ORIGIN || "https://track.leandrostecca.com.br";
  if (env.SENTINELA_TAG !== "1" || !tid || !res.ok) return res;
  if (!(res.headers.get("content-type") || "").includes("text/html")) return res;
  const tag = `<script async src="${origin}${TRACKER_PATH}?tid=${encodeURIComponent(tid)}"></script>`;
  let has = false;
  return new HTMLRewriter()
    .on(`script[src*="${TRACKER_PATH}"]`, { element() { has = true; } })
    .on("head", { element(el) { el.onEndTag((end) => { if (!has) end.before(tag, { html: true }); }); } })
    .transform(res);
}
