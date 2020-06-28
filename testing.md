# SunWhere Manual Testing

## Continuous Testing:

## Javascript:

- #### getCoords(location):

  Once Geolocation returns the location data, the getCoords function is called.
  The getCoords function updates the homeWeather Object and calls fetchCurrentWeather() with
  the latitude and logitude.

  The following tests were carried out:

  1.  Passed the function block through JSHint, to check for errors.
      - No errors detected.
  2.  Refreshed page multiple times to see if any errors occurred.
      - No errors detected.

   **Known Issues:**

  1.  It would only occaisionally return my correct location, on the 
  other occaisions it would return a location which was 
  between 25 and 175 KM's away . After some research i was able to find that this 
  is a problem that can occur in Googles database or Routers, and its ability
  to pinpoint the correct one.


* #### geolocationError(error):

  In the case that  Geolocation is unable to get location data, the geolocationError(error) 
  function is called.
  This function handles any error, such as when geolocation is not 
  enabled in the browser.

  The following tests were carried out:

  1. Passed the function block through JSHint, to check for errors.
        * No errors detected.
  2. Refreshed page multiple times to see if any errors occurred.
        * No errors detected.
  3. Set the browsers Geolocation setting to off, to check returned error 
  message to the broser was present.
        * Error message was present when required.
        * This also proved that the function call was being made correctly.
        * No errors detected.

* #### fetchCurrentWeather(lat, lon):

  The fetchCurrentWeather(lat, lon) function, gets the current weather.

    It then calls the updateHomeWeather() function
    It then calls the displayCurrentWeather function.

  The following tests were carried out:

  1. Passed the function block through JSHint, to check for errors.
        * No errors detected.
        * 10 warnings to do with ES6 syntax, let, const and template literal usage.
        * 3 undefined variables lat, lon and displayWeather. These will be used in subsequent functions.
  2. Console.logged the data Object
        * No errors detected.
        * Object displayed as expected.
        * This also proved that the function call was being made correctly.
  3. Refreshed page multiple times to see if any errors occurred.
        * No errors detected.
        * Objects always displayed as expected.

* #### updateHomeWeather(data):

  The updateHomeWeather(data) function, gets the data which is the response of the fetchCurrentWeather() function
   and updates the homeWeather{} object.

  The following tests were carried out:

  1. Passed the function block through JSHint, to check for errors.
        * 1 missing semicolon on feels_like assignment - Fixed.
  2. Console.logged the homeWeather Object.
        * No errors detected.
        * Object displayed as expected.
        * This also proved that the function call was being made correctly.
  3. Refreshed page multiple times to see if any errors occurred.
        * No errors detected.
        * Objects always displayed as expected.

* #### displayCurrentWeather():

  The displayCurrentWeather() function uses the homeWeather object to display the current
  weather for the current users location.

  The following tests were carried out:

  1. Passed the function block through JSHint, to check for errors.
        * 1 missing semicolon on displayCurrentIcon assignment - Fixed.
  2. Checked the index.html rendered page, was displaying correct information.
        * Page rendered as expected with all information.
  3. Refreshed page multiple times to see if any errors occurred.
        * No errors detected.
        * Page always displayed as expected.

   **Known Issues:**

  1.  Location was incorrect, but this was due to issue with returned data from geolocation, which is out of my control. However i 
  do expect this issue to be less obvious on a mobile platform.     


* #### getBackground():

  The getBackground() function uses a switch statement to get the value of the weather icon within the homeWeather{} object,
   and set the appropriate background image.

  The following tests were carried out:

  1. Passed the function block through JSHint, to check for errors.
        * 1 missing semicolon and parenthesis on the default switch condition - Fixed.
        * Cyclonic complexity was 19, as there were 19 options, will possibly attempt to refactor this function at a later stage.
  2. Checked the index.html rendered page, was displaying correct information.
        * Page rendered with the correct Image to match the current weather icon.
  3. Manually set the weather icon to test all 19 possibilities
        * Page rendered with the correct Image to match the current weather icon, each time.
  4. Refreshed page multiple times to see if any errors occurred.
        * No errors detected.
        * Page always displayed as expected.


* #### Getting the Location data from user, using google places searchBox:

  The following tests were carried out:

  1. Passed the function block through JSHint, to check for errors.
        * No errors detected.
  2. Checked the index.html rendered page, was providing autocomplete functionality in the location input boxes.
        * Autocomplete worked perfectly on all 4 inputs.
  3. Checked that the extracted object for each location contained correct information, by using console.log's
        * Correct information was displayed in the console.
  4. Refreshed page multiple times to see if any errors occurred.
        * No errors detected.
        * Page always displayed as expected.


* #### fetchLocationWeather(lat, lon):

  The fetchLocationWeather() function, gets the weather for the user entered locations, and 
  will be used to generate a result for best location.

  The following tests were carried out:

  1. Passed the function block through JSHint, to check for errors.
        * No errors detected.
  2. Console.logged the data Object
        * No errors detected.
        * Object displayed as expected.
        * This also proved that the function call was being made correctly.
  3. Refreshed page multiple times to see if any errors occurred.
        * No errors detected.
        * Objects always displayed as expected.


* #### findWeatherDayIndex():

  The findWeatherDayIndex() function uses an object to return the correct days to target, to get 
  the weather for the next weekend.

  The following tests were carried out:

  1. Passed the function block through JSHint, to check for errors.
        * Missing semicolon to close days object.
  2. Console.logged the returned dayResult from within the updateWeekendWeather() function.
        * No errors detected.
        * dayResult array displayed as expected.
        * This also proved that the function call was being made correctly.
  3. Refreshed page multiple times to see if any errors occurred.
        * No errors detected.
        * Objects always displayed as expected.

* #### fetchWeekendWeather():

  The fetchWeekendWeather() function updates the weekendWeather{} object, with the current
  weather and the weather from the 4 user entered locations. The weekendWeather{} object stores this
  information for later use in scoring and weather display.

  The following tests were carried out:

  1. Passed the function block through JSHint, to check for errors.
        * No errors detected.
  2. Console.logged the object with various inputs from all locations.
        * No errors detected.
        * weekendWeather{} object displayed as expected.
        * This also proved that all the relevant function call was being made correctly.
  3. Refreshed page multiple times to see if any errors occurred.
        * No errors detected.
        * Object always displayed as expected.