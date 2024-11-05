import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

export const getStores = async () => {
  try {
    const response = await api.get("/stores");

    // delay 1s
    new Promise((resolve) => setTimeout(resolve, 1000));

    return response.data || [];
  } catch (error) {
    console.log(error);
  }
};
