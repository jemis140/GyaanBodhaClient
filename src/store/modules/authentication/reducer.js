// src/store/modules/authentication/authReducer.js

import {
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
} from "./types";

const initialState = {
  user: null,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_SUCCESS:
      return {
        ...state,
        user: action.payload,
        error: null,
      };
    case SIGNUP_ERROR:
      return {
        ...state,
        user: null,
        error: action.payload,
      };
    case LOGIN_SUCCESS:
      return {
        success: "user authenticated",
        error: null,
      };
    case LOGIN_ERROR:
      return {
        success: "Error: login failed",
        error: null,
      };
    default:
      return state;
  }
};

export default authReducer;
