import { storeArticleChat } from "./articleActions";
import { getCurrentUserId } from "../../../components/authentication/api/authenticationAPI";
import { ref, onValue } from "firebase/database";
import { realtimeDb } from "../../../firebase";

export const fetchArticleSummary = () => {
  return async (dispatch) => {
    try {
      const userId = getCurrentUserId();
      console.log("inside article thunk", userId);
      const chatRef = ref(realtimeDb, `users/${userId}/chatsArticle`);

      onValue(chatRef, (snapshot) => {
        const chatData = [];
        snapshot.forEach((childSnapshot) => {
          chatData.push(childSnapshot.val());
        });
        dispatch(storeArticleChat(chatData));
      });
    } catch (error) {
      console.error("Error fetching article summary:", error);
    }
  };
};
