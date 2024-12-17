import globals from "globals";
import { Linter } from "eslint";
import svelteParser from "svelte-eslint-parser";
import sveltePlugin from "eslint-plugin-svelte";

/** @type {Linter.FlatConfig[]} */
export default [
  {
    ignores: [
      "**/node_modules/**",
      "**/.svelte-kit/**",
      "**/vite.config.js",
      "**/postcss.config.js",
      "**/svelte.config.js",
      "**/build/**",
    ],
    languageOptions: {
      parser: svelteParser, // Use the Svelte parser for .svelte files
      parserOptions: {
        ecmaVersion: 2021, // Modern JavaScript features
        sourceType: "module", // Use ES modules
        extraFileExtensions: [".svelte"], // Allow .svelte files
      },
      globals: globals.browser, // Enable browser globals (like window, document, etc.)
    },
    plugins: {
      svelte: sveltePlugin, // Use the official Svelte plugin
    },
    rules: {
      "no-unused-vars": ["warn"], // Warn on unused variables
      "no-console": "off", // Allow console statements
      "indent": ["error", 2], // Default: Enforce 2 spaces for indentation
    },
  },
  {
    files: ["*.svelte"], // Apply specific rules for Svelte files
    languageOptions: {
      parser: svelteParser, // Ensure Svelte parser is applied for Svelte files
    },
    rules: {
      "svelte/no-unused-class-name": ["warn"], // Warn for unused class names in Svelte
      "svelte/valid-prop-naming": ["error"], // Enforce valid prop names
    },
  },
  {
    files: ["**/+page.server.js"], // Apply specific rules for +page.server.js files
    rules: {
      "indent": ["error", 4], // Enforce 4 spaces for indentation
    },
  },
];
