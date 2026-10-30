// Teste simples: node scripts/test-guard-sentinela.mjs (usa só /tmp do SO, arquivos minúsculos)
import fs from "node:fs"; import os from "node:os"; import path from "node:path"; import assert from "node:assert";
import { checkSentinelaDir } from "./guard-sentinela.mjs";
const d = fs.mkdtempSync(path.join(os.tmpdir(), "gs-"));
const w = (h, marker) => { fs.writeFileSync(path.join(d, "index.html"), h); const m = path.join(d, ".placeholder"); fs.rmSync(m, { force: true }); if (marker) fs.writeFileSync(m, "x"); };
assert.deepEqual(checkSentinelaDir(path.join(d, "nao-existe")), [], "pasta ausente passa");
w('<script src="https://track.exemplo.test/api/t/tracker.js?tid=11111111-2222-4333-8444-555555555555">'); assert.deepEqual(checkSentinelaDir(d), [], "valores válidos passam");
w('<script src="https://track.exemplo.test/x?tid=00000000-0000-0000-0000-000000000000">'); assert.ok(checkSentinelaDir(d).length, "uuid zero recusa");
w('<script src="https://track.leandrostecca.com.br/api/t/tracker.js?tid=11111111-2222-4333-8444-555555555555">'); assert.ok(checkSentinelaDir(d).length, "origin placeholder recusa");
w("<p>ok</p>", true); assert.ok(checkSentinelaDir(d).length, "marcador recusa");
fs.rmSync(d, { recursive: true }); console.log("OK: 5 casos (2 passam, 3 recusam)");
