import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const config = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  databaseURL: "YOUR_DATABASE_URL",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

firebase.initializeApp(config);

const notebookFirebaseAPI = {
  createNotebook: async (notebookData) => {
    try {
      const dbRef = firebase.database().ref("notebooks");
      const newNotebookRef = dbRef.push();
      await newNotebookRef.set(notebookData);
      return newNotebookRef.key;
    } catch (error) {
      throw new Error("Error creating notebook: " + error.message);
    }
  },

  updateNotebook: async (notebookId, notebookData) => {
    try {
      const dbRef = firebase.database().ref(`notebooks/${notebookId}`);
      await dbRef.update(notebookData);
      return true;
    } catch (error) {
      throw new Error("Error updating notebook: " + error.message);
    }
  },

  deleteNotebook: async (notebookId) => {
    try {
      const dbRef = firebase.database().ref(`notebooks/${notebookId}`);
      await dbRef.remove();
      return true;
    } catch (error) {
      throw new Error("Error deleting notebook: " + error.message);
    }
  },

  getNotebook: async (notebookId) => {
    try {
      const dbRef = firebase.database().ref(`notebooks/${notebookId}`);
      const snapshot = await dbRef.once("value");
      return snapshot.val();
    } catch (error) {
      throw new Error("Error getting notebook: " + error.message);
    }
  },
};

export default notebookFirebaseAPI;
