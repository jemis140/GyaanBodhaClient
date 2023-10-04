import axios from "axios";
import { auth } from "../../../firebase";
const BASE_URL = "http://127.0.0.1:8000"; // Update this with your actual backend URL

export const signup = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/signup`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, { email, password });
    console.log("login response data", response);
    return response.data.token;
  } catch (error) {
    throw error;
  }
};

export const logout = async (uid) => {
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
