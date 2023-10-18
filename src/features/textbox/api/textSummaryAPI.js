// api.js
import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000"; // Update this with your actual backend URL

export const getTextSummary = async (textData) => {
  try {
    console.log(textData);
    const formData = new FormData();

    formData.append("textData", textData);
    const token = localStorage.getItem("token");

    const response = await axios.post(`${BASE_URL}/gettextsummary`, formData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      },
    });
    console.log("text summary response", response);
    return response;
  } catch (error) {
    throw error;
  }
};
