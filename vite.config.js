import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base './' funciona tanto en usuario.github.io como en /nombre-repo/
export default defineConfig({
  plugins: [react()],
  base: './',
})
