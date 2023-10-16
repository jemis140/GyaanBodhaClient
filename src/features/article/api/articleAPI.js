import { LocalOfferSharp } from "@mui/icons-material";
import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000";

export const getArticleSummary = async (articleUrl) => {
  try {
    const formData = new FormData();
    formData.append("articleUrl", articleUrl);

    const jwtToken = localStorage.getItem("token");
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
    console.error("Error getting article summary:", error);
    return { status: 500, data: { error: "Internal Server Error" } }; // Return a default response for error
  }
};
