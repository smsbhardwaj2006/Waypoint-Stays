import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: "/Waypoint-Stays/",   // must match your exact repo name, case-sensitive
})
