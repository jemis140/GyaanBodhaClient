// feature/pdf/store/actions/pdfActions.js

import { STORE_PDF_CHAT } from "./pdfActionTypes";

export const storePdfChat = (chatData) => ({
  type: STORE_PDF_CHAT,
  payload: chatData,
});
