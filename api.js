export const API_KEY = "23cdee0774e73881c1344ae4375658ba";

export async function fetchCities(query) {
  const url = `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch cities");
  }

  return response.json();
}

export async function fetchWeather(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch weather");
  }

  return response.json();
}

export function formatWeatherData(data) {
  return {
    temp: Math.round(data.main.temp),
    wind: data.wind.speed,
    icon: data.weather[0].icon,
    description: data.weather[0].description
  };
}
