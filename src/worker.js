export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname.endsWith('/') ? `${url.pathname}index.html` : url.pathname;
    const asset = await env.ASSETS.fetch(new Request(new URL(path, url.origin), request));
    if (asset.status !== 404) return asset;
    const notFound = await env.ASSETS.fetch(new Request(new URL('/404.html', url.origin)));
    return new Response(notFound.body, { status: 404, headers: { 'content-type': 'text/html; charset=utf-8' } });
  },
};
