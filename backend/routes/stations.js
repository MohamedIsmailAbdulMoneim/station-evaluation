const express = require("express");
const router = express.Router();

const { getStationsController } = require("../controllers/stations.controller");

router.get("/", getStationsController);

module.exports = router;
