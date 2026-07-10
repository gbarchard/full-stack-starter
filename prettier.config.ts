import { type Config } from 'prettier'

const config = {
  plugins: ['prettier-plugin-organize-imports', 'prettier-plugin-tailwindcss'],
  semi: false,
  singleQuote: true,
  tailwindAttributes: ['theme'],
  tailwindFunctions: ['twMerge', 'createTheme'],
  tailwindStylesheet: './frontend/src/index.css',
} satisfies Config & import('prettier-plugin-tailwindcss').PluginOptions

export default config
