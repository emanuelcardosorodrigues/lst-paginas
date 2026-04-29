export default {
  async fetch(request, env) {
    const url = new URL(request.url);

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
};
