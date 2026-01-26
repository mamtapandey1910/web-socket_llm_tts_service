module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/src", "<rootDir>/tests"],
  testMatch: ["**/tests/**/*.ts", "**/?(*.)+(spec|test).ts"],
  collectCoverageFrom: ["src/**/*.ts", "!src/**/*.d.ts"],
};
