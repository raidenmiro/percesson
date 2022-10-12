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
    extends: ['../../.eslintrc.json', 'plugin:rxjs/recommended'],
    overrides: [
      {
        files: ['*.ts', '*.tsx', '*.js', '*.jsx'],
        rules: {},
      },
    ],
    ignorePatterns: ['!**/*'],
    rules: {},
  },
})
