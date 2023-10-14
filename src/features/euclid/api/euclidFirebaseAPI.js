import { realtimeDb } from "../../../firebase";
import { ref, push, set } from "firebase/database";
import { getEuclidQueryResponse } from "./euclidAPI";
import { storeEuclidChat } from "../../../store/modules/euclid/euclidActions";

const storeEuclidChatData = (content, type) => {
  const userId = sessionStorage.getItem("userId");
  chatRef.current = ref(realtimeDb, `users/${userId}/modules/euclid`); // Use ref from the Realtime Database instance
  console.log("chatRef", chatRef);
  const newChatRef = push(chatRef); // Push a new chat node

  set(newChatRef, {
    type,
    content,
    timestamp: Date.now(),
  });
};

const addChatMessagesToStore = (humanMessage, aiMessage) => {
  console.log("Euclid addChat");
  storeEuclidChat([
    { type: "human", content: humanMessage },
    { type: "ai", content: aiMessage },
  ]);
};

export const handleQuestionSubmission = async (question, uniqueId) => {
  if (question.trim() !== "") {
    try {
      const response = await getEuclidQueryResponse(question, uniqueId);
      const aiMessageContent = response.data.aiResponse;
      const humanMessageContent = response.data.humanQuestion;

      if (aiMessageContent) {
        storeEuclidChatData(humanMessageContent, "human");
        storeEuclidChatData(aiMessageContent, "ai");

        addChatMessagesToStore(humanMessageContent, aiMessageContent);
      }
    } catch (error) {
      console.error("Get Query Response Error:", error);
    }
  }
};
