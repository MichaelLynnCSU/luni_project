// jest.config.js
module.exports = {
  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|test).[tj]s?(x)',
    '**/src/**/*.test.[jt]s?(x)',
  ],
  testPathIgnorePatterns: [
    '\\\\node_modules\\\\'
  ],
  roots: ["<rootDir>/src"], // Adjust this based on your frontend directory
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"], // Adjust path as per your setup file location
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy"
  },
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest"
  },
  transformIgnorePatterns: [
    "/node_modules/(?!(@ant-design|antd|other-package)/)" // Adjust as per your needs
  ]
  // other Jest configurations...
};
