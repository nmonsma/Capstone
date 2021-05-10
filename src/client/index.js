import './styles/styles.scss';
import './styles/desk-style.scss';
import { createForecast } from './js/build.js';
import { buttonClick } from './js/buttonClick.js';

/*Main Actions*/
createForecast();
document.getElementById('submit').addEventListener('click', buttonClick);
document.getElementById('city').addEventListener('keyup', function (keypress) { //Cause a kepress on button 13 (Enter) within the 'city' input to trigger a click on the submit button.
    if (keypress.keyCode === 13) {
        keypress.preventDefault();
        document.getElementById('submit').click();
    }
});