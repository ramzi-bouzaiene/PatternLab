import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@app': path.resolve(__dirname, './src/app'),
      '@core': path.resolve(__dirname, './src/core'),
      '@features': path.resolve(__dirname, './src/features'),
      '@diagram': path.resolve(__dirname, './src/diagram'),
      '@playground': path.resolve(__dirname, './src/playground'),
      '@shared': path.resolve(__dirname, './src/shared'),
    },
  },
})
