// src/store/modules/authentication/authActions.js

import { SIGNUP_SUCCESS, SIGNUP_ERROR } from "./types";
// Import the initialized Firebase instance
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  getRedirectResult,
} from "firebase/auth";
import { redirect } from "react-router-dom";
import { auth, db, googleProvider } from "../../../firebase";
import { addDoc, collection } from "firebase/firestore";

const signup = (userData) => async (dispatch) => {
  try {
    // Use Firebase authentication to sign up the user

    const { email, password, firstName, lastName } = userData;

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;

    // Add user data to Firestore
    const docRef = await addDoc(collection(db, "users"), {
      uid: user.uid,
      firstName: firstName,
      lastName: lastName,
      email: email,
    });

    // Store additional user data to Firestore
    console.log("user data stored");
    return user;
  } catch (error) {
    dispatch({ type: SIGNUP_ERROR, payload: error.message });
  }
};

const signin = (userData) => async (dispatch) => {
  const { email, password } = userData;
  try {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("User login passed", user);
        // ...
      })
      .catch((error) => {
        console.log("error while login", error.message);
      });
  } catch (e) {
    dispatch({
      type: LOGIN_ERROR,
      payload: e.message,
    });
  }
};

const singInWithPop = async () => {
  try {
    getRedirectResult(auth)
      .then(async (result) => {
        // This gives you a Google Access Token. You can use it to access Google APIs.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        // The signed-in user info.
        const user = result.user;

        const q = query(collection(db, "users"), where("uid", "==", user.uid));
        const docs = await getDocs(q);

        if (docs.docs.length === 0) {
          await addDoc(collection(db, "users"), {
            uid: user.uid,
            firstName: user.displayName,
            authProvider: "google",
            email: user.email,
          });
        }
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        console.log("email used", email);
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  } catch (e) {
    console.log("error", e.message);
  }
};

export { signup, signin, singInWithPop };
