
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBi3DitDgLQrLplVl4l_p7kopInF1c0VrE",
  authDomain: "chatify-aae00.firebaseapp.com",
  projectId: "chatify-aae00",
  storageBucket: "chatify-aae00.appspot.com",
  messagingSenderId: "163996855114",
  appId: "1:163996855114:web:cbbda41294b6334e06efb3"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const storage = getStorage(app)
export const db = getFirestore(app)