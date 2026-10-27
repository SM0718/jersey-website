import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    target: 'es2022',
    cssCodeSplit: true,
    chunkSizeWarningLimit: 900,
    rollupOptions: {
      output: {
        manualChunks(id: any) {
          if (id.includes('gsap') || id.includes('lenis')) return 'motion'
          if (id.includes('three') || id.includes('@react-three')) return 'three'
          if (id.includes('react-hook-form') || id.includes('zod') || id.includes('@hookform/resolvers')) return 'forms'
          if (id.includes('node_modules')) return 'vendor'
        },
      },
    },
  },
})
