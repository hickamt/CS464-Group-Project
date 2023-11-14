import axios from "axios";

export default async function expressQueryAPI(query) {
  try {
    return await axios
      .post("/api/queries", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
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
