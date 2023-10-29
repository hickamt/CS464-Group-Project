import { useState, useEffect } from "react";
import expressQueryAPI from "../../api/expressQueryAPI";
import liveCoinWatchAPI from "../../api/livecoinwatchAPI";
import DoughnutChart from "./DoughnutChart";
import { sortValueHL } from "../../modules/arraySort";

// Animation
import SpinAnimation from "../animation/Animation";

// Sytles
import "./styles/chart.css";

// Combine userData and cryptoData into one array (GH)
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
  setData(sortValueHL(temp));
};
export default function Chart() {
  const [userData, setUserData] = useState([]);
  const [isData, setIsData] = useState(false);
  const [runEffect, setRunEffect] = useState(true);

  // fetch expressQueryAPI and lcwCryptoAPI data, then combine data and set state
  useEffect(() => {
    console.log("Inside UseEffect()");
    async function fetchData() {
      const expressData = await expressQueryAPI("remaining");
      const cryptoData = await liveCoinWatchAPI();
      if (expressData && cryptoData) {
        combineData(expressData, cryptoData, setUserData);
        setIsData(true);
        console.log("Express Data: ", expressData);
        console.log("Crypto Data: ", cryptoData);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      {!isData && <SpinAnimation />}
      {isData && (
        <div className="chart-div text-center mt-3">
          <h1>CryptoCurrency Chart Data</h1>
          <DoughnutChart />
        </div>
      )}
    </>
  );
}
