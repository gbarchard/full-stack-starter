import { CodegenConfig } from '@graphql-codegen/cli'
const config: CodegenConfig = {
  overwrite: true,
  schema: '../backend/src/**/*.graphql',
  documents: ['src/**/*.gql'],
  generates: {
    // Use a path that works the best for the structure of your application
    './src/types.generated.ts': {
      plugins: ['typescript'],
      config: {
        // Apollo Client always includes `__typename` fields
        nonOptionalTypename: true,
        // Apollo Client doesn't add the `__typename` field to root types so
        // don't generate a type for the `__typename` for root operation types.
        skipTypeNameForRoot: true,
      },
    },
    'src/': {
      preset: 'near-operation-file',
      presetConfig: {
        extension: '.generated.tsx',
        baseTypesPath: 'types.generated.ts',
      },
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
    },
  },
}
export default config
