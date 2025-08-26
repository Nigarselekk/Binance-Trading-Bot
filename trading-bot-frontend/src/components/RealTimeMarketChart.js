// File: src/components/RealTimeMarketChart.js

import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "../styles/RealTimeMarketChart.css";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const RealTimeMarketChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Price Movements",
        data: [],
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        tension: 0.4,
      },
      {
        label: "RSI",
        data: [],
        borderColor: "rgba(255,99,132,1)",
        backgroundColor: "rgba(255,99,132,0.2)",
        tension: 0.4,
      },
      {
        label: "Bollinger Bands",
        data: [],
        borderColor: "rgba(54,162,235,1)",
        backgroundColor: "rgba(54,162,235,0.2)",
        tension: 0.4,
      },
    ],
  });

  useEffect(() => {
    // Function to fetch and update real-time data
    const fetchMarketData = async () => {
      try {
        const response = await fetch(
          "http://localhost:7282/api/GetRealTimeMarketData"
        );
        const data = await response.json();

        const updatedChartData = {
          labels: data.timestamps, // Array of timestamps
          datasets: [
            {
              ...chartData.datasets[0],
              data: data.prices, // Array of price movements
            },
            {
              ...chartData.datasets[1],
              data: data.rsi, // Array of RSI values
            },
            {
              ...chartData.datasets[2],
              data: data.bollingerBands, // Array of Bollinger Band values
            },
          ],
        };
        setChartData(updatedChartData);
      } catch (error) {
        console.error("Error fetching market data:", error);
      }
    };

    // Fetch data initially and then every 10 seconds
    fetchMarketData();
    const interval = setInterval(fetchMarketData, 10000);

    return () => clearInterval(interval);
  }, []);

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Real-Time Market Chart",
      },
    },
  };

  return (
    <div className="real-time-market-chart">
      <h2>Real-Time Market Data</h2>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default RealTimeMarketChart;
