import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'
import { visualizer } from 'rollup-plugin-visualizer'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Refresh konfigürasyonu
      include: /src\/.*\.[jt]sx?$/,
      exclude: /node_modules/,
    }),
    tailwindcss(),
    // PWA plugin
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2,woff,ttf}'],
        globIgnores: ['**/stats.html', '**/stats.html.gz'],
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // 5 MB limit
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/.*\/api\/v1\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24, // 24 saat
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
      manifest: {
        name: 'Müasir Stomatologiya',
        short_name: 'MD Clinic',
        description: 'Stomatologiya klinikası yönetim sistemi',
        theme_color: '#155EEF',
        background_color: '#EEF2F6',
        display: 'standalone',
        icons: [
          {
            src: '/src/assets/images/general/logos/logo.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/src/assets/images/general/logos/logo.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
    // Image optimizer
    ViteImageOptimizer({
      png: {
        quality: 80,
      },
      jpeg: {
        quality: 80,
      },
      jpg: {
        quality: 80,
      },
      webp: {
        quality: 80,
      },
    }),
    // Bundle analyzer
    visualizer({
      open: false,
      gzipSize: true,
      brotliSize: true,
      filename: 'dist/stats.html',
    }),
  ],
  base: '/', // Əgər app serverdə root-da (/) açılırsa, dəyişmə
  
  css: {
    devSourcemap: false,
    // PurgeCSS will be handled by Tailwind CSS v4
  },
  
  server: {
    proxy: {
      '/api': {
        target: 'http://161.97.175.59:5055',
        changeOrigin: true,
        secure: false
      }
    },
    allowedHosts: [
      'sat-documentation-investigators-pubs.trycloudflare.com',
      'grey-al-congratulations-seo.trycloudflare.com'
    ]
  },
  
  // Optimizasiya
  optimizeDeps: {
    include: [
      'react', 
      'react-dom', 
      'react/jsx-runtime',
      'react-router-dom', 
      'antd', 
      '@ant-design/icons'
    ],
    exclude: ['@tanstack/react-query-devtools'],
    // React'in doğru şekilde optimize edilmesini sağla
    esbuildOptions: {
      target: 'esnext',
    },
  },
  resolve: {
    dedupe: ['react', 'react-dom', 'react/jsx-runtime'], // React'in tek bir instance'ının kullanılmasını sağla
    // React modüllerinin doğru çözümlenmesini garanti et
    alias: {
      'react': 'react',
      'react-dom': 'react-dom',
    },
  },
})
