import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: './src/**/*.graphql',
  generates: {
    './src/generated/graphql.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
      config: {
        useIndexSignature: true,
        useTypeImports: true,
        contextType: '../context#Context',
      },
    },
  },
}

export default config
