// Inscrição do webinário INUP: valida, repassa ao quiz-intake do megacrm e,
// se falhar, guarda no KV e reenvia pelo cron. Segredo só em env (secret).
const SLUG = "col-inup-cap01-web01";
const TAG = "reforma-29-10-inscrito";
const DEAL_STAGE_ID = "c8ee6cd8-a35f-4c85-9258-1282cb2fcda7";
const MAX_ATTEMPTS = 50;
const TTL = 60 * 60 * 24 * 14;
const ORIGINS = new Set(["https://leandrostecca.com.br", "https://www.leandrostecca.com.br"]);

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json", "Cache-Control": "no-store" } });

export function normalizePhone(raw) {
  let d = String(raw || "").replace(/\D/g, "");
  if (d.startsWith("55") && d.length >= 12) d = d.slice(2);
  return d.length === 10 || d.length === 11 ? "+55" + d : null;
}

export function cleanUtms(params) {
  const out = {};
  if (!params || typeof params !== "object" || Array.isArray(params)) return out;
  for (const [k, v] of Object.entries(params)) {
    if (Object.keys(out).length >= 30) break;
    if (!/^[A-Za-z0-9_]{1,64}$/.test(k)) continue;
    if (typeof v !== "string" && typeof v !== "number") continue;
    const s = String(v).trim().slice(0, 500);
    if (s) out[k.toLowerCase()] = s;
  }
  return out;
}

async function eventId(phone) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(`${SLUG}|${phone}`));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("").slice(0, 32);
}

export async function buildPayload(body) {
  const name = String(body.nome ?? body.name ?? "").trim();
  const email = String(body.email ?? "").trim().toLowerCase();
  const phone = normalizePhone(body.telefone ?? body.phone);
  if (name.length < 2 || name.length > 120) return { error: "nome" };
  if (!/^[^\s@]{1,64}@[^\s@]+\.[^\s@]{2,}$/.test(email) || email.length > 160) return { error: "email" };
  if (!phone) return { error: "telefone" };
  return {
    payload: {
      phone, email, name,
      quiz_slug: SLUG, form_id: SLUG,
      tags: [TAG], tag_only: true,
      deal_stage_id: DEAL_STAGE_ID,
      skip_group_alert: true,
      utms: cleanUtms(body.params),
      event_id: await eventId(phone),
    },
  };
}

// Devolve { ok, status, error } — status é o HTTP do quiz-intake (nunca o segredo).
async function send(env, payload) {
  if (!env.CRM_QUIZ_INTAKE_URL || !env.CRM_QUIZ_INTAKE_SECRET) return { ok: false, error: "sem_secret_ou_url" };
  try {
    const r = await fetch(env.CRM_QUIZ_INTAKE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-QUIZ-SECRET": env.CRM_QUIZ_INTAKE_SECRET },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(8000),
    });
    if (r.ok) return { ok: true, status: r.status };
    const resp = (await r.text().catch(() => "")).slice(0, 200);
    return { ok: false, status: r.status, resp };
  } catch (e) {
    return { ok: false, error: String(e && e.name ? e.name : e).slice(0, 60) };
  }
}

export async function handleInscricao(request, env) {
  if (request.method !== "POST") return json({ ok: false }, 405);
  const origin = request.headers.get("Origin");
  if (origin && !ORIGINS.has(origin)) return json({ ok: false }, 403);
  const raw = await request.text();
  if (raw.length > 16384) return json({ ok: false }, 413);
  let body;
  try { body = JSON.parse(raw); } catch { return json({ ok: false, error: "json" }, 400); }
  if (body && body.website) return json({ ok: true }); // honeypot
  const { payload, error } = await buildPayload(body || {});
  if (error) return json({ ok: false, error }, 400);

  const res = await send(env, payload);
  if (res.ok) return json({ ok: true });
  // Não perde o lead: guarda e o cron reenvia (mesmo event_id, sem duplicar).
  await env.INSCRICOES.put(`pend:${payload.event_id}`, JSON.stringify({ payload, attempts: 1, last: { status: res.status, error: res.error, resp: res.resp, at: new Date().toISOString() } }), { expirationTtl: TTL });
  return json({ ok: true, queued: true }, 202);
}

export async function retryPending(env) {
  const { keys } = await env.INSCRICOES.list({ prefix: "pend:", limit: 100 });
  for (const { name } of keys) {
    const raw = await env.INSCRICOES.get(name);
    if (!raw) continue;
    const item = JSON.parse(raw);
    const res = await send(env, item.payload);
    item.last = { status: res.status, error: res.error, resp: res.resp, at: new Date().toISOString() };
    if (res.ok) {
      await env.INSCRICOES.delete(name);
    } else if (item.attempts + 1 >= MAX_ATTEMPTS) {
      await env.INSCRICOES.put(`dead:${name.slice(5)}`, raw, { expirationTtl: TTL });
      await env.INSCRICOES.delete(name);
    } else {
      await env.INSCRICOES.put(name, JSON.stringify({ ...item, attempts: item.attempts + 1 }), { expirationTtl: TTL });
    }
  }
}
