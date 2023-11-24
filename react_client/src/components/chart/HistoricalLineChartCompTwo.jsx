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
};

function HistoricalLineChartCompTwo({
  coins = ["ETH", "BTC"],
  start = new Date(),
  end = 1698971290423,
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    try {
      const dataFetchPromises = coins.map((coin) =>
        lcwSingleHistory(coin, start, end)
      );

      const getCompData = async function fetchChartData() {
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
      };
      getCompData();
    } catch (error) {
      console.error("Error fetching chart data: ", error);
    }
  }, []);

  return (
    <>
      {isLoading ? (
        <SpinAnimation />
      ) : (
        <div className="line-compare">
          <Line data={chartData} options={options} />
        </div>
      )}
    </>
  );
}

export default HistoricalLineChartCompTwo;
