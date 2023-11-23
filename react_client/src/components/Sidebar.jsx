/* eslint-disable react/prop-types */
import { FaRegListAlt } from "react-icons/fa";
import { FcDataSheet, FcDoughnutChart, FcComboChart } from "react-icons/fc";
import { useAuth } from "../context(s)/AuthContext";
import pageLogo from "../assets/abstract_c.png";
// Sidbar setup for testing
export default function Sidebar({ switchAssetView, switchChartView }) {
  const { currentUser, login, logout } = useAuth();
  return (
    <div className="sidebar text-center">
      <img
        src={pageLogo}
        alt="abstract c"
        className="sidebar-image d-flex flex-column align-items-center"></img>
      <section className="sidebar-header-space"></section>
      <section className="sidebar-chart-view">
        {/* <p className="sidebar-charts fs-5 mt-1">VISUALIZE</p> */}
        <button
          className="card-btn sidebar-btn"
          value="chart"
          aria-label="Pie Chart"
          onClick={(e) => switchChartView(e, e.target.value)}>
          <FcDoughnutChart className="fc-icon" />
          {/* Pie Chart */}
        </button>
        <button
          className="card-btn sidebar-btn"
          value="line-chart"
          aria-label="Line Chart"
          onClick={(e) => switchChartView(e, e.target.value)}>
          <FcComboChart className="fc-icon" />
          {/* Line Chart */}
        </button>
        <button
          className="card-btn sidebar-btn"
          value="line-compare"
          aria-label="Line Compare"
          onClick={(e) => switchChartView(e, e.target.value)}>
          <FcComboChart className="fc-icon" />
          {/* Compare */}
        </button>
      </section>

      <section className="sidebar-asset-view">
        {/* <p className="sidebar-analyze fs-5 mt-1">ANALYZE</p> */}
        <button
          className="card-btn sidebar-btn"
          value="card"
          aria-label="Price Card"
          onClick={(e) => switchAssetView(e, e.target.value)}>
          <FaRegListAlt className="fc-icon" />
          {/* Card */}
        </button>
        <button
          className="card-btn sidebar-btn"
          value="table"
          aria-label="Data Table"
          onClick={(e) => switchAssetView(e, e.target.value)}>
          <FcDataSheet className="fc-icon" />
          {/* Table */}
        </button>
      </section>
      <section className="login-logout mt-auto">
        {currentUser ? (
          <p className="text-center">
            {currentUser.username !== "Joe User" ? "Please login" : "Joe User"}
          </p>
        ) : null}
        {currentUser ? (
          <button className="logout-btn btn mb-3 mx-auto" onClick={logout}>
            Logout
          </button>
        ) : (
          <button className="login-btn btn mb-3 mx-auto" onClick={login}>
            Login
          </button>
        )}
      </section>
    </div>
  );
}
