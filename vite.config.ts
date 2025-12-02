import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import path from 'path';
import { fileURLToPath } from 'url';
import { UserConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';
import tailwindcss from '@tailwindcss/vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    tailwindcss(),
    dts({
      insertTypesEntry: true,
    }),
  ],
  build: {
    sourcemap: true,
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'ChiperosAIComponentsLibrary',
      formats: ['es', 'cjs'],
      fileName: (format) => `chiperos-ai-components-library.${format === 'es' ? 'js' : 'cjs'}`,
    },
    rollupOptions: {
      // Asegúrate de externalizar las dependencias que no deben estar en el bundle
      external: ['react', 'react-dom', 'tailwindcss'],
      output: {
        // Proporciona nombres globales para las dependencias externalizadas
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          tailwindcss: 'tailwindcss',
        },
      },
    },
  },
  // Configuración de Vitest
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts', // si tienes un archivo de setup
    css: true,
  } as UserConfig['test'],
});
