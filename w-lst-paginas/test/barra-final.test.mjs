// Regressão: barra final com query não pode virar loop (?fbclid=x → ?fbclid=x/ → …).
// Importa o Worker real, sem dependência: `node --test w-lst-paginas/test/barra-final.test.mjs`.
// Controle negativo (09/11/2026): o código antigo (`toString() + "/"`) falha 7 destes casos.
import { test } from "node:test";
import assert from "node:assert/strict";
import worker from "../src/index.js";

const env = { SENTINELA_TAG: "0", ASSETS: { fetch: async () => new Response("ok") } };
const O = "https://leandrostecca.com.br";

// Segue até 5 redirects como o navegador.
async function go(path) {
  let url = O + path, n = 0, r;
  while ((r = await worker.fetch(new Request(url), env, { waitUntil() {} })).status >= 300 && r.status < 400 && n <= 5) {
    n++; url = new URL(r.headers.get("location"), url).href;
  }
  return { status: r.status, n, path: url.slice(O.length) };
}

const S = "/p/col-cap01-virada";
for (const [inp, out] of [
  [S, S + "/"],
  [S + "?fbclid=x", S + "/?fbclid=x"],
  [S + "?utm_source=a&utm_content=b", S + "/?utm_source=a&utm_content=b"],
  [S + "?a=1&b=2", S + "/?a=1&b=2"],
  [S + "?", S + "/?"],
  ["/p/nao-existe?fbclid=x", "/p/nao-existe/?fbclid=x"],
  ["/p/COL-CAP01-VIRADA?fbclid=x", "/p/COL-CAP01-VIRADA/?fbclid=x"],
]) test(`${inp} -> 1 redirect para ${out}`, async () => assert.deepEqual(await go(inp), { status: 200, n: 1, path: out }));

for (const p of [S + "/", S + "/?fbclid=x", S + "/?utm_source=a&utm_content=b", "/p/favicon.ico",
  S + "/assets/app.js?v=1", "/p", "/p/"])
  test(`${p} -> 0 redirects`, async () => assert.deepEqual(await go(p), { status: 200, n: 0, path: p }));

// WP 1.4 (13/11/2026): col-pvia04 com query, e slug inexistente = 404 normal (sem loop, sem redirect extra).
const ok04 = (r) => new URL(r.url).pathname.startsWith("/col-pvia04/");
const env404 = { SENTINELA_TAG: "0", ASSETS: { fetch: async (r) => new Response(ok04(r) ? "ok" : "nf", { status: ok04(r) ? 200 : 404 }) } };
async function go404(path) {
  let url = O + path, n = 0, r;
  while ((r = await worker.fetch(new Request(url), env404, { waitUntil() {} })).status >= 300 && r.status < 400 && n <= 5) { n++; url = new URL(r.headers.get("location"), url).href; }
  return { status: r.status, n };
}
for (const [p, e] of [
  ["/p/col-pvia04?utm_source=x", { status: 200, n: 1 }], ["/p/col-pvia04/?utm_source=x", { status: 200, n: 0 }],
  ["/p/col-pvia04", { status: 200, n: 1 }], ["/p/col-pvia04/", { status: 200, n: 0 }],
  ["/p/nao-existe", { status: 404, n: 1 }], ["/p/nao-existe/?utm_source=x", { status: 404, n: 0 }],
]) test(`404/col-pvia04: ${p}`, async () => assert.deepEqual(await go404(p), e));
