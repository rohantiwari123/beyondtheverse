import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/beyondtheverse/', // 🌟 GitHub Pages Repo Name (Perfect!)
  
  plugins: [
    react(),
    tailwindcss(),
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
  }
})