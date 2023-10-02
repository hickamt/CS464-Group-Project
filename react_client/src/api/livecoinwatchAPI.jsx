// LiveCoinWatch Documenation for API Calls and Options:
// https://livecoinwatch.github.io/lcw-api-docs/?javascript#coinslist

/*
  NOTE: this should be changed to an Async/Await function
  See pages 25 and 26 of Learning REACT textbook (O'Reilly 2nd Edition)
*/

export function lcwCryptoAPI(setLCWData) {
  return fetch(new Request("https://api.livecoinwatch.com/coins/map"), {
    method: "POST",
    headers: new Headers({
      "content-type": "application/json",
      // include YOUR LiveCoinWatch key in the '.env'
      // use the name: VITE_yourDescriptorHere_API_KEY = 'key'
      "x-api-key": import.meta.env.VITE_COINWATCH_API_KEY,
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
  }).then(async (response) => {
    const isJson = response.headers
      .get("content-type")
      ?.includes("application/json");
    const data = isJson && (await response.json());
    // console.table(Object.values(data));

    if (!response.ok) {
      const error = (data && data.message) || response.status;
      return Promise.reject(error);
    }
    setLCWData(data);
    return data;
  });
}
