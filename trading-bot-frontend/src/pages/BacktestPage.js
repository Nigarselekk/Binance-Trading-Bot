// File: src/pages/BacktestPage.js

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBacktestResults } from "../redux/tradingSlice";
import BacktestForm from "../components/BacktestForm";
import "../styles/BacktestPage.css";

const BacktestPage = () => {
  const dispatch = useDispatch();

  // Redux state'inden totalProfit ve backtestResults'u alıyoruz
  const { totalProfit, backtestResults, status, error } = useSelector(
    (state) => state.trading
  );

  // Form gönderildiğinde çalışacak
  const handleFormSubmit = (formData) => {
    dispatch(fetchBacktestResults(formData));
  };

  return (
    <div className="backtest-page">
      <h1 className="page-title">Backtest Page</h1>

      {/* Form */}
      <BacktestForm onSubmit={handleFormSubmit} />

      {/* Yüklenme ve hata mesajları */}
      {status === "loading" && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {/* Toplam kâr/zarar */}
      <h3>
        Total Profit/Loss:{" "}
        <span style={{ color: totalProfit >= 0 ? "green" : "red" }}>
          {totalProfit.toFixed(2)}
        </span>
      </h3>

     
    </div>
  );
};

export default BacktestPage;
