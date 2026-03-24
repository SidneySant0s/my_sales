import eslintPlugin from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  eslintPlugin.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.ts", "**/*.js"],
    ignores: ["node_modules", "dist", "build", "/*.js"],
    languageOptions: {
      parser: tseslint.parser,
      globals: {
        console: "readonly",
        exports: "readonly",
        module: "readonly",
        require: "readonly"
      }
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
    },
    rules: {
    "no-console": "warn"
  }
  },
];
