import axios from "axios";

/*
  Post request to 'get' one of the following queries:
  'purchases', 'sales', 'remaining', 'exchanges', or 'assets' 

  Server Request Path: '/express_server/controllers/queriesController.js'
*/

// const [myData, setmyData] = useState([]);
// const [isData, setIsData] = useState(false);
// const [isAnimation, setisAnimation] = useState(false);

// return (
//   {isAnimation && <MyAnimation />}
//   {

//     isData && <Mycomponent />
//   }
// )

export default async function expressQueryAPI(query) {
  try {
    return await axios
      .post("http://localhost:5500/queries", {
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
