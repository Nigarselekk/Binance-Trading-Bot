import axiosInstance from "./axios";

/**
 * Function to call the RunBacktest API
 * @param {Object} params - Parameters for the backtest
 * @returns {Object} Response data from the API
 * @throws {Error} If the request fails
 */
export const runBacktest = async (params) => {
  try {
    console.log("Running backtest with params:", params); // Log request data

    const response = await axiosInstance.post("/RunBacktest", params);

    console.log("Backtest response:", response.data); // Log API response

    return response.data; // Return the data part of the response
  } catch (error) {
    console.error("Error during backtest:", error.response || error); // Log detailed errors
    throw error; // Re-throw for further handling
  }
};
