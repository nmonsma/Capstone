function updateForecast (forecastData) {
    for (let i = 0; i < 7; i++) {
        document.getElementById(`date-${i}`).innerText = `${forecastData[i].datetime}`.substring(5);
        document.getElementById(`high-temp-${i}`).innerText = `${Math.round(forecastData[i].high_temp)}`;
        document.getElementById(`low-temp-${i}`).innerText = `${Math.round(forecastData[i].low_temp)}`;
        document.getElementById(`precipitation-${i}`).innerText = `${Math.round(forecastData[i].precip)}`;
    };
}

function updatePhoto (url) {
    document.getElementById('image').style.backgroundImage = `url('${url}')`;
}

export { 
    updateForecast,
    updatePhoto
}