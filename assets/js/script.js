// GLOBAL VARIABLES
const kelvin = 273;
const infoMessageElement = document.getElementById("informationNotification");
const displayBackgroundImage = document.getElementById(
  "weatherBackgroundImage"
);
const displayCurrentLocation = document.getElementById(
  "weatherCurrentInfoName"
);
const displayCurrentIcon = document.getElementById("weatherCurrentIcon");
const displayCurrentTemp = document.getElementById("weatherCurrentTemp");
const displayCurrentDesc = document.getElementById("weatherCurrentDescription");
const displayCurrentHumidity = document.getElementById(
  "weatherCurrentHumidity"
);
const displayCurrentWind = document.getElementById("weatherCurrentWindSpeed");
const displayCurrentFeelsLike = document.getElementById(
  "weatherCurrentFeelsLike"
);

/* const apiWeekend = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly&APPID=f195187b93a30f3dfcbe6e136431d58b`; */

// GLOBAL OBJECTS
/* USING OBJECTS AS I WILL NEED TO ACCESS THE INFORMATION
MORE THAN ONCE FROM MORE THAN ONE FUNCTION  */
const homeWeather = {};



// THIS GETS CALLED AFTER THE CURRENT WEATHER FETCH, TO UPDATE THE homeWeather{} OBJECT.
function updateHomeWeather(data) {
  homeWeather.latitude = data.coord.lat;
  homeWeather.longitude = data.coord.lon;
  homeWeather.feelsLike = Math.floor(data.main.feels_like - kelvin);
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
  console.log(homeWeather);
}

function getBackground() {
    switch(homeWeather.weatherIcon){
        case "01d": displayBackgroundImage.src = "assets/images/clear-skyd.jpg";
        break;
        case "02d": displayBackgroundImage.src = "assets/images/few-cloudsd.jpg";
        break;
        case "03d": displayBackgroundImage.src = "assets/images/scattered-clouds.jpg";
        break;
        case "04d": displayBackgroundImage.src = "assets/images/broken-cloudsd.jpg";
        break;
        case "09d": displayBackgroundImage.src = "assets/images/raind.jpg";
        break;
        case "10d": displayBackgroundImage.src = "assets/images/raind.jpg";
        break;
        case "11d": displayBackgroundImage.src = "assets/images/thunderstormd.jpg";
        break;
        case "13d": displayBackgroundImage.src = "assets/images/snowd.jpg";
        break;
        case "50d": displayBackgroundImage.src = "assets/images/mistd.jpg";
        break;
        case "01n": displayBackgroundImage.src = "assets/images/clear-skyn.jpg";
        break;
        case "02n": displayBackgroundImage.src = "assets/images/few-cloudsn.jpg";
        break;
        case "03n": displayBackgroundImage.src = "assets/images/cloudsn.jpg";
        break;
        case "04n": displayBackgroundImage.src = "assets/images/cloudsn.jpg";
        break;
        case "09n": displayBackgroundImage.src = "assets/images/rainn.jpg";
        break;
        case "10n": displayBackgroundImage.src = "assets/images/rainn.jpg";
        break;
        case "11n": displayBackgroundImage.src = "assets/images/thunderstormn.jpg";
        break;
        case "13n": displayBackgroundImage.src = "assets/images/snown.jpg";
        break;
        case "50n": displayBackgroundImage.src = "assets/images/mistn.jpg";
        break;
        default: displayBackgroundImage.src = assets/images/clear-skyd1.jpg
        break;
    }
}

// THIS FUNCTION DISPLAYS THE CURRENT LOCATIONS WEATHER TO HOME SCREEN
function displayCurrentWeather(weatherObject) {
  displayCurrentLocation.innerText = weatherObject.name;
  displayCurrentIcon.src = `http://openweathermap.org/img/wn/${weatherObject.weatherIcon}@4x.png`;
  displayCurrentTemp.innerHTML = weatherObject.tempInCelsius + `&#176 C`;
  displayCurrentDesc.innerText =
    weatherObject.description.charAt(0).toUpperCase() +
    weatherObject.description.slice(1); // SET FIRST LETTER TO UPPERCASE
  displayCurrentHumidity.innerText = `Humidity: ${weatherObject.humidity}%`;
  displayCurrentWind.innerText = `Wind Speed: ${weatherObject.windSpeed}m/s`;
  displayCurrentFeelsLike.innerHTML = `Feels Like: ${weatherObject.feelsLike} &#176 C`;
  getBackground();
}

// HERE WE GET CURRENT WEATHER FROM GEOLOCATION, CALLS TO UPDATE homeWeather OBJECT AND PASSES ONTO displayHomeWeather()
function fetchCurrentWeather(lat, lon) {
  const apiCurrent = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=f195187b93a30f3dfcbe6e136431d58b`;
  fetch(apiCurrent)
    .then(function (response) {
      return response.json(); // return the results to me in .JSON
    })
    .then(function (data) {
      console.log(data);
      updateHomeWeather(data);
      displayCurrentWeather(homeWeather);
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

  fetchCurrentWeather(latitude, longitude);
}

// IF THINGS GO WRONG WITH GEOLOCATION, GO HERE
function geolocationError(error) {
  infoMessageElement.innerHTML = `<p> ${error.message} </p>`;
}
