import { STORE_TEXT_CHAT } from "./textActionTypes";

const initialState = {
  chatData: [],
};

const textReducer = (state = initialState, action) => {
  switch (action.type) {
    case STORE_TEXT_CHAT:
      const { chatData, userId } = action.payload;
      const userChatData = state[userId] || [];
      const updatedChatData = [...userChatData, ...chatData];
      return {
        ...state,
        [userId]: updatedChatData,
      };
    default:
      return state;
  }
};

export default textReducer;
