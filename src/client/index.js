import './styles/element-styles.scss';
import './styles/desktop-layout.scss';
import { createForecast } from './js/build.js';
import { 
    buttonClick,
    clearCards,
    loadData
} from './js/app.js';

/*Main Actions*/
createForecast();

//Event Listeners attached from import
document.getElementById('submit').addEventListener('click', buttonClick);
document.getElementById('clear').addEventListener('click', clearCards);
document.getElementById('load').addEventListener('click', loadData);

//Cause a kepress on button 13 (Enter) within the 'city' input to trigger a click on the submit button.
document.getElementById('city').addEventListener('keyup', (keypress)=> { 
    if (keypress.keyCode === 13) {
        keypress.preventDefault();
        document.getElementById('submit').click();
    }
});