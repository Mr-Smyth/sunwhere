/*jshint esversion: 6 */

// GLOBAL VARIABLES
const kelvin = 273;
const infoMessageElement = document.getElementById("informationNotification");
const displayBackgroundImage = document.getElementById("weatherBackgroundContainer");
const displayCurrentLocation = document.getElementById("weatherCurrentInfoName");
const displayCurrentIcon = document.getElementById("weatherCurrentIcon");
const displayStandaloneIcon = document.getElementById("standaloneWeatherIcon")
const displayCurrentTemp = document.getElementById("weatherCurrentTemp");
const displayCurrentDesc = document.getElementById("weatherCurrentDescription");
const displayCurrentHumidity = document.getElementById("weatherCurrentHumidity");
const displayCurrentWind = document.getElementById("weatherCurrentWindSpeed");
const displayCurrentFeelsLike = document.getElementById("weatherCurrentFeelsLike");
const displayCurrentDate = document.getElementById("currentDate");
const displayCurrentTime = document.getElementById("currentTime");
const locationInputArray = ["location2", "location3", "location4", "location5"];
const threeDayWeekend = ["Friday", "Saturday", "Sunday"];
const twoDayWeekend = ["Saturday", "Sunday"];
const oneDayWeekend = ["Sunday"];

// GLOBAL OBJECTS
/* USING OBJECTS AS I WILL NEED TO ACCESS THE INFORMATION
MORE THAN ONCE FROM MORE THAN ONE FUNCTION  */
const homeWeather = {};
const weekendWeather = {
    location1: {
        Friday: {},
        Saturday: {},
        Sunday: {}
    },
    location2: {
        Friday: {},
        Saturday: {},
        Sunday: {}
    },
    location3: {
        Friday: {},
        Saturday: {},
        Sunday: {}
    },
    location4: {
        Friday: {},
        Saturday: {},
        Sunday: {}
    },
    location5: {
        Friday: {},
        Saturday: {},
        Sunday: {}
    }
};

/* THIS GETS CALLED AFTER THE CURRENT WEATHER FETCH, 
TO UPDATE THE homeWeather{} OBJECT. */
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
    homeWeather.score = 0;
}

/* THIS FUNCTION RETURNS AN ARRAY OF THE DAYS WE NEED TO TARGET IN THE , 
7 DAY WEATHER API RESPONSE - TO GET THE NEXT WEEKEND. */
function findWeatherDayIndex() {
    const today = new Date();
    const dayToday = today.getDay();
    let WeatherDayIndexs = [];
    WeatherDayIndexs.push(dayToday);

    const daysToNextWeekend = {

        /* "0": [5, 6, 7],: IF TODAY IS SUNDAY, DAYS 5,6 AND 7 FROM 
        THE API RESPONSE DATA WILL BE NEEDED.
        IF THE CURRENT DAY IS FRIDAY OR SATURDAY - WE WILL STILL
        RETURN AN ARRAY TO TARGET CURRENT WEEKEND. */
        "0": [0],
        "1": [4, 5, 6],
        "2": [3, 4, 5],
        "3": [2, 3, 4],
        "4": [1, 2, 3],
        "5": [0, 1, 2],
        "6": [0, 1]
    };

    const ourIndex = daysToNextWeekend[dayToday];
    WeatherDayIndexs.push(ourIndex);
    return WeatherDayIndexs; // ** i should return this with the day num then check if day num === 6 

}

// HERE WE FIND OUT LENGTH OF WEEKEND IF ITS SAT OR SUNDAY
function getLengthOfWeekend() {
    let getIndex = findWeatherDayIndex();
    let weekend = [];
    let getDay = getIndex[0];

    if (getDay === 6) {
        weekend = twoDayWeekend;
    } else if (getDay === 0) {
        weekend = oneDayWeekend;
    } else {
        weekend = threeDayWeekend;
    }
    window.localStorage.setItem('weekendLength', JSON.stringify(weekend));
    return weekend;
}

// HERE WE UPDATE THE WEEKENDWEATHER OBJECT
function updateWeekendWeather(lat, lon, data, thisLocation, id) {
    let getIndex = findWeatherDayIndex();
    let weekend = getLengthOfWeekend();
    const dayIndexes = getIndex[1];
    window.localStorage.setItem('dayIndexesArray', JSON.stringify(dayIndexes));
    console.log(dayIndexes);

    data = data.daily;

    for (let i = 0; i < weekend.length; i++) {

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
        weekendWeather[id].lat = lat;
        weekendWeather[id].lon = lon;

    }
    console.log(weekendWeather);
}


// CALCULATE RAIN SCORE
function weekendRainScore(loc) {
    let score = 0;
    let weekend = getLengthOfWeekend();
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

// CALCULATE CLOUDS SCORE
function weekendCloudsScore(loc) {
    let score = 0;
    let weekend = getLengthOfWeekend();
    weekend.forEach(function (day, index) {
        let clouds = weekendWeather[loc][day].clouds;
        if (clouds === 0) {
            score += 40;
        } else if (clouds > 0 && clouds <= 30) {
            score += 20;
        } else if (clouds > 30 && clouds <= 60) {
            score += 10;
        } else if (clouds > 60 && clouds <= 80) {
            score += 0;
        } else if (clouds > 80) {
            score -= 10;
        } else {
            score += 0;
        }
    });
    return score;
}

// CALCULATE WIND SCORE
function weekendWindScore(loc) {
    let score = 0;
    let weekend = getLengthOfWeekend();
    weekend.forEach(function (day, index) {
        let wind = weekendWeather[loc][day].windSpeed;
        if (wind >= 0.5 && wind <= 5) {
            score += 20;
        } else if (wind > 5 && wind <= 10) {
            score += 10;
        } else if (wind > 10 && wind <= 13) {
            score -= 10;
        } else if (wind > 13 && wind <= 20) {
            score -= 20;
        } else if (wind > 20) {
            score -= 50;
        } else {
            score += 0;
        }
    });
    return score;
}

// CALCULATE HUMIDITY SCORE
function weekendHumidityScore(loc) {
    let score = 0;
    let weekend = getLengthOfWeekend();
    weekend.forEach(function (day, index) {
        let humidity = weekendWeather[loc][day].humidity;
        if (humidity > 0 && humidity <= 30) {
            score += 0;
        } else if (humidity > 30 && humidity <= 60) {
            score += 40;
        } else if (humidity > 60 && humidity <= 80) {
            score += 10;
        } else if (humidity > 80) {
            score -= 10;
        } else {
            score += 0;
        }
    });
    return score;
}

// CALCULATE TEMP SCORE
function weekendTempScore(loc) {
    let score = 0;
    let weekend = getLengthOfWeekend();
    weekend.forEach(function (day, index) {
        let temp = weekendWeather[loc][day].tempInCelsius;
        // add tempInFahrenheit to score to help eliminate duplicate scores
        score += weekendWeather[loc][day].tempInFahrenheit;
        if (temp > 0 && temp <= 15) {
            score += 0;
        } else if (temp > 15 && temp <= 20) {
            score += 10;
        } else if (temp > 20 && temp <= 25) {
            score += 20;
        } else if (temp > 25 && temp <= 30) {
            score += 40;
        } else if (temp > 30 && temp <= 35) {
            score += 20;
        } else if (temp > 35 && temp <= 40) {
            score += 10;
        } else if (temp > 40) {
            score -= 20;
        } else {
            score += 0;
        }
    });
    console.log(score);
    return score;
}
// GET THE PERCENTAGE SCORE, CHECK LENGTH OF WEEKEND FIRST
function calculatePercent(score) {
    let weekend = getLengthOfWeekend();
    let maxScore = 702;
    if (weekend.length === 2) {
        maxScore = (702 / 3) * 2;
    } else if (weekend.length === 1) {
        maxScore = (702 / 3);
    }
    console.log("This is the max score " + maxScore);
    let result = (score / maxScore) * 100;
    return result;
}

// CALCULATE EACH LOCATIONS SCORE
function calculateRating() {
    console.log("Were in calculate rating");
    const allLocations = [
        "location1",
        "location2",
        "location3",
        "location4",
        "location5"
    ];
    // ITERATE LOCATIONS OVER THESE FUNCTIONS TO RETURN EACH SCORE
    for (let loc of allLocations) {
        let score = 0;
        score += weekendRainScore(loc);
        score += weekendCloudsScore(loc);
        score += weekendWindScore(loc);
        score += weekendHumidityScore(loc);
        score += weekendTempScore(loc);
        weekendWeather[loc].score = Math.floor(calculatePercent(score));
    }
    /* HIGHEST ACHIEVABLE SCORE BASED ON A TEMP OF 40 DEG CELSIUS IS 702
    tEMPS IN EXCESS OF 40 ARE SUBJECT TO DEDUCTIONS AND AS A RESULT
    DO NOT EXCEED THIS SCORE OR 702*/
    const weekendWeatherSerial = JSON.stringify(weekendWeather);
    localStorage.setItem("weekendWeather", weekendWeatherSerial);
}

// DISPLAYS THE WEATHER BACKGROUND IMAGE
function getBackground() {
    switch (homeWeather.weatherIcon) {
        case "01d":
            displayBackgroundImage.style.backgroundImage = 'url("assets/images/clear-skyd.jpg")';
            break;
        case "02d":
            displayBackgroundImage.style.backgroundImage = 'url("assets/images/few-cloudsd.jpg")';
            break;
        case "03d":
            displayBackgroundImage.style.backgroundImage = 'url("assets/images/scattered-cloudsd.jpg")';
            break;
        case "04d":
            displayBackgroundImage.style.backgroundImage = 'url("assets/images/broken-cloudsd.jpg")';
            break;
        case "09d":
            displayBackgroundImage.style.backgroundImage = 'url("assets/images/raind.jpg")';
            break;
        case "10d":
            displayBackgroundImage.style.backgroundImage = 'url("assets/images/raind.jpg")';
            break;
        case "11d":
            displayBackgroundImage.style.backgroundImage = 'url("assets/images/thunderstormd.jpg")';
            break;
        case "13d":
            displayBackgroundImage.style.backgroundImage = 'url("assets/images/snowd.jpg")';
            break;
        case "50d":
            displayBackgroundImage.style.backgroundImage = 'url("assets/images/mistd.jpg")';
            break;
        case "01n":
            displayBackgroundImage.style.backgroundImage = 'url("assets/images/clear-skyn.jpg")';
            break;
        case "02n":
            displayBackgroundImage.style.backgroundImage = 'url("assets/images/few-cloudsn.jpg")';
            break;
        case "03n":
            displayBackgroundImage.style.backgroundImage = 'url("assets/images/cloudsn.jpg")';
            break;
        case "04n":
            displayBackgroundImage.style.backgroundImage = 'url("assets/images/cloudsn.jpg")';
            break;
        case "09n":
            displayBackgroundImage.style.backgroundImage = 'url("assets/images/rainn.jpg")';
            break;
        case "10n":
            displayBackgroundImage.style.backgroundImage = 'url("assets/images/rainn.jpg")';
            break;
        case "11n":
            displayBackgroundImage.style.backgroundImage = 'url("assets/images/thunderstormn.jpg")';
            break;
        case "13n":
            displayBackgroundImage.style.backgroundImage = 'url("assets/images/snown.jpg")';
            break;
        case "50n":
            displayBackgroundImage.style.backgroundImage = 'url("assets/images/mistn.jpg")';
            break;
        default:
            displayBackgroundImage.style.backgroundImage = 'url("assets/images/clear-skyd1.jpg")';
            break;
    }
}

// THIS FUNCTION DISPLAYS THE CURRENT LOCATIONS WEATHER TO HOME SCREEN
function displayCurrentWeather(homeWeather) {
    getBackground();
    displayCurrentLocation.innerText = homeWeather.name;
    displayCurrentIcon.src = `http://openweathermap.org/img/wn/${homeWeather.weatherIcon}@2x.png`;
    displayStandaloneIcon.src = `http://openweathermap.org/img/wn/${homeWeather.weatherIcon}@4x.png`;
    displayCurrentTemp.innerHTML = homeWeather.tempInCelsius + `&#176<span id="tempUnit">C</span>`;
    displayCurrentDesc.innerText = homeWeather.description.charAt(0).toUpperCase() +
        homeWeather.description.slice(1); // SET FIRST LETTER TO UPPERCASE
    displayCurrentHumidity.innerText = `Humidity: ${homeWeather.humidity}%`;
    displayCurrentWind.innerText = `Wind: ${homeWeather.windSpeed}m/s`;
    displayCurrentFeelsLike.innerHTML = `Feels: ${homeWeather.feelsLike}&#176<span>C</span>`;
    displayCurrentDate.innerHTML = currentDate();
    displayCurrentTime.innerHTML = currentTime();
    document.getElementById("weatherCurrentInfoContainer").style.display = "flex";
}

/* HERE WE GET CURRENT WEATHER FROM GEOLOCATION, CALLS TO UPDATE homeWeather 
OBJECT AND PASSES ONTO displayHomeWeather() */
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

    /* FETCH FROM OPENWEATHER API 7 DAY ONE CALL, EXCLUDING CURRENT, 
    MINUTE AND HOURLY */
    fetch(apiWeekend)
        .then(function (response) {
            return response.json(); // return the results to me in .JSON
        })
        .then(function (data) {
            // this is what we will do with the results.
            updateWeekendWeather(lat, lon, data, thisLocation, id);
            calculateRating();
        })
        .catch(function (error) {
            console.log("ERROR !" + error.message);
        });
}

// FIRST WE GET CURRENT LOCATION, LATITUDE AND LONGITUDE
// WE NEED TO CHECK IF GEOLOCATION IS ALLOWED IN THE BROWSER
function getGeolocation() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(getCoords, geolocationError);
    } else {
        // IF NOT, SEND AN ERROR NOTIFICATION TO WEATHER WINDOW
        infoMessageElement.innerHTML =
            `<p>Your Browser does not support Geolocation, please allow 
    Geolocation and reload the page.</p>`;
    }
}

/* RECEIVE THE GEOLOCATION POSITION OBJECT AS INPUT, UPDATE OBJECT AND GET THE 
WEATHER. */
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
function getLocationsFromUser() {
    locationInputArray.forEach(function (location) {
        let id = document.getElementById(location).attributes.id.value;

        // SEARCHBOX CODE TAKEN FROM GOOGLE PLACES DOCUMENTATION

        /* TARGET AND STORE THE LOCATION IN INPUT */
        const input = document.getElementById(location);
        // PASS THE SEARCH INTO GOOGLE PLACES:
        const searchRes = new google.maps.places.SearchBox(input);
        /* WE JUST NEED INDEX 0, getPlaces()
         RETURNS THE DETAILS OF THE LOCATION SELECTED BY THE USER. */
        searchRes.addListener("places_changed", function () {
            const location = searchRes.getPlaces()[0];
            if (location == null) {
                return;
            }

            // LOCATIONS NAME
            const thisLocation = location.address_components[0].long_name;
            const latitude = location.geometry.location.lat();
            const longitude = location.geometry.location.lng();

            /*  SEND THE LAT AND LONG, BUT ALSO THE LOCATIONS NAME, AND ID to 
            fetchLocationWeather(). THIS WILL BE USED TO BUILD AN OBJECT OF WEATHER 
            INFORMATION FOR EACH LOCATION.*/

            fetchWeekendWeather(latitude, longitude, thisLocation, id);
        });
    });
}


// GET AND FORMAT CURRENT DATE
function currentDate() {
    const today = new Date();
    const currDate = today.getDate();
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

// GET AND FORMAT CURRENT TIME
function currentTime() {
    const today = new Date();
    let hours = today.getHours();
    let mins = today.getMinutes();
    let ampm = "am";

    if (hours >= 12) {
        ampm = "pm";
    }
    if (mins < 10) {
        mins = '0' + mins;
    }
    hours = hours % 12;
    let time = hours + ":" + mins + ampm;
    return time;
}

// HELPER FUNCTION TO PROVIDE MONTH NAME
function getMonthName(month) {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return months[month];
}



// CODE TO FADE OUT ELEMENT - CREDIT ONLINE TUTORIALS YOUTUBE.
// EDITED TO HAVE MY OWN CUSTOM FADE EFFECT
let lastScrollTop = 10;
let logo = document.getElementById("logo-container");
let headerMessage = document.getElementById("headerMessage");
window.addEventListener("scroll", function () {
    let scrollTop = window.pageYoffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop) {
        logo.style.backgroundColor = '#d0ecfd';
        logo.style.opacity = "0.93";
        logo.style.boxShadow = '0 1px 6px 0 rgb(236,219,65)';
    } else {
        logo.style.backgroundColor = 'transparent';
        logo.style.boxShadow = 'none';
        logo.style.opacity = "1";
    }
});



// CHANGES THE TEMPERATURE UNIT
function changeUnit() {
    let tempUnit = document.getElementById("tempUnit").innerText;
    if (tempUnit === null) {
        return;
    } else if (tempUnit === "C") {
        displayCurrentTemp.innerHTML = homeWeather.tempInFahrenheit + `&#176<span id="tempUnit">F</span>`;
    } else if (tempUnit === "F") {
        displayCurrentTemp.innerHTML = homeWeather.tempInCelsius + `&#176<span id="tempUnit">C</span>`;
    }
}


window.onload = function () {
    if (document.URL.includes('index.html')) {
        getGeolocation();
        getLocationsFromUser();
        // LISTENER FOR CLICK ON TEMPERATURE, TO CALL CHANGE UNIT
        document.getElementById('weatherCurrentTemp').addEventListener('click', changeUnit);
    }
};