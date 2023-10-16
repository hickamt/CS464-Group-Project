// LiveCoinWatch Documenation for API Calls and Options:
// https://livecoinwatch.github.io/lcw-api-docs/?javascript#coinslist

// import axios from "axios";

/*
  NOTE: this should be changed to an Async/Await function
  See pages 25 and 26 of Learning REACT textbook (O'Reilly 2nd Edition)
*/

/**
 * POST request to retrieve the LiveCoinWatch 'resource: /coin/list'
 */
const coinListRequestOptions = {
  method: "POST",
  headers: new Headers({
    "Content-Type": "application/json",
    "x-api-key": "31621381-6652-4c92-a1c1-248823f4557f",
    // "x-api-key": import.meta.env.VITE_LCW_API_KEY,
  }),
  body: JSON.stringify({
    codes: ["AMP", "BAL", "BNB", "BOND", "BTC", "CLV", "COMP", "DOGE", "DOT", "ETH", "FET", "FORTH", "LUNC", "USDC", "USDT"],
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
      console.log("LiveCoinWatch Data: ", data);
      return [...data];
    });
  } catch (err) {
    console.log("LiveCoinWatch Post Error:", err);
    return err;
  }
};

// export default async function lcwCryptoAPI() {
//   try {
//     await axios
//       .post("https://api.livecoinwatch.com/coins/map", {
//         method: "POST",
//         headers: {
//           "content-type": "application/json",
//           "x-api-key": import.meta.env.VITE_LCW_API_KEY,
//         },
//         body: JSON.stringify({
//           codes: ["BNB", "BTC", "DOGE", "DOT", "ETH", "LUNC", "USDC", "USDT"],
//           // codes: assets,
//           currency: "USD",
//           sort: "rank",
//           order: "ascending",
//           offset: 0,
//           limit: 0,
//           meta: false,
//         }),
//       })
//       .then((response) => {
//         console.table("LCW Crypto Data: ", response.data);
//         return [...response.data];
//       })
//       .catch((error) => {
//         console.error(`Error: unable to fetch Crypto Data from server`, error);
//       });
//   } catch (error) {
//     console.error(error.message);
//   }
// }

export default lcwCryptoAPI;
