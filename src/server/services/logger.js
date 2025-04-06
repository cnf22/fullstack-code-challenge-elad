const winston = require("winston");
require("dotenv").config();

const logger = winston.createLogger({
  level: "info",
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: process.env.LOG_PATH || "./logs/app.log",
    }),
  ],
});

module.exports = logger;
