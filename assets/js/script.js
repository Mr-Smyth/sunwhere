// SELECTORS
const kelvin = 273;
const infoMessageElement = document.getElementById("informationNotification");
const apiWeekend = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly&APPID=f195187b93a30f3dfcbe6e136431d58b`;

// GLOBAL OBJECTS
const homeWeather = {};

// GETS CURRENT WEATHER FROM GEOLOCATION, UPDATES homeWeather{} AND PASSES ONTO displayWeather()
function fetchCurrentWeather(lat, lon) {
  const apiCurrent = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=f195187b93a30f3dfcbe6e136431d58b`;
  fetch(apiCurrent)
    .then(function (response) {
      return response.json(); // return the results to me in .JSON
    })
    .then(function (data) {
      homeWeather.feelsLike = data.main.feels_like;
      homeWeather.humidity = data.main.humidity;
      homeWeather.tempInCelsius = Math.floor(data.main.temp - kelvin);
      homeWeather.tempInFahrenheit = Math.floor(
        (data.main.temp - kelvin) * (9 / 5) + 32
      );
      homeWeather.name = data.name;
      homeWeather.clouds = data.clouds.all;
      homeWeather.description = data.weather[0].description;
      homeWeather.weatherIcon = data.weather[0].icon;
      homeWeather.windDirection = data.wind.deg;
      homeWeather.windSpeed = data.wind.speed;
      homeWeather.feelsLike = data.feels_like;
      displayWeather(data);
    })
    .catch(function (error) {
      console.log("ERROR !" + error.message);
    });
}

// FIRST WE GET CURRENT LOCATION, LATITUDE AND LONGITUDE
// WE NEED TO CHECK IF GEOLOCATION IS ALLOWED IN THE BROWSER
if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(getCoords, geolocationError);
} else {
  // IF NOT, SEND AN ERROR NOTIFICATION TO WEATHER WINDOW
  infoMessageElement.innerHTML =
    "<p>Your Browser does not support Geolocation, please allow Geolocation and reload the page.</p>";
}

// RECEIVE THE GEOLOCATION POSITION OBJECT AS INPUT, UPDATE OBJECT AND GET THE WEATHER.
function getCoords(location) {
  let latitude = location.coords.latitude;
  let longitude = location.coords.longitude;
  homeWeather.latitude = location.coords.latitude;
  homeWeather.longitude = location.coords.longitude;

  fetchCurrentWeather(latitude, longitude);
}

// IF THINGS GO WRONG WITH GEOLOCATION, GO HERE
function geolocationError(error) {
  infoMessageElement.innerHTML = `<p> ${error.message} </p>`;
}
