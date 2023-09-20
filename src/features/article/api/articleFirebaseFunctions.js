// feature/pdf/scripts/pdfFunctions.js

import { realtimeDb } from "../../../firebase"; // Import Firebase and set up Firebase in your project
import { ref, push, set } from "firebase/database"; // Import necessary functions
import { getArticleSummary } from "./articleAPI";
import { storeArticleChat } from "../../../store/modules/article/articleActions";

const storeArticleChatData = (content, type) => {
  const chatRef = ref(realtimeDb, "chatsArticle"); // Use ref from the Realtime Database instance
  console.log("chatRef", chatRef);
  const newChatRef = push(chatRef); // Push a new chat node

  set(newChatRef, {
    type,
    content,
    timestamp: Date.now(), // Use ServerValue.TIMESTAMP for the timestamp
  });

  storeArticleChat([{ type: "ai", content: aiMessage }]);
};

export const handleArticleSummaryData = async (summary) => {
  try {
    console.log("ai message", summary);
    const aiMessageContent = summary;
    if (aiMessageContent) {
      storeArticleChatData(aiMessageContent, "ai");
    }
  } catch (error) {
    console.error("Get Query Response Error:", error);
  }
};
