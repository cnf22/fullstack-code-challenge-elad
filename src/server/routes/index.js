const express = require("express");
const weatherController = require("./../controllers/weatherController");
const router = express.Router();

router.get("/weather-info", (req, res, next) => {
  weatherController.getWeather(req, res);
});

module.exports = {
  router,
};
