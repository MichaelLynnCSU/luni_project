module.exports = {
  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|test).[tj]s?(x)',
    '**/src/**/*.test.[jt]s?(x)',
  ],
  testPathIgnorePatterns: [
    '\\\\node_modules\\\\'
  ],
  roots: ["<rootDir>/src"],
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    // Add a mapping for canvas.node to the actual path in node_modules
    '^canvas$': '<rootDir>/node_modules/canvas/build/Release/canvas.node',
    // Adjust the path based on where canvas.node is located in your node_modules
  },
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest"
  },
  transformIgnorePatterns: [
    "/node_modules/(?!(@ant-design|antd|other-package)/)"
  ],
  // Other Jest configurations...
};
