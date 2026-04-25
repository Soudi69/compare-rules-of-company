import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.indexOf('node_modules') !== -1) {
            if (id.indexOf('react') !== -1 || id.indexOf('react-dom') !== -1) {
              return 'vendor-react'
            }
            if (id.indexOf('lucide-react') !== -1) {
              return 'vendor-icons'
            }
            if (id.indexOf('axios') !== -1) {
              return 'vendor-http'
            }
            return undefined
          }
        }
      }
    }
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    },
    cors: true
  }
})
