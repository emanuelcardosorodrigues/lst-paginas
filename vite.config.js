import { defineConfig } from 'vite'
import { readFileSync, writeFileSync, existsSync, rmSync } from 'fs'
import { resolve } from 'path'

function inlineCss() {
  return {
    name: 'inline-css',
    enforce: 'post',
    apply: 'build',
    writeBundle() {
      const htmlPath = resolve('dist/dpl-pv01/index.html')
      if (!existsSync(htmlPath)) return

      let html = readFileSync(htmlPath, 'utf-8')
      const cssLinkRegex = /<link rel="stylesheet"[^>]*href="([^"]+)"[^>]*>/g
      let match

      while ((match = cssLinkRegex.exec(html)) !== null) {
        if (match[0].includes('media="print"')) continue
        const cssHref = match[1]
        const cssFile = cssHref.replace(/^\/p\/dpl-pv01\//, 'dist/dpl-pv01/')
        const cssFilePath = resolve(cssFile)
        if (existsSync(cssFilePath)) {
          const cssContent = readFileSync(cssFilePath, 'utf-8')
          html = html.replace(match[0], `<style>${cssContent}</style>`)
          rmSync(cssFilePath)
        }
      }

      writeFileSync(htmlPath, html)
    },
  }
}

export default defineConfig({
  plugins: [inlineCss()],
  base: '/p/dpl-pv01/',
  build: {
    outDir: 'dist/dpl-pv01',
    emptyOutDir: true,
    cssMinify: true,
    minify: 'esbuild',
  },
})
