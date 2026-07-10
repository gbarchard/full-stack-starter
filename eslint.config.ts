import eslint from '@eslint/js'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig } from 'eslint/config'
import tseslint from 'typescript-eslint'

export default defineConfig([
  eslint.configs.recommended,
  tseslint.configs.recommended,
  {
    plugins: {
      // @ts-expect-error this works, but react hooks is being difficult
      'react-hooks': reactHooks,
      react,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react/jsx-key': 'error',
    },
  },
  reactRefresh.configs.recommended,
  {
    ignores: [
      '**/*.generated.tsx',
      '**/*.generated.ts',
      '**/graphql.ts',
      '**/node_modules/**',
      '**/dist/**',
    ],
  },
])
