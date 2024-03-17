module.exports = {
  testTimeout: 70000,
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "^@/(.*)$": "<rootDir>/src/$1", // Add this line to map TypeScript aliases
  },
  testMatch: ["**/*.steps.ts", "**/*.steps.tsx"],
  verbose: true,
  transformIgnorePatterns: ["node_modules/(?!@ngrx|(?!deck.gl)|ng-dynamic)"],
  setupFiles: ["./jest-cucumber-config"],
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(t|j)sx?$": ["@swc/jest"],
  },
};
