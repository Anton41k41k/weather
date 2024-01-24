module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: "eslint:recommended",
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  "rules": {
    "consistent-return": 2,
    "indent": [1, 4],
    "no-else-return": 1,
    "semi": [1, "always"],
    "space-unary-ops": 2,
  },
};
