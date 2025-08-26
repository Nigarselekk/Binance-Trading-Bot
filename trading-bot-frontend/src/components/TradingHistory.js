// TradingHistory.js
// File: src/components/TradingHistory.js

import React, { useEffect, useState } from "react";
import "../styles/TradingHistory.css";

const TradingHistory = () => {
  const [history, setHistory] = useState([]);
  const [sortKey, setSortKey] = useState("date");
  const [filterAction, setFilterAction] = useState("all");

  useEffect(() => {
    // Fetch historical trade data from the backend
    const fetchHistory = async () => {
      try {
        const response = await fetch(
          "http://localhost:7282/api/GetTradingHistory"
        );
        const data = await response.json();
        setHistory(data);
      } catch (error) {
        console.error("Failed to fetch trading history:", error);
      }
    };

    fetchHistory();
  }, []);

  const handleSort = (key) => {
    setSortKey(key);
    const sortedHistory = [...history].sort((a, b) => {
      if (key === "amount" || key === "profitLoss") {
        return parseFloat(b[key]) - parseFloat(a[key]);
      }
      return new Date(b[key]) - new Date(a[key]);
    });
    setHistory(sortedHistory);
  };

  const filteredHistory =
    filterAction === "all"
      ? history
      : history.filter((trade) => trade.action === filterAction);

  return (
    <div className="trading-history">
      <h2>Trading History</h2>
      <div className="controls">
        <label>
          Filter by Action:
          <select
            value={filterAction}
            onChange={(e) => setFilterAction(e.target.value)}
          >
            <option value="all">All</option>
            <option value="buy">Buy</option>
            <option value="sell">Sell</option>
          </select>
        </label>
        <button onClick={() => handleSort("date")}>Sort by Date</button>
        <button onClick={() => handleSort("amount")}>Sort by Amount</button>
        <button onClick={() => handleSort("profitLoss")}>
          Sort by Profit/Loss
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Date/Time</th>
            <th>Crypto Pair</th>
            <th>Action</th>
            <th>Amount</th>
            <th>Profit/Loss</th>
          </tr>
        </thead>
        <tbody>
          {filteredHistory.map((trade, index) => (
            <tr key={index}>
              <td>{new Date(trade.date).toLocaleString()}</td>
              <td>{trade.pair}</td>
              <td>{trade.action}</td>
              <td>{trade.amount}</td>
              <td>{trade.profitLoss}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TradingHistory;
