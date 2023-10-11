// userThunks.js
import { loginSuccess, logoutSuccess, signupSuccess } from "./userActions";
import { signIn, signOut, signUp } from "./api/authenticationAPI"; // Update with the actual API functions

export const login = (formData) => async (dispatch) => {
  try {
    const token = await signIn(formData); // Replace with your authentication API call
    localStorage.setItem("token", token);
    dispatch(loginSuccess(token));
  } catch (error) {
    console.error("Login failed:", error);
    // Handle error as needed
  }
};

export const logout = () => async (dispatch) => {
  try {
    await signOut(); // Replace with your signout logic
    localStorage.removeItem("token");
    dispatch(logoutSuccess());
  } catch (error) {
    console.error("Logout failed:", error);
    // Handle error as needed
  }
};

export const signup = (formData) => async (dispatch) => {
  try {
    const { token, userId } = await signUp(formData); // Replace with your signup API call
    localStorage.setItem("token", token);
    dispatch(signupSuccess(token, userId));
  } catch (error) {
    console.error("Signup failed:", error);
    // Handle error as needed
  }
};
