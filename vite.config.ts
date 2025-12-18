import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import path from 'path';
import { fileURLToPath } from 'url';
import { UserConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';
import tailwindcss from '@tailwindcss/vite';
import { copyFileSync, mkdirSync, existsSync, readdirSync, statSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Plugin to copy fonts to dist
function copyFonts() {
  return {
    name: 'copy-fonts',
    writeBundle() {
      const fontsSource = path.resolve(__dirname, 'fonts');
      const fontsDest = path.resolve(__dirname, 'dist/fonts');
      
      if (existsSync(fontsSource)) {
        // Create dist/fonts directory if it doesn't exist
        if (!existsSync(fontsDest)) {
          mkdirSync(fontsDest, { recursive: true });
        }
        
        // Copy CaustenRound directory
        const caustenDir = path.join(fontsSource, 'CaustenRound');
        const caustenDest = path.join(fontsDest, 'CaustenRound');
        
        if (existsSync(caustenDir)) {
          if (!existsSync(caustenDest)) {
            mkdirSync(caustenDest, { recursive: true });
          }
          
          const files = readdirSync(caustenDir);
          files.forEach(file => {
            const srcFile = path.join(caustenDir, file);
            const destFile = path.join(caustenDest, file);
            if (statSync(srcFile).isFile()) {
              copyFileSync(srcFile, destFile);
            }
          });
        }
      }
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    tailwindcss(),
    dts({
      insertTypesEntry: true,
    }),
    copyFonts(),
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
      // Externalizar React, sus submódulos y todas las dependencias que usan React
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        'react/jsx-dev-runtime',
        'react-dom/client',
        'tailwindcss',
        // Externalizar dependencias que usan React para evitar duplicados
        '@radix-ui/react-radio-group',
        '@radix-ui/react-slot',
        '@radix-ui/react-switch',
        'lucide-react',
        'next-intl',
        'radix-ui',
      ],
      output: {
        // Proporciona nombres globales para las dependencias externalizadas
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'jsxRuntime',
          'react/jsx-dev-runtime': 'jsxDevRuntime',
          'react-dom/client': 'ReactDOMClient',
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
