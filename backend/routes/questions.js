const express = require("express");
const router = express.Router();

const {
  getQuestionsController,
} = require("../controllers/questions.controllers");

router.get("/", getQuestionsController);

module.exports = router;
