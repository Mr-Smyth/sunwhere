/*jshint esversion: 6 */

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
const locationInputArray = ["location2", "location3", "location4", "location5"];
const weekend = ["Friday", "Saturday", "Sunday"];

// GLOBAL OBJECTS
/* USING OBJECTS AS I WILL NEED TO ACCESS THE INFORMATION
MORE THAN ONCE FROM MORE THAN ONE FUNCTION  */
const homeWeather = {};
const weekendWeather = {
  location1: {
    Friday: {},
    Saturday: {},
    Sunday: {},
  },
  location2: {
    Friday: {},
    Saturday: {},
    Sunday: {},
  },
  location3: {
    Friday: {},
    Saturday: {},
    Sunday: {},
  },
  location4: {
    Friday: {},
    Saturday: {},
    Sunday: {},
  },
  location5: {
    Friday: {},
    Saturday: {},
    Sunday: {},
  },
};

// THIS GETS CALLED AFTER THE CURRENT WEATHER FETCH, TO UPDATE THE homeWeather{} OBJECT.
function updateHomeWeather(data, id) {
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
}

// function to return index of days needed from weather api object, for weekend rating computations.
function findWeatherDayIndex() {
  const today = new Date();
  const dayToday = today.getDay(); // get what day number today is

  const daysToNextWeekend = {
    /* object represents - 'weekday#' : [day numbers to use to calculate weather for next weekend]*/
    "0": [5, 6, 7], // IF TODAY IS SUNDAY, DAYS 5,6 AND 7 FROM THE API RESPONSE DATA WILL BE NEEDED.
    "1": [4, 5, 6],
    "2": [3, 4, 5],
    "3": [2, 3, 4],
    "4": [1, 2, 3],
    "5": [0, 1, 2],
    "6": [0, 1, 2],
  };

  const dayResult = daysToNextWeekend[dayToday];
  return dayResult;
}

function updateWeekendWeather(data, thisLocation, id) {
  const dayIndexes = findWeatherDayIndex();

  data = data.daily;
  console.log(data);

  for (let i = 0; i < 3; i++) {
    weekendWeather[id][weekend[i]].placeName = thisLocation;
    weekendWeather[id][weekend[i]].tempInCelsius = Math.floor(
      data[dayIndexes[i]].temp.day - kelvin
    );
    weekendWeather[id][weekend[i]].feelsLike = Math.floor(
      data[dayIndexes[i]].feels_like.day - kelvin
    );
    weekendWeather[id][weekend[i]].description =
      data[dayIndexes[i]].weather[0].description;
    weekendWeather[id][weekend[i]].tempInFahrenheit = Math.floor(
      (data[dayIndexes[i]].temp.day - kelvin) * (9 / 5) + 32
    );
    weekendWeather[id][weekend[i]].clouds = data[dayIndexes[i]].clouds;
    weekendWeather[id][weekend[i]].humidity = data[dayIndexes[i]].humidity;
    weekendWeather[id][weekend[i]].rain = data[dayIndexes[i]].rain;
    weekendWeather[id][weekend[i]].windSpeed = data[dayIndexes[i]].wind_speed;
    weekendWeather[id][weekend[i]].icon = data[dayIndexes[i]].weather[0].icon;
  }
}

function weekendRainScore(loc) {
  let score = 0;
  weekend.forEach(function (day, index) {
    let rain = weekendWeather[loc][day].rain;
    if (rain <= 0) {
      score += 20;
    } else if (rain > 0 && rain <= 1) {
      score += 10;
    } else if (rain > 1 && rain <= 3) {
      score += 0;
    } else if (rain > 3 && rain <= 8) {
      score -= 10;
    } else if (rain > 8 && rain <= 16) {
      score -= 20;
    } else if (rain > 16) {
      score -= 40;
    } else {
      score += 0;
    }
  });
  return score;
}

function calculateRating() {
  console.log(weekendWeather);
  const allLocations = [
    "location1",
    "location2",
    "location3",
    "location4",
    "location5",
  ];

  for (let loc of allLocations) {
    let score = 0;
    score += weekendRainScore(loc);

    console.log(`Score for ${loc} is : ${score}`);
    weekendWeather[loc].score = score;
  }
  console.log(weekendWeather);
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
function fetchCurrentWeather(lat, lon, id) {
  const apiCurrent = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=f195187b93a30f3dfcbe6e136431d58b`;
  fetch(apiCurrent)
    .then(function (response) {
      return response.json(); // return the results to me in .JSON
    })
    .then(function (data) {
      updateHomeWeather(data, id);
      displayCurrentWeather(homeWeather);
      fetchWeekendWeather(
        homeWeather.latitude,
        homeWeather.longitude,
        homeWeather.name,
        id
      );
    })
    .catch(function (error) {
      console.log("ERROR !" + error.message);
    });
}

function fetchWeekendWeather(lat, lon, thisLocation, id) {
  let apiWeekend = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly&APPID=f195187b93a30f3dfcbe6e136431d58b`;

  // FETCH FROM OPENWEATHER API 7 DAY ONE CALL, EXCLUDING CURRENT, MINUTE AND HOURLY
  fetch(apiWeekend)
    .then(function (response) {
      return response.json(); // return the results to me in .JSON
    })
    .then(function (data) {
      // this is what we will do with the results.
      updateWeekendWeather(data, thisLocation, id);
      calculateRating();
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
  const latitude = location.coords.latitude;
  const longitude = location.coords.longitude;
  const id = "location1";

  fetchCurrentWeather(latitude, longitude, id);
}

// IF THINGS GO WRONG WITH GEOLOCATION, GO HERE
function geolocationError(error) {
  infoMessageElement.innerHTML = `<p> ${error.message} </p>`;
}

// HERE WE GET THE 4 LOCATIONS FROM THE USER, USING GOOGLE PLACES SEARCHBOX
locationInputArray.forEach(function (location) {
  let id = document.getElementById(location).attributes.id.value;

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
        THIS WILL BE USEFUL FOR SCORE CALCULATIONS AND FOR DISPLAYING ANY LOCATIONS WEATHER IF NEEDED 
        AN ID WILL BE USED TO ORGANISE THEM IN THE WEEKENDWEATHER OBJECT*/

    fetchWeekendWeather(latitude, longitude, thisLocation, id);
  });
});
