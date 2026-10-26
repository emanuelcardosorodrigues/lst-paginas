import { handleInscricao, retryPending } from "./inscricao.js";

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname === "/p/col-inup-cap01-web01/api/inscricao") {
      // Sem cron: cada inscrição também reenvia o que ficou pendente no KV.
      ctx.waitUntil(retryPending(env));
      return handleInscricao(request, env);
    }

    if (url.pathname.startsWith("/p/")) {
      // Only redirect /p/slug (no trailing slash, no sub-path) → /p/slug/
      // This avoids redirecting asset paths like /p/slug/assets/file.js
      if (/^\/p\/[^/]+$/.test(url.pathname)) {
        return Response.redirect(url.toString() + "/", 301);
      }

      url.pathname = url.pathname.slice(2); // /p/dpl-pv01/ → /dpl-pv01/
      return env.ASSETS.fetch(new Request(url.toString(), request));
    }

    return env.ASSETS.fetch(request);
  },

  async scheduled(event, env, ctx) {
    ctx.waitUntil(retryPending(env));
  },
};
