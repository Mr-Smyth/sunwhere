/*jshint esversion: 6 */


function initData() {
    let latitude = 0;
    let longitude = 0;

    // GET THE LOCATION THE USER SELECTED
    let selectedLoc = JSON.parse(window.localStorage.getItem('selectedLocation'));
    console.log(selectedLoc);
    // GET THE WEEKEND WEATHER OBJECT
    const weekendWeatherDeserialized = JSON.parse(localStorage.getItem("weekendWeather"));
    console.log(weekendWeatherDeserialized);

    // FIND THE LOCATION THAT MATCHES THE LOCATION CHOSEN AND PICK OUT THE LAT AND LON.
    for (let location in weekendWeatherDeserialized) {
        if (weekendWeatherDeserialized.hasOwnProperty(location)) {
            if (selectedLoc === weekendWeatherDeserialized[location].Friday.placeName) {
                latitude = weekendWeatherDeserialized[location].lat;
                longitude = weekendWeatherDeserialized[location].lon;
            }
        }

    }
    return { "lat": latitude, "lng": longitude };
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
        /* label: "loc",  */
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

// DO THIS FIRST

createMap();
