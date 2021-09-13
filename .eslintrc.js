module.exports = {
  extends: ['react-app', 'react-app/jest', 'eslint:recommended', 'prettier'],
  plugins: ['react', 'react-hooks', 'testing-library', 'prettier'],
  rules: {
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
    camelcase: 'error',
    semi: ['error', 'always'],
    quotes: [
      'error',
      'single',
      {
        allowTemplateLiterals: true,
        avoidEscape: true,
      },
    ],
    'global-require': 'off',
    'arrow-body-style': 'off',
    'no-console': ['error', { allow: ['error', 'warn'] }],
    'no-nested-ternary': 'off',
    'no-param-reassign': [
      'error',
      {
        props: false,
      },
    ],
    'no-plusplus': 'off',
    'no-shadow': ['error', { allow: ['data', 'contextValue', 'value'] }],
    'no-underscore-dangle': ['error', { allow: ['__typename'] }],
    'no-unused-expressions': [
      'error',
      {
        allowShortCircuit: true,
        allowTaggedTemplates: true,
        allowTernary: true,
      },
    ],
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/label-has-associated-control': [
      'error',
      {
        required: {
          some: ['nesting', 'id'],
        },
      },
    ],
    'import/prefer-default-export': 'off',
    'import/no-cycle': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/no-unresolved': 'off',
    'import/order': [
      'error',
      {
        groups: [
          ['builtin', 'external', 'internal'],
          ['parent', 'index', 'sibling'],
        ],
        'newlines-between': 'always',
      },
    ],
  },
};
