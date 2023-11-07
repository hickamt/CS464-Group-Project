import React, { useEffect, useState } from 'react';
import HistoricalLineChart from './HistoricalLineChart';
import lcwCryptoAPI from '../../api/livecoinwatchAPI';

export default function BTCHistoryPriceTest() {
  const [btcData, setBtcData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const data = await lcwCryptoAPI();
  //       setBtcData(data);
  //       setLoading(false);
  //     } catch (error) {
  //       console.error('Error fetching BTC data:', error);
  //       setError(error);
  //       setLoading(false);
  //     }
  //   }

  //   fetchData();
  // }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }

  return (
    <div>{btcData && <HistoricalLineChart data={btcData} coin="BTC" />}</div>
  );
}
