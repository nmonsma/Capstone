import { postData } from './postdata.js';
import { updateForecast } from './update.js';
import { updatePhoto } from './update.js';

function buttonClick () {
    const location = document.getElementById('city').value;
    
    //Get Latitude and Longitude using city search term from server:
    postData('http://localhost:3000/location', {'location': `${location}`})
    .then ((serverResponse)=> {
         //Store the coordinates in variables.
        const latitude = serverResponse.results[0].geometry.lat;
        const longitude = serverResponse.results[0].geometry.lng;

        //Air Quality Index from server using coordinates
        postData('http://localhost:3000/aqi', {
            'lat': `${latitude}`,
            'lng': `${longitude}`
        })
        .then ((airQualityData)=> {
            //Update DOM element with AQI
            document.getElementById('aqi').innerText=airQualityData.data[0].aqi;
        })

        //Weather Forecast from server using coordinates
        postData('http://localhost:3000/forecast', {
            'lat': `${latitude}`,
            'lng': `${longitude}`
        })
        .then ((forecastData)=> {
            //Run function to update DOM elements with forecast data
            updateForecast(forecastData);
        });
    });

    //Image from server
    postData('http://localhost:3000/image', {'location': `${location}`}) // Use the server post route to get coordinates for the search term.
    .then ((serverResponse)=> {
        //Use function to update DOM element with image URL
        updatePhoto(serverResponse.hits[0].largeImageURL);
    });
}

export { buttonClick }