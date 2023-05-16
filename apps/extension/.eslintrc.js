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
    presets.solidJs(),
    presets.effector({ strict: true }),
    presets.typescript(),
  ],
  extend: {
    extends: ['../../.eslintrc.json'],
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
