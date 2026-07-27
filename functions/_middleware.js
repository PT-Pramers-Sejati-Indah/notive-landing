export async function onRequest(context) {
  const { request, env } = context
  const acceptHeader = (request.headers.get('accept') || '').toLowerCase()

  if (acceptHeader.includes('text/markdown')) {
    const url = new URL(request.url)
    url.pathname = '/index.md'
    const markdownResponse = await env.ASSETS.fetch(new Request(url.toString(), request))

    return new Response(markdownResponse.body, {
      status: markdownResponse.status,
      headers: {
        'content-type': 'text/markdown; charset=utf-8',
        'access-control-allow-origin': '*',
        'cache-control': 'public, max-age=3600',
      },
    })
  }

  return context.next()
}
