import { useState, useRef } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  FaThermometerHalf,
  FaCloudSun,
  FaLocationArrow,
  FaWind,
} from "react-icons/fa";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const inputRef = useRef(null); // Create a ref for the input

  const predefinedCities = [
    "Mumbai,India",
    "Nashik,India",
    "Pune,India",
    "Nagpur,India",
    "Aurangabad,India",
    "Thane,India",
    "Bangalore,India",
    "Delhi,India",
  ];

  const fetchWeather = async (location) => {
    const options = {
      method: "GET",
      url: "https://visual-crossing-weather.p.rapidapi.com/forecast",
      params: {
        contentType: "json",
        unitGroup: "metric",
        aggregateHours: "24",
        location: location,
        shortColumnNames: "false",
      },
      headers: {
        "x-rapidapi-key": "547c74bcdemsh8baed559c58e1fdp113009jsn7c1bf6864d95", 
        "x-rapidapi-host": "visual-crossing-weather.p.rapidapi.com",
      },
    };

    try {
      setLoading(true);
      const response = await axios.request(options);
      setWeatherData(response.data);
      setError(null);
    } catch (err) {
      setError("Error fetching weather data. Please try again later.");
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleCitySubmit = (e) => {
    e.preventDefault();
    fetchWeather(city);
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handlePredefinedCitySelect = (selectedCity) => {
    setCity(selectedCity);
    fetchWeather(selectedCity);
    if (inputRef.current) {
      inputRef.current.focus(); 
    }
  };

  const getWeatherCondition = () => {
    if (weatherData && weatherData.locations && weatherData.locations[city]) {
      const precip = weatherData.locations[city].values[0].precip;
      const temp = weatherData.locations[city].values[0].temp;

      if (precip >= 60) return "rain";
      if (temp <= 25) return "snow";
      return "sunny";
    }
    return null;
  };

  const weatherCondition = getWeatherCondition();

  return (
    <motion.div
      className="h-[100vh] flex flex-col items-center justify-center p-6 bg-[#FAFAFA]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold text-[#130912] mb-6 text-center">
        <FaLocationArrow className="inline-block text-[#E77917] mb-1" /> Weather
        Checker
      </h1>

      <form
        onSubmit={handleCitySubmit}
        className="mb-6 flex flex-col md:flex-row gap-4"
      >
        <input
          type="text"
          value={city}
          onChange={handleCityChange}
          ref={inputRef} 
          required
          placeholder="Enter city name..."
          className="p-2 border border-[#E77917] rounded-lg w-full md:w-60 text-[#130912] focus:ring-2 focus:ring-[#E77917]"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-[#E77917] text-white font-semibold rounded-lg hover:bg-[#130912] transition duration-300"
        >
          Check Weather
        </button>
      </form>

      {loading ? (
        <p className="text-lg text-[#130912] font-semibold">Loading...</p>
      ) : error ? (
        <p className="text-lg text-red-500">{error}</p>
      ) : (
        weatherData &&
        weatherData.locations[city] && (
          <motion.div
            className="bg-white p-6 rounded-lg shadow-md w-full md:w-2/3 lg:w-1/3"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-semibold text-center text-[#130912] mb-4">
              {city.split(",")[0]} Weather 
            </h2>
            <p className="text-lg text-center text-[#130912]">
              <FaThermometerHalf className="inline-block text-[#E77917] mr-2" />
              {weatherData.locations[city].values[0].temp}°C
            </p>
            <p className="text-center text-[#130912] mt-2">
              <FaCloudSun className="inline-block text-[#E77917] mr-2" />
              {weatherData.locations[city].values[0].conditions}
            </p>
            <p className="text-center text-[#130912] mt-2">
              Humidity: {weatherData.locations[city].values[0].humidity}%
            </p>
            <p className="text-center text-[#130912] mt-2">
              <FaWind className="inline-block text-[#E77917] mr-2" />
              Wind Speed: {weatherData.locations[city].values[0].windspeed} km/h
            </p>
            <p className="text-center text-[#E77917] mt-2">
              Precipitation: {weatherData.locations[city].values[0].precip}%
            </p>
          </motion.div>
        )
      )}

      <div className="mt-6">
        <h2 className="text-xl text-[#130912] font-semibold">Select a city:</h2>
        <ul className="flex flex-wrap gap-4 mt-2">
          {predefinedCities.map((predefinedCity) => (
            <li key={predefinedCity}>
              <button
                onClick={() => handlePredefinedCitySelect(predefinedCity)}
                className="bg-white border border-[#E77917] shadow-md rounded-lg px-4 py-2 text-[#E77917] hover:bg-[#E77917] hover:text-white transition duration-300"
              >
                {predefinedCity.split(",")[0]}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {weatherCondition === "rain" && <RainAnimation />}
      {weatherCondition === "sunny" && <SunRaysAnimation />}
      {weatherCondition === "snow" && <SnowAnimation />}
    </motion.div>
  );
};

const RainAnimation = () => {
  return (
    <motion.div
      className="absolute inset-0 z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 5 }}
    >
      {[...Array(100)].map((_, index) => (
        <motion.div
          key={index}
          className="rain"
          style={{
            position: "absolute",
            top: `${Math.random() * 100}vh`,
            left: `${Math.random() * 100}vw`,
            width: "2px",
            height: "20px",
            backgroundColor: "blue",
          }}
          animate={{
            y: ["0vh", "100vh"],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </motion.div>
  );
};

const SunRaysAnimation = () => {
  return (
    <motion.div
      className="absolute inset-0 z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 5 }}
    >
      {[...Array(10)].map((_, index) => (
        <motion.div
          key={index}
          className="sun-ray"
          style={{
            position: "absolute",
            top: `${Math.random() * 100}vh`,
            left: `${Math.random() * 100}vw`,
            width: "8px",
            height: "10px",
            backgroundColor: "rgba(255, 255, 0, 0.7)",
            borderRadius: "50%",
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </motion.div>
  );
};

const SnowAnimation = () => {
  return (
    <motion.div
      className="absolute inset-0 z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 5 }} 
    >
      {[...Array(50)].map((_, index) => (
        <motion.div
          key={index}
          className="snow"
          style={{
            position: "absolute",
            top: `${Math.random() * -50}px`,
            left: `${Math.random() * 100}vw`,
            width: "5px",// Changed to blue for snow
            borderRadius: "50%",
          }}
          animate={{
            y: ["-50px", "100vh"],
          }}
          transition={{
            duration: 6, 
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </motion.div>
  );
};

export default Weather;
