import { LocalOfferSharp } from "@mui/icons-material";
import axios from "axios";
import { BASE_URL } from "../../../utils/URLContants";

export const getArticleSummary = async (articleUrl) => {
  try {
    const formData = new FormData();
    formData.append("articleUrl", articleUrl);
    const jwtToken = localStorage.getItem("token");

    const response = await axios.post(
      `${BASE_URL}/getarticlesummary`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`, // Include the token in the Authorization header
        },
      }
    );
    console.log("response article api", response);
    return response;
  } catch (error) {
    console.error("Error getting article summary:", error);
    return { status: 500, data: { error: "Internal Server Error" } }; // Return a default response for error
  }
};
