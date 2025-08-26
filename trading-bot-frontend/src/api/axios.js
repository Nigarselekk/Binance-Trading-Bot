import axios from "axios";

// Create a base axios instance with shared configuration
const axiosInstance = axios.create({
  baseURL: "https://localhost:7055/api", // Backend API base URL
  timeout: 30000, // 30 saniye timeout
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptors
axiosInstance.interceptors.request.use(
  (config) => {
    console.log("Request Config:", config);
    return config;
  },
  (error) => {
    console.error("Request Error:", error);
    return Promise.reject(error);
  }
);

// Response interceptors
axiosInstance.interceptors.response.use(
  (response) => {
    console.log("Response Data:", response.data);
    return response;
  },
  (error) => {
    console.error("Response Error:", error.response || error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
