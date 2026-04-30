import { type Config } from 'prettier'

const config = {
  plugins: ['prettier-plugin-tailwindcss', 'prettier-plugin-organize-imports'],
  semi: false,
  singleQuote: true,
  tailwindAttributes: ['theme'],
  tailwindFunctions: ['twMerge', 'createTheme'],
} satisfies Config

export default config
