export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // The production routes include /p/, while the static bundle is stored
    // without that prefix. Keep both pages fully isolated from w-lst-paginas.
    if (/^\/p\/col-pvia0[67](?:\/|$)/.test(url.pathname)) {
      if (/^\/p\/col-pvia0[67]$/.test(url.pathname)) {
        return Response.redirect(`${url.toString()}/`, 301);
      }
      url.pathname = url.pathname.slice(2);
    }

    return env.ASSETS.fetch(new Request(url.toString(), request));
  },
};
