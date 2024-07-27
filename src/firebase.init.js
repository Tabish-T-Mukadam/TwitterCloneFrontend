import { initializeApp } from "firebase/app";

import {getAuth} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBV_788C_j1IND29CowlOi09R9_j90UNO4",
  authDomain: "create-a-website-like-tw-fb97a.firebaseapp.com",
  projectId: "create-a-website-like-tw-fb97a",
  storageBucket: "create-a-website-like-tw-fb97a.appspot.com",
  messagingSenderId: "26557715996",
  appId: "1:26557715996:web:eab2c546a72f63ba2171d9",
  measurementId: "G-RYM2B28S01"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;