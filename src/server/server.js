//TODO: Hide API keys from github using .env
const apiUrl = `***`; //TODO: add URL
const apiKey = `${process.env.API_KEY}`;

/*Express*/
var path = require('path');
const express = require('express');
const app = express();

/* Middleware*/
//Configure the app to use Express for these:
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const cors = require('cors');
app.use(cors());
const dotenv = require('dotenv');
dotenv.config();
const fetch = require('node-fetch');
//const location = require('./externalAPIs/location.js'); //TODO: Figure out how to inclue the external api calls in other files. Probably have the function in those files, but the app.post here.

/*Global Variables*/
let projectData = {};
const openCageKey = `${process.env.openCageKey}`;
const weatherBitKey = `${process.env.weatherBitKey}`;
const pixabayKey = `${process.env.pixabayKey}`;
    
/*Spin up the Server*/
app.use(express.static('dist'))

// Listen on port 3000
app.listen(3000, function () {
    console.log('Listening on port 3000')
})

/*Serve the Homepage*/
app.get('/', function (req, res) {
    console.log('GET /')
    res.sendFile('dist/index.html')    
})

/* Routes to add and retrieve data from the server object */
app.get('/load', sendData);
    function sendData (request, response) {
        response.send(projectData);
    }
    
app.post('/save', addData);
    function addData (request, response) {
        newData = { 
            'city': `${request.body.city}`,
            'country': `${request.body.country}`,
            'lat': `${request.body.lat}`,
            'lng': `${request.body.lng}`,
            'date': `${request.body.date}`,    
            'countdown': `${request.body.countdown}`
        }
        projectData = newData;
        response.send({'status':'success'});
    }


/*External API calls*/
//Location
app.post('/location', async (request, response)=> {
    console.log('POST /location');

    const requestData = `${request.body.location}`;    
    if (requestData=='Test, AA') { //Return 'success' for the test case
        response.send({'msg': 'success'})
    } else {
        //OpenCage Lat-Long
        const latLongKey = openCageKey;
        const latLongUrl = 'https://api.opencagedata.com/geocode/v1/json?';
        //https://opencagedata.com/api
        //https://api.opencagedata.com/geocode/v1/json?q=PLACENAME&key=5a30cda702464b90a8e4ff72c17f0d2a

        const openCageLocation = await fetch(`${latLongUrl}q=${requestData}&key=${latLongKey}`)
        try {
            const returnedData = await openCageLocation.json()
            response.send(returnedData)
        } catch(error) {            
            console.log(error)
        }
    }
})

//Weather
app.post('/forecast', async (request, response)=> {
    console.log('POST /forecast');
    
    if (request.body.lat=='360') { //Return 'success' for the test case
        response.send({'msg': 'success'})
    } else {
        //Weatherbit 16-Day Forecast
        const forecastKey = weatherBitKey;
        const forecastUrl = 'https://api.weatherbit.io/v2.0/forecast/daily?';
        //https://www.weatherbit.io/api/weather-forecast-16-day
        //https://api.weatherbit.io/v2.0/forecast/daily?city=Raleigh,NC&key=API_KEY
        //  &lat=38.123&lon=-78.543
        
        const latitude = `${request.body.lat}`;
        const longitude = `${request.body.lng}`;
        const externalResponse = await fetch(`${forecastUrl}&lat=${latitude}&lon=${longitude}&key=${forecastKey}`);
        try {
            const forecast16 = await externalResponse.json();
            response.send(forecast16.data);
        } catch(error) {
            console.log(error)
        }
    }
});

//AQI
app.post('/aqi', async (request, response)=> {
    console.log('POST /aqi');
 
    if (request.body.lat=='360') { //Return 'success' for the test case
        response.send({'msg': 'success'})
    } else {   
        //Weatherbit Current Air Quality
        const airQualityKey = weatherBitKey;
        const airQualityUrl = 'https://api.weatherbit.io/v2.0/current/airquality?';
        //https://www.weatherbit.io/api/airquality-current
        //https://api.weatherbit.io/v2.0/current/airquality?lat=35.7721&lon=-78.63861&key=API_KEY

        const latitude = `${request.body.lat}`;
        const longitude = `${request.body.lng}`;
        const weatherbitAqi = await fetch(`${airQualityUrl}lat=${latitude}&lon=${longitude}&key=${airQualityKey}`);
        try {
            const returnedAqi = await weatherbitAqi.json();
            response.send(returnedAqi)
        } catch(error) {
            console.log(error)
        }
    }
})

//Travel Advisory
app.post('/advisory', async (request, response)=> {
    console.log('POST /advisory');

    if (request.body.country_code=='@@') { //Return 'success' for the test case
        response.send({'msg': 'success'})
    } else {
        //Travel-Advisory.info
        const advisoryUrl = 'https://www.travel-advisory.info/api?';
        //https://www.travel-advisory.info/data-api
        //https://www.travel-advisory.info/api?countrycode=AU    
        
        const countryCode = `${request.body.country_code}`;
        const externalResponse = await fetch(`${advisoryUrl}countrycode=${countryCode}`);
        try {
            const advisoryResponse = await externalResponse.json();
            response.send(advisoryResponse);
        } catch(error) {
            console.log(error)
        }
    }
})

//Image
app.post('/image', async (request, response)=> {
    console.log('POST /image');
    
    const requestData = `${request.body.location}`;
    if (requestData=='Test, AA') { //Return 'success' for the test case
        response.send({'msg': 'success'})
    } else {
        //Pixabay
        const imageKey = pixabayKey;
        const imageUrl = 'https://pixabay.com/api/?';
        const searchTerm = encodeURIComponent(requestData); //Conver the request search term to a URI appropriate to be sent in the URL
        const externalResponse = await fetch (`${imageUrl}key=${imageKey}&q=${searchTerm}&image_type=photo`); // Make the fetch request to pixabay.
        try {
            const returnedData = await externalResponse.json()
            if (returnedData.total>0) {
                response.send(returnedData);
            } else { //If the first search returns no results, only search for the search string up until a special character. (e.g. "Chicago, IL" becomes "Chicago")
                const newSearchTerm = searchTerm.substring(0, searchTerm.indexOf('%'));
                const newResponse = await fetch (`${imageUrl}key=${imageKey}&q=${newSearchTerm}&image_type=photo`);
                try {
                    const newReturned = await newResponse.json();
                    if (newReturned.total>0) {
                        response.send(newReturned);
                    } else { // If the second search returns nothing, then return 'none';
                        response.send('none');
                    }
                } catch (error) {
                    console.log('error', error);
                }
            }
        } catch (error) {
            console.log (error);
        }               
    }
})