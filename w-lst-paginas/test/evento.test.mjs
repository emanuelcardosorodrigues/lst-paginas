import { test } from "node:test";
import assert from "node:assert/strict";
import worker from "../src/index.js";

const O = "https://leandrostecca.com.br", T = "AbCdEfGhIjKlMnOpQrStUv";
const ok = { t: T, event_id: `${T}:video_progress:50:0`, type: "video_progress", pct: 50, page_slug: "plo-vsl", utm_source: "meta" };
const ENV = { CRM_QUIZ_INTAKE_URL: "https://crm.example/quiz-intake", CRM_QUIZ_INTAKE_SECRET: "s3cr3t-test", SENTINELA_TAG: "0", ASSETS: { fetch: async () => new Response("ok") } };

async function call(body, { env = ENV, origin = O, method = "POST", raw, up = 200 } = {}) {
  const calls = [], pend = [];
  const orig = globalThis.fetch;
  globalThis.fetch = async (u, init) => { calls.push({ u, init }); return new Response("{}", { status: up }); };
  try {
    const r = await worker.fetch(new Request(O + "/p/_evt", { method, headers: origin ? { Origin: origin } : {}, body: method === "POST" ? raw ?? JSON.stringify(body) : undefined }), env, { waitUntil: (p) => pend.push(p) });
    await Promise.all(pend);
    return { r, calls, txt: await r.clone().text() };
  } finally { globalThis.fetch = orig; }
}

test("evento válido: 202, segredo no header, mode e token repassados", async () => {
  const { r, calls } = await call(ok);
  assert.equal(r.status, 202);
  assert.equal(r.headers.get("access-control-allow-origin"), O);
  assert.equal(calls.length, 1);
  assert.equal(calls[0].init.headers["X-QUIZ-SECRET"], "s3cr3t-test");
  assert.deepEqual(JSON.parse(calls[0].init.body), { mode: "pagina_evento", token: T, event_id: ok.event_id, type: "video_progress", page_slug: "plo-vsl", pct: 50, utm_source: "meta" });
});

test("page_view sem pct passa; sem token não repassa (204)", async () => {
  assert.equal((await call({ ...ok, type: "page_view", pct: undefined })).r.status, 202);
  const { r, calls } = await call({ ...ok, t: undefined });
  assert.equal(r.status, 204); assert.equal(calls.length, 0);
});

for (const [nome, b] of [
  ["type desconhecido", { ...ok, type: "x" }], ["pct fora", { ...ok, pct: 101 }], ["pct ausente em progress", { ...ok, pct: undefined }],
  ["pct string", { ...ok, pct: "50" }], ["campo extra", { ...ok, secret: "x" }], ["token curto", { ...ok, t: "abc" }],
  ["token não-string", { ...ok, t: 123 }], ["event_id ruim", { ...ok, event_id: "a b" }], ["slug ruim", { ...ok, page_slug: "../x" }],
  ["utm longa", { ...ok, utm_source: "a".repeat(201) }], ["array", [ok]], ["occurred_at lixo", { ...ok, occurred_at: "ontem" }],
]) test(`rejeita ${nome} (400, sem repasse)`, async () => { const { r, calls } = await call(b); assert.equal(r.status, 400); assert.equal(calls.length, 0); });

test("JSON quebrado 400; corpo > 2 KB 413", async () => {
  assert.equal((await call(null, { raw: "{" })).r.status, 400);
  const g = await call(null, { raw: JSON.stringify({ ...ok, utm_term: "a".repeat(3000) }) });
  assert.equal(g.r.status, 413); assert.equal(g.calls.length, 0);
});

test("sem segredo ou sem URL: 503 sem vazar nada", async () => {
  for (const env of [{ ...ENV, CRM_QUIZ_INTAKE_SECRET: undefined }, { ...ENV, CRM_QUIZ_INTAKE_URL: undefined }]) {
    const { r, calls, txt } = await call(ok, { env });
    assert.equal(r.status, 503); assert.equal(calls.length, 0);
    assert.ok(!txt.includes("crm.example") && !txt.includes("s3cr3t") && !txt.includes("QUIZ"));
  }
});

test("CORS: só o domínio da página", async () => {
  for (const origin of ["https://evil.example", null, "https://leandrostecca.com.br.evil.example"]) {
    const { r, calls } = await call(ok, { origin });
    assert.equal(r.status, 403); assert.equal(r.headers.get("access-control-allow-origin"), null); assert.equal(calls.length, 0);
  }
  assert.equal((await call(ok, { origin: "https://www.leandrostecca.com.br" })).r.headers.get("access-control-allow-origin"), "https://www.leandrostecca.com.br");
  const pre = await call(null, { method: "OPTIONS" });
  assert.equal(pre.r.status, 204); assert.equal(pre.r.headers.get("access-control-allow-origin"), O);
  assert.equal((await call(null, { method: "OPTIONS", origin: "https://evil.example" })).r.status, 403);
  assert.equal((await call(null, { method: "GET" })).r.status, 405);
});

test("falha silenciosa: 5xx tenta 2x e a página recebe 202; 401 descarta (1x); exceção não vaza", async () => {
  const a = await call(ok, { up: 500 }); assert.equal(a.r.status, 202); assert.equal(a.calls.length, 2);
  const b = await call(ok, { up: 401 }); assert.equal(b.r.status, 202); assert.equal(b.calls.length, 1);
  const orig = globalThis.fetch; globalThis.fetch = async () => { throw new Error("boom"); };
  try {
    const pend = [];
    const r = await worker.fetch(new Request(O + "/p/_evt", { method: "POST", headers: { Origin: O }, body: JSON.stringify(ok) }), ENV, { waitUntil: (p) => pend.push(p) });
    await Promise.all(pend); assert.equal(r.status, 202);
  } finally { globalThis.fetch = orig; }
});

test("/p/_evt não cai no redirect de barra final", async () => {
  const { r } = await call(ok); assert.notEqual(r.status, 301);
});
