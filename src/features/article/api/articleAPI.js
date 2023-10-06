// api.js
import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000"; // Update this with your actual backend URL

export const getArticleSummary = async (articleUrl) => {
  try {
    console.log(articleUrl);
    const formData = new FormData();

    formData.append("articleUrl", articleUrl);

    // Retrieve JWT token from localStorage
    const jwtToken = localStorage.getItem("jwtToken");

    const response = await axios.post(
      `${BASE_URL}/getarticlesummary`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`, // Add JWT token as a header
        },
      }
    );
    console.log("article summary response", response);
    return response;
  } catch (error) {
    throw error;
  }
};
