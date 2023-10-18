import { realtimeDb } from "../../../firebase";
import { ref, push, set } from "firebase/database";
import { storeTextChat } from "../../../store/modules/text/textActions";

const storeChatDataInRealtimeDb = (content, type) => {
  const userId = localStorage.getItem("userId");
  const chatRef = ref(realtimeDb, `users/${userId}/modules/article`);
  const newChatRef = push(chatRef);

  set(newChatRef, {
    type,
    content,
    timestamp: Date.now(),
  });
};

const addChatMessagesToStore = (aiMessage) => {
  storeTextChat([{ type: "ai", content: aiMessage }]);
};

export const handleArticleSummaryData = async (summary) => {
  try {
    const aiMessageContent = summary;
    if (aiMessageContent) {
      storeChatDataInRealtimeDb(aiMessageContent, "ai");
      addChatMessagesToStore(aiMessageContent);
    }
  } catch (error) {
    console.error("Error handling summary data:", error);
  }
};

// Rest of the code for storeTextChat, textActions, and textReducer remains the same as needed for text module
