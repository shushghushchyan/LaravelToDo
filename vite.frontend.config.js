import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

const isProduction = process.env.NODE_ENV === 'production';
const backendUrl = isProduction
  ? 'https://your-laravel-backend.com' // 👈 replace this later with your backend URL
  : 'http://127.0.0.1:8000';

export default defineConfig({
  build: {
    outDir: 'dist', // ✅ output to /dist
    emptyOutDir: true,
    rollupOptions: {
      input: 'resources/js/app.jsx', // ✅ use your React entry
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'resources/js'),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: backendUrl,
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
