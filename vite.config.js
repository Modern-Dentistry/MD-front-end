import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://159.89.3.81:5555',
        changeOrigin: true,
        secure: false
      }
    },
    allowedHosts: [
      'sat-documentation-investigators-pubs.trycloudflare.com',
      'grey-al-congratulations-seo.trycloudflare.com'
    ]
  }
})
