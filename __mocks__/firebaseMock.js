// __mocks__/firebaseMock.js

import { getApps, initializeApp } from 'firebase/app';
import { getStorage, ref } from 'firebase/storage';

const firebaseConfig = {
  // Your mock Firebase config (can be empty for testing purposes)
};

let app;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

const getFirebaseApp = () => {
  return app;
};

const getFirebaseStorage = () => {
  return getStorage(app);
};

const getFirebaseStorageRef = (path) => {
  return ref(getFirebaseStorage(), path);
};

export { getFirebaseApp, getFirebaseStorage, getFirebaseStorageRef };