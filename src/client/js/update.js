function updateForecast (forecastData) {
    for (let i = 0; i < 10; i++) {
        document.getElementById(`date-${i}`).innerText = `${forecastData[i].datetime}`.substring(5);
        document.getElementById(`high-temp-${i}`).innerText = `${forecastData[i].high_temp} °C`;
        document.getElementById(`low-temp-${i}`).innerText = `${forecastData[i].low_temp} °C`;
        document.getElementById(`precipitation-${i}`).innerText = `${forecastData[i].precip} cm`;
    };
}

function updatePhoto (url) {
    const bodyElement = document.getElementsByTagName('body')[0];
    bodyElement.style.backgroundImage = `url('${url}')`;
}

export { 
    updateForecast,
    updatePhoto
}