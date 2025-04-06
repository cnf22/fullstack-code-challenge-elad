const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const morganLogger = require("morgan");
const logger = require("./services/logger");
require("dotenv").config();

const { router } = require("./routes");

const app = express();

app.use(morganLogger("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use("/", router);

//404 handler
app.use((req, res) => {
  logger.warn(`404 request ` + req.originalUrl);
  res.status(404).json({ error: "404" });
});

//catch all handler
app.use((err, req, res, next) => {
  logger.error(JSON.stringify(err.stack));
  res.status(500).json({ error: "Something went wrong" });
});

module.exports = app;
