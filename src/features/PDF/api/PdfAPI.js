// api.js
import axios from "axios";

const BASE_URL = "http://127.0.0.1:8001"; // Update this with your actual backend URL

export const getConversationChain = async (files) => {
  try {
    console.log(files);
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file.originFileObj);
    });

    const response = await axios.post(
      `${BASE_URL}/getconversationchain`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        }, // To handle binary data like pickle files
      }
    );
    console.log("inside frontend response", response);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getQueryResponse = async (query, uniqueId) => {
  try {
    const formData = new FormData();
    formData.append("question", query);
    formData.append("uniqueId", uniqueId);

    const response = await axios.post(
      `${BASE_URL}/getquestionresponse`,
      formData, // Send the formData object
      {
        headers: {
          "Content-Type": "application/json",
        }, // To handle binary data like pickle files
      }
    );
    console.log("response inside frontend", response);
    return response; // Return response.data instead of the entire response
  } catch (error) {
    throw error;
  }
};
