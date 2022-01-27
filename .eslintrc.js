module.exports = {
  root: true,
  env: {
    node: true,
  },
  parser: "vue-eslint-parser",
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/typescript"
  ],
  parserOptions: {
    "parser": "@typescript-eslint/parser"
  },
  rules: {
    "no-unused-vars": "off",
    "vue/multi-word-component-names": "off",
    "vue/no-reserved-keys": "off"
  },
  "ignorePatterns": ["dist"],
};
