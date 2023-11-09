import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Cards from "../components/card/Card";
import Table from "../components/table/Table";

// Nathan Moes
import Chart from "../components/chart/Chart";
import HistoricalLineChart from "../components/chart/HistoricalLineChart";
import HistoricalLineChartCompTwo from "../components/chart/HistoricalLineChartCompTwo";

// Chart Styles
import "../components/chart/styles/chart.css";

function Main() {
  const [analyze, setAnalyze] = useState(<Cards />);
  const [visualize, setVisualize] = useState(<Chart />)

  const switchChartView = (e, value) => {
    e.preventDefault();
    switch (value) {
      case "chart":
        setVisualize(<Chart />);
        break;
      case "line-chart":
        setVisualize(<HistoricalLineChart />);
        break;
      case "line-compare":
        setVisualize(<HistoricalLineChartCompTwo />);
        break;
      default:
        setMainView(<Chart />);
        break;
    }
  };

  const switchAssetView = (e, value) => {
    e.preventDefault();
    switch (value) {
      case "card":
        setAnalyze(<Cards />);
        break;
      case "table":
        setAnalyze(<Table />);
        break;
      default:
        setAnalyze(<Cards />);
        break;
    }
  };

  return (
    <div className="main-view-container">
      <Sidebar switchChartView={switchChartView} switchAssetView={switchAssetView} />
      <div className="dashboard-container mt-3">
        <div className="main-header ">
          <Header />
        </div>

        <div className="main-view d-flex justify-content-center">
          {visualize}
        </div>

        <div className="main-footer d-flex justify-content-center">
          {analyze}
        </div>
      </div>
    </div>
  );
}

export default Main;
