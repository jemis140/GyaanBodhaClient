// feature/pdf/store/reducers/pdfReducer.js

import { STORE_PDF_CHAT } from "./pdfActionTypes";

const initialState = {
  chatData: [],
};

const pdfReducer = (state = initialState, action) => {
  switch (action.type) {
    case STORE_PDF_CHAT:
      return {
        ...state,
        chatData: [...state.chatData, ...action.payload],
      };
    default:
      return state;
  }
};

export default pdfReducer;
