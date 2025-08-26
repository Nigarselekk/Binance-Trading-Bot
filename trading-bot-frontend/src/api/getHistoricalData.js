import axiosInstance from "./axios";

export const getHistoricalData = async (params) => {
  try {
    const response = await axiosInstance.post("/GetHistoricalData", params);
    return response.data;
  } catch (error) {
    console.error("Error fetching historical data:", error);
    throw error;
  }
};
