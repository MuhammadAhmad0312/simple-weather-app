let input = document.querySelector("#cityName");
let temp = document.querySelector("#celcius");
let city = document.querySelector("#city")

// Function to fetch weather data based on latitude and longitude
async function fetchWeatherData(latitude, longitude) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        
        console.log(data);

        let temperature = data.current_weather.temperature; 
        temp.innerHTML = `${temperature} °C`;
        console.log('Current Temperature:', temperature);
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

// Function to fetch coordinates based on city name
async function fetchCoordinates(cityName) {
    const geocodeUrl = `https://nominatim.openstreetmap.org/search?city=${encodeURIComponent(cityName)}&format=json&limit=1`;

    try {
        const response = await fetch(geocodeUrl);
        if (!response.ok) {
            throw new Error(`Geocoding error! Status: ${response.status}`);
        }
        const data = await response.json();
        city.innerHTML = input.value;
        if (data.length === 0) {
            alert("City not found. Please enter a valid city name.");
            return;
        }

        const latitude = data[0].lat;
        const longitude = data[0].lon;
        fetchWeatherData(latitude, longitude);
    } catch (error) {
        console.error('Error fetching coordinates:', error);
    }
}

// Event listener to fetch weather data when a city is entered
input.addEventListener("change", () => {
    const cityName = input.value;
    
    fetchCoordinates(cityName);
});




