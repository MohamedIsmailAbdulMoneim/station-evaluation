const express = require("express");
const router = express.Router();

const { getAreasController } = require("../controllers/areas.controller");

router.get("/", getAreasController);

module.exports = router;
