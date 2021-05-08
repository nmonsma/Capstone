//Return a Weather Forecast
const forecast = async (latitude, longitude) => {
    //Weatherbit 16-Day Forecast
    const forecastKey = '497b54b009534839ba59e3d6f4f81ee9';
    const forecastUrl = 'https://api.weatherbit.io/v2.0/forecast/daily?';
    //https://www.weatherbit.io/api/weather-forecast-16-day
    //https://api.weatherbit.io/v2.0/forecast/daily?city=Raleigh,NC&key=API_KEY

    const response = await fetch(`https://api.weatherbit.io/v2.0/forecast/daily?city=Raleigh,NC&key=${forecastKey}`);
        try {
            const returned = await response.json();
            return returned.data;
        }catch(error){
            console.log("error", error);
        }
}

//Return Air Quality Information
const airQuality = async (latitude, longitude) => {
    //Weatherbit Current Air Quality
    const airQualityKey = '497b54b009534839ba59e3d6f4f81ee9';
    const airQualityUrl = 'https://api.weatherbit.io/v2.0/current/airquality?';
    //https://www.weatherbit.io/api/airquality-current
    //https://api.weatherbit.io/v2.0/current/airquality?lat=35.7721&lon=-78.63861&key=API_KEY

    const response = await fetch(`${airQualityUrl}lat=${latitude}&lon=${longitude}&key=${airQualityKey}`);
        try {
            const returned = await response.json();
            return returned.data[0];
        }catch(error){
            console.log("error", error);
        }
}

//Return Latitude and Longitude for a Place Name
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
            return returned.results[0].geometry;  //Return the lat/long object
        }catch(error){
            console.log("error", error);
        }
    } else {
        return 'error'; //If the server didn't like the request, return 'error' so it can be handled.
    }
}

//Find a Photo Based on the Place Name
const getPhoto = async (data) => {
    //Pixabay
    const imageKey = '21522846-27a00893d043b59f2a796a600';
    const imageUrl = 'https://pixabay.com/api/?';
    const searchTerm = encodeURIComponent(data);
    //https://pixabay.com/api/
    //https://pixabay.com/api/?key=21522846-27a00893d043b59f2a796a600&q=yellow+flowers&image_type=photo

    //const response = await fetch (`https://pixabay.com/api/?key=21522846-27a00893d043b59f2a796a600&q=yellow+flowers&image_type=photo&pretty=true`);
    const response = await fetch (`${imageUrl}key=${imageKey}&q=${searchTerm}&image_type=photo&pretty=true`);
    try {
        const returned = await response.json();
        if (returned.total>0) {
            console.log(returned);
            return returned.hits[0].largeImageURL;
        }else{

            //If the first search returns no results, only search for the search string up until a special character. (e.g. "Chicago, IL" becomes "Chicago")

            const newSearchTerm = searchTerm.substring(0, searchTerm.indexOf('%'));
            const newResponse = await fetch (`${imageUrl}key=${imageKey}&q=${newSearchTerm}&image_type=photo&pretty=true`);
            try {
                const newReturned = await newResponse.json();
                if (newReturned.total>0) {
                    console.log(newReturned);
                    return newReturned.hits[0].largeImageURL;
                } else {
                    
                    // If the second search returns nothing, then return 'none';
                    
                    return 'none';
                }
            }catch(error){
                console.log("error", error);
            }
        }
    }catch(error){
        console.log("error",error);
    }
    //else
}

export { getLocation };
export { airQuality };
export { forecast };
export { getPhoto };