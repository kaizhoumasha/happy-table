import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import tseslint from 'typescript-eslint'
import globals from 'globals'
import eslintConfigPrettier from 'eslint-config-prettier'

export default tseslint.config(
  // Ignore patterns for build artifacts and dependencies
  { ignores: ['dist/**', 'node_modules/**', '*.d.ts', '**/coverage', 'docs/**/*.generated.*'] },

  // Base configurations
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs['flat/recommended'],

  // Main configuration for all files
  {
    files: ['**/*.{js,mjs,cjs,ts,vue}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      // Vue specific rules - balanced for library development
      'vue/multi-word-component-names': 'off', // Allow single-word component names for lib
      'vue/no-unused-vars': 'error',
      'vue/no-unused-components': 'warn',
      'vue/component-definition-name-casing': ['error', 'PascalCase'],
      'vue/component-name-in-template-casing': ['error', 'PascalCase'],
      'vue/no-v-html': 'warn',
      'vue/block-lang': ['error', { script: { lang: 'ts' } }], // Enforce TypeScript
      'vue/component-api-style': ['error', ['script-setup', 'composition']], // Modern Vue

      // TypeScript specific rules - strict for library quality
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/explicit-function-return-type': 'off', // Let inference work
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/prefer-optional-chain': 'off', // Requires type information
      '@typescript-eslint/prefer-nullish-coalescing': 'off', // Requires type information
      '@typescript-eslint/no-unnecessary-type-assertion': 'off', // Requires type information

      // General quality rules for library development
      'no-console': 'warn', // Allow but warn for debugging remnants
      'no-debugger': 'error',
      'prefer-const': 'error',
      'no-var': 'error',
      'object-shorthand': 'error',
      'prefer-template': 'error',
      eqeqeq: ['error', 'always'],
      'no-unused-expressions': 'error',
      'no-duplicate-imports': 'error',
    },
  },

  // Vue single-file components specific configuration
  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser, // Use TypeScript parser for <script> blocks
        extraFileExtensions: ['.vue'],
      },
    },
    rules: {
      // Vue template formatting (relaxed for better DX)
      'vue/html-indent': ['error', 2],
      'vue/max-attributes-per-line': 'off',
      'vue/singleline-html-element-content-newline': 'off',
      'vue/html-self-closing': [
        'error',
        {
          html: { void: 'never', normal: 'any', component: 'always' },
          svg: 'always',
          math: 'always',
        },
      ],
    },
  },

  // TypeScript declaration files
  {
    files: ['**/*.d.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/triple-slash-reference': 'off',
    },
  },

  // Configuration files
  {
    files: ['vite*.config.ts', 'vitest.config.ts', 'eslint.config.js'],
    rules: {
      'no-console': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },

  // Development and demo files (less strict)
  {
    files: ['src/App.vue', 'src/components/demos/**'],
    rules: {
      'no-console': 'off', // Allow console in demo files
      '@typescript-eslint/no-explicit-any': 'off',
      'vue/no-v-html': 'off',
    },
  },

  // Prettier integration - MUST be last to override conflicting rules
  eslintConfigPrettier
)
