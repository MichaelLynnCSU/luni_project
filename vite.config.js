import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react()
  ],
  
  server: {
    host: true,
    port: 3000,
    proxy: {
      '/api': 'http://localhost:3000'
    }
  },
  
  build: {
    rollupOptions: {
      external: ['gsap', '@gsap/shockingly', '@gsap/shockingly/dist/MorphSVGPlugin'],
    },
  },
  
  optimizeDeps: {
    include: ['pdfjs-dist'],
    esbuildOptions: {
      target: 'esnext'
    }
  },
  
  esbuild: {
    supported: {
      'top-level-await': true
    },
  },
});
