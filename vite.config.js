import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5001',
        changeOrigin: true,
        secure: false,
      },
      '/uploads': {
        target: 'http://localhost:5001',
        changeOrigin: true,
        secure: false,
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './client/src'),
      '@components': path.resolve(__dirname, './client/src/components'),
      '@pages': path.resolve(__dirname, './client/src/pages'),
      '@store': path.resolve(__dirname, './client/src/store'),
      '@styles': path.resolve(__dirname, './client/src/styles'),
      '@theme': path.resolve(__dirname, './client/src/theme'),
      '@utils': path.resolve(__dirname, './client/src/utils'),
      '@services': path.resolve(__dirname, './client/src/services'),
      '@hooks': path.resolve(__dirname, './client/src/hooks'),
      '@layout': path.resolve(__dirname, './client/src/layout')
    }
  },
  build: {
    outDir: 'client/build',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          redux: ['@reduxjs/toolkit', 'react-redux'],
          ui: ['styled-components', 'framer-motion', 'react-icons']
        }
      }
    }
  }
}); 