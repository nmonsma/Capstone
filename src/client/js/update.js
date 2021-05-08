function updateAQI () {

}

function updateForecast () {

}

function updatePhoto (url) {
    const bodyElement = document.getElementsByTagName('body')[0];
    bodyElement.style.backgroundImage = `url('${url}')`;
}

export { updateAQI }
export { updateForecast }
export { updatePhoto }