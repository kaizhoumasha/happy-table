import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import dts from 'unplugin-dts/vite'

// Library build configuration for publishing components
export default defineConfig({
  plugins: [
    tailwindcss(),
    vue(),
    dts({
      tsconfigPath: './tsconfig.json',
      outDir: 'dist/types',
      insertTypesEntry: true,
      copyDtsFiles: true,
      include: ['src/**/*.ts', 'src/**/*.vue'],
      exclude: ['src/**/*.spec.ts', 'src/**/*.test.ts'],
      rollupTypes: true,
      staticImport: true,
      clearPureImport: true,
    }),
  ],
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'HappyTable',
      fileName: format => `happy-table.${format}.js`,
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: { vue: 'Vue' },
        assetFileNames: assetInfo => {
          if (assetInfo.name === 'style.css') return 'style.css'
          if (assetInfo.name === 'auto.css') return 'auto.css'
          if (assetInfo.name === 'index.css') return 'style.css'
          return assetInfo.name || '[name][extname]'
        },
      },
      input: {
        main: 'src/index.ts',
        style: 'src/style.css',
        auto: 'src/auto.css',
      },
      preserveModules: false,
    },
    cssCodeSplit: true,
    sourcemap: true,
    emptyOutDir: true,
  },
})
