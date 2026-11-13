import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";
import worker from "../src/index.js";

const src = readFileSync(new URL("../../snippets/pagina-evt.js", import.meta.url), "utf8");
const T = "AbCdEfGhIjKlMnOpQrStUv";

function run(search, pathname = "/p/plo-vsl/") {
  const sent = [], lis = {};
  const ctx = {
    URLSearchParams, Blob, JSON, Date, setInterval: () => 0, clearInterval() {}, fetch: async () => ({}),
    location: { search, pathname },
    sessionStorage: { getItem: () => null, setItem() {} },
    navigator: { sendBeacon: (u, b) => { sent.push([u, b]); return true; } },
    document: { querySelector: () => null, addEventListener: (e, f) => { lis[e] = f; } },
  };
  ctx.window = ctx; vm.runInNewContext(src, ctx);
  return { sent, lis, ctx };
}
const bodies = async (s) => Promise.all(s.map(async ([, b]) => JSON.parse(await b.text())));

test("com ?t= e utm: envia page_view para /p/_evt e o relay real aceita o corpo", async () => {
  const { sent } = run(`?t=${T}&utm_source=meta&x=1`);
  assert.equal(sent.length, 1); assert.equal(sent[0][0], "/p/_evt");
  const [b] = await bodies(sent);
  assert.equal(b.type, "page_view"); assert.equal(b.utm_source, "meta"); assert.equal(b.x, undefined);
  const env = { CRM_QUIZ_INTAKE_URL: "https://crm.example/q", CRM_QUIZ_INTAKE_SECRET: "k", ASSETS: { fetch: async () => new Response("") } };
  const orig = globalThis.fetch; globalThis.fetch = async () => new Response("{}"); const pend = [];
  try {
    const r = await worker.fetch(new Request("https://leandrostecca.com.br/p/_evt", { method: "POST", headers: { Origin: "https://leandrostecca.com.br" }, body: JSON.stringify(b) }), env, { waitUntil: (p) => pend.push(p) });
    assert.equal(r.status, 202); await Promise.all(pend);
  } finally { globalThis.fetch = orig; }
});

test("cliques: checkout_open repete com event_id distinto; sem token nada é enviado", async () => {
  const { sent, lis } = run(`?t=${T}`);
  const el = { closest: () => null, matches: () => false, getAttribute: () => "https://pay.hotmart.com/X" };
  lis.click({ target: { closest: () => el } }); lis.click({ target: { closest: () => el } });
  const b = await bodies(sent);
  assert.deepEqual(b.map((x) => x.type), ["page_view", "checkout_open", "checkout_open"]);
  assert.notEqual(b[1].event_id, b[2].event_id);
  assert.equal(run("").sent.length, 0);
  assert.equal(run("?t=curto").sent.length, 0);
});
