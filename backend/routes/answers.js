const express = require("express");
const router = express.Router();

const {
  insertAnswers,
  getAnswers,
} = require("../controllers/answers.controllers");

router.post("/", insertAnswers);
router.get("/", getAnswers);

module.exports = router;
