import { buildGeoUrl, buildWeatherUrl, formatWeather } from "./weather.js";

const API_KEY = "YOUR_API_KEY";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const resultsList = document.getElementById("results");
const weatherDiv = document.getElementById("weather");

searchBtn.addEventListener("click", searchCity);

async function searchCity() {
  const query = cityInput.value.trim();
  if (!query) return;

  resultsList.innerHTML = "";
  weatherDiv.innerHTML = "";

  const url = buildGeoUrl(query, API_KEY);
  const response = await fetch(url);
  const data = await response.json();

  data.forEach(loc => {
    const li = document.createElement("li");
    li.textContent = `${loc.name}, ${loc.country}`;
    li.onclick = () => {
      resultsList.innerHTML = ""; // 👈 hide options
      fetchWeather(loc.lat, loc.lon);
    };
    resultsList.appendChild(li);
  });
}

async function fetchWeather(lat, lon) {
  const url = buildWeatherUrl(lat, lon, API_KEY);
  const response = await fetch(url);
  const data = await response.json();
  const weather = formatWeather(data);

  weatherDiv.innerHTML = `
    <img src="https://openweathermap.org/img/wn/${weather.icon}@2x.png">
    <span class="temp">${weather.temp} °C</span>
    <div>💨 ${weather.wind} m/s</div>
  `;
}
