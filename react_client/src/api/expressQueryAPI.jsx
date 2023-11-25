import axios from "axios";

export default async function expressQueryAPI(query) {
  try {
    return await axios
      .post("http://localhost:5173/api/queries", {
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
