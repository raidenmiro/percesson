const { configure, presets } = require('eslint-kit')

module.exports = configure({
  root: __dirname,
  presets: [
    presets.imports({
      sort: {
        newline: false,
      },
    }),
    presets.prettier(),
    presets.typescript(),
  ],
  extend: {
    extends: ['../../.eslintrc.json', 'plugin:@typescript-eslint/recommended', 'plugin:qwik/recommended'],
    overrides: [
      {
        files: ['*.ts', '*.tsx', '*.js', '*.jsx'],
        rules: {},
      },
    ],
    ignorePatterns: ['!**/*'],
    rules: {
      '@typescript-eslint/no-var-requires': 'off',
      'import/no-default-export': 'off',
    },
  },
})
