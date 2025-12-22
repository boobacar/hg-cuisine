import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin, type ResolvedConfig } from 'vite'

const projectRoot = fileURLToPath(new URL('.', import.meta.url))

// Copy the built SPA shell so static hosts can serve it on deep-link refreshes.
function spaFallbackPlugin(): Plugin {
  let outDir = 'dist'

  return {
    name: 'spa-fallback-plugin',
    configResolved(config: ResolvedConfig) {
      outDir = config.build.outDir
    },
    closeBundle() {
      const distDir = path.resolve(projectRoot, outDir)
      const indexHtml = path.join(distDir, 'index.html')
      const fallbackFiles = ['404.html', '200.html']

      if (!fs.existsSync(indexHtml)) {
        return
      }

      fallbackFiles.forEach((filename) => {
        fs.copyFileSync(indexHtml, path.join(distDir, filename))
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), spaFallbackPlugin()],
})
