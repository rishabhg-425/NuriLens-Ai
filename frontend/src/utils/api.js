import axios from "axios";

const API = axios.create({
  baseURL: "/api",
  timeout: 30000
});

// Attach JWT token to requests if present
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("nutrilens_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
