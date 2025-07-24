import { defineConfig } from 'eslint/config';
import js from '@eslint/js';
import globals from 'globals';
import htmlPlugin from '@html-eslint/eslint-plugin';
import htmlParser from '@html-eslint/parser';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default defineConfig([
  // JS файлы
  {
    files: ['**/*.js'],
    ...js.configs.recommended,
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
    },
    plugins: {
      prettier,
    },
    rules: {
      'prettier/prettier': 'warn',
    },
  },

  // HTML файлы
  {
    files: ['**/*.html'],
    languageOptions: {
      parser: htmlParser,
    },
    plugins: {
      '@html-eslint': htmlPlugin,
    },
    rules: {
      ...htmlPlugin.configs.recommended.rules,
      '@html-eslint/indent': 'off',
      '@html-eslint/quotes': 'off',
      '@html-eslint/no-multiple-empty-lines': 'off',
      '@html-eslint/no-extra-spacing-attrs': 'off',
      '@html-eslint/attrs-newline': 'off',
      '@html-eslint/require-closing-tags': 'off',
    },
  },

  // Отключаем правила, конфликтующие с Prettier
  {
    rules: {
      ...prettierConfig.rules,
    },
  },
]);
