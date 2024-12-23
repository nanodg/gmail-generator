import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
    plugins: [react()],
    server: {
        port: 3000,
        strictPort: true,
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    envPrefix: ["VITE_", "TAURI_"],
    build: {
        target: ["es2021", "chrome100", "safari13"],
        minify: !process.env.TAURI_DEBUG ? "esbuild" : false,
        sourcemap: !!process.env.TAURI_DEBUG,
    },
}) 