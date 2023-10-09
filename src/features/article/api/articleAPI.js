// api.js
import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000"; // Update this with your actual backend URL

export const getArticleSummary = async (articleUrl) => {
  try {
    const formData = new FormData();
    formData.append("articleUrl", articleUrl);

    // Retrieve JWT token from localStorage
    const jwtToken = localStorage.getItem("jwtToken");

    // Make sure you have the token before proceeding
    if (!jwtToken) {
      throw new Error("JWT token not found.");
    }

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwtToken}`,
    };

    const response = await axios.post(
      `${BASE_URL}/getarticlesummary`,
      formData,
      { headers }
    );

    console.log("article summary response", response);
    return response;
  } catch (error) {
    throw error;
  }
};
