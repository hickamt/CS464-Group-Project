import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useState, useEffect } from "react";
import lcwCryptoAPI from "../../api/livecoinwatchAPI";
import lcwRemainingCredits from "../../api/lcwRemainingCredits";
import expressQueryAPI from "../../api/expressQueryAPI";
import SpinAnimation from "../animation/Animation";

function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  let a = Math.random();
  if (a > 0.8) {
    a -= 0.5;
  }
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

const combineData = function combineDataWithCryptoData(
  userData,
  cryptoData,
  setData
) {
  const temp = [];
  userData.map((data) => {
    const { asset, remaining } = data;
    const { rate, volume, delta } = cryptoData.find(
      (data) => data.code.toUpperCase() === asset.toUpperCase()
    );
    temp.push({
      asset: asset,
      remaining: remaining,
      spot: rate,
      value: rate * remaining,
      volume: volume,
      day: (delta.day - 1) * 100,
      hour: (delta.hour - 1) * 100,
      week: (delta.week - 1) * 100,
      month: (delta.month - 1) * 100,
    });
  });
  setData(temp);
};

export default function DoughnutChart() {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState([]);
  const [runEffect, setRunEffect] = useState(true);

  useEffect(() => {
    console.log("remaining credits ", lcwRemainingCredits());
    async function fetchData() {
      const expressData = await expressQueryAPI("remaining");
      const cryptoData = await lcwCryptoAPI();
      if (expressData && cryptoData) {
        const filteredExpressData = expressData.filter(
          (data) => data.remaining >= 0.01
        );
        combineData(filteredExpressData, cryptoData, setUserData);
        setIsLoading(false);
      }
    }
    fetchData();
  }, [runEffect]);

  setTimeout(() => {
    setRunEffect(!runEffect);
  }, 180000);

  ChartJS.register(ArcElement, Tooltip, Legend);

  const labels = [];
  const dataPoints = [];
  const backgroundColors = [];

  userData.forEach((assetData) => {
    labels.push(assetData.asset);
    dataPoints.push(assetData.value);
    backgroundColors.push(getRandomColor());
  });

  const doughnutData = {
    labels: labels,
    datasets: [
      {
        label: "Asset Value",
        data: dataPoints,
        backgroundColor: backgroundColors,
        borderColor: backgroundColors,
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      {isLoading && <SpinAnimation />}
      <div className="doughnut-chart">
        <Doughnut data={doughnutData} />
      </div>
    </>
  );
}
