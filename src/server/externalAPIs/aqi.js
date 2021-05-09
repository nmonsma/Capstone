/*External API call*/
app.post('/aqi', async function (request, response){
    const apiData = `${request.body.JSONNAME}`; //TODO: add JSON name
    const externalResponse = await fetch(`${apiUrl}&key=${apiKey}&${apiData}`) //TODO: check api info
    try {
        const data = await externalResponse.json()
        response.send(data)
    } catch(error) {
        console.log(error)
    }
})

// //Return Air Quality Information
// const airQuality = async (latitude, longitude) => {
//     //Weatherbit Current Air Quality
//     const airQualityKey = '497b54b009534839ba59e3d6f4f81ee9';
//     const airQualityUrl = 'https://api.weatherbit.io/v2.0/current/airquality?';
//     //https://www.weatherbit.io/api/airquality-current
//     //https://api.weatherbit.io/v2.0/current/airquality?lat=35.7721&lon=-78.63861&key=API_KEY

//     const response = await fetch(`${airQualityUrl}lat=${latitude}&lon=${longitude}&key=${airQualityKey}`);
//         try {
//             const returned = await response.json();
//             return returned.data[0];
//         }catch(error){
//             console.log("error", error);
//         }
// }