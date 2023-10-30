// api.js
import axios from "axios";

const BASE_URL = "https://gyaan-bodhi-3-6arjwkve7a-em.a.run.app"; // Update this with your actual backend URL

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
    console.error("Error in getYoutubeConversationChain:", error.message);
    throw new Error(
      "Failed to create conversation chain. Please try again later."
    );
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
    console.error("Error in getYoutubeConversationChain:", error.message);
    throw new Error(
      "Failed to create conversation chain. Please try again later."
    );
  }
};
