import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000"; // Replace with your actual API base URL

export const createNotebook = async (name, description, tags, module) => {
  try {
    const formData = new FormData();

    formData.append("name", name);
    formData.append("description", description);
    formData.append("tags", tags);

    console.log("formData", formData);
    console.log("Inside response Data");
    const response = await axios.post(
      `${BASE_URL}/create-notebook/${module}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        }, // To handle binary data like pickle files
      }
    );
    console.log("response Data", response.data);
    return response.data;
  } catch (error) {
    throw new Error("Error creating notebook: " + error.message);
  }
};

export const getNotebooks = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/get-all-notebooks`);
    console.log("response.data", response.data);
    return response.data;
  } catch (error) {
    throw new Error("Error getting notebook: " + error.message);
  }
};
