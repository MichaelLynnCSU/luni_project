// __mocks__/fileMock.js
module.exports = {
  process() {
    return 'module.exports = "";'; // Mocks any file import as an empty string
  },
};
