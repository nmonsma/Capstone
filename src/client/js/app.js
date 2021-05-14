import { postData } from './postData.js';
import { updateForecast } from './update.js';
import { updatePhoto } from './update.js';

// API Urls and Keys: 
// For the sake of not exposing the keys in the client-side code, all urls and keys are in server.js
// Post routes are used to retrieve the information from the APIs.

// Create the primary object with placeholder member: value pairs.
let tripData = {
    'city': '',
    'country': '',
    'lat': '',
    'lng': '',
    'date': '',    
}

function buttonClick () {
    //Assign values to the tripData object using information provided:
    const cityInput = document.getElementById('city').value;
    const dateInput = document.getElementById('date').value;
    
    if (cityInput!=='' && dateInput!=='') { // Error checking: make sure that users have filled both destination and date fields.
        tripData.city = cityInput;
        tripData.date = dateInput;
        //Get Latitude and Longitude using city search term from server:
        postData('http://localhost:3000/location', {'location': `${tripData.city}`})
        .then ((serverResponse)=> {
            //Store the coordinates and country code in variables.
            tripData.lat = serverResponse.results[0].geometry.lat;
            tripData.lng = serverResponse.results[0].geometry.lng;
            tripData.country = serverResponse.results[0].components["ISO_3166-1_alpha-2"];

            //Air Quality Index from server using coordinates
            postData('http://localhost:3000/aqi', {
                'lat': `${tripData.lat}`,
                'lng': `${tripData.lng}`
            })
            .then ((airQualityData)=> {
                //Update DOM element with AQI            
                document.getElementById('aqi').innerText=`The current Air Quality Index is: ${airQualityData.data[0].aqi}. A value over 100 means you should reconsider spending extended periods outside.`;
            })

            //Weather Forecast from server using coordinates
            postData('http://localhost:3000/forecast', {
                'lat': `${tripData.lat}`,
                'lng': `${tripData.lng}`
            })
            .then ((forecastData)=> {
                //Run function to update DOM elements with forecast data
                updateForecast(forecastData);
            });

            //Travel Advisory from server using country code
            postData('http://localhost:3000/advisory', {
                'country_code': `${tripData.country}`
            })
            .then ((advisoryData)=> {
                //Update DOM elements with advisory data
                document.getElementById('advisory').innerText=advisoryData.data[`${tripData.country}`].advisory.message;
            });

        });

        //Image from server
        postData('http://localhost:3000/image', {'location': `${tripData.city}`}) // Use the server post route to get coordinates for the search term.
        .then ((serverResponse)=> {
            //Use function to update DOM element with image URL
            updatePhoto(serverResponse.hits[0].largeImageURL);
        });
    } else {
        alert('Please enter both a destination and a date.');
        return('no data');
    }
}

export { buttonClick }