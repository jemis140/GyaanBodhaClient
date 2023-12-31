// api.js
import axios from "axios";
import { BASE_URL } from "../../../utils/URLContants";
// Update this with your actual backend URL

const token = sessionStorage.getItem("token");

export const getEuclidConversationChain = async (files, url, text) => {
  try {
    console.log(files);
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file.originFileObj);
    });
    formData.append("article_url", url);
    formData.append("textbox", text);

    const response = await axios.post(
      `${BASE_URL}/geteuclidconversationchain`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        }, // To handle binary data like pickle files
      }
    );
    console.log("inside frontend response", response);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getEuclidQueryResponse = async (query, uniqueId) => {
  try {
    const formData = new FormData();
    formData.append("question", query);
    formData.append("unique_id", uniqueId);

    const response = await axios.post(
      `${BASE_URL}/geteuclidquestionresponse`,
      formData, // Send the formData object
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("response inside frontend", response);
    return response; // Return response.data instead of the entire response
  } catch (error) {
    throw error;
  }
};
