import { fetchCities, fetchWeather, formatWeatherData } from "./api.js";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const resultsList = document.getElementById("results");
const weatherDiv = document.getElementById("weather");

searchBtn.addEventListener("click", onSearchClick);

async function onSearchClick() {
  const query = cityInput.value.trim();
  if (!query) return;

  resultsList.innerHTML = "";
  weatherDiv.innerHTML = "";

  const cities = await fetchCities(query);

  cities.forEach(city => {
    const li = document.createElement("li");
    li.textContent = `${city.name}, ${city.country}`;

    li.addEventListener("click", () => loadWeather(city.lat, city.lon));
    resultsList.appendChild(li);
  });
}

async function loadWeather(lat, lon) {
  const data = await fetchWeather(lat, lon);
  const weather = formatWeatherData(data);
  renderWeather(weather);
}

function renderWeather(weather) {
  const iconUrl = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`;

  weatherDiv.innerHTML = `
    <div class="weather-card">
      <img src="${iconUrl}" alt="${weather.description}" />
      <div class="weather-info">
        <div class="temp">${weather.temp}°C</div>
        <div class="wind">💨 ${weather.wind} m/s</div>
        <div class="desc">${weather.description}</div>
      </div>
    </div>
  `;
}