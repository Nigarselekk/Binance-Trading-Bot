// File: src/pages/DashboardPage.js

import React, { useEffect, useState } from "react";
import MarketDataTable from "../components/MarketDataTable";
import Chart from "../components/Chart";
import "../styles/DashboardPage.css";
import RealTimeMarketChart from "../components/RealTimeMarketChart";

const DashboardPage = () => {
  const [dashboardData, setDashboardData] = useState({
    status: "Loading...",
    balance: 0,
    profitLoss: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching initial dashboard data
    const fetchDashboardData = () => {
      setTimeout(() => {
        setDashboardData({
          status: "Active",
          balance: 12000,
          profitLoss: 500,
        });
        setLoading(false);
      }, 2000); // Simulated loading delay
    };

    fetchDashboardData();

    // Periodic data update every 10 seconds
    const interval = setInterval(() => {
      console.log("Fetching updated dashboard data...");
      // Here you can implement actual API calls
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Profit/Loss",
        data: [1200, 1500, 1100, 1800, 1300],
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Trading Overview",
      },
    },
  };

  return (
    <div className="dashboard-page">
      <h1>Trading Bot Dashboard</h1>

      <div className="dashboard-overview">
        {loading ? (
          <p>Loading dashboard data...</p>
        ) : (
          <>
            <p>Status: {dashboardData.status}</p>
            <p>Current Balance: ${dashboardData.balance}</p>
            <p>Profit/Loss: ${dashboardData.profitLoss}</p>
          </>
        )}
      </div>

      <div className="market-data-section">
        <MarketDataTable />
      </div>

      <div className="chart-section">
        <RealTimeMarketChart />
      </div>
    </div>
  );
};

export default DashboardPage;
