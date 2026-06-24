import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages project site: https://<org>.github.io/notive-landing/
  base: '/notive-landing/',
  plugins: [react(), tailwindcss()],
})
