//Create the Forecast Grid:
function createForecast () {
    const forecastGrid = document.getElementById('forecast-grid');
    
    //Create a process for adding ten paragraphs to the forecast-grid all with the same class and id="class-#"
    function iterateBuild (className) {
        for (let i = 0; i < 10; i++) {
            const itemBox = document.createElement('p');
            itemBox.setAttribute('id',`${className}-${i}`);
            itemBox.classList.add(`${className}`);
            forecastGrid.appendChild(itemBox);
        };    
    };
    iterateBuild ('date');  // Add ten "date" paragraphs
    iterateBuild ('high-temp'); // Add ten "high temp" paragraphs
    iterateBuild ('low-temp'); // Add ten "low temp"... and so on
    iterateBuild ('precipitation'); 
}

export { createForecast }