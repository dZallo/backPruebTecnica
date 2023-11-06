const weatherApi = require('../services/WeatherApi');
const googleFlightsService = require('../services/GoogleFlightsService');


async function getMostEconomicFiveFligth(req, res) {

    // 1º Obtener el origen destino y fechas de salida y llegada
    let { from, to, startDate, endDate } = req.query
    let result = {}

    //2º Extraer información de los 5 vuelos más económicos con el origen y el destino que elija el usuario (Hay que incluir en los datos el precio, fechas y aerolíneas).
    let flights = await googleFlightsService.getFlights(from, to, startDate, endDate)
    if (flights.length > 0) {
        result['flights'] = flights
    }

    //3º Clima actual en el destino y el pronóstico de los próximos días.
    let currentWeather = await weatherApi.getCurrentWeather(to)
    if (currentWeather) {
        result['currentWeather'] = currentWeather
    }
    

    //3º Pronostico de los siguientes dias
    let weatherNextDays = await weatherApi.getForecastDays(from);
    if(weatherNextDays.length >0) {
        result['weatherNextDays'] = weatherNextDays
    }
    console.debug("Result: ", result)

    //4º devolver listado de los vuelos con los datos añadidos

    res.send(result)
}


module.exports = {
    getMostEconomicFiveFligth
}
