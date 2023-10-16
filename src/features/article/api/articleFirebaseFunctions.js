import { realtimeDb } from "../../../firebase";
import { ref, push, set } from "firebase/database";
import { getArticleSummary } from "./articleAPI";
import { storeArticleChat } from "../../../store/modules/article/articleActions";

export const storeArticleChatData = (type, content) => {
  try {
    const userId = sessionStorage.getItem("userId");
    console.log("userID storeChatDataInRealtimeDb", userId);
    const chatRef = ref(realtimeDb, `users/${userId}/modules/article`); // Use ref from the Realtime Database instance

    const newChatRef = push(chatRef);

    set(newChatRef, {
      type,
      content,
      timestamp: Date.now(),
    });
  } catch (error) {
    console.error("Error storing article chat data:", error);
  }

  storeArticleChat([{ type: "ai", payload: content }]);
};

export const handleArticleSummaryData = async (summary) => {
  try {
    const aiMessageContent = summary;
    if (aiMessageContent) {
      await storeArticleChatData(aiMessageContent, "ai");
    }
  } catch (error) {
    console.error("Error handling article summary data:", error);
  }
};
