/*jshint esversion: 6 */


// GLOBAL VARIABLES
/* const FridayDate = document.getElementById("fridayDate");
const SaturdayDate = document.getElementById("saturdayDate");
const SundayDate = document.getElementById("sundayDate");
const fridayTemp = document.getElementById("fridayTemp");
const saturdayTemp = document.getElementById("saturdayTemp");
const sundayTemp = document.getElementById("sundayTemp");
const fridayIcon = document.getElementById("fridayIcon");
const saturdayIcon = document.getElementById("saturdayIcon");
const sundayIcon = document.getElementById("sundayIcon");
const fridayFeels = document.getElementById("fridayFeels");
const saturdayFeels = document.getElementById("saturdayFeels");
const sundayFeels = document.getElementById("sundayFeels");
const fridayRain = document.getElementById("fridayRain");
const saturdayRain = document.getElementById("saturdayRain");
const sundayRain = document.getElementById("sundayRain");
const fridayWind = document.getElementById("fridayWind");
const saturdayWind = document.getElementById("saturdayWind");
const sundayWind = document.getElementById("sundayWind");
const fridayHumidity = document.getElementById("fridayHumidity");
const saturdayHumidity = document.getElementById("saturdayHumidity");
const sundayHumidity = document.getElementById("sundayHumidity");
const fridayDescription = document.getElementById("fridayDescription");
const saturdayDescription = document.getElementById("saturdayDescription");
const sundayDescription = document.getElementById("sundayDescription"); */

// GETTING THE LAT AND LON OF THE CHOSEN LOCATION
function initData() {
    let latitude = 0;
    let longitude = 0;

    // GET THE LOCATION THE USER SELECTED
    let selectedLoc = getLocationChoice();
    console.log(selectedLoc);
    // GET THE WEEKEND WEATHER OBJECT
    const weekendWeather = getWeatherObj();
    console.log(weekendWeather);

    // FIND THE LOCATION THAT MATCHES THE LOCATION CHOSEN AND PICK OUT THE LAT AND LON.
    for (let location in weekendWeather) {
        if (weekendWeather.hasOwnProperty(location)) {
            if (selectedLoc === weekendWeather[location].Friday.placeName) {
                latitude = weekendWeather[location].lat;
                longitude = weekendWeather[location].lon;
            }
        }
    }
    return { "lat": latitude, "lng": longitude };
}

// GET THE CHOSEN LOCATION FROM LOCAL STORAGE
function getLocationChoice() {
    let loc = JSON.parse(window.localStorage.getItem('selectedLocation'));
    return loc;
}
// GET WEEKEND WEATHER OBJECT FROM LOCAL STORAGE
function getWeatherObj() {
    let obj = JSON.parse(localStorage.getItem("weekendWeather"));
    return obj;
}
// GET DAY INDEX FROM LOCAL STORAGE
function getIndexArray() {
    let index = JSON.parse(localStorage.getItem("dayIndexesArray"));
    return index;
}

// CREATE A MAP FOR THE SELECTED LOCATION
function createMap() {


    /* CREDIT GOOGLE PLACES DOCUMENTATION FOR FOLLOWING CODE
    WHICH RENDERS THE MAP WITH THE SEARCH BOX AND MARKERS.
   THE GOOGLE PLACES DOCUMENTATION CODE EXAMPLES HAVE BEEN
   REFACTORED TO SUIT THE NEEDS OF THIS APPLICATION */

    let coords = initData();

    map = new google.maps.Map(document.getElementById("map"), {
        center: coords,
        zoom: 13,
        disableDefaultUI: true // REMOVE THE DEFAULT BOXES FROM THE MAP
    });
    marker = new google.maps.Marker({
        position: coords,
        animation: google.maps.Animation.DROP,
        map: map,
        label: {
            text: JSON.parse(window.localStorage.getItem('selectedLocation')),
            color: "black",
            fontWeight: "bold",
            fontSize: "20px"
        }
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
            radius: 5000,
            type: "tourist_attraction"
        },
        function (results, status) {
            if (status !== "OK") return;

            createMarkers(results);
        }
    );


    // CREDIT GOOGLE DOCUMENTATION.
    // BIAS THE SEARCHBOX RESULTS TO THE CURRENT MAPS VIEWPORT
    map.addListener("bounds_changed", function () {
        searchBox.setBounds(map.getBounds());
    });
    let markers = [];



    // CREDIT GOOGLE DOCUMENTATION.
    // HERE WE LISTEN FOR THE USER TO SELECT A PREDICTED RESULT FROM THE SEARCHBOX
    // THEN WE RETRIEVE DETAILS FOR THAT RESULT
    searchBox.addListener("places_changed", function () {
        let places = searchBox.getPlaces();
        console.log(places);
        if (places.length == 0) {
            return;
        }

        // CREDIT GOOGLE DOCUMENTATION.
        // CLEAR OLD MARKERS IF ANY
        markers.forEach(function (marker) {
            marker.setMap(null);
        });
        markers = [];

        createMarkers(places);
    });
}

// HERE WE PLACE THE MARKERS ON THE MAP
function createMarkers(places) {


    let markers = [];

    // CREDIT GOOGLE DOCUMENTATION.
    // CLEAR OLD MARKERS IF ANY
    markers.forEach(function (marker) {
        marker.setMap(null);
    });
    markers = [];

    // CREDIT GOOGLE DOCUMENTATION
    // GET THE PLACES FROM THE NEW SEARCH
    let bounds = new google.maps.LatLngBounds();
    places.forEach(function (place) {
        console.log(places);
        if (!place.geometry) {
            console.log("Returned place contains no geometry");
            return;
        }

        // CREDIT GOOGLE DOCUMENTATION
        // CONVERT MARKER IMAGE OBJECTS TO TYPE ICON.
        let icon = {
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(25, 25)
        };

        // CREDIT GOOGLE DOCUMENTATION
        // PUSH MARKERS ONTO THE MAP
        markers.push(
            new google.maps.Marker({
                map: map,
                icon: icon,
                title: place.name,
                position: place.geometry.location
            })
        );

        // CREDIT GOOGLE DOCUMENTATION
        // SET THE BOUNDS WITHIN THE VIEWPORT, ELSE OUTSIDE
        if (place.geometry.viewport) {
            // Only geocodes have viewport.
            bounds.union(place.geometry.viewport);
        } else {
            bounds.extend(place.geometry.location);
        }

    });

}

// GET THE WEATHER OBJECT FOR THE LOCATION WE ARE INTERESTED IN ONLY
function getOurWeatherObject() {
    const weekendWeather = getWeatherObj();
    const location = getLocationChoice();
    let ourWeather;

    for (let loc in weekendWeather) {
        if (location === weekendWeather[loc].Saturday.placeName) {
            ourWeather = weekendWeather[loc];
            return ourWeather;

        }
    }
}

function getMonthName(month) {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return months[month];
}

// GET AND FORMAT CURRENT DATE
function getWeekendDates(dayOffset) {
    if (dayOffset !== 0) {
        const today = new Date();
        const currDate = today.getDate() + dayOffset;
        const currMonth = getMonthName(today.getMonth());
        const currYear = today.getUTCFullYear();
        const suffixArray = ["st", "nd", "rd", "th"];
        let suffix = suffixArray[3];
        if (currDate === 1) {
            suffix = suffixArray[0];
        } else if (currDate === 2) {
            suffix = suffixArray[1];
        } else if (currDate === 3) {
            suffix = suffixArray[2];
        }
        let date = currDate + suffix + ' of ' + currMonth + '  ' + currYear;
        return date;
    }
}

function displayLocationWeather() {
    const location = getLocationChoice();
    let ourWeather = getOurWeatherObject();
    let daysToWeekend = getIndexArray();
    let weekendDates = [];

    let weekend = ["Friday","Saturday","Sunday"];

    console.log(ourWeather);

    for (let i = 1; i < daysToWeekend.length;i++) {
        weekendDates.push(getWeekendDates(daysToWeekend[i]));
        console.log(weekendDates);
    }

    document.getElementById('ourLocation').innerText = `So, ${location} it is then!\n Lets just take a look at the weather line up before you go..`;

    document.getElementById("FridayDate").innerHTML = `Friday ${weekendDates[0]}`;
    document.getElementById("SaturdayDate").innerHTML = `Saturday ${weekendDates[1]}`;
    document.getElementById("SundayDate").innerHTML = `Sunday ${weekendDates[2]}`;

    for (let day of weekend) {
        document.getElementById(`${day}Temp`).innerHTML = ourWeather[day].tempInCelsius + `&#176<span id="tempUnit">C</span>`;
        document.getElementById(`${day}Icon`).src = `http://openweathermap.org/img/wn/${ourWeather[day].icon}.png`;
        document.getElementById(`${day}WeatherDescription`).innerHTML = ourWeather[day].description.charAt(0).toUpperCase() + ourWeather[day].description.slice(1);
        document.getElementById(`${day}Feels`).innerHTML = `Feels:<br />${ourWeather[day].feelsLike}&#176<span>C</span>`;
        document.getElementById(`${day}Humidity`).innerHTML = `Humidity:<br /> ${ourWeather[day].humidity}%`;
        document.getElementById(`${day}Wind`).innerHTML = `Wind:<br />${ourWeather[day].windSpeed}m/s`;

    }

    document.getElementById("mapIntroduction").innerText = ` We really hope you enjoy your time in ${location}.\nTo help you make the most of your time there here is a handy map with some points of interest. \n\nEnjoy!`
    
}

// CODE TO FADE OUT ELEMENT - CREDIT ONLINE TUTORIALS YOUTUBE.
// EDITED TO HAVE MY OWN CUSTOM FADE EFFECT
let lastScrollTop = 10;
let logo = document.getElementById("logo-container");
window.addEventListener("scroll", function () {
    let scrollTop = window.pageYoffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop) {
        logo.style.backgroundColor = '#d0ecfd';
        logo.style.opacity = "0.96";
        logo.style.boxShadow = '0 1px 6px 0 rgb(236,219,65)';
    } else {
        logo.style.backgroundColor = 'transparent';
        logo.style.boxShadow = 'none';
        logo.style.opacity = "1";
    }
});

// DO THIS FIRST
window.onload = function () {
    displayLocationWeather();
    createMap();
}


