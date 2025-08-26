// File: src/components/NavBar.js

import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/NavBar.css";

const NavBar = () => {
  return (
    <nav className="nav-bar">
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
      >
        Dashboard
      </NavLink>
      <NavLink
        to="/market-data"
        className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
      >
        Market Data
      </NavLink>
      <NavLink
        to="/bot-settings"
        className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
      >
        Bot Settings
      </NavLink>
      <NavLink
        to="/history"
        className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
      >
        Trading History
      </NavLink>
      <NavLink
        to="/real-time-chart"
        className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
      >
        Real-Time Chart
      </NavLink>
      <NavLink
        to="/backtest"
        className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
      >
        Backtest
      </NavLink>
    </nav>
  );
};

export default NavBar;
