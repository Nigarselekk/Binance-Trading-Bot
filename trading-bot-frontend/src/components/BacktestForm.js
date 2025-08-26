import React, { useState } from "react";
import PropTypes from "prop-types";

const BacktestForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    symbol: "",
    interval: "",
    startTime: "",
    endTime: "",
    period: 14,
    macdSignal: -174.16,
    buyRsiThreshold: 30,
    sellRsiThreshold: 70,
    macdThreshold: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="symbol"
        placeholder="Symbol"
        value={formData.symbol}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="interval"
        placeholder="Interval"
        value={formData.interval}
        onChange={handleChange}
        required
      />
      <input
        type="datetime-local"
        name="startTime"
        value={formData.startTime}
        onChange={handleChange}
        required
      />
      <input
        type="datetime-local"
        name="endTime"
        value={formData.endTime}
        onChange={handleChange}
        required
      />
      <button type="submit">Run Backtest</button>
    </form>
  );
};

BacktestForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default BacktestForm;
