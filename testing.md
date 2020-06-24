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

   **Observations:**

  1.  It would only occaisionally return my correct location, on the 
  other occaisions it would return a location which was 
  between 50 and 25 KM's away. After some research i was able to find that this 
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
        * No errors detected.

