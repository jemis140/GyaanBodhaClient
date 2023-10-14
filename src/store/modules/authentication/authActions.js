import { SET_USER, CLEAR_USER } from "./UserActionTypes";

// Action creators
export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

export const clearUser = () => ({
  type: CLEAR_USER,
});
