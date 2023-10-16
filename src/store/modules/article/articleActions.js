import { STORE_ARTICLE_CHAT } from "./articleActionTypes";

export const storeArticleChat = (chatData) => {
  return {
    type: STORE_ARTICLE_CHAT,
    payload: chatData,
  };
};
