import './styles/styles.scss';
import { getLocation } from './js/api.js';
import { airQuality } from './js/api.js';
import { forecast } from './js/api.js';
import { getPhoto } from './js/api.js';
import { createForecast } from './js/build.js';
import { updateAQI } from './js/update.js';
import { updateForecast } from './js/update.js';
import { updatePhoto } from './js/update.js';

function buttonClick () {
    const location = document.getElementById('city').value;
    let latLong = {};
    getLocation(location)
    .then ((response)=> {latLong = response})
    .then (()=> { //Get the Air Quality data and update the view with the data.
        airQuality(latLong.lat, latLong.lng)
        .then ((airQualityData)=> {
            console.log('Air Quality:', airQualityData);
            document.getElementById('aqi').innerText=airQualityData.aqi;
            //TODO: Add background color styling based on the AQI        
        })
    })
    .then (()=> {
        forecast(latLong.lat, latLong.lng)
        .then ((forecastData)=> {
            console.log('Forecast:', forecastData);
            //TODO: Add display of forecast data
        })
    });
    getPhoto(location)
    .then ((response)=> {
        console.log(response);
        updatePhoto(response);
    })    
}

/*Main Actions*/
createForecast();
document.getElementById('submit').addEventListener('click', buttonClick);