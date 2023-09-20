// feature/pdf/store/reducers/pdfReducer.js

import { STORE_YOUTUBE_CHAT } from "./youtubeActionTypes";

const initialState = {
  chatData: [],
};

const youtubeReducer = (state = initialState, action) => {
  switch (action.type) {
    case STORE_YOUTUBE_CHAT:
      console.log("state of chat", state.chatData);
      return {
        ...state,
        chatData: [...state.chatData, ...action.payload],
      };
    default:
      return state;
  }
};

export default youtubeReducer;
