const express = require("express");
const morgan = require("morgan");
require("dotenv").config();
const app = express();
const cors = require("cors");

const questions = require("./routes/questions");
const stations = require("./routes/stations");
const answers = require("./routes/answers");

const { logMessage } = require("./utils/system.utils");

const port = process.env.PORT;
const logLevel = process.env.LOG_LEVEL || "tiny";

app.use(cors());
app.use(express.json());
app.use(morgan(logLevel));
app.use("/api/v1/questions", questions);
app.use("/api/v1/stations", stations);
app.use("/api/v1/answers", answers);

app.listen(port, () => {
  logMessage(`Forms is running on http://localhost:${port}`, "Success", "INFO");
});
