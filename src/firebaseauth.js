import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import {collection, getFirestore} from "firebase/firestore";

export const firebaseauth = {
    apiKey: "AIzaSyD9x_u7RsPtQdiR4xZjaYKYDmhyt2Jy5QY",
    authDomain: "pineapply-e0326.firebaseapp.com",
    authDomains: ["pineapply-e0326.firebaseapp.com", "www.pineapply.com"], // Array of domains
    projectId: "pineapply-e0326",
    storageBucket: "pineapply-e0326.appspot.com",
    messagingSenderId: "665136841931",
    appId: "1:665136841931:web:79b0e9a7573a266996874e",
    measurementId: "G-G7J4JDTMSK",
};

const app = initializeApp(firebaseauth);

export const auth = getAuth();
export const googleAuthProvider = new GoogleAuthProvider();
export const storage = getStorage(app);
export const db = getFirestore(app);
export const waitingListRef = collection(db, 'waitingList');

export default app;