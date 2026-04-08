import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [],
  base: '/dpl-pv01/',
  build: {
    outDir: 'dist/dpl-pv01',
    emptyOutDir: true,
    cssMinify: true,
    minify: 'esbuild',
  },
})
