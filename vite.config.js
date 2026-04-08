import { defineConfig } from 'vite'

export default defineConfig({
  base: '/dpl-pv01/',
  build: {
    outDir: 'dist/dpl-pv01',
    emptyOutDir: true,
    cssMinify: true,
    minify: 'esbuild',
  },
})
