import { defineConfig } from 'vite'
import copyStaticFiles from './vite-plugin-copy-static.js'

export default defineConfig({
  plugins: [
    copyStaticFiles({
      files: [
        { src: 'public/robots.txt', dest: 'dpl-pv01/robots.txt' }
      ],
      outDir: 'dist'
    })
  ],
  base: '/dpl-pv01/',
  build: {
    outDir: 'dist/dpl-pv01',
    emptyOutDir: true,
    target: 'esnext',
    minify: 'esbuild',
    cssMinify: true,
    cssCodeSplit: true,
    rollupOptions: {
      input: {
        main: './src/main-entry.js',
      },
      output: {
        manualChunks: (id) => {
          // Vendor modules
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
  },
})
