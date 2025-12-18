"use client";

// src/lib/api.js
import axios from "axios";
import toast from "react-hot-toast";
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    } else {
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response ? error.response.status : null;

    if (status === 401 || status === 403) {
      toast.error("Session expired. Please log in again.");
    } else if (status === 500) {
      toast.error("Server error occurred.");
    }

    return Promise.reject(error);
  },
);

export default api;
