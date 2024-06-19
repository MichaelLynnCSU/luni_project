
### Explanation:

- **Building the Docker Image**: This section explains how to build your Docker image named `luni_v1` from the Dockerfile located in the current directory (`.`).
<<<<<<< Updated upstream
- docker build . -t luni_9901

- **Running the Docker Container**: This section explains how to run the Docker container based on the `luni_v1` image. It specifies the `-p 3000:3000` flag to map port 3000 from the container to port 3000 on the host machine.
- docker run -p 3000:3000

- **building new depends**: This section explains how to rebuild the json
- npm install
  
# Luni project

Brief description or introduction to your project.

## Files and Directories to Remove

Before proceeding, ensure that you have backed up any important files you do not want to lose.

### Directories

- `node_modules/`
- `dist/`
- `.idea/`
- `.docker/`
- `functions/`
- `public/`
- `uploads/`
- `.firebase/`

### Files

- `.env*` (e.g., `.env-smaple`)
- `filelist.txt`
- `file_and_dir_list.txt`
- `test-results.txt`
- `firebase.json`
- `firestore.indexes.json`
- `firestore.rules`
- `package-lock.json`

## Running Tests

To ensure the stability and functionality of the project, run tests using Jest.

### 1. Install Dependencies

Before running tests, install all required dependencies:

```bash
npm install
```

### 2. Configure Jest

Ensure Jest is properly configured for your project. Modify `jest.config.js` to match your project's structure and requirements. Here’s an example configuration:

```javascript
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
  roots: ["<rootDir>/src"],
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy"
  },
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest"
  },
  transformIgnorePatterns: [
    "/node_modules/(?!(@ant-design|antd|other-package)/)"
  ]
  // other Jest configurations...
};
```

### 3. Run Tests

Execute tests using Jest:

```bash
npm test --verbose --config jest.config.js
```

- `--verbose`: Provides detailed output for debugging purposes.
- `--config jest.config.js`: Specifies the Jest configuration file to use.

### 4. Review Test Results

After running tests, Jest displays test results in the terminal. Check the output to ensure all tests pass successfully.

### 5. Integration with CI/CD

For continuous integration (CI) setups, integrate Jest testing into your pipeline to automate testing and ensure code quality before deployment.

---

Make sure to customize the paths, configurations, and instructions based on your specific project setup and requirements. This README section provides a clear guide for developers to run tests effectively and maintain code quality throughout the development process.
