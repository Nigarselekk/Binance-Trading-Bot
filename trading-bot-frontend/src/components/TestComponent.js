import React, { useState } from "react";
import BacktestForm from "./BacktestForm";

const TestComponent = () => {
  const [backtestResults, setBacktestResults] = useState([]);

  return (
    <div>
      <h1>Backtest Results</h1>
      <BacktestForm onResults={(results) => setBacktestResults(results)} />
      {backtestResults.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Coin</th>
              <th>Buy Price</th>
              <th>Buy Time</th>
              <th>Sell Price</th>
              <th>Sell Time</th>
              <th>Profit</th>
            </tr>
          </thead>
          <tbody>
            {backtestResults.map((trade, index) => (
              <tr key={index}>
                <td>{trade.Coin}</td>
                <td>{trade.BuyPrice}</td>
                <td>{trade.BuyTime}</td>
                <td>{trade.SellPrice || "N/A"}</td>
                <td>{trade.SellTime || "N/A"}</td>
                <td>{trade.Profit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No backtest results available.</p>
      )}
    </div>
  );
};

export default TestComponent;
