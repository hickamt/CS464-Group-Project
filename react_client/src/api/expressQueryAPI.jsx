import axios from "axios";

const RENDER_URL = "https://crypto-dashboard-hsw9.onrender.com";

export default async function expressQueryAPI(query) {
  try {
    return await axios
      .post(`${RENDER_URL}/api/queries`, {
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          query: query,
        },
      })
      .then((response) => {
        return [...response.data];
      })
      .catch((error) => {
        console.error(`Error: unable to fetch ${query} from server`, error);
      });
  } catch (error) {
    console.error(error.message);
  }
}
