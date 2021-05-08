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

/*Global Variables*/
const apiUrl = `***`; //TODO: add URL
const apiKey = `${process.env.API_KEY}`;

/*Spin up the Server*/
app.use(express.static('dist'))

// Listen on port 3000
app.listen(3000, function () {
    console.log('Listening on port 3000!')
})

// Serve the homepage to the client
app.get('/', function (req, res) {
    res.sendFile('dist/index.html')    
})

/*External API call*/
// app.post('/***', async function (request, response){ //TODO: add route name
//     const apiData = `${request.body.***}`; //TODO: add JSON name
//     const externalResponse = await fetch(`${apiUrl}&key=${apiKey}&${apiData}`) //TODO: check api info
//     try {
//         const data = await externalResponse.json()
//         response.send(data)
//     } catch(error) {
//         console.log(error)
//     }
// })


