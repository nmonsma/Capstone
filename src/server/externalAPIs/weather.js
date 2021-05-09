/*External API call*/
app.post('/weather', async function (request, response){
    const apiData = `${request.body.JSONNAME}`; //TODO: add JSON name
    const externalResponse = await fetch(`${apiUrl}&key=${apiKey}&${apiData}`) //TODO: check api info
    try {
        const data = await externalResponse.json()
        response.send(data)
    } catch(error) {
        console.log(error)
    }
})


// const forecast = async (latitude, longitude) => {
//     //Weatherbit 16-Day Forecast
//     const forecastKey = '497b54b009534839ba59e3d6f4f81ee9';
//     const forecastUrl = 'https://api.weatherbit.io/v2.0/forecast/daily?';
//     //https://www.weatherbit.io/api/weather-forecast-16-day
//     //https://api.weatherbit.io/v2.0/forecast/daily?city=Raleigh,NC&key=API_KEY
//     //  &lat=38.123&lon=-78.543

//     // const response = await fetch(`https://api.weatherbit.io/v2.0/forecast/daily?city=Raleigh,NC&key=${forecastKey}`);
//     const response = await fetch(`${forecastUrl}&lat=${latitude}&lon=${longitude}&key=${forecastKey}`);
//         try {
//             const returned = await response.json();
//             return returned.data;
//         }catch(error){
//             console.log("error", error);
//         }
// }