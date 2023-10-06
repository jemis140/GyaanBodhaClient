import axios from "axios";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../../firebase";
import { onAuthStateChanged } from "firebase/auth";

const BASE_URL = "http://127.0.0.1:8000"; // Update this with your actual backend URL

export const signup = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/signup`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const signIn = async (formData) => {
  const { email, password } = formData;

  try {
    const response = await axios.post(`${BASE_URL}/login`, {
      email,
      password,
    });
    return response.data.token;
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
            resolve(token);
          })
          .catch((error) => {
            reject(error);
          });
      } else {
        reject(new Error("No user signed in."));
      }
    });
  });
};
