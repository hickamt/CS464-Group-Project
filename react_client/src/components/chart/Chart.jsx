import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useState, useEffect } from 'react';
import lcwCryptoAPI from '../../api/livecoinwatchAPI';
import lcwRemainingCredits from '../../api/lcwRemainingCredits';

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
  setData(sortHighLow(temp));
};
export default function ComponentThree() {
  const [cardIndex, setCardIndex] = useState(0);
  const [maxViews, setMaxViews] = useState(6);
  const [userData, setUserData] = useState([]);
  const [isData, setIsData] = useState(false);
  const [runEffect, setRunEffect] = useState(true);

  // fetch expressQueryAPI and lcwCryptoAPI data, then combine data and set state
  useEffect(() => {
    console.log('Inside UseEffect()');
    lcwRemainingCredits();
    async function fetchData() {
      const expressData = await expressQueryAPI('remaining');
      const cryptoData = await lcwCryptoAPI();
      if (expressData && cryptoData) {
        combineData(expressData, cryptoData, setUserData);
        setIsData(true);
      }
    }
    fetchData();
  }, [runEffect]);

  setTimeout(() => {
    if (runEffect) setRunEffect(false);
    else setRunEffect(true);
  }, 180000); // timer set to 3 seconds

  ChartJS.register(ArcElement, Tooltip, Legend);
  const data = {
    labels: ['Red', 'Blue', 'Yellow'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3],
        backgroundColor: ['red', 'blue', 'yellow'],
        borderColor: ['red', 'blue', 'yellow'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <div className="component-three text-center mt-3">
        <h1>CHARTS CHARTS CHARTS!!!!!</h1>
      </div>
      <Doughnut data={data} />
    </>
  );
}
