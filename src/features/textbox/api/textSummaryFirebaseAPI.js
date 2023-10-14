import { realtimeDb } from "../../../firebase";
import { ref, push, set } from "firebase/database";

const storeTextChatData = (content) => {
  const userId = sessionStorage.getItem("userId");

  console.log("userId,", userId);
  const chatRef = ref(realtimeDb, `users/${userId}/modules/text`);
  const newChatRef = push(chatRef);
  set(newChatRef, {
    content,
    timestamp: Date.now(),
  });
};

export const handleTextSummaryData = async (summary) => {
  try {
    if (summary) {
      storeTextChatData(summary);
    }
  } catch (error) {
    console.error("Error handling text summary data:", error);
  }
};
