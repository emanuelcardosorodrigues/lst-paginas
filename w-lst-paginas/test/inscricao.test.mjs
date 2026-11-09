import { test } from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { buildPayload, handleInscricao } from "../src/inscricao.js";

const V = "col-cap01-virada", I = "col-inup-cap01-web01";
const base = { nome: "Ana Lima", telefone: "(35) 99999-1234", params: { utm_source: "ig" } };
const eid = (s) => createHash("sha256").update(`${s}|+5535999991234`).digest("hex").slice(0, 32);

test("virada com sobra", async () => {
  const { payload } = await buildPayload({ ...base, faturamento: "15-35", sobra: "nao-sei" }, V);
  assert.deepEqual(payload, { phone: "+5535999991234", name: "Ana Lima", quiz_slug: V, form_id: V, tag_only: true, skip_group_alert: true, utms: { utm_source: "ig" }, event_id: eid(V), tags: ["virada-inscrito", "virada-fat-15-35", "virada-sobra-nao-sei"], qualificacao: { faturamento: "R$ 15–35 mil", sobra: "Não sei" } });
  assert.ok(!("deal_stage_id" in payload) && !("email" in payload));
});

test("virada sem sobra, com email opcional", async () => {
  const { payload } = await buildPayload({ ...base, faturamento: "70mais", sobra: "", email: "A@B.com" }, V);
  assert.deepEqual(payload.tags, ["virada-inscrito", "virada-fat-70mais"]);
  assert.deepEqual(payload.qualificacao, { faturamento: "Acima de R$ 70 mil" });
  assert.equal(payload.email, "a@b.com");
  assert.equal((await buildPayload({ ...base, faturamento: "70mais", email: "ruim" }, V)).error, "email");
});

test("virada rejeita inválidos", async () => {
  assert.equal((await buildPayload({ ...base }, V)).error, "faturamento");
  assert.equal((await buildPayload({ ...base, faturamento: "x" }, V)).error, "faturamento");
  assert.equal((await buildPayload({ ...base, faturamento: "ate15", sobra: "x" }, V)).error, "sobra");
  assert.equal((await buildPayload({ ...base, faturamento: "ate15", telefone: "123" }, V)).error, "telefone");
});

test("INUP: email obrigatório e payload idêntico ao antigo", async () => {
  assert.equal((await buildPayload({ ...base }, I)).error, "email");
  const { payload } = await buildPayload({ ...base, email: "Ana@x.com", faturamento: "ate15" }, I);
  assert.deepEqual(payload, { phone: "+5535999991234", email: "ana@x.com", name: "Ana Lima", quiz_slug: I, form_id: I, tags: ["reforma-29-10-inscrito"], tag_only: true, deal_stage_id: "c8ee6cd8-a35f-4c85-9258-1282cb2fcda7", skip_group_alert: true, utms: { utm_source: "ig" }, event_id: eid(I) });
});

test("handler: 400 com error", async () => {
  const r = await handleInscricao(new Request("https://x/", { method: "POST", body: JSON.stringify({ ...base, faturamento: "zz" }) }), {}, V);
  assert.equal(r.status, 400);
  assert.equal((await r.json()).error, "faturamento");
});
