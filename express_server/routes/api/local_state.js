const express = require("express");
const router = express.Router();
const localStateController = require("../../controllers/localStateController");

router
  .route("/")
  .get(localStateController.getState)
  .post(localStateController.postState);

module.exports = router;
