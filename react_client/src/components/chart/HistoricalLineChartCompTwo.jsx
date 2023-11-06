import React, { useState, useEffect } from 'react';
import 'chartjs-adapter-date-fns';
import { Line } from 'react-chartjs-2';
import lcwSingleHistory from '../../api/lcwHistoricalAPI';
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
} from 'chart.js';

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

function HistoricalLineChartCompTwo({
  coins = ['BTC', 'ETH'],
  start = 1698884890423,
  end = 1698971290423,
}) {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    async function fetchChartData() {
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
      } catch (error) {
        console.error('Error fetching chart data: ', error);
      }
    }

    fetchChartData();

    const intervalId = setInterval(fetchChartData, 180000);

    return () => clearInterval(intervalId);
  }, [coins, start, end]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  };

  return (
    <div>
      <Line data={chartData} options={options} />
    </div>
  );
}

export default HistoricalLineChartCompTwo;
