import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import flowbiteReact from "flowbite-react/plugin/vite"
import checker from "vite-plugin-checker"

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    flowbiteReact(),
    checker({ typescript: { tsconfigPath: "./tsconfig.app.json" } }),
  ],
})
