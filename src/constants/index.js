// https://openweathermap.org/current
const WEATHER_API_KEY = "77e35e00e8e2c24e7f11c96663bd7e1a";
const WEATHER_API_URL_BASE = "http://api.openweathermap.org/data/2.5";

const CURRENT_WEATHER = "/weather";
// https://openweathermap.org/current#geo
const FORECAST_DAILY = "/forecast";
// https://openweathermap.org/forecast5

const GOOGLE_FLIGHTS_URL = "https://www.google.com/travel/flights?hl=es";

function getFirstObjectOfEachDay(data) {
    const result = [];
    let previousDate = null;
  
    for (const item of data) {
      const currentDate = new Date(item.dt * 1000).toDateString();
  
      if (currentDate !== previousDate) {
        result.push(item);
        previousDate = currentDate;
      }
    }
  
    return result;
  }

module.exports = {
    WEATHER_API_KEY,
    WEATHER_API_URL_BASE,
    CURRENT_WEATHER,
    FORECAST_DAILY,
    GOOGLE_FLIGHTS_URL,
    getFirstObjectOfEachDay
};