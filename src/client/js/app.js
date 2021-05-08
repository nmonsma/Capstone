/*Global Variables*/

//Weatherbit 16-Day Forecast
const forecastKey = '497b54b009534839ba59e3d6f4f81ee9';
const forecastUrl = 'https://api.weatherbit.io/v2.0/forecast/daily?';
//https://www.weatherbit.io/api/weather-forecast-16-day
//https://api.weatherbit.io/v2.0/forecast/daily?city=Raleigh,NC&key=API_KEY

//Weatherbit Current Air Quality
const airQualityKey = '497b54b009534839ba59e3d6f4f81ee9';
const airQualityUrl = 'https://api.weatherbit.io/v2.0/current/airquality?';
//https://www.weatherbit.io/api/airquality-current
//https://api.weatherbit.io/v2.0/current/airquality?lat=35.7721&lon=-78.63861&key=API_KEY


const getLocation = async (data) => {
    //OpenCage Lat-Long
    const latLongKey = '5a30cda702464b90a8e4ff72c17f0d2a';
    const latLongUrl = 'https://api.opencagedata.com/geocode/v1/json?';
    //https://opencagedata.com/api
    //https://api.opencagedata.com/geocode/v1/json?q=PLACENAME&key=5a30cda702464b90a8e4ff72c17f0d2a

    const response = await fetch(`${latLongUrl}q=${data}&key=${latLongKey}`);
    if (response.status=='200') { //If the server returns a 200 ("okay") status...
        try {
            const returned = await response.json();
            return returned.results[0].geometry;
        }catch(error){
            console.log("error", error);
        }
    } else {
        return 'error';
    }
}

export { getLocation };