import axiosInstance from "./axios";

export const calculateSMA = async (params) => {
  try {
    const response = await axiosInstance.post("/CalculateSMA", params);
    return response.data;
  } catch (error) {
    console.error("Error calculating SMA:", error);
    throw error;
  }
};
