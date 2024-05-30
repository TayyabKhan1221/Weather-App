let form = document.querySelector("#weatherForm");
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const errorIcon = document.querySelector(".error");
const errorDiv = document.querySelector(".errorDiv");
const message = document.querySelector(".message");

message.innerText = "loading...";

const apiKey = "9505fd1df737e20152fbd78cdb289b6a";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&appid=" + apiKey;

message.innerText = "";
form.reset();

async function checkWeather(city) {
  const response = await fetch(apiUrl + "&q=" + city);
  if (response.status === 404) {
    errorIcon.style.display = "block";
    errorDiv.style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    let data = await response.json();

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    if (data.weather[0].main === "Clouds") {
      weatherIcon.src = "img/clouds.png";
    } else if (data.weather[0].main === "Clear") {
      weatherIcon.src = "img/clear.png";
    } else if (data.weather[0].main === "Rain") {
      weatherIcon.src = "img/rain.png";
    } else if (data.weather[0].main === "Drizzle") {
      weatherIcon.src = "img/drizzle.png";
    } else if (data.weather[0].main === "Mist") {
      weatherIcon.src = "img/mist.png";
    }

    document.querySelector(".weather").style.display = "block";
    errorIcon.style.display = "none";
    errorDiv.style.display = "none";
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  checkWeather(searchBox.value);
});