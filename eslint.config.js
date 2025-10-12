// @ts-check
const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');
const unusedImports = require('eslint-plugin-unused-imports');
const prettier = require('eslint-config-prettier');
const prettierPlugin = require('eslint-plugin-prettier');

module.exports = tseslint.config(
  {
    files: ['**/*.ts'],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      ...angular.configs.tsRecommended,
      prettier,
    ],
    plugins: {
      'unused-imports': unusedImports,
      prettier: prettierPlugin,
    },
    processor: angular.processInlineTemplates,
    rules: {
      '@angular-eslint/prefer-signals': 'error',
      '@angular-eslint/component-class-suffix': ['off'],
      '@angular-eslint/directive-class-suffix': ['off'],
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          printWidth: 100,
          tabWidth: 2,
        },
      ],
    },
  },
  {
    files: ['**/*.html'],
    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility,
      prettier,
    ],
    rules: {},
  },
);
