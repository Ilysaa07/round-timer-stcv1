import { defineConfig } from 'vite';
import { default as React } from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [React()],
  // Tambahkan konfigurasi lain yang Anda butuhkan, misalnya:
  // build: {
  //   outDir: 'dist',
  //   rollupOptions: {
  //     input: {
  //       main: 'src/main.js',
  //       another: 'src/another.js'
  //     }
  //   }
  // },
  // server: {
  //   port: 8080,
  // },
  // dev: {
  //   proxy: {
  //     '/api': {
  //       target: 'http://localhost:3000',
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/api/, ''),
  //     }
  //   }
  // }
});