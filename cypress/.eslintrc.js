module.exports = {
  root: true,
  plugins: ['eslint-plugin-cypress'],
  extends: [
    'plugin:cypress/recommended',
    'plugin:prettier/recommended',
    'prettier/react',
    'eslint-config-prettier/@typescript-eslint',
    'prettier/@typescript-eslint'
  ],
  env: {
    'cypress/globals': true
  },
  overrides: [
    {
      files: '**/*.+(ts|tsx)',
      parser: '@typescript-eslint/parser'
    }
  ]
}
