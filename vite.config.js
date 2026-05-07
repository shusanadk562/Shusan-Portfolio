import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  // कस्टम डोमेन प्रयोग गर्दा base लाई '/' राख्नुपर्छ
  base: '/', 
})