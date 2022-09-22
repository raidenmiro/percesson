const standardConfig = require("prettier-config-standard");

/**
 * @type {import('prettier').Options}
 */
module.exports = {
  ...standardConfig,
  singleQuote: true,
  printWidth: 120,
  tabWidth: 2,
  trailingComma: "all",
  arrowParens: "avoid",
};
