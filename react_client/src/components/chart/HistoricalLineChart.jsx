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

const dateHistory = [
  '11/1/2023, 5:40:00 PM',
  '11/1/2023, 5:55:00 PM',
  '11/1/2023, 6:10:00 PM',
  '11/1/2023, 6:25:00 PM',
  '11/1/2023, 6:40:00 PM',
  '11/1/2023, 6:55:00 PM',
  '11/1/2023, 7:10:00 PM',
  '11/1/2023, 7:25:00 PM',
  '11/1/2023, 7:40:00 PM',
  '11/1/2023, 7:55:00 PM',
  '11/1/2023, 8:10:00 PM',
  '11/1/2023, 8:25:00 PM',
  '11/1/2023, 8:40:00 PM',
  '11/1/2023, 8:55:00 PM',
  '11/1/2023, 9:10:00 PM',
  '11/1/2023, 9:25:00 PM',
  '11/1/2023, 9:40:00 PM',
  '11/1/2023, 9:55:00 PM',
  '11/1/2023, 10:10:00 PM',
  '11/1/2023, 10:25:00 PM',
  '11/1/2023, 10:40:00 PM',
  '11/1/2023, 10:55:00 PM',
  '11/1/2023, 11:10:00 PM',
  '11/1/2023, 11:25:00 PM',
  '11/1/2023, 11:40:00 PM',
  '11/1/2023, 11:55:00 PM',
  '11/2/2023, 12:10:00 AM',
  '11/2/2023, 12:25:00 AM',
  '11/2/2023, 12:40:00 AM',
  '11/2/2023, 12:55:00 AM',
  '11/2/2023, 1:10:00 AM',
  '11/2/2023, 1:25:00 AM',
  '11/2/2023, 1:40:00 AM',
  '11/2/2023, 1:55:00 AM',
  '11/2/2023, 2:10:00 AM',
  '11/2/2023, 2:25:00 AM',
  '11/2/2023, 2:40:00 AM',
  '11/2/2023, 2:55:00 AM',
  '11/2/2023, 3:10:00 AM',
  '11/2/2023, 3:25:00 AM',
  '11/2/2023, 3:40:00 AM',
  '11/2/2023, 3:55:00 AM',
  '11/2/2023, 4:10:00 AM',
  '11/2/2023, 4:25:00 AM',
  '11/2/2023, 4:40:00 AM',
  '11/2/2023, 4:55:00 AM',
  '11/2/2023, 5:10:00 AM',
  '11/2/2023, 5:25:00 AM',
  '11/2/2023, 5:40:00 AM',
  '11/2/2023, 5:55:00 AM',
  '11/2/2023, 6:10:00 AM',
  '11/2/2023, 6:25:00 AM',
  '11/2/2023, 6:40:00 AM',
  '11/2/2023, 6:55:00 AM',
  '11/2/2023, 7:10:00 AM',
  '11/2/2023, 7:25:00 AM',
  '11/2/2023, 7:40:00 AM',
  '11/2/2023, 7:55:00 AM',
  '11/2/2023, 8:10:00 AM',
  '11/2/2023, 8:25:00 AM',
  '11/2/2023, 8:40:00 AM',
  '11/2/2023, 8:55:00 AM',
  '11/2/2023, 9:10:00 AM',
  '11/2/2023, 9:25:00 AM',
  '11/2/2023, 9:40:00 AM',
  '11/2/2023, 9:55:00 AM',
  '11/2/2023, 10:10:00 AM',
  '11/2/2023, 10:25:00 AM',
  '11/2/2023, 10:40:00 AM',
  '11/2/2023, 10:55:00 AM',
  '11/2/2023, 11:10:00 AM',
  '11/2/2023, 11:25:00 AM',
  '11/2/2023, 11:40:00 AM',
  '11/2/2023, 11:55:00 AM',
  '11/2/2023, 12:10:00 PM',
  '11/2/2023, 12:25:00 PM',
  '11/2/2023, 12:40:00 PM',
  '11/2/2023, 12:55:00 PM',
  '11/2/2023, 1:10:00 PM',
  '11/2/2023, 1:25:00 PM',
  '11/2/2023, 1:40:00 PM',
  '11/2/2023, 1:55:00 PM',
  '11/2/2023, 2:10:00 PM',
  '11/2/2023, 2:25:00 PM',
  '11/2/2023, 2:40:00 PM',
  '11/2/2023, 2:55:00 PM',
  '11/2/2023, 3:10:00 PM',
  '11/2/2023, 3:25:00 PM',
  '11/2/2023, 3:40:00 PM',
  '11/2/2023, 3:55:00 PM',
  '11/2/2023, 4:10:00 PM',
  '11/2/2023, 4:25:00 PM',
  '11/2/2023, 4:40:00 PM',
  '11/2/2023, 4:55:00 PM',
  '11/2/2023, 5:10:00 PM',
  '11/2/2023, 5:25:00 PM',
];

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
  }, [runEffect]);

  setTimeout(() => {
    setRunEffect(!runEffect);
  }, 180000);

  const labels = userData.history?.map((entry) =>
    new Date(entry.date).toLocaleString()
  );

  // const data = userData.history?.map((entry) => entry.rate);

  const chartData = {
    // labels: labels,
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
  };

  return (
    <div>
      <Line data={chartData} options={options} />
    </div>
  );
}

export default HistoricalLineChart;
