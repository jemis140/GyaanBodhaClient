import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000";

export const getArticleSummary = async (articleUrl) => {
  try {
    const formData = new FormData();
    formData.append("articleUrl", articleUrl);

    const jwtToken = localStorage.getItem("token");
    console.log("jwt token", jwtToken);

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
    console.log("response article api", response);
    return response;
  } catch (error) {
    throw error;
  }
};
