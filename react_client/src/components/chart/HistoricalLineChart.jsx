import React, { useState, useEffect } from 'react';
import 'chartjs-adapter-date-fns';
import { Line } from 'react-chartjs-2';
import lcwSingleHistory from '../../api/lcwHistoricalAPI';
import expressQueryAPI from '../../api/expressQueryAPI';
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

function HistoricalLineChart({ coin = 'BTC' }) {
  const [userData, setUserData] = useState([]);
  const [runEffect, setRunEffect] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const expressData = await expressQueryAPI('remaining');
      const cryptoData = await lcwSingleHistory();
      if (expressData && cryptoData) {
        // combineData(expressData, cryptoData, setUserData);
        setUserData(cryptoData);
      }
      console.log(cryptoData);
      console.log(cryptoData.history);
      console.log(chartData);
    }

    fetchData();
    console.log(
      userData.history?.map((entry) => new Date(entry.date).toLocaleString())
    );
    console.log(userData.history?.map((entry) => entry.rate));
  }, [runEffect]);

  setTimeout(() => {
    setRunEffect(!runEffect);
  }, 180000);

  const labels = userData.history?.map((entry) =>
    new Date(entry.date).toLocaleString()
  );

  const data = userData.history?.map((entry) => entry.rate);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: `${coin} Price in USD`,
        data: data,
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
        tension: 0.1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: 'time',
        time: {
          parser: 'x',
          unit: 'millisecond',
          tooltipFormat: 'MMM dd, yyyy hh:mm a',
        },
        autoSkip: false,
        title: {
          display: true,
          text: 'Date',
        },
        ticks: {
          maxRotation: 90,
          minRotation: 90,
          autoSkipPadding: 10,
        },
      },
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: 'Value',
        },
      },
    },
  };

  return (
    <div>
      <Line data={chartData} options={options} />
    </div>
  );
}

export default HistoricalLineChart;
