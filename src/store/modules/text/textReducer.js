import { STORE_TEXT_CHAT } from "./textActionTypes";

const initialState = {
  chatData: [],
};

const textReducer = (state = initialState, action) => {
  switch (action.type) {
    case STORE_TEXT_CHAT:
      const { chatData, userId } = action.payload;
      const updatedChatData = { ...state.chatData };
      updatedChatData[userId] = chatData;
      return {
        ...state,
        chatData: updatedChatData,
      };
    default:
      return state;
  }
};

export default textReducer;
