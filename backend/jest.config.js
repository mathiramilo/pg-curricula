/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+\\.tsx?$": ["ts-jest", {}],
  },
  moduleNameMapper: {
    "^@/data/(.*)$": "<rootDir>/data/$1",
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};
