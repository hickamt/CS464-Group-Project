import axios from "axios";

// GET state
export function getLocalState(
  endpoint,
  setdbIsBuilt,
  setdbIsRemoved,
  setAnimation
) {
  axios
    .get(`/api/${endpoint}`)
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
    .post(`/api/${endpoint}`, {
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
