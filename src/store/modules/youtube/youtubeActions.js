// feature/pdf/store/actions/pdfActions.js

import { STORE_YOUTUBE_CHAT } from "./youtubeActionTypes";

export const storeYoutubeChat = (chatData) => ({
  type: STORE_YOUTUBE_CHAT,
  payload: chatData,
});
