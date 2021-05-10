//TODO:
// Import event listener
// Create test cases
// Create error handling
// Optional: Add trip start date and flight data to retrieve flight status and adjust the forecast for the dates of the trip.

import './styles/element-styles.scss';
import './styles/desktop-layout.scss';
import { createForecast } from './js/build.js';
import { buttonClick } from './js/app.js';

/*Main Actions*/
createForecast();
document.getElementById('submit').addEventListener('click', buttonClick);
document.getElementById('city').addEventListener('keyup', function (keypress) { //Cause a kepress on button 13 (Enter) within the 'city' input to trigger a click on the submit button.
    if (keypress.keyCode === 13) {
        keypress.preventDefault();
        document.getElementById('submit').click();
    }
});