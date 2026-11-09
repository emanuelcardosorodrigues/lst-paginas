import test from "node:test";
import assert from "node:assert/strict";
import { transform, TAG } from "./gtm-to-sentinela.mjs";
import { lerModo } from "./gtm-modo.mjs";
const PIXEL = `<script>!function(f,b,e,v,n,t,s){n=f.fbq=function(){};}(window,document);fbq('init','1');fbq('track','PageView');</script>`;
const OTHER = `<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('config','G-1')</script>`;
const GTM = `<!-- Google Tag Manager -->
    <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s);j.async=true;j.src="https://ts.leandrostecca.com.br/x.js?"+i;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','abc');</script>
    <!-- End Google Tag Manager -->`;
const page = (head, body = "") => `<!doctype html><html><head>\n${head}\n</head><body>${body}</body></html>`;
const count = (h, s) => h.split(s).length - 1;
test("remove GTM/Stape e preserva Pixel e demais scripts byte a byte", () => {
  const src = page(`<link rel="preconnect" href="https://ts.leandrostecca.com.br" crossorigin>\n<!-- www.googletagmanager SEM crossorigin -->\n<link rel="preconnect" href="https://www.googletagmanager.com">\n${PIXEL}\n${GTM}\n${OTHER}`,
    `<noscript><iframe src="https://ts.leandrostecca.com.br/ns.html?id=GTM-X" height="0"></iframe></noscript><noscript><img src="https://www.facebook.com/tr?id=1"></noscript>`);
  const h = transform(src);
  assert.equal(count(h, "googletagmanager"), 0);
  assert.equal(count(h, "gtm.start"), 0);
  assert.equal(count(h, "ts.leandrostecca"), 0);
  assert.equal(count(h, "GTM"), 0);
  assert.ok(h.includes(PIXEL) && h.includes(OTHER));
  assert.ok(h.includes(`<noscript><img src="https://www.facebook.com/tr?id=1"></noscript>`));
  assert.equal(count(h, "/api/t/tracker.js"), 1);
});
test("página que já tem o tracker não muda", () => {
  const src = page(`${TAG}\n${PIXEL}`);
  assert.equal(transform(src), src);
  assert.equal(count(transform(src), "/api/t/tracker.js"), 1);
});
test("sem GTM: tag entra uma vez antes de </head>", () => {
  const h = transform(page(PIXEL));
  assert.equal(count(h, "/api/t/tracker.js"), 1);
  assert.ok(h.includes(`${TAG}\n</head>`));
  assert.ok(h.includes(PIXEL));
});
test("remove o par solto pv_event_id e preserva o fbq byte a byte", () => {
  const fbq = `fbq('track','PageView',{}, { eventID: window.__pvEventID });`;
  const src = page(`${PIXEL}`, `<script>\n${fbq}\nwindow.dataLayer = window.dataLayer || [];\nwindow.dataLayer.push({ event: 'pv_event_id', pv_event_id: window.__pvEventID });\n</script>`);
  const h = transform(src);
  assert.equal(count(h, "pv_event_id"), 0);
  assert.equal(count(h, "window.dataLayer = window.dataLayer || [];"), 0);
  assert.ok(h.includes(`<script>\n${fbq}\n</script>`));
});
test("controle negativo: dataLayer de forma desconhecida não muda", () => {
  const body = `<script>window.dataLayer.push({event:"presenca_submit"})</script>`;
  const src = page("", body);
  assert.equal(transform(src), src.replace("</head>", TAG + "\n</head>"));
});
test("idempotente", () => {
  const src = page(GTM + PIXEL);
  assert.equal(transform(transform(src)), transform(src));
});
test("controle negativo: preconnect ao Stape fica se ainda é usado", () => {
  const src = page(`<link rel="preconnect" href="https://ts.leandrostecca.com.br" crossorigin>\n<script src="https://ts.leandrostecca.com.br/outro.js"></script>`);
  assert.ok(transform(src).includes('rel="preconnect" href="https://ts.leandrostecca.com.br"'));
});

// ---- remoção do código morto do GTM ----
const FBQ = `fbq('init','1');fbq('track','PageView',{}, { eventID: window.__pvEventID });`;
const parses = (js) => { try { new Function(js); return true; } catch { return false; } };
const inline = (html) => [...html.matchAll(/<script(?![^>]*\bsrc=)([^>]*)>([\s\S]*?)<\/script>/gi)].filter((m) => !/type="(?:module|application\/(?:ld\+)?json)/i.test(m[1])).map((m) => m[2]);
test("presenca_submit sai; handler em volta fica", () => {
  const src = page("", `<script>\nfunction go(){\n    submitting=true;\n    window.dataLayer=window.dataLayer||[]; window.dataLayer.push({event:"presenca_submit",aula:AULA});\n    send();\n}\n${FBQ}</script>`);
  const h = transform(src);
  assert.equal(count(h, "dataLayer"), 0);
  assert.ok(h.includes("submitting=true;\n    send();"));
  assert.ok(h.includes(FBQ));
});
test("lead_capturado (INUP) e quiz_frase/simulador (frufru01) saem sem quebrar o resto", () => {
  const src = page("", `<script>var done=function(){\n    try{(window.dataLayer=window.dataLayer||[]).push({event:"lead_capturado",pagina:SLUG})}catch(x){}\n    location.href=NEXT;\n};\nb.addEventListener("click",function(){\n      try { (window.dataLayer=window.dataLayer||[]).push({event:"quiz_frase", quiz_resposta:b.dataset.k}); } catch(e){}\n      scroll();\n});\nvar simTracked=false; document.getElementById("sim").addEventListener("input",function(){ if(simTracked) return; simTracked=true; try{(window.dataLayer=window.dataLayer||[]).push({event:"simulador_uso"})}catch(e){} });\ncalc();</script>`);
  const h = transform(src);
  assert.equal(count(h, "dataLayer") + count(h, "simTracked"), 0);
  assert.ok(h.includes("var done=function(){\n    location.href=NEXT;"));
  assert.ok(h.includes('function(){\n      scroll();'));
  assert.ok(h.includes("calc();"));
  for (const b of inline(h)) assert.ok(parses(b));
});
test("wrapper push(): chamadas e wrapper somem, nenhuma referência solta, JS ainda parseia", () => {
  const W = `function push(o){ try{ (window.dataLayer=window.dataLayer||[]).push(o); }catch(e){} }`;
  const js = `(function(){\n  var stack=[]; stack.push({event:"keep"}); T3.push(cb);\n  ${W}\n  var b=document.body, open=true;\n  b.addEventListener("click",function(){ var open=b.getAttribute("x")==="true"; b.setAttribute("x", open?"f":"t"); if(!open) push({event:"faq_abre", faq:b.textContent.trim().slice(0,60)}); });\n  document.addEventListener("click",function(ev){ var a=ev.target; var toPrice=a.getAttribute("href")==="#preco"; push({event:"cta_clique", cta_origem:a.dataset.cta||"?", cta_destino:toPrice?"preco":"checkout"});\n    if(toPrice){ ev.preventDefault(); go(); }\n  },true);\n  var seen={};\n  var so=new IntersectionObserver(function(es){ es.forEach(function(e){ var k=e.target.dataset.sec; if(e.isIntersecting && !seen[k]){ seen[k]=1; push({event:"secao_vista", secao:k}); } }); },{rootMargin:"-45% 0px -45% 0px"});\n  document.querySelectorAll("[data-sec]").forEach(function(el){ so.observe(el); });\n  push({event:"quiz_frase", quiz_resposta:1});\n})();`;
  const src = page("", `<script>${js}</script>`);
  assert.ok(parses(js));
  const h = transform(src);
  const out = inline(h)[0];
  assert.ok(parses(out));
  assert.equal(count(out, "dataLayer"), 0);
  assert.ok(!/(?<![.\w$])push\(/.test(out), "chamada solta de push()");
  assert.ok(out.includes('stack.push({event:"keep"}); T3.push(cb);'), "push de array não é tocado");
  assert.ok(out.includes("if(toPrice){ ev.preventDefault(); go(); }"));
});
test("controle negativo: wrapper com chamada de forma desconhecida fica inteiro (sem referência solta)", () => {
  const W = `function push(o){ try{ (window.dataLayer=window.dataLayer||[]).push(o); }catch(e){} }`;
  const body = `<script>${W}\nvar ev={event:"x"}; push(ev);</script>`;
  const h = transform(page("", body));
  assert.ok(h.includes(W) && h.includes("push(ev);"));
});
test("wrapper dl() (virada): if(push)dl(...) e dl(...) soltos saem", () => {
  const js = `function dl(o){try{(window.dataLayer=window.dataLayer||[]).push(o)}catch(x){}}\nfunction irPara(n,push){\n  foco();\n  if(push)dl({event:"form_etapa",etapa:n,pagina:SLUG});\n}\nfunction abrir(){\n  aberto=true;dl({event:"form_aberto",pagina:SLUG});irPara(etapa,true);\n}\nvar done=function(){\n    dl({event:"lead_capturado",pagina:SLUG});\n    setTimeout(function(){location.href=NEXT},300);\n};`;
  const out = inline(transform(page("", `<script>${js}</script>`)))[0];
  assert.ok(parses(out));
  assert.ok(!/(?<![.\w$])dl\(|dataLayer/.test(out));
  assert.ok(out.includes("aberto=true;irPara(etapa,true);") && out.includes("setTimeout(function(){location.href=NEXT},300);"));
});
test("click tracker do testewslp sai inteiro; outros listeners ficam", () => {
  const src = page("", `<script>(function(){\n  document.addEventListener('keydown',function(){ k(); });\n  // click tracker universal (padrão LST)\n  document.addEventListener('click',function(ev){\n    var el=ev.target.closest('a,button'); if(!el) return;\n    (window.dataLayer=window.dataLayer||[]).push({event:'click_tracker',\n      click_id:el.id||'',\n      click_text:(el.innerText||'').trim().slice(0,80),\n      page_slug:'testewslp'});\n  },true);\n})();</script>`);
  const h = transform(src);
  assert.equal(count(h, "click_tracker") + count(h, "dataLayer"), 0);
  assert.ok(h.includes("document.addEventListener('keydown',function(){ k(); });"));
  assert.ok(parses(inline(h)[0]));
});
test("holder do Clarity sai (com comentário); dns-prefetch/preconnect de clarity e google-analytics ficam", () => {
  const KEEP = `<link rel="dns-prefetch" href="https://www.clarity.ms">\n<link rel="preconnect" href="https://www.google-analytics.com">`;
  const HOLD = `<!-- Clarity fora do caminho crítico: segura só o src do clarity.ms e solta depois do load. -->\n<script>\n(function () {\n  var RX = /clarity\\.ms/;\n  var orig = document.createElement;\n})();\n</script>\n`;
  const other = `<script>var x=1; /clarity/.test(y)</script>`;
  const h = transform(page(`${KEEP}\n${PIXEL}\n${HOLD}${other}`));
  assert.equal(count(h, "RX = "), 0);
  assert.equal(count(h, "Clarity fora"), 0);
  assert.ok(h.includes(KEEP) && h.includes(PIXEL) && h.includes(other));
});
test("data-gtm-id sai do HTML; id/class/href ficam", () => {
  const h = transform(page("", `<a class="btn" href="/r/c" data-gtm-id="cta-1" id="a1">x</a><button data-gtm-id='b'>y</button>`));
  assert.equal(count(h, "data-gtm-id"), 0);
  assert.ok(h.includes(`<a class="btn" href="/r/c" id="a1">x</a><button>y</button>`));
});
test("comentário pv_event_id/CAPI/ts.leandrostecca sai; fbq fica", () => {
  const src = page("", `<script>\n${FBQ}\n// eventID no mesmo formato do template do GTM (<ts>_<rand>).\n// Hoje o Meta aqui é 100% client-side (o único canal server é o GA4, em ts.leandrostecca),\n// então não há evento server pra deduplicar. Fica publicado no dataLayer para o dia\n// em que uma tag CAPI server-side precisar casar o event_id com este PageView.\nwindow.__pvEventID = 1;\n</script>`);
  const h = transform(src);
  assert.equal(count(h, "ts.leandrostecca") + count(h, "dataLayer") + count(h, "CAPI"), 0);
  assert.ok(h.includes(`${FBQ}\nwindow.__pvEventID = 1;`));
});
test("controle negativo: gtag/dataLayer de third-party (script com src) e comentário comum não mudam", () => {
  const src = page(`<script src="/p/dpl-pv01/third-party.js"></script>\n<!-- Hero preload -->`);
  assert.equal(transform(src), src.replace("</head>", TAG + "\n</head>"));
});
// controle sobre o dist real: todo inline script que parseava antes ainda parseia depois; fbq não muda
import fs from "node:fs";
import path from "node:path";
const DIST = path.resolve(import.meta.dirname, "../dist");
test("dist real: parse dos scripts inline antes/depois e fbq por página", { skip: !fs.existsSync(DIST) || lerModo() !== "sem" }, () => {
  const files = fs.readdirSync(DIST, { recursive: true }).filter((n) => n.endsWith(".html") && !n.endsWith(".bak.html"));
  let ok = 0, bad = 0;
  for (const n of files) {
    const before = fs.readFileSync(path.join(DIST, n), "utf8"), after = transform(before);
    assert.equal(count(after, "fbq("), count(before, "fbq("), n + " fbq");
    assert.equal(count(after, "dataLayer"), 0, n);
    const b = inline(before), a = inline(after);
    bad += b.filter((x) => !parses(x)).length;
    ok += b.filter(parses).length;
    // todo script que parseava antes parseia depois (ou sumiu inteiro, como o holder do Clarity)
    assert.ok(a.filter((x) => !parses(x)).length <= b.filter((x) => !parses(x)).length, n + ": script passou a não parsear");
    assert.ok(a.length >= b.length - 1, n + ": scripts demais sumiram");
  }
  console.log(`# parse: ${files.length} html; scripts inline que parseavam antes: ${ok} (não parseavam antes: ${bad}); nenhum novo quebrado`);
});

// ---- t.js só atribuição ----
import vm from "node:vm";
import { transformTracker } from "./gtm-to-sentinela.mjs";
const FIX = path.resolve(import.meta.dirname, "fixtures");
const T_OLD = fs.readFileSync(path.join(FIX, "t.original.js"), "utf8"), UTM = fs.readFileSync(path.join(FIX, "utm.js"), "utf8");
const T_NEW = transformTracker(T_OLD);
// harness: t.js + utm.js num contexto com DOM mínimo; devolve o que fica gravado/exposto e o href do checkout
function runPage(tjs, search, { pre = {} } = {}) {
  const mk = (o = {}) => ({ store: { ...o }, getItem(k) { return k in this.store ? this.store[k] : null; }, setItem(k, v) { this.store[k] = String(v); } });
  const session = mk(pre.session), local = mk(pre.local), jar = { ...(pre.cookie || {}) };
  const a = { nodeType: 1, tagName: "A", h: "https://pay.hotmart.com/X?off=1", getAttribute(k) { return k === "href" ? this.h : null; }, setAttribute(k, v) { if (k === "href") this.h = v; }, closest: () => null };
  const body = { nodeType: 1, tagName: "BODY", querySelectorAll: (q) => (q === "a[href]" ? [a] : []) };
  const document = { readyState: "complete", body, addEventListener() {}, querySelectorAll: () => [a],
    get cookie() { return Object.entries(jar).map(([k, v]) => `${k}=${v}`).join("; "); },
    set cookie(s) { const [kv] = s.split(";"); const i = kv.indexOf("="); jar[kv.slice(0, i)] = kv.slice(i + 1); } };
  const window = { document, sessionStorage: session, localStorage: local, location: { search, origin: "https://leandrostecca.com.br", href: "https://leandrostecca.com.br/p/x" }, URL, URLSearchParams, WeakSet, setTimeout() {}, __cfg: { externalCheckoutHosts: ["pay.hotmart.com"], consentBypass: true }, crypto: {} };
  const ctx = vm.createContext({ ...window, window, document, sessionStorage: session, localStorage: local, location: window.location, setTimeout() {}, console });
  window.window = window; vm.runInContext(tjs, ctx); vm.runInContext(UTM, ctx);
  return JSON.parse(JSON.stringify({ session: session.store, local: local.store, cookie: jar, attrib: vm.runInContext("window.__attrib", ctx), href: a.h }));
}
test("t.js novo: parseia, sem dataLayer/data-gtm-id/__pending, idempotente", () => {
  assert.ok(parses(T_NEW) && T_NEW.length < T_OLD.length);
  assert.ok(!/dataLayer|data-gtm-id|__pending|uuid|addEventListener/.test(T_NEW));
  assert.equal(transformTracker(T_NEW), T_NEW);
});
test("t.js: com ?utm_source=a&fbclid=b, storage, cookie, __attrib e href do checkout idênticos ao original", () => {
  const q = "?utm_source=a&fbclid=b&x=1";
  const o = runPage(T_OLD, q), n = runPage(T_NEW, q);
  assert.deepEqual(n, o);
  assert.deepEqual(n.attrib, { utm_source: "a", fbclid: "b" });
  assert.ok(n.cookie.__attrib && n.local.__attrib_first && n.session.__attrib);
  assert.equal(n.href, "https://pay.hotmart.com/X?off=1&utm_source=a&fbclid=b");
});
test("t.js: sem parâmetros, recupera do storage/cookie igual ao original; controle negativo (sem nada) fica vazio", () => {
  const pre = { local: { __attrib_first: '{"gclid":"g"}' } };
  assert.deepEqual(runPage(T_NEW, "", { pre }), runPage(T_OLD, "", { pre }));
  const e = runPage(T_NEW, "");
  assert.deepEqual(e.attrib, {}); assert.equal(e.href, "https://pay.hotmart.com/X?off=1");
});
test("t.js desconhecido não muda; produtores __pending e comentário saem do HTML", () => {
  assert.equal(transformTracker("/* outro */ var x=1;"), "/* outro */ var x=1;");
  const h = transform(page("", `<!-- Pre-hydration click queue (pending-shim) -->\n<script>\n  window.__pending = window.__pending || [];\n  window.__pendingPush = function (payload) {\n    try { window.__pending.push(payload); }\n    catch (e) {}\n  };\n</script>\n<script>\n  window.__pageSlug = "x";\n  window.__pending = window.__pending || [];\n  window.__pendingPush = function (p) { try { window.__pending.push(p); } catch (e) {} };\n  window.__cfg = {a:1};\n</script>`));
  assert.equal(count(h, "__pending") + count(h, "pending-shim"), 0);
  assert.ok(h.includes('window.__pageSlug = "x";') && h.includes("window.__cfg = {a:1};"));
  assert.ok(inline(h).every(parses));
});

test("stripTag tira a tag Sentinela e preserva o GTM", async () => {
  const { stripTag } = await import("./gtm-to-sentinela.mjs");
  const gtm = `<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':1})})(window,document,'script','dataLayer','GTM-X');</script>`;
  const h = `<html><head>\n${gtm}\n  ${TAG}\n</head><body><noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-X"></iframe></noscript></body></html>`;
  const out = stripTag(h);
  assert.equal(count(out, "track.leandrostecca.com.br"), 0);
  assert.ok(out.includes(gtm) && out.includes("ns.html?id=GTM-X"));
  assert.equal(stripTag(out), out);
});
