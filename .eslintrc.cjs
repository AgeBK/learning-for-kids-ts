module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname,
  },
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "jsx-a11y/no-autofocus": "off", // need autofocus for better user experience
    // best practices
    "array-callback-return": "error",
    "block-scoped-var": "error",
    complexity: "error",
    "consistent-return": "error",
    eqeqeq: ["error", "smart"],

    
    "guard-for-in": "error",
    "no-alert": "error",
    "no-caller": "error",
    "no-div-regex": "error",
    "no-eval": "error",
    "no-extend-native": "error",
    "no-extra-bind": "error",
    "no-extra-label": "error",
    "no-floating-decimal": "error",
    "no-implied-eval": "error",
    "no-iterator": "error",
    "no-labels": "error",
    "no-lone-blocks": "error",
    "no-loop-func": "error",
    "no-new": "error",
    "no-new-func": "error",
    "no-new-wrappers": "error",
    "no-proto": "error",
    "no-restricted-properties": "error",
    "no-return-assign": "error",
    "no-return-await": "error",
    "no-self-compare": "error",
    "no-sequences": "error",
    "no-throw-literal": "error",
    "no-unmodified-loop-condition": "error",
    "no-unused-expressions": "error",
    "no-useless-call": "error",
    "no-useless-concat": "error",
    "no-useless-escape": "error",
    "no-useless-return": "error",
    "no-void": "error",
    "no-with": "error",
    radix: "error",
    "require-await": "error",
    "wrap-iife": "error",
    yoda: "error",

    // stylistic
    camelcase: "warn",
    "consistent-this": ["warn", "that"],
    "func-name-matching": "error",
    "func-style": ["warn", "declaration", { allowArrowFunctions: true }],
    "lines-between-class-members": [
      "error",
      "always",
      { exceptAfterSingleLine: true },
    ],
    "max-depth": "warn",
    "max-lines": ["warn", 1000],
    "max-params": ["warn", 4],
    "no-array-constructor": "warn",
    "no-bitwise": "warn",
    "no-lonely-if": "error",
    "no-multi-assign": "warn",
    "no-nested-ternary": "warn",
    "no-new-object": "warn",
    "no-underscore-dangle": "warn",
    "no-unneeded-ternary": "warn",
    "one-var": ["warn", "never"],
    "operator-assignment": "warn",
    "padding-line-between-statements": "error",

    // es2015
    "no-duplicate-imports": "error",
    "no-useless-computed-key": "error",
    "no-useless-rename": "error",
    "no-var": "error",
    "object-shorthand": "error",
    "prefer-arrow-callback": "error",
    "prefer-const": "error",
    "prefer-destructuring": ["warn", { object: true, array: false }],
    "prefer-numeric-literals": "warn",
    "prefer-rest-params": "warn",
    "prefer-spread": "warn",
  },
};