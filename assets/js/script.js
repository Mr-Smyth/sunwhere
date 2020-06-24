// SELECTORS
const infoMessageElement = document.getElementById("informationNotification");

// GLOBAL OBJECTS
const homeWeather = {

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
