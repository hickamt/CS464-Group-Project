import axios from "axios";

// Functions could be updated to Async/Await with try/catch
// or using new Promise((resolve,reject))

// GET state
export function getLocalState(
  endpoint,
  setdbIsBuilt,
  setdbIsRemoved,
 setAnimation 
) {
  axios
    .get(`http://localhost:5500/${endpoint}`)
    .then((response) => {
      const data = JSON.parse(response.data);
      setdbIsBuilt(data[0].dbIsBuilt);
      setdbIsRemoved(data[0].dbIsRemoved);
      setAnimation(true);
      return;
    })
    .catch((error) => {
      console.log("Unable to complete axios GET REQUEST: ", error);
      throw error;
    });
}

// POST state changes
export function postLocalState(endpoint, stateData1, stateData2) {
  axios
    .post(`http://localhost:5500/${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        stateKey1: stateData1,
        stateKey2: stateData2,
      },
    })
    .then((response) => {
      console.log("Update to local state successful", response.data);
    })
    .catch((error) => {
      console.log("Unable to save local state changes", error);
    });
}
