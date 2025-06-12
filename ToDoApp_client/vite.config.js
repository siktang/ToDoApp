import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,         // Use describe, it, expect globally
    environment: 'jsdom',  // Simulates the DOM for React
    setupFiles: './src/tests/setup.js', // Optional: setup file
  },
})
