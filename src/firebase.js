import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBLwkkQChr5ctAZy6OAPSHyqabJx-f6Orc",
  authDomain: "localhost:3000/",
  projectId: "researchagentdemo",
  storageBucket: "researchagentdemo.appspot.com",
  messagingSenderId: "957206693695",
  appId: "1:957206693695:web:6bdb130552db73318f358a",
  measurementId: "G-9402RJTBNZ",
  databaseURL: "https://researchagentdemo-default-rtdb.firebaseio.com/",
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth();
console.log("auth", auth);

const db = getFirestore(); // change name here to authDb
console.log(db, "db user");
const googleProvider = new GoogleAuthProvider();
console.log("Google provider", googleProvider);
const realtimeDb = getDatabase(firebaseApp);
console.log(realtimeDb);
googleProvider.setCustomParameters({ prompt: "select_account" });

export { auth, db, googleProvider, realtimeDb };
