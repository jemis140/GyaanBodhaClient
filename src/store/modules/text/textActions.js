import { STORE_TEXT_CHAT } from "./textActionTypes";

export const storeTextChat = (chatData) => ({
  type: STORE_TEXT_CHAT,
  payload: chatData,
});
