const express = require("express");
const {
  getGovernoratesController,
} = require("../controllers/governorates.controllers");
const router = express.Router();

router.get("/", getGovernoratesController);

module.exports = router;
