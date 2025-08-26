// File: src/pages/LiveTradingPage.js

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setChartData } from "../redux/tradingSlice";
import Chart from "../components/Chart";
import "../styles/LiveTradingPage.css";

const LiveTradingPage = () => {
  const dispatch = useDispatch();
  const { chartData } = useSelector((state) => state.trading);

  const [rsiThreshold, setRsiThreshold] = useState(30);
  const [smaThreshold, setSmaThreshold] = useState(50);
  const [macdThreshold, setMacdThreshold] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const mockChartData = {
        labels: ["RSI", "SMA", "MACD"],
        datasets: [
          {
            label: "RSI",
            data: Array.from({ length: 3 }, () =>
              Math.floor(Math.random() * 100)
            ),
            borderColor: "rgba(75,192,192,1)",
            backgroundColor: "rgba(75,192,192,0.2)",
          },
          {
            label: "SMA",
            data: Array.from({ length: 3 }, () =>
              Math.floor(Math.random() * 100)
            ),
            borderColor: "rgba(255,99,132,1)",
            backgroundColor: "rgba(255,99,132,0.2)",
          },
          {
            label: "MACD",
            data: Array.from({ length: 3 }, () =>
              Math.floor(Math.random() * 100)
            ),
            borderColor: "rgba(54,162,235,1)",
            backgroundColor: "rgba(54,162,235,0.2)",
          },
        ],
      };

      // Dynamically adjust thresholds for buy/sell conditions
      const rsi = mockChartData.datasets[0].data[0];
      const sma = mockChartData.datasets[1].data[0];
      const macd = mockChartData.datasets[2].data[0];

      if (rsi < rsiThreshold) {
        setRsiThreshold((prev) => prev - 5);
      } else if (rsi > 100 - rsiThreshold) {
        setRsiThreshold((prev) => prev + 5);
      }

      if (sma < smaThreshold) {
        setSmaThreshold((prev) => prev - 5);
      } else if (sma > 100 - smaThreshold) {
        setSmaThreshold((prev) => prev + 5);
      }

      if (macd < macdThreshold) {
        setMacdThreshold((prev) => prev - 1);
      } else if (macd > macdThreshold + 10) {
        setMacdThreshold((prev) => prev + 1);
      }

      dispatch(setChartData(mockChartData));
    }, 1000);

    return () => clearInterval(interval);
  }, [dispatch, rsiThreshold, smaThreshold, macdThreshold]);

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Live Trading Indicators Chart",
      },
    },
  };

  return (
    <div className="live-trading-page">
      <h1 className="page-title">Live Trading Page</h1>
      <p>Dynamic Thresholds:</p>
      <p>RSI Threshold: {rsiThreshold}</p>
      <p>SMA Threshold: {smaThreshold}</p>
      <p>MACD Threshold: {macdThreshold}</p>
      {chartData && <Chart data={chartData} options={chartOptions} />}
    </div>
  );
};

export default LiveTradingPage;
