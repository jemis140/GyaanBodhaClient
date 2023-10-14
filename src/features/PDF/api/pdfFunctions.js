// feature/pdf/scripts/pdfFunctions.js

import { realtimeDb } from "../../../firebase"; // Import Firebase and set up Firebase in your project
import { ref, push, set } from "firebase/database"; // Import necessary functions
import { getQueryResponse } from "./PdfAPI";
import { storePdfChat } from "../../../store/modules/pdf/pdfActions";

const storeChatDataInRealtimeDb = (content, type) => {
  const userId = sessionStorage.getItem("userId");
  console.log("userID storeChatDataInRealtimeDb", userId);
  const chatRef = ref(realtimeDb, `users/${userId}/modules/pdf`); // Use ref from the Realtime Database instance
  console.log("chatRef", chatRef);
  const newChatRef = push(chatRef); // Push a new chat node

  set(newChatRef, {
    type,
    content,
    timestamp: Date.now(), // Use ServerValue.TIMESTAMP for the timestamp
  });
};

const addChatMessagesToStore = (humanMessage, aiMessage) => {
  console.log("inside addChat");
  storePdfChat([
    { type: "human", content: humanMessage },
    { type: "ai", content: aiMessage },
  ]);
};

export const handleQuestionSubmission = async (question, uniqueId) => {
  if (question.trim() !== "") {
    try {
      const response = await getQueryResponse(question, uniqueId);

      const aiMessageContent = response.data.aiResponse;
      const humanMessageContent = response.data.humanQuestion;

      if (aiMessageContent) {
        storeChatDataInRealtimeDb(humanMessageContent, "human");
        storeChatDataInRealtimeDb(aiMessageContent, "ai");
        addChatMessagesToStore(humanMessageContent, aiMessageContent);

        return true;
      }
    } catch (error) {
      console.error("Get Query Response Error:", error);
    }
  }
};
