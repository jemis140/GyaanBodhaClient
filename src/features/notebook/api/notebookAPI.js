import axios from "axios";

const BASE_URL = "http://127.0.0.1/8000"; // Replace with your actual API base URL

const notebookAPI = {
  createNotebook: async (notebookData) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/create-notebook`,
        notebookData
      );
      return response.data;
    } catch (error) {
      throw new Error("Error creating notebook: " + error.message);
    }
  },

  updateNotebook: async (notebookId, notebookData) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/update-notebook/${notebookId}`,
        notebookData
      );
      return response.data;
    } catch (error) {
      throw new Error("Error updating notebook: " + error.message);
    }
  },

  deleteNotebook: async (notebookId) => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/delete-notebook/${notebookId}`
      );
      return response.data;
    } catch (error) {
      throw new Error("Error deleting notebook: " + error.message);
    }
  },

  getNotebook: async (notebookId) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/get-notebook/${notebookId}`
      );
      return response.data;
    } catch (error) {
      throw new Error("Error getting notebook: " + error.message);
    }
  },
};

export default notebookAPI;
