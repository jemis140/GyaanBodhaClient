import { storeEuclidChat } from "./euclidActions"; // Correct import
import { realtimeDb } from "../../../firebase"; // Import Firebase and set up Firebase in your project
import { ref, onValue } from "firebase/database"; // Import necessary functions

export const fetchChatConversations = () => {
  return async (dispatch) => {
    try {
      console.log("inside euclid store");
      const userId = sessionStorage.getItem("userId");
      const chatRef = ref(realtimeDb, `users/${userId}/modules/euclid`); // Use ref from the Realtime Database instance

      onValue(chatRef, (snapshot) => {
        const chatData = [];
        snapshot.forEach((childSnapshot) => {
          chatData.push(childSnapshot.val());
        });
        dispatch(storeEuclidChat(chatData)); // Dispatch the correct action
      });
    } catch (error) {
      // Handle error
    }
  };
};
