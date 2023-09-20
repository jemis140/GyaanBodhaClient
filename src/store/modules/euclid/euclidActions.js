import { STORE_EUCLID_CHAT } from "./euclidActionTypes";

export const storeEuclidChat = (chatData) => ({
  type: STORE_EUCLID_CHAT,
  payload: chatData,
});
