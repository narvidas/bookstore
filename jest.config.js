module.exports = {
  setupFilesAfterEnv: ["<rootDir>/rtl.setup.js"],
  testPathIgnorePatterns: ["node_modules"],
  coveragePathIgnorePatterns: ["node_modules"],
  reporters: ["default", ["jest-junit", { outputDirectory: "testReport" }]],
  coverageDirectory: "testReport",
  coverageReporters: ["text", "cobertura", "lcov"]
};
