/** @type {import('prettier').Config} */
export default {
  plugins: ["prettier-plugin-tailwindcss"],
  semi: false,
  // tailwindcss
  tailwindAttributes: ["theme"],
  tailwindFunctions: ["twMerge", "createTheme"],
};
