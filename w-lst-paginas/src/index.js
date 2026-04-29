export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Strip /p/ prefix so /p/plo-pv01/ looks up plo-pv01/ in assets
    if (url.pathname.startsWith("/p/")) {
      url.pathname = url.pathname.slice(2); // removes "/p"
      return env.ASSETS.fetch(new Request(url.toString(), request));
    }

    return env.ASSETS.fetch(request);
  },
};
