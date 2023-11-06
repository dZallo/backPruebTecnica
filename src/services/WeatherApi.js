const { WEATHER_API_KEY, WEATHER_API_URL_BASE, CURRENT_WEATHER, FORECAST_DAILY, getFirstObjectOfEachDay } = require("../constants/index.js")
const axios = require('axios');

async function getCurrentWeather(city) {
    console.debug("getCurrentWeather:" + city);
    try {
        const response = await axios.get(`${WEATHER_API_URL_BASE}${CURRENT_WEATHER}?APPID=${WEATHER_API_KEY}&q=${city}`);
        const data = response.data;
        const weather = cleanWeatherObject(data)
        return weather;
    } catch (error) {
        console.error(error);
        return { error: 'Error al obtener el clima' };
    }
}

async function getForecastDays(city) {
    console.debug("getForecastDays:" + city);
    try {
        const response = await axios.get(`${WEATHER_API_URL_BASE}${FORECAST_DAILY}?APPID=${WEATHER_API_KEY}&q=${city}`);
        const data = response.data;
        const nextDaysWeather = getFirstObjectOfEachDay(data.list).map(v => cleanWeatherObject(v))
        return nextDaysWeather;
    } catch (error) {
        console.error(error);
        return { error: 'Error al obtener el clima' };
    }
}

function cleanWeatherObject(weatherJson) {
    let weather = {}

    weather['dt'] = weatherJson.dt
    weather['weather'] = weatherJson.weather[0]
    weather['temp'] = weatherJson.main.temp
    weather['humidity'] = weatherJson.main.humidity
    weather['wind'] = weatherJson.wind.speed

    return weather
}

module.exports = {
    getCurrentWeather,
    getForecastDays
};