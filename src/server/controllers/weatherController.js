const weatherService = require("./../services/weatherService");
const logger = require("./../services/logger");

class WeatherController {
  async getWeather(req, res) {
    try {
      //todo: caching
      const respond = await weatherService.fetchWeather();
      res.status(200).json(respond);
    } catch (error) {
      logger.error(
        `error in controller WeatherController getWeather Req Method: ${
          req.method
        } Path: ${req.protocol}://${req.get("host")}${
          req.originalUrl
        }. Error stack: ${JSON.stringify(error.stack)}`
      );
      res.status(500).json({ error: "Unable to fetch weather data" });
    }
  }
}

module.exports = new WeatherController();
