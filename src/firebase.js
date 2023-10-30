import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, setDoc, getDoc, doc } from "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASURMENT_ID,
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
