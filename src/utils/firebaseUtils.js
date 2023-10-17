import { ref, set } from "firebase/database";
import { realtimeDb } from "../firebase"; // Adjust this to your Firebase configuration

export const addNoteToFirebase = (chatItemId, note) => {
  // Assuming you have a 'notes' node in Firebase under each chat item
  const noteRef = ref(realtimeDb, `notes/${chatItemId}`);
  set(noteRef, note)
    .then(() => {
      console.log("Note added to Firebase");
    })
    .catch((error) => {
      console.error("Error adding note to Firebase:", error);
    });
};
