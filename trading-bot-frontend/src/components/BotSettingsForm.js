// BotSettingsForm.js
// File: src/components/BotSettingsForm.js

import React, { useState } from "react";
import "../styles/BotSettingsForm.css";

const BotSettingsForm = () => {
  const [formData, setFormData] = useState({
    stopLoss: "",
    takeProfit: "",
    indicator: "RSI",
    frequency: "",
    botActive: false,
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.stopLoss || parseFloat(formData.stopLoss) <= 0) {
      newErrors.stopLoss = "Stop-loss must be a positive number.";
    }
    if (!formData.takeProfit || parseFloat(formData.takeProfit) <= 0) {
      newErrors.takeProfit = "Take-profit must be a positive number.";
    }
    if (!formData.frequency || parseInt(formData.frequency, 10) <= 0) {
      newErrors.frequency = "Frequency must be a positive integer.";
    }
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await fetch(
          "http://localhost:7282/api/UpdateBotSettings",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );
        if (response.ok) {
          console.log("Settings updated successfully.");
        } else {
          console.error("Failed to update settings.");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    }
  };

  return (
    <div className="bot-settings-form">
      <h2>Trading Bot Settings</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Stop-Loss Level:</label>
          <input
            type="number"
            name="stopLoss"
            value={formData.stopLoss}
            onChange={handleChange}
          />
          {errors.stopLoss && <p className="error">{errors.stopLoss}</p>}
        </div>
        <div>
          <label>Take-Profit Level:</label>
          <input
            type="number"
            name="takeProfit"
            value={formData.takeProfit}
            onChange={handleChange}
          />
          {errors.takeProfit && <p className="error">{errors.takeProfit}</p>}
        </div>
        <div>
          <label>Indicator:</label>
          <select
            name="indicator"
            value={formData.indicator}
            onChange={handleChange}
          >
            <option value="RSI">RSI</option>
            <option value="Bollinger Bands">Bollinger Bands</option>
            <option value="MACD">MACD</option>
          </select>
        </div>
        <div>
          <label>Trade Execution Frequency (in seconds):</label>
          <input
            type="number"
            name="frequency"
            value={formData.frequency}
            onChange={handleChange}
          />
          {errors.frequency && <p className="error">{errors.frequency}</p>}
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              name="botActive"
              checked={formData.botActive}
              onChange={handleChange}
            />
            Activate Trading Bot
          </label>
        </div>
        <button type="submit">Save Settings</button>
      </form>
    </div>
  );
};

export default BotSettingsForm;
