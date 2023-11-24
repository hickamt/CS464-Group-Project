// LiveCoinWatch Documenation for API Calls and Options:
// https://livecoinwatch.github.io/lcw-api-docs/?javascript#coinslist

/**
 * POST request to retrieve the LiveCoinWatch 'resource: /coin/list'
 */
const coinListRequestOptions = {
  method: "POST",
  headers: new Headers({
    "x-api-key": import.meta.env.VITE_COINWATCH_API_KEY,
    "Content-Type": "application/json",
  }),
  body: JSON.stringify({
    codes: [
      "AMP",
      "BAL",
      "BNB",
      "BOND",
      "BTC",
      "CLV",
      "COMP",
      "DOGE",
      "DOT",
      "ETH",
      "FET",
      "FORTH",
      "LUNC",
      "USDC",
      "USDT",
    ],
    // codes: assets,
    currency: "USD",
    sort: "rank",
    order: "ascending",
    offset: 0,
    limit: 0,
    meta: false,
  }),
};

const lcwCryptoAPI = async () => {
  try {
    return await fetch(
      new Request("https://api.livecoinwatch.com/coins/map"),
      coinListRequestOptions
    ).then(async (response) => {
      const isJson = response.headers
        .get("content-type")
        ?.includes("application/json");
      const data = isJson && (await response.json());

      if (!response.ok) {
        const error = (data && data.message) || response.status;
        return Promise.reject(error);
      }
      return [...data];
    });
  } catch (err) {
    console.log("LiveCoinWatch Post Error:", err);
    return err;
  }
};

export default lcwCryptoAPI;
