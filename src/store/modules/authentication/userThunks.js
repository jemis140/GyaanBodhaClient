import { signIn } from "./api/authenticationAPI"; // Import your authentication API functions
import { setUser, clearUser } from "./userActions";

export const login = (formData) => async (dispatch) => {
  try {
    const token = await signIn(formData);
    localStorage.setItem("token", token);
    const jwtToken = localStorage.getItem("token");
    if (jwtToken) {
      // Set user in the Redux store
      dispatch(setUser({ token }));
    }
  } catch (error) {
    console.log("Login failed:", error);
    // Clear user in case of an error
    dispatch(clearUser());
  }
};
