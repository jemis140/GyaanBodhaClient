import { STORE_ARTICLE_CHAT } from "./articleActionTypes";
import { storeArticleChatData } from "../../../features/article/api/articleFirebaseFunctions"; // Import the updated function

export const storeArticleChat = (chatData) => {
  storeArticleChatData(chatData);
  return {
    type: STORE_ARTICLE_CHAT,
    payload: chatData,
  };
};
