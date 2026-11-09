import test from "node:test";
import assert from "node:assert/strict";
import { transform, TAG } from "./gtm-to-sentinela.mjs";
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
test("controle negativo: dataLayer de função e handler não muda", () => {
  const body = `<script>function push(o){ try{ (window.dataLayer=window.dataLayer||[]).push(o); }catch(e){} }\nwindow.dataLayer.push({event:"presenca_submit"})</script>`;
  const src = page("", body);
  assert.equal(transform(src), src.replace("</head>", TAG + "\n</head>"));
  assert.ok(transform(src).includes(`function push(o){ try{ (window.dataLayer=window.dataLayer||[]).push(o); }catch(e){} }`));
  assert.ok(transform(src).includes(`window.dataLayer.push({event:"presenca_submit"})`));
});
test("idempotente", () => {
  const src = page(GTM + PIXEL);
  assert.equal(transform(transform(src)), transform(src));
});
test("controle negativo: preconnect ao Stape fica se ainda é usado", () => {
  const src = page(`<link rel="preconnect" href="https://ts.leandrostecca.com.br" crossorigin>\n<script src="https://ts.leandrostecca.com.br/outro.js"></script>`);
  assert.ok(transform(src).includes('rel="preconnect" href="https://ts.leandrostecca.com.br"'));
});
