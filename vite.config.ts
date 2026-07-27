import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'node:fs'
import path from 'node:path'

function markdownAcceptPlugin(): Plugin {
  const serveMarkdown = (req: any, res: any, next: any) => {
    const accept = (req.headers['accept'] || '').toLowerCase()
    if (accept.includes('text/markdown')) {
      const mdPath = path.resolve(__dirname, 'public/index.md')
      if (fs.existsSync(mdPath)) {
        const content = fs.readFileSync(mdPath, 'utf-8')
        res.setHeader('Content-Type', 'text/markdown; charset=utf-8')
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.statusCode = 200
        res.end(content)
        return
      }
    }
    next()
  }

  return {
    name: 'serve-markdown-accept',
    configureServer(server) {
      server.middlewares.use(serveMarkdown)
    },
    configurePreviewServer(server) {
      server.middlewares.use(serveMarkdown)
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages project site: https://<org>.github.io/notive-landing/
  base: '/',
  plugins: [react(), tailwindcss(), markdownAcceptPlugin()],
})
