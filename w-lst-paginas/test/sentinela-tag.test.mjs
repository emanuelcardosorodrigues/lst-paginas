// node --test w-lst-paginas/test/*.test.mjs  (precisa de miniflare: devDependency)
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { Miniflare } from "miniflare";

const lib = readFileSync(new URL("../src/sentinela-tag.js", import.meta.url), "utf8");
const harness = `import { withSentinelaTag } from "./sentinela-tag.js";
export default { fetch(req, env) {
  const p = new URL(req.url).pathname;
  const h = { "content-type": "text/html; charset=utf-8" };
  const pages = {
    "/html": "<html><head><title>a</title></head><body>x</body></html>",
    "/dup": '<html><head><script async src="https://track.leandrostecca.com.br/api/t/tracker.js?tid=abc"></script></head><body>x</body></html>',
  };
  if (p === "/json") return withSentinelaTag(new Response('{"head":"</head>"}', { headers: { "content-type": "application/json" } }), env);
  if (p === "/404") return withSentinelaTag(new Response(pages["/html"], { status: 404, headers: h }), env);
  return withSentinelaTag(new Response(pages[p], { headers: h }), env);
} };`;

async function run(bindings, path) {
  const mf = new Miniflare({
    modules: [{ type: "ESModule", path: "w.mjs", contents: harness }, { type: "ESModule", path: "sentinela-tag.js", contents: lib }],
    compatibilityDate: "2026-04-22", bindings,
  });
  try { const r = await mf.dispatchFetch("http://x" + path); return { r, t: await r.text() }; } finally { await mf.dispose(); }
}
const ON = { SENTINELA_TAG: "1", SENTINELA_TID: "abc" };
const count = (t) => (t.match(/\/api\/t\/tracker\.js/g) || []).length;

test("injeta uma vez no head", async () => {
  const { t } = await run(ON, "/html");
  assert.equal(count(t), 1);
  assert.match(t, /tid=abc"><\/script><\/head>/);
});
test("nao duplica se a pagina ja tem a tag", async () => assert.equal(count((await run(ON, "/dup")).t), 1));
test("ignora nao-HTML", async () => assert.equal((await run(ON, "/json")).t, '{"head":"</head>"}'));
test("ignora resposta nao-ok", async () => assert.equal(count((await run(ON, "/404")).t), 0));
test("interruptor desligado nao injeta", async () => {
  assert.equal(count((await run({ ...ON, SENTINELA_TAG: "0" }, "/html")).t), 0);
  assert.equal(count((await run({ SENTINELA_TID: "abc" }, "/html")).t), 0);
});
