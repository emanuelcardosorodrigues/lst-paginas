/* tracker 1.0.0 — captura de clique delegada + atribuição (Meta/Google) */
(function () {
  "use strict";

  var W = window;
  var D = document;
  var CFG = W.__cfg || {};
  var DL = (W.dataLayer = W.dataLayer || []);

  function uuid() {
    if (W.crypto && W.crypto.randomUUID) return W.crypto.randomUUID();
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0;
      var v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  function readSearch(search) {
    var out = {};
    try {
      new URLSearchParams(search).forEach(function (v, k) { out[k] = v; });
    } catch (e) {}
    return out;
  }

  function readStorage(store, key) {
    try {
      var raw = store.getItem(key);
      return raw ? JSON.parse(raw) : null;
    } catch (e) { return null; }
  }

  function readCookie(name) {
    try {
      var m = D.cookie.match("(^|;)\\s*" + name + "\\s*=\\s*([^;]+)");
      return m ? JSON.parse(decodeURIComponent(m[2])) : null;
    } catch (e) { return null; }
  }

  var ATTRIB_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "gclid", "fbclid", "ttclid", "msclkid"];

  function pickAttrib(src) {
    if (!src) return null;
    var has = false, out = {};
    for (var i = 0; i < ATTRIB_KEYS.length; i++) {
      var k = ATTRIB_KEYS[i];
      if (src[k]) { out[k] = src[k]; has = true; }
    }
    return has ? out : null;
  }

  function writeAttrib(attrib) {
    var s = JSON.stringify(attrib);
    try { sessionStorage.setItem("__attrib", s); } catch (e) {}
    try { if (!localStorage.getItem("__attrib_first")) localStorage.setItem("__attrib_first", s); } catch (e) {}
    try { D.cookie = "__attrib=" + encodeURIComponent(s) + "; Path=/; Max-Age=2592000; SameSite=Lax; Secure"; } catch (e) {}
  }

  function initAttribution() {
    var fromUrl = pickAttrib(readSearch(location.search));
    var resolved = fromUrl || readStorage(sessionStorage, "__attrib") || readStorage(localStorage, "__attrib_first") || readCookie("__attrib") || {};
    if (fromUrl) writeAttrib(fromUrl);
    W.__attrib = resolved;
  }

  initAttribution();

  function targetKind(el, href) {
    if (!href) return "other";
    if (el.closest("header, nav, [data-nav]")) return "nav";
    var prefix = CFG.workerRedirectPrefix || "/r/";
    if (href.indexOf(prefix) === 0 || href.indexOf(location.origin + prefix) === 0) return "worker-redirect";
    var hosts = CFG.externalCheckoutHosts || [];
    for (var i = 0; i < hosts.length; i++) {
      if (href.indexOf("//" + hosts[i]) !== -1) return "external-checkout";
    }
    var sameOrigin = href.indexOf(location.origin) === 0 || href[0] === "/" || href[0] === "#";
    return sameOrigin ? "cta-internal" : "cta-external";
  }

  function safeText(el) {
    var t = (el.textContent || "").replace(/\s+/g, " ").trim();
    return t.length > 120 ? t.slice(0, 120) : t;
  }

  function buildPayload(el) {
    var href = el.tagName === "A" ? (el.getAttribute("href") || null) : null;
    return {
      event: "click",
      click_id: el.getAttribute("data-gtm-id") || el.id || "",
      click_classes: (el.className && el.className.toString && el.className.toString().trim()) || "",
      click_text: safeText(el),
      click_href: href,
      click_target_kind: targetKind(el, href),
      page_slug: W.__pageSlug || "",
      event_id: uuid(),
      ts: Date.now(),
    };
  }

  function gateAndPush(payload) {
    if (W.__consent !== "granted" && !CFG.consentBypass) {
      (W.__pendingConsent = W.__pendingConsent || []).push(payload);
      return;
    }
    DL.push(payload);
  }

  // === Click ID universal: todo a/button/[role=button] ganha um data-gtm-id
  // estável (page_slug + texto + índice), legível pelo GTM. ===
  var TRACKABLE = 'a, button, [role="button"], [data-track]';
  var usedGtmIds = {};

  function slugifyText(t) {
    t = (t || "").toLowerCase();
    try { t = t.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); } catch (e) {}
    return t.replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 32);
  }

  function ensureGtmId(el) {
    var existing = el.getAttribute("data-gtm-id") || el.id;
    if (existing) { usedGtmIds[existing] = 1; return existing; }
    var slug = W.__pageSlug || "page";
    var base = slug + "__" + (slugifyText(safeText(el)) || (el.tagName === "A" ? "link" : "btn"));
    var id = base, n = 2;
    while (usedGtmIds[id]) { id = base + "__" + n; n++; }
    usedGtmIds[id] = 1;
    try { el.setAttribute("data-gtm-id", id); } catch (e) {}
    return id;
  }

  function tagAll() {
    try {
      var els = D.querySelectorAll(TRACKABLE);
      for (var i = 0; i < els.length; i++) ensureGtmId(els[i]);
    } catch (e) {}
  }

  var seen = typeof WeakSet === "function" ? new WeakSet() : null;

  function handler(event) {
    var raw = event.target;
    if (!raw || raw.nodeType !== 1) return;
    if (raw.closest("input, textarea, select, [contenteditable]")) return; // PII guard
    var el = raw.closest(TRACKABLE);
    if (!el) return;
    ensureGtmId(el); // rede de segurança: garante data-gtm-id ANTES do GTM ler (capture)
    if (seen && seen.has(el)) return;
    if (seen) {
      seen.add(el);
      setTimeout(function () { try { seen.delete(el); } catch (e) {} }, 300);
    }
    try { gateAndPush(buildPayload(el)); } catch (e) {}
  }

  D.addEventListener("click", handler, { capture: true, passive: true });

  // Tagueia no load e de novo após o React montar (SPA): todo botão fica com id.
  if (D.readyState !== "loading") tagAll();
  else D.addEventListener("DOMContentLoaded", tagAll);
  setTimeout(tagAll, 800);
  setTimeout(tagAll, 2500);

  // Drena cliques capturados antes do tracker bootar
  if (Array.isArray(W.__pending) && W.__pending.length) {
    var queue = W.__pending.splice(0);
    setTimeout(function () { queue.forEach(function (p) { try { DL.push(p); } catch (e) {} }); }, 0);
  }
})();
