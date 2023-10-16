import { storeTextChat } from "./textActions"; // Correct import
import { realtimeDb } from "../../../firebase"; // Import Firebase and set up Firebase in your project
import { ref, onValue } from "firebase/database"; // Import necessary functions

export const fetchTextSummary = () => {
  return async (dispatch) => {
    try {
      const userId = sessionStorage.getItem("userId");
      const chatRef = ref(realtimeDb, `users/${userId}/modules/text`);

      onValue(chatRef, (snapshot) => {
        const chatData = [];
        snapshot.forEach((childSnapshot) => {
          chatData.push(childSnapshot.val());
        });
        dispatch(storeTextChat(chatData, userId));
      });
    } catch (error) {
      console.error("Error fetching text summary:", error);
    }
  };
};
