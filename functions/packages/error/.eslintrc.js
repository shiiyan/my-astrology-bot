module.exports = {
  extends: ["../../.eslintrc.js"],
  parserOptions: {
    project: ["tsconfig.json", "tsconfig.dev.json"],
    tsconfigRootDir: __dirname,
  },
  ignorePatterns: [
    "/dist/**/*", // Ignore built files.
  ],
};
