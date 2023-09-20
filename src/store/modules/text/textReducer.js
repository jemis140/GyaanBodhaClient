import { STORE_TEXT_CHAT } from "./textActionTypes";

const initialState = {
  chatData: [],
};

const textReducer = (state = initialState, action) => {
  switch (action.type) {
    case STORE_TEXT_CHAT:
      console.log("state of chat", state.chatData);
      return {
        ...state,
        chatData: [...state.chatData, ...action.payload],
      };
    default:
      return state;
  }
};

export default textReducer;
