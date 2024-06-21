// __mocks__/lottie-web.js

const mockLottie = {
  loadAnimation: jest.fn(() => ({ play: jest.fn(), stop: jest.fn() })),
};

module.exports = mockLottie;
