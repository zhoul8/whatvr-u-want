// src/firebase.js
import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import {getAuth, GoogleAuthProvider} from 'firebase/auth';

const firebaseConfig = {  // FROM YOUR CONFIG IN FIREBASE
  apiKey: "AIzaSyD8Wt0LwYpsZh8mbQpfKw_nt_3HmSWo8PE",
  authDomain: "aaaaa-8c186.firebaseapp.com",
  projectId: "aaaaa-8c186",
  storageBucket: "aaaaa-8c186.firebasestorage.app",
  messagingSenderId: "1080349837116",
  appId: "1:1080349837116:web:9d1bd4fa662531e19d0039"
};


// const app = initializeApp(firebaseConfig);
// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
