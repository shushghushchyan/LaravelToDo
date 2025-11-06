import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import path from 'path';

// detect environment
const isProduction = process.env.NODE_ENV === 'production';

// set backend target based on environment
const backendUrl = isProduction
    ? 'https://laravel-to-doooo.vercel.app'   // 👈 your deployed backend (Vercel domain or API domain)
    : 'http://127.0.0.1:8000';            // 👈 local Laravel backend

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/js/app.jsx'],
            refresh: true,
        }),
        react(),
    ],
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
