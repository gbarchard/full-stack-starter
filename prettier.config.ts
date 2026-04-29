import { type Config } from "prettier"

const config = {
  plugins: ["prettier-plugin-tailwindcss"],
  semi: false,
  tailwindAttributes: ["theme"],
  tailwindFunctions: ["twMerge", "createTheme"],
} satisfies Config

export default config
