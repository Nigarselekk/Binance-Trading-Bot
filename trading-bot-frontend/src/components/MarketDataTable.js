// File: src/components/MarketDataTable.js

import React, { useEffect, useState } from "react";
import "../styles/MarketDataTable.css";

const MarketDataTable = () => {
  const [marketData, setMarketData] = useState([]);

  useEffect(() => {
    // Simulate fetching market data
    const mockData = [
      { symbol: "BTC/USDT", price: "62000", volume: "2000" },
      { symbol: "ETH/USDT", price: "4000", volume: "5000" },
    ];
    setMarketData(mockData);
  }, []);
  return (
    <div className="market-data-table">
      <h2>Market Data</h2>
      <table>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Price</th>
            <th>Volume</th>
          </tr>
        </thead>
        <tbody>
          {marketData.map((data, index) => (
            <tr key={index}>
              <td>{data.symbol}</td>
              <td>{data.price}</td>
              <td>{data.volume}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MarketDataTable;
