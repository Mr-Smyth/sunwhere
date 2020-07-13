function initData() {
    let latitude = 0;
    let longitude = 0;

    let selectedLoc = JSON.parse(window.localStorage.getItem('selectedLocation'));
    console.log(selectedLoc);
    const weekendWeatherDeserialized = JSON.parse(localStorage.getItem("weekendWeather"));
    console.log(weekendWeatherDeserialized);

    for (let location in weekendWeatherDeserialized) {
        if (weekendWeatherDeserialized.hasOwnProperty(location)) {
            if (selectedLoc === weekendWeatherDeserialized[location].Friday.placeName) {
                latitude = weekendWeatherDeserialized[location].lat;
                longitude = weekendWeatherDeserialized[location].lon;
            }
        }

    }
    return { "lat": latitude, "lng": longitude }
}

// CREATE A MAP FOR THE SELECTED LOCATION
function createMap() {

    let coords = initData();

    /* CREDIT GOOGLE PLACES DOCUMENTATION FOR FOLLOWING CODE
        WHICH RENDERS THE MAP WITH THE SEARCH BOX AND MARKERS.
       THE GOOGLE PLACES DOCUMENTATION CODE EXAMPLES HAVE BEEN
       REFACTORED TO SUIT THE NEEDS OF THIS APPLICATION */

    map = new google.maps.Map(document.getElementById("map"), {
        center: coords,
        zoom: 15,
        disableDefaultUI: true // REMOVE THE DEFAULT BOXES FROM THE MAP
    });

    // CREATE THE SEARCH BOX AND POP IT ONTO THE MAP
    const input = document.getElementById("pac-input");
    const searchBox = new google.maps.places.SearchBox(input);

    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

     // DO A NEARBY DEFAULT SEARCH FOR ATTRACTIONS
     var service = new google.maps.places.PlacesService(map);
     service.nearbySearch(
         {
             location: coords,
             radius: 5000 ,
             type: "tourist_attraction"
         },
         function (results, status) {
             if (status !== "OK") return;
 
             createMarkers(results);
         }
     );
}


// DO THIS FIRST
window.onload = function () {
    createMap();
}