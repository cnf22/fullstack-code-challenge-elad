import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const WeatherContext = createContext({
  loading: false,
  error: null,
  weatherData: null,
  fetchWeatherData: () => {},
  resetState: () => {},
});

function WeatherContextProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  const fetchWeatherData = async (useLocalStorageIfAvailable = true) => {
    //todo: localstorage logic
    try {
      if (loading) {
        return;
      }
      setError(null);
      setLoading(true);
      const respond = await axios.get(`http://localhost:4002/weather-info`);
      setWeatherData(respond.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const resetState = () => {
    setError(null);
    setLoading(false);
    setWeatherData(null);
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);

  return (
    <WeatherContext.Provider
      value={{ loading, error, weatherData, fetchWeatherData, resetState }}
    >
      {children}
    </WeatherContext.Provider>
  );
}

export default WeatherContextProvider;
