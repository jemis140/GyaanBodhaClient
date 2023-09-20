import { STORE_ARTICLE_CHAT } from "./articleActionTypes";

export const storeArticleChat = (chatData) => ({
  type: STORE_ARTICLE_CHAT,
  payload: chatData,
});
