module.exports = {
  root: true,

  env: { es6: true, node: true, browser: true, },

  parser: '@typescript-eslint/parser',

  extends: [
    'prettier',
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "airbnb-typescript",
    "plugin:import/recommended",
  ],
  plugins: ['import', '@typescript-eslint', 'react'],
  settings: {
    // NOTE: 아래 내용을 추가해야 ts 로 추가한 alias paths 설정을 eslint 에서 읽을 수 있음
    'import/resolver': {
      typescript: {
        project: '*/tsconfig.json',
      },
    },
  },
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ['./tsconfig.eslint.json', './packages/*/tsconfig.json'],
  },
  ecmaFeatures:  {
    jsx:  true,  // Allows for the parsing of JSX
  },
  rules: {
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
    'import/no-unresolved': 'error',
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/no-unused-vars': 'error',

    // Ensure consistent use of file extension within the import path
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/extensions.md
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': 'off',

    // NOTE: 유용하게 쓰일 수 있음
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/require-await': 'off',

    "@typescript-eslint/strict-boolean-expressions": 'off',

    // https://typescript-eslint.io/linting/troubleshooting/performance-troubleshooting#eslint-plugin-import
    'import/named': 'off',
    'import/namespace': 'off',
    'import/default': 'off',
    'import/no-named-as-default-member': 'off',
    'import/no-named-as-default': 'off',
    'import/no-cycle': 'off',
    'import/no-unused-modules': 'off',
    'import/no-deprecated': 'off',
    'import/no-duplicates': 'error',

    'import/order': [
      'error',
      {
        groups: [['builtin', 'external', 'internal'], 'parent', 'sibling', 'index'],
        pathGroups: [],
        pathGroupsExcludedImportTypes: ['@tanstack*'],
        alphabetize: {
          order: 'asc',
        },
      },
    ],

    '@typescript-eslint/no-use-before-define': 'off',

    'no-multiple-empty-lines': ['error', { max: 1, maxBOF: 0, maxEOF: 0 }],
    'react/jsx-props-no-multi-spaces': 'error',
    'key-spacing': ['error', { beforeColon: false }],
    'eol-last': ['error', 'always'],
    'no-trailing-spaces': 'error',
    'no-multi-spaces': 'error',

    'curly': ['error', 'all'],
    'eqeqeq': ['error', 'always', { null: 'ignore' }],

    "object-curly-newline": ["error", { "multiline": true }],
    "object-curly-spacing": ["error", "always"],

    "react/jsx-indent" : ["error", 2],
    "react/jsx-indent-props": ["error", 2],

    // react jsx 관련 lint
    "react/jsx-indent" : ["error", 2],
    "react/jsx-indent-props": ["error", 2],
    "react/jsx-newline": ["error", { "prevent": false }],
    "react/jsx-tag-spacing": ["error", { "beforeSelfClosing": "proportional-always", "closingSlash": "never" }],
    "react/jsx-space-before-closing": ["error"],
    "react/jsx-closing-bracket-location": ["error"],
    "react/jsx-closing-tag-location": ["error"],
    "react/jsx-first-prop-new-line": ["error", "multiline"]
  },
};
