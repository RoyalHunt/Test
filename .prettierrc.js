module.exports = {
  arrowParens: 'avoid',
  bracketSpacing: true,
  embeddedLanguageFormatting: 'auto',
  endOfLine: 'lf',
  htmlWhitespaceSensitivity: 'css',
  insertPragma: false,
  jsxBracketSameLine: false,
  jsxSingleQuote: false,
  printWidth: 80,
  proseWrap: 'preserve',
  quoteProps: 'as-needed',
  requirePragma: false,
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'es5',
  useTabs: false,
  overrides: [
    {
      files: ['.babelrc', '.prettierrc', '.eslintrc', 'package.json'],
      options: {
        parser: 'json',
      },
    },
    {
      files: '**/*.css',
      options: { parser: 'css' },
    },
    {
      files: '**/*.md',
      options: { parser: 'markdown' },
    },
    {
      files: '**/*.graphql',
      options: { parser: 'graphql' },
    },
    {
      files: '**/*.yaml',
      options: { parser: 'yaml' },
    },
  ],
};
