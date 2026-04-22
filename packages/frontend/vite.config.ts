import path from 'node:path'

import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const workspaceRoot = path.resolve(__dirname, '../..')
  const env = {
    ...loadEnv(mode, workspaceRoot, ''),
    ...process.env
  }
  const port = Number(env.FRONTEND_PORT || 5173)

  return {
    envDir: workspaceRoot,
    plugins: [react()],
    server: {
      host: true,
      port,
      proxy: {
        '/api': {
          changeOrigin: true,
          target: env.VITE_API_PROXY_TARGET || 'http://localhost:4000'
        }
      }
    }
  }
})
