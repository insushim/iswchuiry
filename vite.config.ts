import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  },
  build: {
    target: 'es2020',
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Vendor chunks
          if (id.includes('node_modules')) {
            if (id.includes('react-dom') || id.includes('react-router')) {
              return 'vendor-react';
            }
            if (id.includes('framer-motion')) {
              return 'vendor-motion';
            }
            if (id.includes('lucide-react')) {
              return 'vendor-icons';
            }
            if (id.includes('zustand') || id.includes('immer')) {
              return 'vendor-state';
            }
            return 'vendor';
          }
          // Scenario + game data
          if (id.includes('/data/')) {
            return 'game-data';
          }
          // Puzzle components
          if (id.includes('components/puzzles/')) {
            return 'puzzles';
          }
          // Core engine
          if (id.includes('core/CaseGenerator') || id.includes('core/PuzzleGenerator')) {
            return 'game-core';
          }
        },
      },
    },
    chunkSizeWarningLimit: 600,
    sourcemap: false,
    cssMinify: true,
  },
  esbuild: {
    drop: ['console', 'debugger'],
  },
});
