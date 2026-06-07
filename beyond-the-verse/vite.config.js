import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/', // 🌟 Vercel Deployment (Root)
  
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'icons.svg', 'hero.png'],
      manifest: {
        name: 'Beyond The Verse',
        short_name: 'BTVerse',
        description: 'A platform for research, community, and exams.',
        theme_color: '#0d9488',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: 'favicon.svg',
            sizes: '192x192',
            type: 'image/svg+xml'
          },
          {
            src: 'favicon.svg',
            sizes: '512x512',
            type: 'image/svg+xml'
          },
          {
            src: 'favicon.svg',
            sizes: '512x512',
            type: 'image/svg+xml',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ],
  
  server: {
    allowedHosts: true
  },

  // 🌟 PRO FIX: Build Optimizations 🌟
  build: {
    // 1. Chunk Splitting: तुम्हारी वेबसाइट का सारा कोड एक ही फाइल में न जाए, 
    // इसलिए हम 'node_modules' (Libraries) को एक अलग फाइल ('vendor') में तोड़ रहे हैं।
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        }
      }
    },
    // 2. Warning Limit: बड़ी इमेजेज या फाइल्स होने पर वार्निंग लिमिट थोड़ी बढ़ा दी है
    chunkSizeWarningLimit: 1000, 
  },

  // 🌟 SECURITY FIX: Auto-Drop Consoles 🌟
  // जब तुम 'npm run build' चलाओगे, तो Vite अपने आप तुम्हारे सारे console.log() 
  // और debugger हटा देगा। हैकर्स को तुम्हारा कोई भी डेटा कंसोल में नहीं दिखेगा!
  esbuild: {
    drop: ['console', 'debugger'],
  },

  optimizeDeps: {
    include: ['animejs'],
  }
})