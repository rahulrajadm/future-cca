import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Base path is only set to the repo subpath during the GitHub Pages deploy
// workflow (VITE_BASE_PATH=/future-cca/); local dev and preview use '/'.
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE_PATH ?? '/',
})
