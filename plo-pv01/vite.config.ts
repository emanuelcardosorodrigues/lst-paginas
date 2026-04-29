import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import copyStaticFiles from "./vite-plugin-copy-static.ts";

export default defineConfig({
  base: "/plo-pv01/",
  plugins: [
    react(),
    tailwindcss(),
    copyStaticFiles({
      files: [
        { src: 'public/robots.txt', dest: 'plo-pv01/robots.txt' }
      ],
      outDir: '../dist'
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
      react: "preact/compat",
      "react-dom": "preact/compat",
      "react-dom/test-utils": "preact/test-utils",
      "react/jsx-runtime": "preact/jsx-runtime",
    },
    dedupe: ["react", "react-dom"],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, "../dist/plo-pv01"),
    emptyOutDir: true,
    target: 'esnext',
    minify: 'esbuild',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Preact/React core
          if (id.includes('preact') || id.includes('react')) {
            return 'preact';
          }
          // Icons
          if (id.includes('lucide-react')) {
            return 'icons';
          }
          // Tailwind/Styles
          if (id.includes('tailwindcss') || id.includes('@tailwindcss')) {
            return 'styles';
          }
          // Vendor (other third-party)
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
    chunkSizeWarningLimit: 600,
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
