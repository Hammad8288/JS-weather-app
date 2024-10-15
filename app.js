document.querySelector('.weatherForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the form from refreshing the page
    getWeather();
});

function getWeather() {
    const apiKey = '2a52843d02e136cb3deec7d29b6f3d58';
    const city = document.getElementById('cityInput').value;

    if (!city) {
        alert('Please enter a city name');
        return;
    }

    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;


    fetch(currentWeatherUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('Error fetching weather data. Please try again.');
        });
}

function displayWeather(data) {
    const cityName = data.name;
    const temperature = data.main.temp;
    const weatherDescription = data.weather[0].description;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;

    // Update the DOM with weather information
    document.getElementById('cityName').textContent = cityName;
    document.getElementById('temperature').textContent = `Temperature: ${temperature}°C`;
    document.getElementById('description').textContent = `Description: ${weatherDescription}`;
    document.getElementById('humidity').textContent = `Humidity: ${humidity}%`;
    document.getElementById('windSpeed').textContent = `Wind Speed: ${windSpeed} m/s`;
}
