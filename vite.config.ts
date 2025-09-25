import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      build: {
        // Use manualChunks to split large libraries (firebase, vendor) into separate files
        rollupOptions: {
          output: {
            manualChunks(id) {
              if (!id) return undefined;
              if (id.includes('node_modules')) {
                // keep firebase in its own chunk
                if (id.includes('node_modules/firebase')) return 'firebase';
                // separate react / react-dom so vendor chunk gets smaller
                if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) return 'react-vendor';
                return 'vendor';
              }
            }
          }
        }
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
