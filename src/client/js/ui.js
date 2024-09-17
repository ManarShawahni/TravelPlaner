const updateUI = ({ city, Rdays,temp, highTemp, lowTemp, weatherDescription, departureDate, photoUrl }) => {
    document.getElementById('Rdays').textContent = `My trip to: ${city}, Departing: ${departureDate}`;

    document.querySelector('.cityName').textContent = `${city} is ${Rdays} days away`;
    document.querySelector('.temp').textContent = `Typical weather: ${temp}°C`;
    document.querySelector('.temp-range').textContent = `Temp range: ${lowTemp}°C - ${highTemp}°C`;
    document.querySelector('.weather').textContent = `${weatherDescription}`;

    if (photoUrl) {
        const photoElement = document.querySelector("#photo");
        photoElement.src = photoUrl;
        photoElement.style.display = 'block'; 
    }
};

export { updateUI };
