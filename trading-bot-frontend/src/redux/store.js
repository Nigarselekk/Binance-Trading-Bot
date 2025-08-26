import { configureStore } from "@reduxjs/toolkit";
import tradingReducer from "./tradingSlice";

export const store = configureStore({
  reducer: {
    trading: tradingReducer,
  },
});
