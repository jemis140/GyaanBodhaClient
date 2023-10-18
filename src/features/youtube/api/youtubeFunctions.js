// feature/pdf/scripts/pdfFunctions.js

import { realtimeDb } from "../../../firebase"; // Import Firebase and set up Firebase in your project
import { ref, push, set } from "firebase/database"; // Import necessary functions
import { getYoutubeQueryResponse } from "./youtubeAPI";
import { storeYoutubeChat } from "../../../store/modules/youtube/youtubeActions";

const storeYoutubeChatData = (content, type) => {
  const userId = localStorage.getItem("userId");
  console.log("userID storeChatDataInRealtimeDb", userId);
  const chatRef = ref(realtimeDb, `users/${userId}/modules/youtube`); // Use ref from the Realtime Database instance

  const newChatRef = push(chatRef); // Push a new chat node

  set(newChatRef, {
    type,
    content,
    timestamp: Date.now(), // Use ServerValue.TIMESTAMP for the timestamp
  });
};

const addYoutubeChatMessagesToStore = (humanMessage, aiMessage) => {
  console.log("inside addChat youtube");
  storeYoutubeChat([
    { type: "human", content: humanMessage },
    { type: "ai", content: aiMessage },
  ]);
};

export const handleYoutubeQuestionSubmission = async (question, uniqueId) => {
  if (question.trim() !== "") {
    try {
      const response = await getYoutubeQueryResponse(question, uniqueId);
      console.log("response ytr", response);
      // Parse the JSON response

      const aiMessageContent = response.data.aiResponse;
      const humanMessageContent = response.data.humanQuestion;
      console.log("ai message", aiMessageContent);

      if (aiMessageContent) {
        storeYoutubeChatData(humanMessageContent, "human");
        storeYoutubeChatData(aiMessageContent, "ai");
        addYoutubeChatMessagesToStore(humanMessageContent, aiMessageContent);
      }
    } catch (error) {
      console.error("Get Query Response Error:", error);
    }
  }
};
