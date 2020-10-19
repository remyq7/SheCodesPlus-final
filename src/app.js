let now = new Date();

let h2 = document.querySelector("h2");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
let day = days[now.getDay()];

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

h2.innerHTML = `${day}, ${hours}:${minutes}, `;

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}: ${minutes}
`;
}

function displayWeatherCondition(response) {
  event.preventDefault();
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}
function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `<div class="col-2">
          <h4>${formatHours(
            forecast.dt * 1000
          )}</h4><img src="http://openweathermap.org/img/wn/${
      forecast.weather[0].icon
    }@2x.png"/>
          <div class="forecast-temperature"><strong>${Math.round(
            forecast.main.temp_max
          )}°</strong>|${Math.round(forecast.main.temp_min)}°</div>
        </div>`;
  }
}

function searchCity(city) {
  let apiKey = "df00ce6442112c0f15afa927a09d9e5a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayWeatherCondition);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);
function searchLocation(position) {
  let apiKey = "df00ce6442112c0f15afa927a09d9e5a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}
searchCity("New York");

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let fahrenheitTemperature = ((celsiusTemperature * 9) / 5) * 32;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", displayFahrenheitTemperature);
