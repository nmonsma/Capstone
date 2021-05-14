function updateForecast (forecastData, dateData) {
    let countdown = 100;
    let startIndex = 0;
    
    //figure out what list item in forecastData corresponds to the trip start date
    for (let i = 0; i < forecastData.length; i++) {
        if (forecastData[i].datetime.substring(8) == dateData.substring(8)) {
            countdown = i;
        }
    }

    //Set the countdown and the startindex variables based on the dates found in the forecast object
    if (countdown > 9) {
        startIndex = 9;
        if (countdown > 15) {
            countdown = 'Way too many!' //create a message if the trip is more than 16 days in the future
        };
    } else {
        startIndex = countdown;
    };
    
    for (let i = 0; i < 7; i++) {
        document.getElementById(`date-${i}`).innerText = `${forecastData[i + startIndex].datetime}`.substring(5);
        document.getElementById(`high-temp-${i}`).innerText = `${Math.round(forecastData[i + startIndex].high_temp)}`;
        document.getElementById(`low-temp-${i}`).innerText = `${Math.round(forecastData[i + startIndex].low_temp)}`;
        document.getElementById(`precipitation-${i}`).innerText = `${Math.round(forecastData[i + startIndex].precip)}`;
    };
    
    //Slide the card into view
    document.getElementById('top').classList.remove('hidden');

    //Return the countdown number:
    return(countdown);
}

function updatePhoto (url) {
    document.getElementById('image').style.backgroundImage = `url('${url}')`;
    
    //Slide the card into view
    document.getElementById('bottom').classList.remove('hidden');
}

function updateSafety(safetyData, country) {
    //Update DOM elements with advisory data
    document.getElementById('advisory').innerText=safetyData.data[`${country}`].advisory.message;

    //Slide the card into view
    document.getElementById('left').classList.remove('hidden');
}

function updateAqi(airQualityData) {
    document.getElementById('aqi').innerText=`The current Air Quality Index is: ${airQualityData.data[0].aqi}. A value over 100 means you should reconsider spending extended periods outside.`;
    
    //Slide the card into view
    document.getElementById('left').classList.remove('hidden');
}

function updateCountdown(countdownData) {
    document.getElementById('countdown').innerText = countdownData;

    //Slide the card into view
    document.getElementById('right').classList.remove('hidden');
}

export { 
    updateForecast,
    updatePhoto,
    updateSafety,
    updateAqi,
    updateCountdown
}