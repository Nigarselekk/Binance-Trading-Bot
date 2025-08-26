import axiosInstance from "./axios";

export const calculateRSI = async (params) => {
  try {
    const response = await axiosInstance.post("/CalculateRSI", params);
    return response.data;
  } catch (error) {
    console.error("Error calculating RSI:", error);
    throw error;
  }
};
