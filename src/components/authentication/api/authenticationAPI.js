import axios from "axios";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../../firebase";
import { onAuthStateChanged } from "firebase/auth";

import { BASE_URL } from "../../../utils/URLContants"; // Update this with your actual backend URL

export const signup = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/signup`, userData);
    return response;
  } catch (error) {
    throw error;
  }
};

export const signIn = async (formData) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, formData);
    return response;
  } catch (error) {
    throw error;
  }
};

export const signOut = async (uid) => {
  try {
    const response = await axios.post(`${BASE_URL}/logout`, { uid });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCurrentUserId = () => {
  const user = auth.currentUser;
  if (user) {
    console.log("user id authentication api", user.uid);
    return user.uid;
  } else {
    // No user is signed in.
    return null;
  }
};

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        user
          .getIdToken()
          .then((token) => {
            resolve({ isUserSignedIn: true, token });
          })
          .catch((error) => {
            reject(error);
          });
      } else {
        resolve({ isUserSignedIn: false });
      }
    });
  });
};
