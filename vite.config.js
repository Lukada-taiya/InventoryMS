import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '^/api': {
        target: "https://localhost:7000/",
        secure: false
      },
      '^/login': {
        target: "https://localhost:7000/",
        secure: false
      },
      '^/pingauth': {
        target: "https://localhost:7000/",
        secure: false
      },
      '^/register': {
        target: "https://localhost:7000/",
        secure: false
      },
      '^/logout': {
        target: "https://localhost:7000/",
        secure: false
      },
    },
    port: 5173
  }
})
