import React, { useState } from 'react';
import HistoricalLineChart from '../components/chart/HistoricalLineChart';

const ChartsPage = () => {
  const [selectedCoin, setSelectedCoin] = useState('BTC');

  const handleChange = (event) => {
    setSelectedCoin(event.target.value);
    onCoinSelect(event.target.value);
  };

  return (
    <div>
      <HistoricalLineChart
        coin={selectedCoin}
        start={'1698884890423'}
        end={'1698971290423'}
      />
      <h1>Charts Page</h1>
      <div>
        <select value={selectedCoin} onChange={handleChange}>
          <option value="AMP">AMP</option>
          <option value="BAL">BAL</option>
          <option value="BNB">BNB</option>
          <option value="BOND">BOND</option>
          <option value="BTC">BTC</option>
          <option value="CLV">CLV</option>
          <option value="COMP">COMP</option>
          <option value="DOGE">DOGE</option>
          <option value="DOT">DOT</option>
          <option value="ETH">ETH</option>
          <option value="FET">FET</option>
          <option value="FORTH">FORTH</option>
          <option value="LUNC">LUNC</option>
          <option value="USDC">USDC</option>
          <option value="USDT">USDT</option>
        </select>
      </div>
    </div>
  );
};

export default ChartsPage;
