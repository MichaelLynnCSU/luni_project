module.exports = {
  roots: ["<rootDir>/frontend"], // Adjust this based on your frontend directory
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
};
