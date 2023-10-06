import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBRwHWPVmqmzfFHGl4kusB8v8ddOWqLFy4",
  authDomain: "gyaanbodha.firebaseapp.com",
  databaseURL: "https://gyaanbodha-default-rtdb.firebaseio.com",
  projectId: "gyaanbodha",
  storageBucket: "gyaanbodha.appspot.com",
  messagingSenderId: "71383435598",
  appId: "1:71383435598:web:8700ed8fc194ceeaaa761f",
  measurementId: "G-ZW9FBNWB5N",
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
