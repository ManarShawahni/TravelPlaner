import { getLocation, getWeather, getPhoto } from './api.js';
import { getRdays } from './helpers.js';
import { updateUI } from './ui.js';
import { showAlert, hideAlert, showToast, hideToast } from './alert.js';


// When the DOM is fully loaded, set up event listeners
document.addEventListener('DOMContentLoaded', () => {
    const closeAlertButton = document.getElementById('closeAlertButton');
    
    if (closeAlertButton) {
        closeAlertButton.addEventListener('click', hideAlert);
    } else {
        console.error('Close Alert button not found!');
    }
});

// Function to save trip data to local storage
const saveTripToLocalStorage = (trip) => {
    let trips = JSON.parse(localStorage.getItem('trips')) || [];
    trips.push(trip);
    localStorage.setItem('trips', JSON.stringify(trips));
  };


const form = document.querySelector("form");
const departingDate = document.querySelector("#departing");
const resultsPage = document.getElementById('results-page');


// Handle form submission when the "Add Trip" button is clicked
const handleClick = async (e) => {
    e.preventDefault();
    //console.log("button clicked");

    if (!resultsPage) {
        console.error("Results page element not found!");
        return;
    }

    resultsPage.style.display = 'block'; 
    resultsPage.classList.add('show');

    const date = departingDate.value;
    const today = new Date();
    const selectedDate = new Date(date);

    hideAlert();

    if (!date || selectedDate < today) {
        showAlert('Please select a future date for your trip.');
        return;
    }

    const location = form.querySelector('input[name="location"]').value.trim();
    if (!location) {
        showAlert('Please enter a location.');
        return;
    }

    try {
        const locationData = await getLocation();
        if (!locationData) {
            showAlert('City not found. Please enter a valid city.');
            return;
        }

        const { lng, lat, name } = locationData;
        const Rdays = getRdays(date);

        // Fetch weather data for the selected location
        const theWeather = await getWeather(lng, lat, Rdays);

       // console.log('Weather Data:', theWeather);

        if (!theWeather || !theWeather.city) {
            showToast('Weather data could not be retrieved. Please try again later.');
            return;
        }


        const searchTerm = theWeather.city;
        const photoUrl = await getPhoto(searchTerm);
        if (!photoUrl) {
            showToast('No photo found for the selected location.');
            return;
        }

        // Package all the trip data into an object
        const tripData = {
            city: theWeather.city,
            Rdays,
            temp: theWeather.temp,
            highTemp: theWeather.high_temp,
            lowTemp: theWeather.low_temp,
            weatherDescription: theWeather.forecast,
            departureDate: date,
            photoUrl
        };

        saveTripToLocalStorage(tripData);
        updateUI(tripData);


    } catch (error) {
        console.error('Error during handleClick:', error);
        showAlert('An unexpected error occurred. Please try again later.');

    }
};

// Load saved trips from local storage when the page is loaded

document.addEventListener('DOMContentLoaded', () => {
    const savedTrips = JSON.parse(localStorage.getItem('trips')) || [];
    savedTrips.forEach((trip) => updateUI(trip));
  });



const handleReset = () => {
    form.reset();

    const RdaysElement = document.getElementById('Rdays');
    const cityNameElement = document.querySelector('.cityName');
    const tempElement = document.querySelector('.temp');
    const tempRangeElement = document.querySelector('.temp-range');
    const weatherElement = document.querySelector('.weather');
    const photoElement = document.querySelector("#photo");

    // Only reset the fields if they exist on the page
    if (RdaysElement) RdaysElement.textContent = '';
    if (cityNameElement) cityNameElement.textContent = '';
    if (tempElement) tempElement.textContent = '';
    if (tempRangeElement) tempRangeElement.textContent = '';
    if (weatherElement) weatherElement.textContent = '';

    // Hide the photo and clear its source
    if (photoElement) {
        photoElement.src = '';
        photoElement.style.display = 'none';
    }

    if (resultsPage) {
        resultsPage.style.display = 'none'; // Optionally hide it
        resultsPage.classList.remove('show'); // Remove the 'show' class if used for animation
    }

    hideAlert();
    hideToast();
};

const resetButton = document.getElementById('resetButton');
resetButton.addEventListener('click', handleReset);

form.addEventListener('submit', handleClick);



export { handleClick };
