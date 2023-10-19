import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, setDoc, getDoc, doc } from "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyD-FC09K_XDTjIA1O2XKgh3XxN5-lhaUd4",
  authDomain: "gyaanbodhi.firebaseapp.com",
  databaseURL: "https://gyaanbodhi-default-rtdb.firebaseio.com",
  projectId: "gyaanbodhi",
  storageBucket: "gyaanbodhi.appspot.com",
  messagingSenderId: "677291001463",
  appId: "1:677291001463:web:47c72f5699e7d2693d2872",
  measurementId: "G-468EWDP2KV",
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth();
console.log("auth", auth);

// change name here to authDb
const googleProvider = new GoogleAuthProvider();
console.log("Google provider", googleProvider);
const realtimeDb = getDatabase(firebaseApp);
console.log(realtimeDb);
googleProvider.setCustomParameters({ prompt: "select_account" });
const db = getFirestore(firebaseApp);

const updateSummaryCountInFirestore = (userId, newSummaryCount) => {
  const userDocRef = doc(db, "users", userId);
  setDoc(userDocRef, { summaryCount: newSummaryCount }, { merge: true });
};

export { auth, db, googleProvider, realtimeDb, updateSummaryCountInFirestore };
