import fs from "node:fs";
import path from "node:path";

const origin = "https://leandrostecca.com.br";
const outputDir = path.resolve(import.meta.dirname, "../dist");
const roots = [
  "dpl-pv01",
  "dpl-pv02",
  "kal-pv01",
  "kal-pv02",
  "kal-pv03",
  "kal-pv04",
  "kal-pv05",
  "kal-pv06",
  "kal-pv07",
  "lps-pv01",
  "lps-pvia02",
  "lps-pvia05",
  "lps-pvia06",
  "plo-pv01",
  "plo-pv02",
  "plo-pv03",
  "plo-pv04",
  "plo-up01",
  "plo-dw01",
  "plo-teste",
  "plo-testeup",
  "pda-pv01",
  "col-pvia01",
  "col-pvia02",
  "col-pvia03",
  "col-pvia04",
  "col-pvia05",
  "col-web01",
  "col-cap01-web01",
];
const textExtensions = new Set([".html", ".css", ".js", ".mjs", ".json", ".svg"]);
const queue = [];
const queued = new Set();
const fetched = new Set();

function localPath(url) {
  if (url.origin !== origin || !url.pathname.startsWith("/p/")) return null;
  const relative = decodeURIComponent(url.pathname.slice(3));
  if (!relative || relative.includes("..")) return null;
  if (relative.endsWith("/")) return `${relative}index.html`;
  // A bare page URL and its trailing-slash version resolve to index.html.
  return path.extname(relative) ? relative : `${relative}/index.html`;
}

function enqueue(url) {
  url.hash = "";
  const filePath = localPath(url);
  if (!filePath || queued.has(filePath) || fetched.has(filePath)) return;
  queued.add(filePath);
  queue.push({ url, filePath });
}

function discoverUrls(baseUrl, text) {
  const candidates = new Set();
  const absoluteOrRoot = /(?:https:\/\/leandrostecca\.com\.br)?\/p\/[A-Za-z0-9_./%-]+/g;
  const quotedAsset = /["']([^"'\s]+\.(?:avif|css|gif|ico|jpe?g|js|json|mjs|png|svg|webp|woff2?)(?:\?[^"']*)?)["']/gi;
  const cssAsset = /url\(\s*['"]?([^'"\s)]+)['"]?\s*\)/gi;

  for (const match of text.matchAll(absoluteOrRoot)) candidates.add(match[0]);
  for (const match of text.matchAll(quotedAsset)) candidates.add(match[1]);
  for (const match of text.matchAll(cssAsset)) {
    // JS can contain calls such as new URL(a.href); those are not assets.
    if (/^(?:\.|\/|https?:)/.test(match[1])) candidates.add(match[1]);
  }

  for (const candidate of candidates) {
    if (candidate.startsWith("data:") || candidate.startsWith("#")) continue;
    try { enqueue(new URL(candidate, baseUrl)); } catch { /* malformed reference */ }
  }
}

async function fetchWithRetry(url) {
  let lastError;
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      const response = await fetch(url, { redirect: "follow" });
      if (response.ok || response.status === 404) return response;
      throw new Error(`HTTP ${response.status}`);
    } catch (error) {
      lastError = error;
      if (attempt < 3) await new Promise((resolve) => setTimeout(resolve, 250 * attempt));
    }
  }
  throw lastError;
}

for (const root of roots) enqueue(new URL(`/p/${root}/`, origin));
fs.rmSync(outputDir, { recursive: true, force: true });
fs.mkdirSync(outputDir, { recursive: true });

while (queue.length > 0) {
  const { url, filePath } = queue.shift();
  queued.delete(filePath);
  if (fetched.has(filePath)) continue;

  const response = await fetchWithRetry(url);
  if (!response.ok) {
    // Keep the deployment faithful to production: some old HTML files still
    // reference optional assets that no longer exist on the live Worker.
    if (response.status === 404) {
      console.warn(`Asset opcional ausente em produção: ${url.pathname}`);
      fetched.add(filePath);
      continue;
    }
    throw new Error(`${response.status} ao espelhar ${url.pathname}`);
  }
  const buffer = Buffer.from(await response.arrayBuffer());
  const destination = path.join(outputDir, filePath);
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.writeFileSync(destination, buffer);
  fetched.add(filePath);

  if (textExtensions.has(path.extname(filePath).toLowerCase())) {
    discoverUrls(url, buffer.toString("utf8"));
  }
}

fs.copyFileSync(path.resolve(import.meta.dirname, "../public/_headers"), path.join(outputDir, "_headers"));
console.log(`Espelhados ${fetched.size} arquivos atuais em dist/.`);
