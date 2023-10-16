// LiveCoinWatch Documenation for API Calls and Options:
// https://livecoinwatch.github.io/lcw-api-docs/?javascript#coinslist

import axios from "axios";

/*
  NOTE: this should be changed to an Async/Await function
  See pages 25 and 26 of Learning REACT textbook (O'Reilly 2nd Edition)
*/

export default async function lcwCryptoAPI(setLCWData) {
  try {
    await axios
      .post("https://api.livecoinwatch.com/coins/map", {
        method: "POST",
        headers: new Headers({
          "content-type": "application/json",
          // "x-api-key": import.meta.env.VITE_COINWATCH_API_KEY
          "x-api-key": "31621381-6652-4c92-a1c1-248823f4557f",
        }),
        body: JSON.stringify({
          codes: ["BNB", "BTC", "DOGE", "DOT", "ETH", "LUNC", "USDC", "USDT"],
          // codes: assets,
          currency: "USD",
          sort: "rank",
          order: "ascending",
          offset: 0,
          limit: 0,
          meta: false,
        }),
      })
      .then((response) => {
        setLCWData(response.data);
        console.table("LCW Crypto Data: ", response.data);
      })
      .catch((error) => {
        console.error(`Error: unable to fetch Crypto Data from server`, error);
      });
  } catch (error) {
    console.error(error.message);
  }
}
