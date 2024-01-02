const apiKey = 'a2cc5d3d461c787b6b7f56c1e4b2d848';
const apiUrl = 'https://api.openweathermap.org/data/3.0/onecall';

// Function to get weather data and update UI
async function getWeather() {
  const locationInput = document.getElementById('locationInput');
  const location = locationInput.value;

  // Use a geocoding API to convert location (city name) to coordinates
  const coordinates = await getCoordinates(location);

  if (coordinates) {
    const { lat, lon } = coordinates;
    const exclude = 'hourly,daily'; // Customize this based on your needs

    // Build the API URL
    const apiCallUrl = `${apiUrl}?lat=${lat}&lon=${lon}&exclude=${exclude}&appid=${apiKey}`;

    try {
      const response = await fetch(apiCallUrl);
      const data = await response.json();

      // Update the UI with weather information
      updateUI(data);
    } catch (error) {
      // Handle errors
      console.error('Error fetching weather data:', error);
    }
  }
}

// Function to get coordinates using a geocoding API
async function getCoordinates(location) {
  const geocodingApiKey = 'a12be7688fe21ca21b7eae0c5c7b3f1b';
  const geocodingApiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${geocodingApiKey}`;

  try {
    const response = await fetch(geocodingApiUrl);
    const data = await response.json();

    if (data.length > 0) {
      // Return the first set of coordinates
      return { lat: data[0].lat, lon: data[0].lon };
    } else {
      console.error('Location not found');
      return null;
    }
  } catch (error) {
    // Handle errors
    console.error('Error fetching coordinates:', error);
    return null;
  }
}

// Function to update the UI with weather information
function updateUI(data) {
  const weatherInfo = document.getElementById('weatherInfo');
  weatherInfo.innerHTML = `
    <h2>Weather in ${data.lat}, ${data.lon}</h2>
    <p>Temperature: ${data.current.temp} °C</p>
    <p>Description: ${data.current.weather[0].description}</p>
    <img src="https://openweathermap.org/img/w/${data.current.weather[0].icon}.png" alt="Weather Icon">
  `;
}

// Attach the getWeather function to the button click event
const searchButton = document.getElementById('searchButton');
searchButton.addEventListener('click', getWeather);

