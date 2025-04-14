import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [tailwindcss(), react()],
  server:{
    proxy: {
      '/api': {
        target: 'http://192.168.43.154:3000', // change for backend
        changeOrigin: true,
        secure: false
      }
    }
  }
});