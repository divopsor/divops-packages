module.exports = {
  root: true,
  env: { es6: true, node: true },
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    allowAutomaticSingleRunInference: true,
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.eslint.json', './packages/*/tsconfig.json', './packages/*/*/tsconfig.json'],
  },
  plugins: ['@typescript-eslint'],
  overrides: [
    {
      files: ['.eslintrc.cjs'],
      rules: {
        '@typescript-eslint/no-unsafe-assignment': 'off',
      },
    },
  ],
  rules: {
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
    'prettier/prettier': 'off',
    'eol-last': ["error", "always"]
  },
};
