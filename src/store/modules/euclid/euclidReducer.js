// feature/pdf/store/reducers/pdfReducer.js

import { STORE_EUCLID_CHAT } from "./euclidActionTypes";

const initialState = {
  chatData: [],
};

const euclidReducer = (state = initialState, action) => {
  switch (action.type) {
    case STORE_EUCLID_CHAT:
      return {
        ...state,
        chatData: [...state.chatData, ...action.payload],
      };
    default:
      return state;
  }
};

export default euclidReducer;
