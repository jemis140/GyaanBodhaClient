// feature/pdf/store/actions/pdfThunks.js

import { storeYoutubeChat } from "./youtubeActions"; // Correct import
import { realtimeDb } from "../../../firebase"; // Import Firebase and set up Firebase in your project
import { ref, onValue } from "firebase/database"; // Import necessary functions

export const fetchYoutubeChatConversations = () => {
  return async (dispatch) => {
    try {
      const chatRef = ref(realtimeDb, "chatsYoutube"); // Use ref from the Realtime Database instance

      onValue(chatRef, (snapshot) => {
        const chatData = [];
        snapshot.forEach((childSnapshot) => {
          chatData.push(childSnapshot.val());
        });
        dispatch(storeYoutubeChat(chatData)); // Dispatch the correct action
      });
    } catch (error) {
      // Handle error
    }
  };
};
