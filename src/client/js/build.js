//Create the Forecast Grid:
function createForecast () {
    const forecastGrid = document.getElementById('forecast-grid');
    
    //Create a process for adding ten paragraphs to the forecast-grid all with the same class and id="class-#"
    function iterateBuild (title, className) {
        for (let i = -1; i < 7; i++) {
            const itemBox = document.createElement('div');
            const itemPara = document.createElement('p');
            itemBox.classList.add(`${className}`);
            itemPara.setAttribute('id',`${className}-${i}`);            
            itemBox.appendChild(itemPara);
            forecastGrid.appendChild(itemBox);
        };
        document.getElementById(`${className}--1`).innerText = `${title}`; //Make the first box (-1) the Title
    };
    iterateBuild ('Date', 'date');  // Add ten "date" paragraphs
    iterateBuild ('High °C', 'high-temp'); // Add ten "high temp" paragraphs
    iterateBuild ('Low °C', 'low-temp'); // Add ten "low temp"... and so on
    iterateBuild ('Precip cm', 'precipitation'); 
}

export { createForecast }