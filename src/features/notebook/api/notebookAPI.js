import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { getCurrentUserId } from "../../../components/authentication/api/authenticationAPI";
const BASE_URL = "http://127.0.0.1:8000"; // Replace with your actual API base URL

export const createNotebook = async (name, description, tags, module) => {
  const id = uuidv4();
  try {
    const data = {
      id,
      name,
      description,
      tags,
    };
    const response = await axios.post(
      `${BASE_URL}/notebooks/modules/${module}`,
      data
    );

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
