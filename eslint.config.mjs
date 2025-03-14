import eslint from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier/flat'
import drizzle from 'eslint-plugin-drizzle'
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import globals from 'globals'
import neostandard, { resolveIgnoresFromGitignore } from 'neostandard'
import tseslint from 'typescript-eslint'

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { languageOptions: { globals: globals.node } },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...neostandard({
    ignores: resolveIgnoresFromGitignore(),
  }),
  {
    rules: {
      '@stylistic/jsx-quotes': ['error', 'prefer-double'],
      '@stylistic/max-len': [
        'warn',
        {
          code: 80,
          ignoreComments: false,
          ignoreUrls: true,
          tabWidth: 2,
        },
      ],
      '@stylistic/space-before-function-paren': [
        'error',
        {
          anonymous: 'always',
          asyncArrow: 'always',
          named: 'never',
        },
      ],
      'sort-keys': [
        'error',
        'asc',
        { caseSensitive: true, minKeys: 2, natural: true },
      ],
    },
  },
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'simple-import-sort/exports': 'error',
      'simple-import-sort/imports': 'error',
    },
  },
  {
    plugins: {
      drizzle,
    },
    rules: {
      ...drizzle.configs.recommended.all,
    },
  },
  eslintPluginPrettier,
  {
    rules: {
      'prettier/prettier': [
        'error',
        {
          arrowParens: 'always',
          printWidth: 80,
          semi: false,
          singleQuote: true,
          tabWidth: 2,
          trailingComma: 'all',
        },
      ],
    },
  },
  eslintConfigPrettier,
]
