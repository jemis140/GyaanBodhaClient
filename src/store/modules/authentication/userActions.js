export const loginSuccess = (token) => ({
  type: LOGIN_SUCCESS,
  payload: { token },
});

export const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS,
});

export const signupSuccess = (token, userId) => ({
  type: SIGNUP_SUCCESS,
  payload: { token, userId },
});
