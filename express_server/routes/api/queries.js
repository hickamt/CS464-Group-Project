// Route to query request based on specific query number 
const express = require("express");
const router = express.Router();
const queriesController = require("../../controllers/queriesController");

router
  .route("/")
  .post(queriesController.postQuery);

module.exports = router;
