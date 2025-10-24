import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/internshipTracker/",
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    open: true,
    port: 3001,
  },
  }
);
