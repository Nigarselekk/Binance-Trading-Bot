import axiosInstance from "./axios";

/**
 * Function to call the Trading API
 * @param {Object} params - Parameters for the backtest
 * @returns {Object} Response data from the API
 * @throws {Error} If the request fails
 */
export const runBacktest = async (params) => {
  try {
    console.log("Running backtest with params:", params);

    // Doğru endpoint'i kullanın
    const response = await axiosInstance.post("/Trading", params);

    console.log("Backtest response:", response.data);

    return response.data;
  } catch (error) {
    console.error("Error during backtest:", error.response || error);
    throw error;
  }
};
