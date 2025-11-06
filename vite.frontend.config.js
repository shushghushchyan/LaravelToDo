import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

const isProduction = process.env.NODE_ENV === 'production';
const backendUrl = isProduction
  ? 'https://your-laravel-backend.com' // 👈 replace this with your backend URL later
  : 'http://127.0.0.1:8000';

export default defineConfig({
  root: 'resources/js', // your React app root
  build: {
    outDir: '../../dist', // builds dist/index.html for Vercel
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
