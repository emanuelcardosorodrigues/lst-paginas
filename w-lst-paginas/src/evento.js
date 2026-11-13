// Relay de eventos de página (WP 1.3b): POST /p/_evt -> quiz-intake mode "pagina_evento".
// Contrato: megacrm/docs/agente-plo/contrato-pagina-evento.md. O segredo (CRM_QUIZ_INTAKE_SECRET, secret
// do Worker) só existe aqui; nada é gravado; o token nunca é logado; falha do upstream não afeta a página.
const ORIGINS = new Set(["https://leandrostecca.com.br", "https://www.leandrostecca.com.br"]);
const TYPES = new Set(["page_view", "video_play", "video_progress", "offer_reached", "cta_click", "checkout_open"]);
const UTMS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];
const FIELDS = new Set(["token", "t", "event_id", "type", "pct", "page_slug", "occurred_at", ...UTMS]);
const MAX_BODY = 2048;

const reply = (status, origin, body) => new Response(body ? JSON.stringify(body) : null, {
  status,
  headers: {
    "Cache-Control": "no-store",
    ...(body && { "Content-Type": "application/json" }),
    ...(origin && ORIGINS.has(origin) && { "Access-Control-Allow-Origin": origin, Vary: "Origin" }),
  },
});

// Devolve { payload } ou { error }.
export function validateEvento(b) {
  if (!b || typeof b !== "object" || Array.isArray(b)) return { error: "corpo" };
  for (const k of Object.keys(b)) if (!FIELDS.has(k)) return { error: "campo:" + k.slice(0, 20) };
  const token = b.token ?? b.t;
  if (token !== undefined && !(typeof token === "string" && /^[A-Za-z0-9_-]{22}$/.test(token))) return { error: "token" };
  if (typeof b.type !== "string" || !TYPES.has(b.type)) return { error: "type" };
  if (typeof b.event_id !== "string" || !/^[A-Za-z0-9._:-]{1,120}$/.test(b.event_id)) return { error: "event_id" };
  if (typeof b.page_slug !== "string" || !/^[a-z0-9][a-z0-9-]{0,79}$/.test(b.page_slug)) return { error: "page_slug" };
  const p = { mode: "pagina_evento", token, event_id: b.event_id, type: b.type, page_slug: b.page_slug };
  if (b.type === "video_progress") {
    if (!Number.isInteger(b.pct) || b.pct < 0 || b.pct > 100) return { error: "pct" };
    p.pct = b.pct;
  }
  for (const k of UTMS) {
    if (b[k] === undefined) continue;
    if (typeof b[k] !== "string" || b[k].length > 200) return { error: k };
    p[k] = b[k];
  }
  if (b.occurred_at !== undefined) {
    if (typeof b.occurred_at !== "string" || b.occurred_at.length > 40 || Number.isNaN(Date.parse(b.occurred_at))) return { error: "occurred_at" };
    p.occurred_at = b.occurred_at;
  }
  return { payload: p };
}

// 5xx/rede: 1 nova tentativa; 2xx/4xx (inclui 401 de token inválido): descarta.
async function forward(env, payload) {
  for (let i = 0; i < 2; i++) {
    try {
      const r = await fetch(env.CRM_QUIZ_INTAKE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-QUIZ-SECRET": env.CRM_QUIZ_INTAKE_SECRET },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(4000),
      });
      if (r.status < 500) return;
    } catch { /* tenta de novo */ }
  }
}

export async function handleEvento(request, env, ctx) {
  const origin = request.headers.get("Origin");
  const permitido = !!origin && ORIGINS.has(origin);
  if (request.method === "OPTIONS") {
    return new Response(null, { status: permitido ? 204 : 403, headers: permitido
      ? { "Access-Control-Allow-Origin": origin, "Access-Control-Allow-Methods": "POST", "Access-Control-Allow-Headers": "Content-Type", "Access-Control-Max-Age": "86400", Vary: "Origin" } : {} });
  }
  if (request.method !== "POST") return reply(405, origin);
  if (!permitido) return reply(403, origin);
  if (!env.CRM_QUIZ_INTAKE_URL || !env.CRM_QUIZ_INTAKE_SECRET) return reply(503, origin, { ok: false });
  const raw = await request.text();
  if (raw.length > MAX_BODY) return reply(413, origin, { ok: false });
  let body;
  try { body = JSON.parse(raw); } catch { return reply(400, origin, { ok: false, error: "json" }); }
  const { payload, error } = validateEvento(body);
  if (error) return reply(400, origin, { ok: false, error });
  if (!payload.token) return reply(204, origin); // sem ?t= não há contato a ligar
  ctx.waitUntil(forward(env, payload));
  return reply(202, origin, { ok: true });
}
