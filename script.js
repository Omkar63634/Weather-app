const apikey = "a6a6fcbb1e6f0ffbb7b11de67b5d10df";
const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".spacebar");
const searchBtn = document.querySelector("#searchBtn");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  const response = await fetch(apiurl + city + `&appid=${apikey}`);
  if (response.status === 404) {
    alert("City not found!");
    return;
  }

  const data = await response.json();

  document.querySelector(".city").innerText = data.name;
  document.querySelector(".temp").innerText = Math.round(data.main.temp) + "°C";
  document.querySelector(".humidity").innerText = data.main.humidity + "%";
  document.querySelector(".wind").innerText = data.wind.speed + " km/hr";
  
  const weather = data.weather[0].main.toLowerCase();

  if (weather.includes("cloud")) {
    weatherIcon.src = "clouds.png";
  } else if (weather.includes("rain")) {
    weatherIcon.src = "rain.png";
  } else if (weather.includes("clear")) {
    weatherIcon.src = "clear.png";
  } else if (weather.includes("snow")) {
    weatherIcon.src = "snow.png";
  } else if (weather.includes("mist")) {
    weatherIcon.src = "mist.png";
  } else {
    weatherIcon.src = "default.png";
  }
}

searchBtn.addEventListener("click", () => {
  const city = searchBox.value.trim();
  if (city) {
    checkWeather(city);
  } else {
    alert("Please enter a city name.");
  }
});
