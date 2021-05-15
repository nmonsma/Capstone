#Nick Monsma's Udacity FEND Capstone

This project is intended to satisfy the requirements of the capstone project for the Udacity Front-End Nanodegree.

The code is all original, written from scratch. It uses node.js and webpack, setting up an express server and a client app. Service workers are also included to allow the app to be installed as a progressive web app.

The user is asked to enter a travel destination and a date, and the client-side app sends this data to the server. The server makes several external API calls to retrieve weather forecast for the trip, travel safety information, a photo, and air quality data. The client-side app then displays this data in a skeuomorphic format representing colored papers on a desk.

Functionality not required by the capstone rubric, but included for demonstratoin purposes:
- Travel advisory data pulled based on the country code of the destination.
- A clear button removes the data, allowing the user easier access to the inputs to plan another trip.
- A seven-day forecast, beginning on the date of travel, is displayed.