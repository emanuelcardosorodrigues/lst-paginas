const accountId = "21e4875f53338100ee74196613471f21";
const workerName = "w-lst-paginas";
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
if (!sourceMatch[1].includes(marker) || sourceMatch[1].includes(targetSlug)) {
  throw new Error("Worker ativo não corresponde à base esperada.");
}
const updatedSource = sourceMatch[1].replace(marker, `${targetBranch}${marker}`);

if (process.env.DEPLOY_TARGET_CLONE !== "1") {
  console.log(JSON.stringify({ mode: "dry-run", sourceBytes: sourceMatch[1].length, updatedBytes: updatedSource.length, keepAssets: true }));
  process.exit(0);
}

const form = new FormData();
form.set("metadata", JSON.stringify({
  main_module: "index.js",
  keep_assets: true,
  compatibility_date: "2026-04-22",
  compatibility_flags: ["nodejs_compat"],
  bindings: [{ name: "ASSETS", type: "assets" }],
}));
form.set("index.js", new Blob([updatedSource], { type: "application/javascript" }), "index.js");

const deployed = await fetch(api, { method: "PUT", headers: auth, body: form });
const result = await deployed.json();
if (!deployed.ok || !result.success) {
  throw new Error(`Falha ao publicar Worker: ${JSON.stringify(result.errors || result)}`);
}
console.log(JSON.stringify({ mode: "deployed", worker: workerName, version: result.result?.id, keepAssets: true }));
