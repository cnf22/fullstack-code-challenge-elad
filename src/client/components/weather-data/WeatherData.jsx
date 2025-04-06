import styles from "./weatherData.module.scss";
import { useContext, useEffect, useState } from "react";
import { WeatherContext } from "./../../context/WeatherContext";
import { useIsMobile } from "./../../hooks/useIsMobile";
import ReactECharts from "echarts-for-react";

const lastUpdatedFormat = (timestamp) => {
  const dateObj = new Date(timestamp);
  return `${dateObj.toLocaleDateString()} ${dateObj.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })}`;
};

function WeatherData() {
  const { loading, error, weatherData, fetchWeatherData, resetState } =
    useContext(WeatherContext);

  const isMobile = useIsMobile();
  const [echartsOptions, setEchartsOptions] = useState(null);

  useEffect(() => {
    if (isMobile === null || weatherData === null) {
      return;
    }

    const options = {
      series: [
        {
          data: weatherData.windSpeed,
          type: "bar",
          name: "speed",
          label: {
            show: true,
            color: "black",
            fontSize: "12px",
          },
          itemStyle: {
            color: (seriesIndex) => {
              return weatherData.isHatOff[seriesIndex.dataIndex]
                ? "#f56565"
                : "#4299e1";
            },
          },
        },
      ],
      tooltip: {},
    };

    if (isMobile === false) {
      (options.xAxis = {
        type: "category",
        data: weatherData.times.map((time) =>
          new Date(time).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })
        ),
        name: "hour",
      }),
        (options.yAxis = {
          type: "value",
          name: "speed",
        });
      options.series[0].label.position = "top";
    } else {
      (options.yAxis = {
        type: "category",
        data: weatherData.times.map((time) =>
          new Date(time).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })
        ),
        inverse: true,
        name: "hour",
      }),
        (options.xAxis = {
          type: "value",
          name: "speed",
        });
      options.series[0].label.position = "right";
    }
    setEchartsOptions(options);
  }, [weatherData, isMobile]);
  return (
    <section className="flex flex-col w-full h-full items-center justify-center px-4 md:px-8 py-6">
      {" "}
      <div className="flex flex-col gap-2 md:flex-row items-center justify-center md:items-start md:justify-between w-full mb-6">
        <div className="flex flex-col gap-1 items-center md:items-start">
          <h2 className="text-xl md:text-2xl text-center font-bold">
            Wind Speed at {import.meta.env.VITE_WEATHER_LOCATION}
          </h2>
          <span className="text-md text-gray-600">
            last updated at{" "}
            {weatherData
              ? lastUpdatedFormat(weatherData.lastUpdate)
              : "Loading..."}
          </span>
        </div>

        <button
          className={
            "bg-blue-500 text-white hover:bg-blue-600  rounded-lg disabled:bg-blue-300 px-4 py-2"
          }
          disabled={loading}
          onClick={() => fetchWeatherData(false)}
        >
          Refresh Data
        </button>
      </div>
      <div className="w-full flex flex-row gap-2 justify-center md:justify-start mb-2 md:mb-4">
        <div className="flex flex-row gap-1 items-center ">
          <div
            className="bg-blue-500 h-6 w-6"
            style={{ backgroundColor: "#4299e1" }}
          ></div>
          <span className="text-sm">Hat On</span>
        </div>
        <div className="flex flex-row gap-1 items-center">
          <div
            className="bg-red-500 h-6 w-6"
            style={{ backgroundColor: "#f56565" }}
          ></div>
          <span>Hat Off (High speed)</span>
        </div>
      </div>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded  mt-4">
          Error! please try refreshing in few moments
        </div>
      )}
      {loading && (
        <div className="animate-spin h-12 w-12 rounded-full border-t-2 border-b-2 border-blue-500 mt-4"></div>
      )}
      {!loading && weatherData && echartsOptions && (
        <div className="w-full h-full bg-white rounded-lg shadow-md p-4">
          <ReactECharts
            option={echartsOptions}
            style={
              isMobile
                ? { height: "800px", width: "100%" }
                : { height: "500px", width: "100%" }
            }
          />
        </div>
      )}
    </section>
  );
}

export { WeatherData };
