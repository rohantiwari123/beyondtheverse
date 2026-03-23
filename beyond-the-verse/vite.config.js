import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/Beyondtheverse.donation/', // यहाँ आपकी रिपॉजिटरी का नाम आएगा
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    allowedHosts: true
  }
})
