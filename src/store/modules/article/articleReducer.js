import { STORE_ARTICLE_CHAT } from "./articleActionTypes";

const initialState = {
  chatData: [],
};

const articleReducer = (state = initialState, action) => {
  switch (action.type) {
    case STORE_ARTICLE_CHAT:
      return {
        ...state,
        chatData: [...state.chatData, ...action.payload],
      };
    default:
      return state;
  }
};

export default articleReducer;
