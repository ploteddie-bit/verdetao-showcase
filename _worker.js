export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const host = request.headers.get("host").replace("www.", "");
    const path = url.pathname === "/" ? "/index.html" : url.pathname;
    const assetPath = "/" + host + path;
    try {
      const response = await env.ASSETS.fetch(new URL(assetPath, request.url));
      if (response.ok) {
        const ct = path.endsWith(".cbor") ? "application/cbor" : response.headers.get("content-type");
        return new Response(response.body, {
          status: 200,
          headers: { "content-type": ct, "access-control-allow-origin": "*" }
        });
      }
    } catch (e) {}
    return new Response("Not Found", { status: 404 });
  }
};
