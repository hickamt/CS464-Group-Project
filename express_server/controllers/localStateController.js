const fs = require("fs");

// returns the complete filepath for this directory
const stateFilePath = require("path").resolve(
  __dirname,
  "../local_state/state.json"
);

// GET the local state (user theme)
const getState = (req, res) => {
  fs.readFile(stateFilePath, "utf8", (error, data) => {
    if (error) {
      console.log("Unable to read state.json file");
      res.status(400).json({ message: "Error reading state.json file" });
      throw error;
    }
    return res.status(200).json(data);
  });
};

// Post the changes to local state (user theme)
const postState = (req, res) => {
  const stateChange = [
    {
      stateKey1: req.body.data.stateData1,
      stateKey2: req.body.data.stateData2,
    },
  ];

  fs.writeFile(stateFilePath, JSON.stringify(stateChange, null, 2), (error) => {
    if (error) {
      console.log(
        "Unable to write the new state object to /local_state/state.json"
      );
      res.status(500).json({
        message:
          "Unable to write the new state object to /local_state/state.json",
      });
      throw error;
    }
    return res
      .status(200)
      .json({ message: "New state written to /local_state/state.json" });
  });
};

module.exports = {
  getState,
  postState,
};
