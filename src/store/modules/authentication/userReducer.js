// userReducer.js
import {
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  SIGNUP_SUCCESS,
} from "./userActionTypes";

const initialState = {
  token: null,
  userId: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
    case SIGNUP_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        userId: action.payload.userId,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        token: null,
        userId: null,
      };
    default:
      return state;
  }
};

export default userReducer;
