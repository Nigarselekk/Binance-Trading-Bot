// File: src/redux/tradingSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { runBacktest } from "../api/api";

// Async Thunk: Backtest verilerini çekme
export const fetchBacktestResults = createAsyncThunk(
  "trading/fetchBacktestResults",
  async (params, { rejectWithValue }) => {
    try {
      const response = await runBacktest(params);
      // response: { trades: [], totalProfit: 13248.56 }
      return response;
    } catch (error) {
      return rejectWithValue("Failed to fetch backtest results.");
    }
  }
);

const tradingSlice = createSlice({
  name: "trading",
  initialState: {
    totalProfit: 0,        // Toplam kâr/zarar
    backtestResults: [],   // İşlem sonuçları
    status: "idle",        // "idle" | "loading" | "succeeded" | "failed"
    error: null,           // Hata mesajı
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBacktestResults.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchBacktestResults.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.backtestResults = action.payload.trades;
        state.totalProfit = action.payload.totalProfit;
      })
      .addCase(fetchBacktestResults.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default tradingSlice.reducer;
