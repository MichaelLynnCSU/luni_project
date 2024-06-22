// jest.config.js
module.exports = {
  // other Jest configurations...
  transform: {
    '^.+\\.jsx?$': 'babel-jest', // transform JS/JSX files with Babel
    '\\.(png|jpg|jpeg|gif|svg)$': '<rootDir>/__mocks__/fileMock.js', // handle image files with the mock file
    '\\.scss$': 'jest-transform-stub', // ignore SCSS files during testing
  },
  transformIgnorePatterns: [
    "node_modules/(?!(axios|pdfjs-dist)/)"
  ],
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy', // if you have CSS/LESS files, mock them as well
    '^pdfjs-dist$': '<rootDir>/node_modules/pdfjs-dist/build/pdf.js'
  },
};