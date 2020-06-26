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
const locationInputArray = ["location1", "location2", "location3", "location4"];


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


// function to return index of days needed from weather api object, for weekend rating computations.
function findWeatherDayIndex() {

    const today = new Date();
    const dayToday = today.getDay(); // get what day number today is

    const daysToNextWeekend = { /* object represents - 'weekday#' : [day numbers to use to calculate weather for next weekend]*/
        '0': [5, 6, 7], // IF TODAY IS SUNDAY, DAYS 5,6 AND 7 FROM THE API RESPONSE DATA WILL BE NEEDED.
        '1': [4, 5, 6],
        '2': [3, 4, 5],
        '3': [2, 3, 4],
        '4': [1, 2, 3],
        '5': [0, 1, 2],
        '6': [6, 7, 8]
    };

    const dayResult = daysToNextWeekend[dayToday];
    return dayResult;
}



function updateWeekendWeather(data, dayIndexes){
    console.log(data);
    console.log(dayIndexes);
}


// DISPLAYS THE WEATHER BACKGROUND IMAGE
function getBackground() {
  switch (homeWeather.weatherIcon) {
    case "01d":
      displayBackgroundImage.src = "assets/images/clear-skyd.jpg";
      break;
    case "02d":
      displayBackgroundImage.src = "assets/images/few-cloudsd.jpg";
      break;
    case "03d":
      displayBackgroundImage.src = "assets/images/scattered-cloudsd.jpg";
      break;
    case "04d":
      displayBackgroundImage.src = "assets/images/broken-cloudsd.jpg";
      break;
    case "09d":
      displayBackgroundImage.src = "assets/images/raind.jpg";
      break;
    case "10d":
      displayBackgroundImage.src = "assets/images/raind.jpg";
      break;
    case "11d":
      displayBackgroundImage.src = "assets/images/thunderstormd.jpg";
      break;
    case "13d":
      displayBackgroundImage.src = "assets/images/snowd.jpg";
      break;
    case "50d":
      displayBackgroundImage.src = "assets/images/mistd.jpg";
      break;
    case "01n":
      displayBackgroundImage.src = "assets/images/clear-skyn.jpg";
      break;
    case "02n":
      displayBackgroundImage.src = "assets/images/few-cloudsn.jpg";
      break;
    case "03n":
      displayBackgroundImage.src = "assets/images/cloudsn.jpg";
      break;
    case "04n":
      displayBackgroundImage.src = "assets/images/cloudsn.jpg";
      break;
    case "09n":
      displayBackgroundImage.src = "assets/images/rainn.jpg";
      break;
    case "10n":
      displayBackgroundImage.src = "assets/images/rainn.jpg";
      break;
    case "11n":
      displayBackgroundImage.src = "assets/images/thunderstormn.jpg";
      break;
    case "13n":
      displayBackgroundImage.src = "assets/images/snown.jpg";
      break;
    case "50n":
      displayBackgroundImage.src = "assets/images/mistn.jpg";
      break;
    default:
      displayBackgroundImage.src = "assets/images/clear-skyd1.jpg";
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

function fetchLocationWeather(lat, lon, thisLocation) {
  let apiWeekend = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly&APPID=f195187b93a30f3dfcbe6e136431d58b`;

  // FETCH FROM OPENWEATHER API 7 DAY ONE CALL, EXCLUDING CURRENT, MINUTE AND HOURLY
  fetch(apiWeekend)
    .then(function (response) {
      return response.json(); // return the results to me in .JSON
    })
    .then(function (data) {
      // this is what we will do with the results.
      console.log(data);
      updateWeekendWeather(data, findWeatherDayIndex());
      calculateRating(data, findWeatherDayIndex());
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

// HERE WE GET THE 4 LOCATIONS FROM THE USER, USING GOOGLE PLACES SEARCHBOX
locationInputArray.forEach(function (location) {
  // SEARCHBOX CODE TAKEN FROM GOOGLE PLACES DOCUMENTATION
  const input = document.getElementById(location); // target and store the value in location, in input
  const searchRes = new google.maps.places.SearchBox(input); // pass that search into places
  searchRes.addListener("places_changed", function () {
    const location = searchRes.getPlaces()[0]; // we just need index 0, getPlaces() Returns the details of the Place selected by user.
    if (location == null) {
      return;
    }
    const thisLocation = location.address_components[0].long_name; // LOCATIONS NAME
    const latitude = location.geometry.location.lat();
    const longitude = location.geometry.location.lng();

    /* GOING TO SEND THE LAT AND LONG, BUT ALSO THE LOCATIONS NAME, to fetchLocationWeather().
        AS I WILL USE THIS TO BUILD AN OBJECT OF WEATHER INFORMATION FOR EACH LOCATION. 
        THIS WILL BE USEFUL FOR SCORE CALCULATIONS AND FOR DISPLAYING ANY LOCATIONS WEATHER IF NEEDED */

    fetchLocationWeather(latitude, longitude, thisLocation);
  });
});
