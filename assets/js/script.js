// SELECTORS
const infoMessageElement = document.getElementById("informationNotification");

// FIRST WE GET CURRENT LOCATION, LATITUDE AND LONGITUDE
// WE NEED TO CHECK IF GEOLOCATION IS ALLOWED IN THE BROWSER
if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(thisLocation, geolocationError);
} else {
  // IF NOT, SEND AN ERROR NOTIFICATION TO WEATHER WINDOW
  infoMessageElement.innerHTML =
    "<p>Your Browser does not support Geolocation, please allow Geolocation and reload the page.</p>";
}


function thisLocation(location) {
  let latitude = location.coords.latitude;
  let longitude = location.coords.longitude;

  getWeather(latitude, longitude);
}

function geolocationError(error) {
  infoMessageElement.innerHTML = `<p> ${error.message} </p>`;
}
