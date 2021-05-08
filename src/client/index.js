import './styles/styles.scss';
import { getLocation } from './js/app.js';

function buttonClick () {
    const location = 'Erie, PA';
    getLocation(location)
    .then ((latLong)=> {
        console.log(latLong);
    })
}

document.getElementById('submit').addEventListener('click', buttonClick);