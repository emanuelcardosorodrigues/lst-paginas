// Corretor de atribuição (sck) injetado em toda página /p/.
// O decorator de sck do container GTM (compartilhado, read-only) deriva o slug de
// location.pathname. Como estas páginas são servidas sob o prefixo /p/, o pathname
// vira "/p/<slug>/" e o slug sai como "p/<slug>" (o WordPress fica na raiz e sai
// limpo). Resultado: transacoes.sck_slug = "p/<slug>", que não casa com o catálogo
// nem com checkout_hits/route_clicks (que usam o slug limpo). O Worker conhece o
// slug real (está no path), então injeta ANTES do gtm.js (async) um handler de
// clique em fase de CAPTURA que, no clique de checkout, tira só o prefixo "p/" do
// sck e do cookiePageSlug — preservando utm/xcod/_pv/_ck/_ob. O Tag do GTM preserva
// um sck já presente, então a correção sobrevive até a navegação pro Hotmart.
// Um lugar só → toda página /p/, atual e futura, nasce com atribuição correta.
function sckFixScript(slug) {
  // Registrado em pointerdown E click (ambos captura, antes do gtm.js):
  // - click cobre o fluxo normal (GTM dá preventDefault e navega via window.location);
  // - pointerdown dispara ANTES do navegador abrir nova aba no meio-clique/cmd-clique
  //   (que usam o href-attribute, não passam pelo handler do GTM) → fecha esse edge case.
  // Pega dois destinos: (1) link direto do pay.hotmart.com; (2) roteador same-origin
  // /r/check/<tck> (col-pvia01/04, lps-*), que REPASSA o sck pro Hotmart como está —
  // o GTM assa sck=p/<slug> nele também, então o corretor tem que limpar aqui também.
  return '<script>(function(){' +
    'var want=' + JSON.stringify(slug) + ';' +
    'function fix(ev){' +
      'var a=ev.target&&ev.target.closest&&ev.target.closest("a");' +
      'if(!a||!a.href)return;' +
      'var u;try{u=new URL(a.href);}catch(e){return;}' +
      'var hit=(u.host==="pay.hotmart.com")||(u.origin===location.origin&&u.pathname.indexOf("/r/check/")===0);' +
      'if(!hit)return;' +
      'try{var sck=u.searchParams.get("sck");' +
        'if(sck){var p=sck.split("|"),bad=p[0];' +
          'if(bad&&bad.indexOf("p/")===0){var good=bad.slice(2),j;' +
            'for(j=0;j<p.length;j++){if(p[j]===bad){p[j]=good;}}' +
            'u.searchParams.set("sck",p.join("|"));}}' +
        'else if(want){u.searchParams.set("sck",want);}' +
        'var cps=u.searchParams.get("cookiePageSlug");' +
        'if(cps&&cps.indexOf("p/")===0){u.searchParams.set("cookiePageSlug",cps.slice(2));}' +
        'a.setAttribute("href",u.toString());' +
      '}catch(e){}' +
    '}' +
    'document.addEventListener("pointerdown",fix,true);' +
    'document.addEventListener("click",fix,true);' +
  '})();<\/script>';
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname.startsWith("/p/")) {
      // slug real = 1º segmento depois de /p/ (antes de reescrever o pathname).
      const slugMatch = url.pathname.match(/^\/p\/([^/]+)/);
      const slug = slugMatch ? slugMatch[1] : "";

      url.pathname = url.pathname.slice(2); // /p/dpl-pv01/ → /dpl-pv01/

      // /p/{slug} sem barra final é a URL que vai nos anúncios. Serve 200 direto:
      // um 301 aqui custaria um RTT em cada clique pago, e o redirect anterior
      // (`url.toString() + "/"`) colava a barra DEPOIS da query — /p/x?fbclid=a/ —
      // deixando o pathname ainda sem barra, então ele casava de novo: loop infinito
      // em todo clique com fbclid. Só o slug puro entra aqui; /assets/... tem mais
      // de um segmento e passa direto.
      if (/^\/[^/]+$/.test(url.pathname)) url.pathname += "/";

      const res = await env.ASSETS.fetch(new Request(url.toString(), request));

      // Injeta o corretor de sck só no documento HTML (não em /assets/*).
      const ct = res.headers.get("content-type") || "";
      if (slug && ct.includes("text/html")) {
        return new HTMLRewriter()
          .on("head", {
            element(el) {
              el.prepend(sckFixScript(slug), { html: true });
            },
          })
          .transform(res);
      }

      return res;
    }

    return env.ASSETS.fetch(request);
  },
};
