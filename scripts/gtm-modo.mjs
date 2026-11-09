// Interruptor GTM: arquivo w-lst-paginas/GTM_MODO (com|sem); env GTM_MODO sobrescreve numa execução. Outro valor aborta.
// CLI: `node scripts/gtm-modo.mjs` imprime o modo (ou sai 1).
import fs from "node:fs";
import path from "node:path";
export const ARQUIVO = path.resolve(import.meta.dirname, "../w-lst-paginas/GTM_MODO");
export function lerModo(env = process.env, arquivo = ARQUIVO) {
  const v = env.GTM_MODO !== undefined ? env.GTM_MODO : fs.readFileSync(arquivo, "utf8").trim();
  if (v !== "com" && v !== "sem") throw new Error(`GTM_MODO invalido: "${v}" (use com|sem)`);
  return v;
}
if (import.meta.url === `file://${process.argv[1]}`) {
  try { console.log(lerModo()); } catch (e) { console.error("ABORTADO: " + e.message); process.exit(1); }
}
