import axios from "axios";

// Function could be updated to Async/Await with try/catch
// or using new Promise((resolve,reject))

/*
  Post request to 'get' one of the following queries:
  'purchases', 'sales', 'remaining', 'exchanges', or 'assets' 

  Server Request Path: '/express_server/controllers/queriesController.js'
*/
export function expressQueryAPI(query, setData, setIsData, setAnimation) {
  axios
    .post("http://localhost:5500/queries", {
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        query: query,
      },
    })
    .then((response) => {
      setData(response.data);
      setIsData(true);
      setAnimation(false);
    })
    .catch((error) => {
      console.error(`Error: unable to fetch ${query} from server`, error);
    });
}
