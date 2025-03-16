const express = require("express");
const morgan = require("morgan");
require("dotenv").config();
const https = require("https"); // Add the https module
const fs = require("fs"); // Add the fs module
const path = require("path"); // Add the path module
const cors = require("cors");

const questions = require("./routes/questions");
const stations = require("./routes/stations");
const governorates = require("./routes/governorates");
const areas = require("./routes/areas");
const answers = require("./routes/answers");

const { logMessage } = require("./utils/system.utils");

const port = process.env.PORT || 3000; // Default to port 3000 if not specified
const logLevel = process.env.LOG_LEVEL || "tiny";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan(logLevel));
app.use("/api/v1/questions", questions);
app.use("/api/v1/stations", stations);
app.use("/api/v1/areas", areas);
app.use("/api/v1/governorates", governorates);
app.use("/api/v1/answers", answers);

// Load SSL certificate and private key
const options = {
  key: fs.readFileSync(path.join(__dirname, "selfsigned.key")),
  cert: fs.readFileSync(path.join(__dirname, "selfsigned.crt")),
};

// Create an HTTPS server
https.createServer(options, app).listen(port, () => {
  logMessage(
    `Forms is running on https://localhost:${port}`,
    "Success",
    "INFO"
  );
});
