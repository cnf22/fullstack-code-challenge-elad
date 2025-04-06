import styles from "./app.module.scss";
import { Header } from "../header/Header";
import { WeatherData } from "../weather-data/WeatherData";
import WeatherContextProvider from "../../context/WeatherContext";
function App() {
  return (
    <WeatherContextProvider>
      <main className="flex flex-col min-h-screen w-full items-center ">
        <Header />
        <WeatherData />
      </main>
    </WeatherContextProvider>
  );
}

export { App };
