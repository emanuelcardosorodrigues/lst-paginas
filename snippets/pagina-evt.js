/* pagina-evt.js (WP 1.3b) - eventos da página -> POST /p/_evt (relay do Worker). Sem segredo aqui.
   Uso: <script src="pagina-evt.js" defer></script> (copie para a pasta da página) ou inline.
   Marcação: oferta = [data-evt="oferta"]; botões de oferta = [data-evt="cta"]; checkout = a[href*="pay.hotmart.com"], a[href*="/r/check/"].
   Token: ?t=<22 chars> (guardado na sessão). Sem token nada é enviado. Falha silenciosa. */
(function () {
  try {
    var q = new URLSearchParams(location.search), K = "pev_t", t = q.get("t");
    try { if (t) sessionStorage.setItem(K, t); else t = sessionStorage.getItem(K); } catch (e) {}
    if (!t || !/^[A-Za-z0-9_-]{22}$/.test(t)) return;
    var slug = (location.pathname.match(/^\/p\/([^/]+)/) || [])[1];
    if (!slug) return;
    var utm = {}, done = {}, n = 0;
    ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"].forEach(function (k) { var v = q.get(k); if (v) utm[k] = v.slice(0, 200); });

    function send(type, pct, repete) {
      var key = type + ":" + (pct || 0);
      if (!repete) { if (done[key]) return; done[key] = 1; }
      var b = { t: t, type: type, page_slug: slug, occurred_at: new Date().toISOString(),
        event_id: t + ":" + type + ":" + (pct || 0) + ":" + (repete ? ++n : 0) };
      if (type === "video_progress") b.pct = pct;
      for (var k in utm) b[k] = utm[k];
      try {
        var s = JSON.stringify(b);
        if (!(navigator.sendBeacon && navigator.sendBeacon("/p/_evt", new Blob([s], { type: "application/json" })))) {
          fetch("/p/_evt", { method: "POST", body: s, keepalive: true, headers: { "Content-Type": "application/json" } }).catch(function () {});
        }
      } catch (e) {}
    }
    window.PagEvt = { send: send }; // fallback manual: PagEvt.send("video_progress", 50)

    send("page_view");

    // Oferta vista
    var of = document.querySelector('[data-evt="oferta"]');
    if (of && window.IntersectionObserver) {
      var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { send("offer_reached"); io.disconnect(); } }); }, { threshold: 0.4 });
      io.observe(of);
    }

    // Cliques (delegado, captura)
    document.addEventListener("click", function (ev) {
      var a = ev.target && ev.target.closest && ev.target.closest("a,button");
      if (!a) return;
      if (a.closest('[data-evt="cta"]') || a.matches('[data-evt="cta"]')) send("cta_click", 0, true);
      var h = a.getAttribute && a.getAttribute("href") || "";
      if (h.indexOf("pay.hotmart.com") > -1 || h.indexOf("/r/check/") > -1) send("checkout_open", 0, true);
    }, true);

    // VTurb: smartplayer.instances[i].on("play"|"timeupdate"). API NAO verificada em navegador (ver DEPLOY.md);
    // se mudar, use PagEvt.send manualmente. Marcos 25/50/75/100 uma vez cada.
    var tentativas = 0, iv = setInterval(function () {
      var sp = window.smartplayer, inst = sp && sp.instances && sp.instances[0];
      if (inst && inst.on) {
        clearInterval(iv);
        inst.on("play", function () { send("video_play"); });
        inst.on("timeupdate", function (e) {
          var cur = (e && (e.currentTime != null ? e.currentTime : e.time)) || 0, dur = (inst.video && inst.video.duration) || inst.duration || 0;
          if (!dur) return;
          var p = (cur / dur) * 100;
          [25, 50, 75, 100].forEach(function (m) { if (p >= m - (m === 100 ? 1 : 0)) send("video_progress", m); });
        });
      } else if (++tentativas > 60) clearInterval(iv);
    }, 500);
  } catch (e) {}
})();
