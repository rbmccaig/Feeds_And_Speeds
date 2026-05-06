export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    let response = await env.ASSETS.fetch(request);

    // SPA fallback: if no file found and path has no extension, serve index.html
    if (response.status === 404 && !url.pathname.split('/').pop().includes('.')) {
      response = await env.ASSETS.fetch(new Request(new URL('/index.html', url.origin)));
    }

    return response;
  }
};
