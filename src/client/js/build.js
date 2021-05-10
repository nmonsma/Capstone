//Create the Forecast Grid:
function createForecast () {
    const forecastGrid = document.getElementById('forecast-grid');
    
    //Create a process for adding ten paragraphs to the forecast-grid all with the same class and id="class-#"
    function iterateBuild (title, className) {
        for (let i = -1; i < 10; i++) {
            const itemBox = document.createElement('p');
            itemBox.setAttribute('id',`${className}-${i}`);
            itemBox.classList.add(`${className}`);
            forecastGrid.appendChild(itemBox);
        };
        document.getElementById(`${className}--1`).innerText = `${title}`; //Make the first box (-1) the Title
    };
    iterateBuild ('Date', 'date');  // Add ten "date" paragraphs
    iterateBuild ('High', 'high-temp'); // Add ten "high temp" paragraphs
    iterateBuild ('Low', 'low-temp'); // Add ten "low temp"... and so on
    iterateBuild ('Precip', 'precipitation'); 
}

export { createForecast }