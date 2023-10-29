// Client/Server Error Response Codes can be found at the following link:
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#client_error_responses
// use these code with the response: e.g., res.status(400).json() where 400 is bad client request
// Route to query request based on specific query number

const fs = require("fs");
const { assets, exchanges } = require("../db/exchanges");
const {purchases} = require("../db/purchases")
const {remaining} = require("../db/remaining")
const {sales} = require("../db/sales")

/**
 * POST request for a static .json file in place of querying a database
 * @param req must contain a string data object to retrieve a file
 * @returns an array of .json type with key:value for purchases, sales, and remaining
 * or returns a string array for a list of assets/exchanges
 */
const postQuery = (req, res) => {
  const query = req.body.data.query;

  switch (query) {
    case "assets":
      console.log("Post Query Assets: ", assets);
      return res.status(200).json([...assets]);
    case "exchanges":
      console.log("Post Query Exchanges: ", exchanges);
      return res.status(200).json([...exchanges]);
    case "purchases":
      console.log("Post Query Purchases: ", purchases);
      return res.status(200).json([...purchases]);
    case "remaining":
      // console.log("Post Query Remaining: ", remaining);
      return res.status(200).json([...remaining]);
    case "sales":
      console.log("Post Query Sales: ", sales);
      return res.status(200).json([...sales]);

  }

  return res.status(400).json({
    error: error,
    message: `Post Query Error: the request for ${query} may not have a qualified request object.
      OR, your server is not running on port: 5523.`,
  });
};

module.exports = {
  postQuery,
};
