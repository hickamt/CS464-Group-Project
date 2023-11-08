import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import lcwSingleHistory from "../../api/lcwHistoricalAPI";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  PointElement,
  LineElement,
} from "chart.js";
import SpinAnimation from "../animation/Animation";

ChartJS.register(
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  PointElement,
  LineElement
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: `Crypto Comparative History | ${new Date()}`,
    },
  },
  title: {
    display: true,
    text: "Chart.js Line Chart",
  },
};

function HistoricalLineChartCompTwo({
  coins = ["BTC", "ETH"],
  // start = 16994207090000,
  start = new Date(),
  end = 1698971290423,
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  const getCompData = async function fetchChartData() {
    try {
      const dataFetchPromises = coins.map((coin) =>
        lcwSingleHistory(coin, start, end)
      );

      const results = await Promise.all(dataFetchPromises);

      const dateLabels = results[0]?.history.map((data) =>
        new Date(data.date).toLocaleString()
      );

      const coinDatasets = results.map((result, index) => ({
        label: `${coins[index]} Price in USD`,
        data: result.history.map((data) => data.rate),
        fill: false,
        borderColor: `hsl(${index * 120}, 100%, 50%)`,
        tension: 0.1,
      }));

      setChartData({
        labels: dateLabels,
        datasets: coinDatasets,
      });
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching chart data: ", error);
    }
  };

  setTimeout(() => {
    getCompData();
  }, 600000);

  return (
    <>
      {isLoading ? (
        <SpinAnimation />
      ) : (
        <div className="line-compare w-50">
          <Line data={chartData} options={options} />
        </div>
      )}
    </>
  );
}

export default HistoricalLineChartCompTwo;
