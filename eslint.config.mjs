import tsParser from "@typescript-eslint/parser";
import { includeIgnoreFile } from "@eslint/compat";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const gitignorePath = path.resolve(__dirname, ".gitignore");
const prettierignorePath = path.resolve(__dirname, ".prettierignore");

export default [
  includeIgnoreFile(gitignorePath),
  includeIgnoreFile(prettierignorePath),
  {
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 13,
      sourceType: "module",
    },
    rules: {
      "no-whitespace-before-property": "error",
      semi: "error",
      "no-eval": "error",
      "no-empty-function": "warn",
      "no-inline-comments": "error",
      "no-multi-spaces": "error",
      "no-var": "error",
      "no-debugger": "error",
      "no-tabs": "error",
      "no-unused-vars": "warn",
      "no-unused-expressions": "error",
      "no-unreachable-loop": "error",
      "no-unreachable": "error",
      "no-unsafe-negation": "error",
      "no-unused-labels": "error",
      "no-async-promise-executor": "error",
      strict: "error",
      "no-multiple-empty-lines": [
        "error",
        {
          max: 2,
          maxEOF: 1,
          maxBOF: 0,
        },
      ],

      "max-nested-callbacks": [
        "error",
        {
          max: 3,
        },
      ],

      "no-floating-decimal": "error",
      "no-trailing-spaces": "error",
    },
  },
  {
    files: ["**/*.ts"],
  },
];
