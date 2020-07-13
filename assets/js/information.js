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

console.log(initData());