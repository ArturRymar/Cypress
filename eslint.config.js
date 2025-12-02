import js from '@eslint/js';
import cypress from 'eslint-plugin-cypress';
import globals from 'globals';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: { js, cypress },
    extends: [
      'js/recommended',
      'eslint:recommended',
      'plugin:cypress/recommended',
    ],
    languageOptions: { globals: { ...globals.node, ...globals.jest } },
    rules: {
      'no-unused-vars': 'warn',
      'no-duplicate-case': 'error',
    },
    ignores: ['cypress.config.js'],
  },
]);