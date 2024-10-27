import globals from "globals";
import pluginJs from "@eslint/js";
import eslintPluginPrettier from "eslint-plugin-prettier/recommended";

export default [
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  eslintPluginPrettier,
  {
    env: {
      browser: true,
      es2021: true,
      jest: true,
    },
    extends: "eslint:recommended",
    overrides: [
      {
        files: ["**/*.test.js"],
        env: { jest: true },
        plugins: ["jest"],
        extends: ["plugin:jest/recommended"],
        rules: { "jest/prefer-expect-assertions": "off" },
      },
      {
        files: ["**/*.cy.js"],
        env: { "cypress/globals": true },
        plugins: ["cypress"],
        extends: ["plugin:cypress/recommended"],
        rules: {
          "cypress/no-unnecessary-waiting": "off",
          "no-unused-vars": "off",
        },
      },
    ],
    parserOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    rules: {
      "prettier/prettier": [
        "error",
        {
          endOfLine: "auto",
        },
      ],
    },
  },
];
