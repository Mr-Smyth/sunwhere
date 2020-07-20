/*jshint esversion: 6 */

function displayLocationsResults(loc, weekendWeatherDeserialized) {
    if (weekendWeatherDeserialized[loc[0]].Sunday.hasOwnProperty("placeName")) {
        document.getElementById("resultLink1").style.display = "block";
        document.getElementById('nameLocation1').innerHTML = weekendWeatherDeserialized[loc[0]].Saturday.placeName;
        document.getElementById('resultlocation1').innerHTML = `${weekendWeatherDeserialized[loc[0]].score}%`;
    }
    if (weekendWeatherDeserialized[loc[1]].Sunday.hasOwnProperty("placeName")) {
        document.getElementById("resultLink2").style.display = "block";
        document.getElementById('nameLocation2').innerHTML = weekendWeatherDeserialized[loc[1]].Saturday.placeName;
        document.getElementById('resultlocation2').innerHTML = `${weekendWeatherDeserialized[loc[1]].score}%`;
    }
    if (weekendWeatherDeserialized[loc[2]].Sunday.hasOwnProperty("placeName")) {
        document.getElementById("resultLink3").style.display = "block";
        document.getElementById('nameLocation3').innerHTML = weekendWeatherDeserialized[loc[2]].Saturday.placeName;
        document.getElementById('resultlocation3').innerHTML = `${weekendWeatherDeserialized[loc[2]].score}%`;
    }
    if (weekendWeatherDeserialized[loc[3]].Sunday.hasOwnProperty("placeName")) {
        document.getElementById("resultLink4").style.display = "block";
        document.getElementById('nameLocation4').innerHTML = weekendWeatherDeserialized[loc[3]].Saturday.placeName;
        document.getElementById('resultlocation4').innerHTML = `${weekendWeatherDeserialized[loc[3]].score}%`;
    }
    if (weekendWeatherDeserialized[loc[4]].Sunday.hasOwnProperty("placeName")) {
        document.getElementById("resultLink5").style.display = "block";
        document.getElementById('nameLocation5').innerHTML = weekendWeatherDeserialized[loc[4]].Saturday.placeName;
        document.getElementById('resultlocation5').innerHTML = `${weekendWeatherDeserialized[loc[4]].score}%`;
    }
}


function sortLocationScores() {
    const weekendWeatherDeserialized = JSON.parse(localStorage.getItem("weekendWeather"));
    console.log(weekendWeatherDeserialized);
    let resultsArray = [];
    let locArray = [];

    for (let location in weekendWeatherDeserialized) {
        let result = weekendWeatherDeserialized[location].score;
        if (weekendWeatherDeserialized.hasOwnProperty(location)) {
            resultsArray.push(result);
            locArray.push(location);
        }
    }
    for (let i = 0; i < resultsArray.length; i++) {
        for (let j = i; j < resultsArray.length; j++) {
            if (resultsArray[i] < resultsArray[j]) { // checks if this (i) number in array is less than prev.
                let resHolder = resultsArray[i]; // if it is then hold this number
                let locHolder = locArray[i]; // hold matching location
                resultsArray[i] = resultsArray[j]; // make the bigger num the first number of the array
                locArray[i] = locArray[j]; // loc moves to match
                resultsArray[j] = resHolder; // place the smaller number in after the bigger number
                locArray[j] = locHolder; // loc moves to match
            }
        }
    }
    displayLocationsResults(locArray, weekendWeatherDeserialized);
}

// HERE WE GET THE NAME OF THE LOCATION THE USER CLICKS
function selectLocation() {
    let clicked;
    let selected;
    let selection = document.querySelectorAll("a");
    // LISTEN OUT FOR WHICH OF THE RESULTS IS CLICKED
    for (let i = 0; i < selection.length; i++) {
        selection[i].addEventListener("click", function () {
            clicked = selection[i].id;
            selected = document.getElementById(clicked).children[0].innerHTML;
            console.log(selected);
            window.localStorage.setItem('selectedLocation', JSON.stringify(selected));
        }, true);
        
    }

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
    sortLocationScores();
    selectLocation();
}

