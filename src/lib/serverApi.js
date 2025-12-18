import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response ? error.response.status : null;

    if (status === 401 || status === 403) {
      console.log("Session expired. Please log in again.");
    } else if (status === 500) {
      console.log("Server error occurred.");
    }

    return Promise.reject(error);
  },
);

export default api;
