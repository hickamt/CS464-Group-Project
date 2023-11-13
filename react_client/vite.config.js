import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "../public"
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5523',
        changeOrigin: true,
      }
    }
  }
})
