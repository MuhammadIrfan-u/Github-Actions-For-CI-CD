import js from "@eslint/js";
import globals from "globals";

export default [
  {
    files: ["**/*.js"],
    ignores: ["node_modules"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest, // ✅ Add Jest globals
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      "no-unused-vars": "warn", // ✅ show as warning, not error
    },
  },
];
