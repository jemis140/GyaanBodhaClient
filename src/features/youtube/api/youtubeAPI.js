// api.js
import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000"; // Update this with your actual backend URL

export const getYoutubeConversationChain = async (youtubeUrl) => {
  try {
    console.log(youtubeUrl);
    const formData = new FormData();

    formData.append("youtube_url", youtubeUrl);
    const token = localStorage.getItem("token");

    const response = await axios.post(
      `${BASE_URL}/getvectorstoreyt`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      }
    );

    console.log("youtube response", response);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getYoutubeQueryResponse = async (query, uniqueId) => {
  try {
    const formData = new FormData();
    formData.append("query", query);
    formData.append("unique_id", uniqueId);

    const token = localStorage.getItem("token");

    const response = await axios.post(`${BASE_URL}/getyoutube`, formData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      },
    });

    console.log("response inside frontend", response);
    return response; // Return response.data instead of the entire response
  } catch (error) {
    throw error;
  }
};
