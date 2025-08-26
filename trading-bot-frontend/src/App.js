import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import DashboardPage from "./pages/DashboardPage";
import MarketDataTable from "./components/MarketDataTable";
import BotSettingsForm from "./components/BotSettingsForm";
import TradingHistory from "./components/TradingHistory";
import RealTimeMarketChart from "./components/RealTimeMarketChart";
import BacktestPage from "./pages/BacktestPage"; // Import BacktestPage
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app">
        <NavBar />
        <main>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/market-data" element={<MarketDataTable />} />
            <Route path="/bot-settings" element={<BotSettingsForm />} />
            <Route path="/history" element={<TradingHistory />} />
            <Route path="/real-time-chart" element={<RealTimeMarketChart />} />
            <Route path="/backtest" element={<BacktestPage />} /> {/* Add route */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
