/** @format */

// build: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
// ci: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
// docs: Documentation only changes
// feat: A new feature
// fix: A bug fix
// perf: A code change that improves performance
// refactor: A code change that neither fixes a bug nor adds a feature
// style: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
// test: Adding missing tests or correcting existing tests

const typeEnum = [
  "feat",
  "fix",
  "chore",
  "docs",
  "style",
  "refactor",
  "test",
  "revert",
  "perf",
];

module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "subject-case": [2, "always", "sentence-case"],
    "subject-empty": [2, "never"],
    "type-empty": [2, "never"],
    "type-enum": [2, "always", typeEnum],
  },
  plugins: [
    {
      rules: {
        "type-enum": ({ type, subject }) => {
          if (typeEnum?.includes(type) && /^\[otto-\d+\] /.test(subject)) {
            return [true];
          }
          return [
            false,
            !/^\[otto-\d+\] /.test(subject)
              ? `Commit message should start with <type>: '[otto-<number>] '.`
              : !typeEnum?.includes(type) &&
              `Type should be 'feat',
                'fix',
                'chore',
                'docs',
                'style',
                'refactor',
                'test',
                'revert',`,
          ];
        },
      },
    },
  ],
};