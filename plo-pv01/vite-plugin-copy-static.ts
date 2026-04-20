import fs from 'fs'
import path from 'path'
import type { Plugin } from 'vite'

export default function copyStaticFiles(options: { files?: Array<{ src: string; dest: string }>; outDir?: string } = {}): Plugin {
  const { files = [], outDir = 'dist' } = options

  return {
    name: 'copy-static-files',
    writeBundle() {
      files.forEach(({ src, dest }) => {
        const srcPath = path.resolve(process.cwd(), src)
        const destPath = path.resolve(process.cwd(), outDir, dest)

        if (fs.existsSync(srcPath)) {
          fs.mkdirSync(path.dirname(destPath), { recursive: true })
          fs.copyFileSync(srcPath, destPath)
        }
      })
    }
  }
}
