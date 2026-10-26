import fs from "node:fs";

const accountId = "21e4875f53338100ee74196613471f21";
const workerName = "w-lst-paginas";
const origin = "https://leandrostecca.com.br";
const sourceSlug = "col-pvia07";
const targetSlug = "col-pvia07-ck-hba";
const sourceCheckout = "https://leandrostecca.com.br/r/check/tob-micha-0807";
const targetCheckout = "https://leandrostecca.com.br/r/check/col-tck-hba";
const token = process.env.CLOUDFLARE_API_TOKEN;

if (!token) throw new Error("CLOUDFLARE_API_TOKEN ausente.");

const api = `https://api.cloudflare.com/client/v4/accounts/${accountId}/workers/scripts/${workerName}`;
const auth = { Authorization: `Bearer ${token}` };
const current = await fetch(api, { headers: auth });
if (!current.ok) throw new Error(`Falha ao baixar o Worker ativo: ${current.status}`);

const multipart = await current.text();
const sourceMatch = multipart.match(/name="index\.js"\r?\n\r?\n([\s\S]*?)\r?\n--/);
if (!sourceMatch) throw new Error("Módulo index.js não encontrado no Worker ativo.");

const rootSource = fs.readFileSync(new URL("./mirror-current-p-pages.mjs", import.meta.url), "utf8");
const protectedSlugs = [...rootSource.matchAll(/^\s+"([a-z0-9-]+)",$/gm)].map((match) => match[1]);

async function verifyProduction(expectClone) {
  const pages = await Promise.all(protectedSlugs.map(async (slug) => {
    const response = await fetch(`${origin}/p/${slug}/?health=${Date.now()}`, { headers: { "cache-control": "no-cache" } });
    return { slug, status: response.status };
  }));
  const failures = pages.filter((page) => page.status !== 200);
  if (!expectClone) return { protectedPages: pages.length, failures };

  const target = await fetch(`${origin}/p/${targetSlug}/?health=${Date.now()}`, { headers: { "cache-control": "no-cache" } });
  const html = await target.text();
  const asset = await fetch(`${origin}/p/${targetSlug}/mockup.webp`, { headers: { "cache-control": "no-cache" } });
  const validClone = target.status === 200
    && asset.status === 200
    && html.includes(targetCheckout)
    && html.includes(`window.__pageSlug = "${targetSlug}"`);
  return { protectedPages: pages.length, failures, targetStatus: target.status, targetAssetStatus: asset.status, validClone };
}

function assertHealthy(health, expectClone) {
  if (health.failures.length > 0 || (expectClone && !health.validClone)) {
    throw new Error(`Health check falhou: ${JSON.stringify(health)}`);
  }
}

async function publish(source) {
  const form = new FormData();
  form.set("metadata", JSON.stringify({
    main_module: "index.js",
    keep_assets: true,
    compatibility_date: "2026-04-22",
    compatibility_flags: ["nodejs_compat"],
    bindings: [{ name: "ASSETS", type: "assets" }],
  }));
  form.set("index.js", new Blob([source], { type: "application/javascript+module" }), "index.js");
  const response = await fetch(api, { method: "PUT", headers: auth, body: form });
  const result = await response.json();
  if (!response.ok || !result.success) throw new Error(`Falha ao publicar Worker: ${JSON.stringify(result.errors || result)}`);
  return result;
}

const targetBranch = `const targetSlug = ${JSON.stringify(targetSlug)};
      if (slug === targetSlug) {
        url.pathname = url.pathname.replace(${JSON.stringify(`/p/${targetSlug}`)}, ${JSON.stringify(`/${sourceSlug}`)});
        if (/^\\/[^/]+$/.test(url.pathname)) url.pathname += "/";
        const sourceResponse = await env.ASSETS.fetch(new Request(url.toString(), request));
        const contentType = sourceResponse.headers.get("content-type") || "";
        if (!contentType.includes("text/html")) return sourceResponse;

        const html = (await sourceResponse.text())
          .replaceAll(${JSON.stringify(sourceSlug)}, targetSlug)
          .replaceAll(${JSON.stringify(sourceCheckout)}, ${JSON.stringify(targetCheckout)});
        const headers = new Headers(sourceResponse.headers);
        headers.delete("content-length");
        const page = new Response(html, { status: sourceResponse.status, statusText: sourceResponse.statusText, headers });
        return new HTMLRewriter().on("head", {
          element(el) { el.prepend(sckFixScript(targetSlug), { html: true }); }
        }).transform(page);
      }
      `;
const marker = "url.pathname = url.pathname.slice(2);";
const targetAlreadyExists = sourceMatch[1].includes(targetSlug);
if (!sourceMatch[1].includes(marker)) {
  throw new Error("Worker ativo não corresponde à base esperada.");
}
const updatedSource = sourceMatch[1].replace(marker, `${targetBranch}${marker}`);

if (process.env.DEPLOY_TARGET_CLONE !== "1") {
  const health = await verifyProduction(targetAlreadyExists);
  assertHealthy(health, targetAlreadyExists);
  console.log(JSON.stringify({ mode: "dry-run", sourceBytes: sourceMatch[1].length, updatedBytes: updatedSource.length, keepAssets: true, health }));
  process.exit(0);
}

if (targetAlreadyExists) throw new Error(`A rota ${targetSlug} já está ativa; publicação bloqueada.`);

await publish(updatedSource);
try {
  const health = await verifyProduction(true);
  assertHealthy(health, true);
  console.log(JSON.stringify({ mode: "deployed", worker: workerName, keepAssets: true, health }));
} catch (error) {
  await publish(sourceMatch[1]);
  const rollbackHealth = await verifyProduction(false);
  assertHealthy(rollbackHealth, false);
  throw new Error(`Publicação revertida automaticamente: ${error.message}`);
}
