function displayLocationsResults(loc, weekendWeatherDeserialized) {
    if (weekendWeatherDeserialized[loc[0]].Friday.hasOwnProperty("placeName")) {
    
        document.getElementById("resultBestLocation").style.display = "block";
        document.getElementById('nameLocation1').innerHTML = weekendWeatherDeserialized[loc[0]].Friday.placeName;
        document.getElementById('resultlocation1').innerHTML = weekendWeatherDeserialized[loc[0]].score;
    }
    if (weekendWeatherDeserialized[loc[1]].Friday.hasOwnProperty("placeName")) {
        document.getElementById("resultPlaceholder2").style.display = "block";
        document.getElementById('nameLocation2').innerHTML = weekendWeatherDeserialized[loc[1]].Friday.placeName;
        document.getElementById('resultlocation2').innerHTML = weekendWeatherDeserialized[loc[1]].score;
    }
    if (weekendWeatherDeserialized[loc[2]].Friday.hasOwnProperty("placeName")) {
        document.getElementById("resultPlaceholder3").style.display = "block";
        document.getElementById('nameLocation3').innerHTML = weekendWeatherDeserialized[loc[2]].Friday.placeName;
        document.getElementById('resultlocation3').innerHTML = weekendWeatherDeserialized[loc[2]].score;
    }
    if (weekendWeatherDeserialized[loc[3]].Friday.hasOwnProperty("placeName")) {
        document.getElementById("resultPlaceholder4").style.display = "block";
        document.getElementById('nameLocation4').innerHTML = weekendWeatherDeserialized[loc[3]].Friday.placeName;
        document.getElementById('resultlocation4').innerHTML = weekendWeatherDeserialized[loc[3]].score;
    }
    if (weekendWeatherDeserialized[loc[4]].Friday.hasOwnProperty("placeName")) {
        document.getElementById("resultPlaceholder5").style.display = "block";
        document.getElementById('nameLocation5').innerHTML = weekendWeatherDeserialized[loc[4]].Friday.placeName;
        document.getElementById('resultlocation5').innerHTML = weekendWeatherDeserialized[loc[4]].score;
    }
}


function sortLocationScores() {
    const weekendWeatherDeserialized = JSON.parse(localStorage.getItem("weekendWeather"));
    console.log(weekendWeatherDeserialized);
    let resultsArray = [];
    let locArray = [];
    let i = 0;

    for (let location in weekendWeatherDeserialized) {
        let result = weekendWeatherDeserialized[location]["score"];
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


window.onload = function () {
    sortLocationScores();
};