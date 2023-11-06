import React, { useState } from 'react';
import HistoricalLineChart from '../components/chart/HistoricalLineChart';

const ChartsPage = () => {
  const [coin, setCoin] = useState('BTC');

  const handleSubmit = (event) => {
    event.preventDefault();
    const newCoin = event.target.elements.coinInput.value;
    setCoin(newCoin);
  };

  return (
    <div>
      <HistoricalLineChart
        coin={coin}
        start={'1698884890423'}
        end={'1698971290423'}
      />
      <h1>Charts Page</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="coinInput"></input>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ChartsPage;
