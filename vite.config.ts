import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "/src/styles/dynamic" as *;
        `,
      },
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@fonts': '/src/fonts',
      '@styles': '/src/styles',
      '@constants': '/src/constants',
      '@components': '/src/components',
      '@services': '/src/services',
      '@images': '/src/images',
      '@': '/src',
    },
  },
})
