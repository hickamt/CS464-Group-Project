import React, { useState, useEffect } from 'react';
import 'chartjs-adapter-date-fns';
import { Line } from 'react-chartjs-2';
import lcwSingleHistory from '../../api/lcwHistoricalAPI';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
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
  BarElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  PointElement,
  LineElement
);

function HistoricalLineChart({
  coin = 'BTC',
  start = 1698884890423,
  end = 1698971290423,
}) {
  const [userData, setUserData] = useState([]);
  const [rates, setRates] = useState([]);
  const [dates, setDates] = useState([]);
  const [runEffect, setRunEffect] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const cryptoData = await lcwSingleHistory(coin, start, end);
      if (cryptoData) {
        setUserData(cryptoData);
        setRates(() => cryptoData.history.map((data) => data.rate));
        setDates(() =>
          cryptoData.history.map((data) => new Date(data.date).toLocaleString())
        );
        console.log(
          'User Data RATE: ',
          cryptoData.history?.map((entry) => entry.rate)
        );
        console.log(
          'User Data DATE: ',
          cryptoData.history?.map((entry) =>
            new Date(entry.date).toLocaleString()
          )
        );
      }
    }

    fetchData();
  }, [runEffect, coin]);

  setTimeout(() => {
    setRunEffect(!runEffect);
  }, 180000);

  const chartData = {
    labels: dates,
    datasets: [
      {
        label: `${coin} Price in USD`,
        data: rates,
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
        tension: 0.1,
      },
    ],
  };

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

export default HistoricalLineChart;
