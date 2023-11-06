import React, { useState } from 'react';
import HistoricalLineChart from '../components/chart/HistoricalLineChart';

const ChartsPage = () => {
  const [selectedCoin, setSelectedCoin] = useState('BTC');
  const [dateRange, setDateRange] = useState('30d');

  const handleChangeCoin = (event) => {
    setSelectedCoin(event.target.value);
  };

  const handleChangeDateRange = (event) => {
    setDateRange(event.target.value);
  };

  const getTimestamps = (range) => {
    const now = new Date();
    const end = now.getTime(); // current timestamp
    let start;

    switch (range) {
      case '1w':
        start = new Date(now.setDate(now.getDate() - 7)).getTime();
        break;
      case '30d':
        start = new Date(now.setDate(now.getDate() - 30)).getTime();
        break;
      case '6m':
        // Approximate 6 months as 30 days per month
        start = new Date(now.setMonth(now.getMonth() - 6)).getTime();
        break;
      case '1y':
        start = new Date(now.setFullYear(now.getFullYear() - 1)).getTime();
        break;
      default:
        start = end; // Default case to avoid undefined behavior
    }

    return { start, end };
  };

  const { start, end } = getTimestamps(dateRange);

  return (
    <div>
      <h1>Charts Page</h1>
      <div>
        <label htmlFor="coin-select">Choose a coin:</label>
        <select
          id="coin-select"
          value={selectedCoin}
          onChange={handleChangeCoin}
        >
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
      <div>
        <label htmlFor="date-range-select">Choose a date range:</label>
        <select
          id="date-range-select"
          value={dateRange}
          onChange={handleChangeDateRange}
        >
          <option value="1w">Last 1 week</option>
          <option value="30d">Last 30 days</option>
          <option value="6m">Last 6 months</option>
          <option value="1y">Last 1 year</option>
        </select>
      </div>
      <HistoricalLineChart
        coin={selectedCoin}
        start={start.toString()}
        end={end.toString()}
      />
    </div>
  );
};

export default ChartsPage;
