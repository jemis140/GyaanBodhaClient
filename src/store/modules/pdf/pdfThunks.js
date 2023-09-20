// feature/pdf/store/actions/pdfThunks.js

import { storePdfChat } from "./pdfActions"; // Correct import
import { realtimeDb } from "../../../firebase"; // Import Firebase and set up Firebase in your project
import { ref, onValue } from "firebase/database"; // Import necessary functions

export const fetchChatConversations = () => {
  return async (dispatch) => {
    try {
      const chatRef = ref(realtimeDb, "chats"); // Use ref from the Realtime Database instance

      onValue(chatRef, (snapshot) => {
        const chatData = [];
        snapshot.forEach((childSnapshot) => {
          chatData.push(childSnapshot.val());
        });
        dispatch(storePdfChat(chatData)); // Dispatch the correct action
      });
    } catch (error) {
      // Handle error
    }
  };
};
