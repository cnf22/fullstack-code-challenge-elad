require("dotenv").config();
const axios = require("axios");
const logger = require("./logger");

class WeatherService {
  constructor() {
    this.weatherApiKey = process.env.API_WEATHER_KEY;
    this.weatherLat = process.env.VITE_WEATHER_LAT;
    this.weatherLon = process.env.VITE_WEATHER_LON;
    this.weatherLocation = process.env.VITE_WEATHER_LOCATION;
    this.windThreshold = process.env.VITE_THRESHOLD;
  }

  async fetchWeather() {
    try {
      const respond = await axios.get(
        `https://api.tomorrow.io/v4/weather/forecast?location=${this.weatherLat},${this.weatherLon}&timesteps=1h&apikey=${this.weatherApiKey}`
      );
      const result = {
        times: [],
        windSpeed: [],
        isHatOff: [],
        windThreshold: this.windThreshold,
        lat: this.weatherLat,
        lon: this.weatherLon,
        location: this.weatherLocation,
        lastUpdate: new Date().getTime(),
      };

      for (let i = 0; i < 12 && i < respond.data.timelines.hourly.length; i++) {
        result.times.push(respond.data.timelines.hourly[i].time);
        result.windSpeed.push(
          respond.data.timelines.hourly[i].values.windSpeed
        );
        result.isHatOff.push(
          respond.data.timelines.hourly[i].values.windSpeed >=
            process.env.VITE_THRESHOLD
            ? true
            : false
        );
      }
      return result;
    } catch (error) {
      console.log("error in weatherService fetchWeather");
      throw error;
    }
  }
}
module.exports = new WeatherService();
