module.exports = {
  plugins: ['prettier', '@typescript-eslint', 'import', 'simple-import-sort'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  rules: {
    'prettier/prettier': [
      'error',
      { singleQuote: true, arrowParens: 'avoid', semi: true }
    ], // Prettier requiere punto y coma
    'no-console': 'warn',
    'no-debugger': 'error',
    semi: ['error', 'always'], // ESLint requiere punto y coma
    quotes: ['error', 'single'],
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    '@typescript-eslint/explicit-module-boundary-types': 'warn',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/explicit-function-return-type': 'warn',
    'object-shorthand': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    'import/first': 'error'
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx']
    }
  ]
};
