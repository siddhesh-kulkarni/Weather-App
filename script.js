const API_KEY = "f3394c1099b82e10edb0e1464ae4d5f5";
const API_URL = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`;

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

const weather = async (cityName) => {
  const response = await fetch(API_URL + cityName + `&appid=${API_KEY}`);

  if (response.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    var result = await response.json();

    document.querySelector(".city").innerHTML = result.name;
    document.querySelector(".temp").innerHTML =
      Math.round(result.main.temp) + "°C";
    document.querySelector(".wind").innerHTML = result.wind.speed + "km/hr";
    document.querySelector(".humidity").innerHTML = result.main.humidity + "%";

    if (result.weather[0].main == "Clouds") {
      weatherIcon.src = "assets/clouds.png";
    } else if (result.weather[0].main == "Clear") {
      weatherIcon.src = "assets/clear.png";
    } else if (result.weather[0].main == "Rain") {
      weatherIcon.src = "assets/rain.png";
    } else if (result.weather[0].main == "Drizzle") {
      weatherIcon.src = "assets/drizzle.png";
    } else if (result.weather[0].main == "Mist") {
      weatherIcon.src = "assets/mist.png";
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
  }
};

searchBtn.addEventListener("click", () => {
  const city = searchBox.value.trim();
  if (city === "") {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".error p").textContent =
      "Please enter a city name.";
    document.querySelector(".weather").style.display = "none";
  } else {
    weather(city);
  }
});
