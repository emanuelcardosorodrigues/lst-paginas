import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { readFileSync, writeFileSync, existsSync, rmSync } from "fs";
import { resolve } from "path";

function inlineCss() {
  return {
    name: "inline-css",
    enforce: "post" as const,
    apply: "build" as const,
    writeBundle(outputOptions: { dir?: string }) {
      const outDir = outputOptions.dir || resolve(import.meta.dirname, "../dist/plo-pv01");
      const htmlPath = resolve(outDir, "index.html");
      if (!existsSync(htmlPath)) return;

      let html = readFileSync(htmlPath, "utf-8");
      const cssLinkRegex = /<link rel="stylesheet"[^>]*href="([^"]+)"[^>]*>/g;
      let match;

      while ((match = cssLinkRegex.exec(html)) !== null) {
        if (match[0].includes("media=")) continue;
        const cssHref = match[1];
        const cssFile = cssHref.replace(/^\/p\/plo-pv01\//, "");
        const cssFilePath = resolve(outDir, cssFile);
        if (existsSync(cssFilePath)) {
          const cssContent = readFileSync(cssFilePath, "utf-8");
          html = html.replace(match[0], `<style>${cssContent}</style>`);
          rmSync(cssFilePath);
        }
      }

      writeFileSync(htmlPath, html);
    },
  };
}

export default defineConfig({
  base: "/p/plo-pv01/",
  plugins: [
    react(),
    tailwindcss(),
    inlineCss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
    },
    dedupe: ["react", "react-dom"],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, "../dist/plo-pv01"),
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          icons: ['lucide-react'],
        },
      },
    },
  },
  server: {
    port: 5174,
    host: "0.0.0.0",
  },
  preview: {
    port: 5174,
    host: "0.0.0.0",
  },
});
