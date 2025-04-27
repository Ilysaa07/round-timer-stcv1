import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Timer Rounde',
        short_name: 'Timer',
        description: 'Aplikasi Timer Ronde dan Istirahat',
        theme_color: '#000000',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
        icons: [
          {
            src: '/images/logo2.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/images/logo2.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ],
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.mode === 'navigate',
            handler: 'NetworkFirst',
            options: {
              networkTimeoutSeconds: 3,
              cacheName: 'pages-cache',
            },
          },
        ],
        navigateFallback: '/offline.html' // ✅ yang benar
      },
      
    }),
  ],
})
