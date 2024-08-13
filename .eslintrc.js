module.exports = {
  plugins: ['prettier', '@typescript-eslint', 'import', 'simple-import-sort'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  rules: {
    'prettier/prettier': 'error',
    'no-console': 'warn',
    'no-debugger': 'error',
    semi: ['error', 'never'],
    quotes: ['error', 'single'],
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    '@typescript-eslint/explicit-module-boundary-types': 'warn', // Advertencia para tipos de función
    '@typescript-eslint/no-explicit-any': 'warn', // Advertencia para uso de `any`
    '@typescript-eslint/explicit-function-return-type': 'warn' // Advertencia para tipos de retorno de función
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx']
    }
  ]
}
