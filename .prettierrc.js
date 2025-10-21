/**
 * Prettier Configuration for Vue 3 + TypeScript Library Development
 *
 * Based on Context7 best practices and optimized for:
 * - Vue 3 SFC (Single File Components)
 * - TypeScript expressions in templates
 * - Library development conventions
 * - Team collaboration
 */

export default {
  // Core formatting options
  semi: false, // No semicolons (matches Vue ecosystem)
  singleQuote: true, // Single quotes for strings
  quoteProps: 'as-needed', // Only quote props when necessary
  trailingComma: 'es5', // Trailing commas where valid in ES5

  // Indentation and spacing
  tabWidth: 2, // 2-space indentation
  useTabs: false, // Use spaces, not tabs
  printWidth: 100, // Line length (slightly longer for lib dev)

  // Bracket and parentheses handling
  bracketSpacing: true, // Spaces inside object literals
  bracketSameLine: false, // Put closing brackets on new line
  arrowParens: 'avoid', // Avoid parentheses around single arrow function params

  // Vue-specific options
  vueIndentScriptAndStyle: false, // Don't indent <script> and <style> tags

  // End of line
  endOfLine: 'lf', // Unix line endings

  // Embedded languages
  embeddedLanguageFormatting: 'auto', // Format embedded languages (CSS, JS in Vue)

  // HTML-related (affects Vue templates)
  htmlWhitespaceSensitivity: 'css', // Respect CSS display property for whitespace

  // File-specific overrides
  overrides: [
    {
      files: '*.vue',
      options: {
        // Vue SFC specific settings
        parser: 'vue',
        vueIndentScriptAndStyle: false,
        // Slightly more compact for Vue templates
        printWidth: 120,
        htmlWhitespaceSensitivity: 'ignore',
      },
    },
    {
      files: ['*.ts', '*.tsx'],
      options: {
        // TypeScript specific settings
        parser: 'typescript',
        semi: false,
        singleQuote: true,
        trailingComma: 'es5',
      },
    },
    {
      files: '*.json',
      options: {
        // JSON files should have semis and double quotes
        parser: 'json',
        semi: false,
        singleQuote: false,
        trailingComma: 'none',
      },
    },
    {
      files: '*.md',
      options: {
        // Markdown formatting
        parser: 'markdown',
        printWidth: 80,
        proseWrap: 'preserve',
        endOfLine: 'lf',
      },
    },
    {
      files: ['package.json', '*.config.js', '*.config.ts'],
      options: {
        // Config files - more lenient
        printWidth: 120,
        trailingComma: 'es5',
      },
    },
  ],
}
