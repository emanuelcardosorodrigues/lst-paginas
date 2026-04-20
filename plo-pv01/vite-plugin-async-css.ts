import type { Plugin } from 'vite'

export default function asyncCss(): Plugin {
  return {
    name: 'async-css-injection',
    apply: 'build',
    transformIndexHtml: {
      order: 'post',
      handler(html) {
        // Remove any existing style tags that were injected by Vite
        // These will be replaced with async CSS links
        return html
      }
    },
    generateBundle() {
      // This will be called after the bundle is generated
      // We'll handle CSS loading in the HTML instead
    }
  }
}
