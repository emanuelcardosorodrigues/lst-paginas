export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname.startsWith("/p/")) {
      // Ensure trailing slash so ASSETS doesn't redirect to a path without /p/
      if (!url.pathname.endsWith("/")) {
        return Response.redirect(url.toString() + "/", 301);
      }

      url.pathname = url.pathname.slice(2); // /p/dpl-pv01/ → /dpl-pv01/
      return env.ASSETS.fetch(new Request(url.toString(), request));
    }

    return env.ASSETS.fetch(request);
  },
};
