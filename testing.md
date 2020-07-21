# SunWhere Manual Testing

## Continuous Testing:

[Back to Readme](ReadMe.md#Testing)

## Table of Contents



# Javascript 

<ul>
<li>

## script.js Testing

* [getCoords](#getCoords)
* [geolocationError](#geolocationError)  
* [fetchCurrentWeather](#fetchCurrentWeather)
* [updateHomeWeather](#updateHomeWeather)
* [displayCurrentWeather](#displayCurrentWeather)
* [getBackground](#getBackground)
* [Getting the Location data from user, using google places searchBox](#Getting-the-Location-data-from-the-user,-using-google-places-searchBox)
* [fetchLocationWeather](#fetchLocationWeather)
* [findWeatherDayIndex](#findWeatherDayIndex)
* [fetchWeekendWeather](#fetchWeekendWeather)
* [calculateRating](#calculateRating)
* [getGeolocation() and getLocationsFromUser()](#getGeolocation()-and-getLocationsFromUser())
* [changeUnit](#changeUnit)
* [currentDate](#currentDate)
* [currentTime](#currentTime)
</li>
<li>

## results.js Testing

* [sortLocationScores](#sortLocationScores)  
* [displayLocationsResults](#displayLocationsResults) 
* [selectLocation](#selectLocation)
  
</li>
<li>

## information.js Testing

* [initData](#initData)
* [getLocationChoice](#initData)
* [getWeatherObj](#initData)
* [createMap](#createMap)
* [createMarkers](#createMarkers)
* [getOurWeatherObject](#getOurWeatherObject)

</li>
</ul>

# Styling
<ul>
<li>

## CSS
* [style.css](#style.css)
* [results.css](#results.css)
* [information.css](#information.css)
  
</li>
</ul>

---
# Layout
<ul>
<li>

## HTML
* [index.html](#index.html)
* [results.html](#results.html)
* [information.html](#information.html)
  
</li>
</ul>

---
# Testing User Stories

<ul>
<li>

[All user stories tested](#User-Stories-Tested)
</li>
</ul>

---
# Javascript Functions 

## script.js

* ### getCoords():

  Once Geolocation returns the location data, the getCoords function is called.
  The getCoords function updates the homeWeather Object and calls fetchCurrentWeather() with
  the latitude and logitude.

  The following tests were carried out:

  1. Passed the function block through JSHint, to check for errors.
      * No errors detected.
  2. Refreshed page multiple times to see if any errors occurred.
      * No errors detected.

  **Known Issues:**

  1. It would only occasionally return my correct location, on the
      other occasions it would return a location which was
      between 25 and 175 KM's away. After some research, I was able to find that this
      is a problem that can occur in Google's database or Routers, and its ability
      to pinpoint the correct one.

**[Back to index](#Table-of-Contents)**

* ### geolocationError():

  In the case that Geolocation is unable to get location data, the geolocationError(error)
  function is called.
  This function handles any error, such as when geolocation is not
  enabled in the browser.

  The following tests were carried out:

  1. Passed the function block through JSHint, to check for errors.
     * No errors detected.
  2. Refreshed page multiple times to see if any errors occurred.
     * No errors detected.
  3. Set the browser's Geolocation setting to off, to check returned error
     message to the browser was present.
     _ Error message was present when required.
     _ This also proved that the function call was being made correctly. \* No errors detected.

**[Back to index](#Table-of-Contents)**

* ### fetchCurrentWeather():

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

**[Back to index](#Table-of-Contents)**


* ### updateHomeWeather():

  The updateHomeWeather(data) function, gets the data which is the response of the fetchCurrentWeather() function
  and updates the homeWeather{} object.

  The following tests were carried out:

  1. Passed the function block through JSHint, to check for errors.
     * 1 missing semicolon on feels_like assignment * Fixed.
  2. Console.logged the homeWeather Object.
     * No errors detected.
     * Object displayed as expected.
     * This also proved that the function call was being made correctly.
  3. Refreshed page multiple times to see if any errors occurred.
     * No errors detected.
     * Objects always displayed as expected.

**[Back to index](#Table-of-Contents)**

* ### displayCurrentWeather():

  The displayCurrentWeather() function uses the homeWeather object to display the current
  weather for the current users location.

  The following tests were carried out:

  1. Passed the function block through JSHint, to check for errors.
     * 1 missing semicolon on displayCurrentIcon assignment * Fixed.
  2. Checked the index.html rendered page, was displaying the correct information.
     * Page rendered as expected with all information.
  3. Refreshed page multiple times to see if any errors occurred.
     * No errors detected.
     * Page always displayed as expected.

  **Known Issues:**

  1.  Location was incorrect, but this was due to an issue with returned data from geolocation, which is out of my control. However i
      do expect this issue to be less obvious on a mobile platform.

**[Back to index](#Table-of-Contents)**


* ### getBackground():

  The getBackground() function uses a switch statement to get the value of the weather icon within the homeWeather{} object,
  and set the appropriate background image.

  The following tests were carried out:

  1. Passed the function block through JSHint, to check for errors.
     * 1 missing semicolon and parenthesis on the default switch condition * Fixed.
     * Cyclonic complexity was 19, as there were 19 options, will possibly attempt to refactor this function at a later stage.
  2. Checked the index.html rendered page, was displaying the correct information.
     * Page rendered with the correct Image to match the current weather icon.
  3. Manually set the weather icon to test all 19 possibilities
     * Page rendered with the correct Image to match the current weather icon, each time.
  4. Refreshed page multiple times to see if any errors occurred.
     * No errors detected.
     * Page always displayed as expected.


**[Back to index](#Table-of-Contents)**


* ### Getting the Location data from the user, using google places searchBox:

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

**[Back to index](#Table-of-Contents)**


* ### fetchLocationWeather():

  The fetchLocationWeather() function, gets the weather for the user entered locations, and
  will be used to generate a result for the best location.

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

**[Back to index](#Table-of-Contents)**

* ### findWeatherDayIndex():

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
  4. Re-ran above tests following refactored code to allow for Sat,Sun & Sunday only weekends. Set current day to both Saturday and Sunday.
     * No errors detected.
     * Output to console always displayed as expected.

**[Back to index](#Table-of-Contents)**

* ### fetchWeekendWeather():

  The fetchWeekendWeather() function updates the weekendWeather{} object, with the current weather and the weather from the 4 users entered locations. The weekendWeather{} object stores this information for later use in scoring and weather display.

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

**[Back to index](#Table-of-Contents)**

* ### calculateRating():

  The calculateRating() function calculates the weekend score and also updates the weekendWeather{} object.
  It relies on calls to :

  * weekendRainScore(loc);
  * weekendCloudsScore(loc);
  * weekendWindScore(loc);
  * weekendHumidityScore(loc);
  * weekendTempScore(loc);

  The following tests were carried out:

  1. Passed the function block through JSHint, to check for errors.
     * No errors detected.
  2. Used various mock object inputs from all locations, logged result to console.
     * No errors detected.
     * expected scores displayed for all locations.
     * weekendWeather{} object updated as expected.
     * This also proved that all the relevant function call was being made correctly.
  3. Refreshed page multiple times to see if any errors occurred.
     * No errors detected.
     * console results always displayed as expected.
  4. Re-ran above tests following refactored code to allow for Sat,Sun & Sunday only weekends. Set current day to both Saturday and Sunday.
     * No errors detected.
     * Output to console always displayed as expected.

**[Back to index](#Table-of-Contents)**

* ### getGeolocation() and getLocationsFromUser():

  These functions were set up to wrap existing code in a function. They are to solve the issue of the code within these functions automatically running on pages where it is not needed.
  The 2 Functions are called using the window.onload = function(),
  Which checks that the current page is index.html.
  Problem no longer relevant since deciding to use seperate script files, for each page. Simplified viewing and i felt was a lot tidier.


  The following tests were carried out:

  1. Passed the functions through JSHint, to check for errors.
     * No errors detected.
  2. Switched to results.html, to check that it wasn't being called.
      * The functions were not being called in results.html.
  3. Refreshed page multiple times to see if any errors occurred.
     * No errors detected.

**[Back to index](#Table-of-Contents)**

* ### changeUnit():

  This function changes the temperature from celsius to Farenheit

  The following tests were carried out:

  1. Passed the functions through JSHint, to check for errors.
     * No errors detected.
  2. Ran the page multiple times and clicked the temperature element:
       * The temperature converted as expected.
  3. Refreshed page multiple times to see if any errors occurred.
     * No errors detected.

**[Back to index](#Table-of-Contents)**

* ### currentDate():

  This function creates a new date and converts elements of the current date into a more readable format. then returns the date to the calling function.
  This function calls 2 helper functions to get Month name and Day name.

  The following tests were carried out:

  1. Passed the functions through JSHint, to check for errors.
     * No errors detected.
  2. Ran the page multiple times:
       * The date always appeared as expected.
  3. Refreshed page multiple times to see if any errors occurred.
     * No errors detected.

**[Back to index](#Table-of-Contents)**

* ### currentTime():

  This function creates a new Time, and converts elements of the current time into a more readable 12-hour format, adding in the am/pm suffix It then returns the formatted time to the calling function

  The following tests were carried out:

  1. Passed the functions through JSHint, to check for errors.
     * No errors detected.
  2. Ran the page multiple times:
       * Found that it was not displaying a 0 before a min value of less than 10, so added this as an if statement.
       * The time always appeared as expected.
  3. Refreshed page multiple times to see if any errors occurred.
     * No errors detected.

**[Back to index](#Table-of-Contents)**

---

## results.js

* ### sortLocationScores()

  This function is called once the results page has loaded. It gets the weekendWeather object from local storage and sorts the locations depending on their scores. Then it calls displayLocationsResults() and passes in the sorted array and the weekendWeather object.

  The following tests were carried out:

  1. Passed the functions through JSHint, to check for errors.
     * No errors detected.
     * 1 warning to wrap the for loop in an if statement to prevent prototype errors.
  2. Ran the page multiple times:
      * console.logged the resulting array
      * The array always displayed in the correct order.
  3. Refreshed page multiple times to see if any errors occurred.
     * No errors detected.
  4. Re-ran above tests following refactored code to allow for Sat,Sun & Sunday only weekends. Set current day to both Saturday and Sunday.
     * No errors detected.
     * Output displayed as expected.

**[Back to index](#Table-of-Contents)**

* ### displayLocationsResults()

  This function is called from sortLocationScores. It gets the sorted array of scores and the weekendWeather object passed in.
  It then outputs the information to the results.html page.

  The following tests were carried out:

  1. Passed the functions through JSHint, to check for errors.
     * No errors detected.
  2. Ran the page multiple times:
      * The results displayed as expected.
      * Tried with no locations selected, the results showed for current location only, as expected.
      * If the user does not select a location from the google search box, no location is displayed.
  3. Refreshed page multiple times to see if any errors occurred.
     * No errors detected.
  4. All locations display in an ordered list, confirming correct calling of all associated functions.
  5. Re-ran above tests following refactored code to allow for Sat,Sun & Sunday only weekends. Set current day to both Saturday and Sunday.
     * No errors detected.
     * Output displayed as expected.

**[Back to index](#Table-of-Contents)**

* ### selectLocation()

  This function grabs which location the user selects, and saves it to local storage.

  The following tests were carried out:

  1. Passed the functions through JSHint, to check for errors.
     * No errors detected.
     * A Warning was returned "***Functions declared within loops referencing an outer scoped variable may lead to confusing semantics. (selection)***" - After researching this warning on stack overflow, I found that using let and const gets around this problem, and as they are all declared and used within the scope of the function, there won't be a problem.
      Warning: line 38	***The body of a for in should be wrapped in an if statement to filter unwanted properties from the prototype.***
      Warning: line 67	***Functions declared within loops referencing an outer scoped variable may lead to confusing semantics. (clicked, selection, i, selected)***
  2. Made a selection multiple times and logged result to console:
      * The results always matched the selection
  3. Logged the result in another HTML page to make sure information was being correctly retrieved from local storage.
     * The results always showed as expected.  
  4. Refreshed page multiple times to see if any errors occurred.
     * No errors detected.
  5. Re-ran above tests following refactored code to allow for Sat,Sun & Sunday only weekends. Set current day to both Saturday and Sunday.
     * No errors detected.
     * Selected location displayed as expected.

**[Back to index](#Table-of-Contents)**

---

## information.js

* ### initData()

  This function gets the data from local storage and then gets the latitude and longitude to hand to the map functions

  I also included in the scope of the test, 2 helper functions 
  *   **getLocationChoice**
  *   **getWeatherObj()**
  
  These 2 functions collect information from local storage, the location chosen and the weather object respectively.

  The following tests were carried out:

  1. Passed the functions through JSHint, to check for errors.
     * No errors detected.
  2. Logged the result to console:
      * The results always matched the selection made from results, and lon and lat matched also.
     * The results always showed as expected.  
  3. Refreshed page multiple times to see if any errors occurred.
     * No errors detected.
  4. Re-ran above tests following refactored code to allow for Sat,Sun & Sunday only weekends. Set current day to both Saturday and Sunday.
     * No errors detected.
     * Output always displayed as expected.

**[Back to index](#Table-of-Contents)**

* ### createMap()

  This function gets lat and lon for the chosen location and displays a map centred on that chosen location.   
  **Credit Google Documentation** 

  The following tests were carried out:

  1. Passed the functions through JSHint, to check for errors.
     * No errors detected.
  2. Changed locations multiple times, viewed map on information.html and logged results of searches to console:
     * The results always displayed as expected. 
  3. Checked if search results were Bias to the chosen location.
     * Results appeared to be Bias.
     * If a search for something not in the viewport is performed, the map will still mark that place. So if you are centred on London, and search for Berlin, a pin will be placed on Berlin. However, the viewport will not change.
     * This is my expected and desired behaviour.
  4. Refreshed page multiple times to see if any errors occurred.
     * No errors detected.

**[Back to index](#Table-of-Contents)**

* ### createMarkers()

  This function creates the markers for the map search and preset query for tourist attractions.   
  **Credit Google Documentation** 

  The following tests were carried out:

  1. Passed the functions through JSHint, to check for errors.
     * No errors detected.
  2. Viewed results on information.html
     * The results always showed as expected.  
  3. Refreshed page multiple times to see if any errors occurred.
     * No errors detected.

**[Back to index](#Table-of-Contents)**

* ### getOurWeatherObject()

  This function isolates the weather for the chosen location only.  

  The following tests were carried out:

  1. Passed the functions through JSHint, to check for errors.
     * No errors detected.
  2. Logged the returned object to the console.
     * The results always showed as expected.  
  3. Refreshed page multiple times to see if any errors occurred.
     * No errors detected.

**[Back to index](#Table-of-Contents)**

* ### displayLocationWeather()

  This function grabs the following data:  
  *  The chosen location.
  *  The weather for the chosen location.
  *  the number of days to the weekend, by calling helper function **getIndexArray()**.
  *  It also calls **getWeekendDates()** to get the dates for the upcoming weekend.

It uses this information to display the resulting weather for the whole weekend.

  The following tests were carried out:

  1. Passed the functions through JSHint, to check for errors.
     * No errors detected.
  2. Logged the results to the console.
     * The results always showed as expected.  
  3. Viewed results on information.js.
     * The page displayed with the correct information  
  4. Refreshed page multiple times to see if any errors occurred.
     * No errors detected.
  5. Re-ran above tests following refactored code to allow for Sat,Sun & Sunday only weekends. Set current day to both Saturday and Sunday.
     * No errors detected.
     * Output always displayed as expected.

**[Back to index](#Table-of-Contents)**

---

# STYLING

* ## style.css

### Code validation:
Used [W3C CSS Validator](https://jigsaw.w3.org/css-validator/validator) to check information.css.
  * No errors found.
  * Attached validation badge to HTML Page.


#### Checked media queries for the following breakpoints:
<ul>
<li>

**@media (min-width:600px)** : For portrait tablets, portrait iPad, e-readers (Nook/Kindle), landscape 800x480 phones (Android). 
  *  Displayed as expected.
</li>
<li>

**@media (min-width:801px)** : For tablet, landscape iPad, lo-res laptops ands desktops.  
  *  Displayed as expected.
</li>
<li>

**@media (min-width:1025px)** : For big landscape tablets, laptops, and desktops. 
  *  Displayed as expected.
</li>
</ul>

I used the following browsers directly on my own PC's to check layouts of the website:

*  Chrome version 81.
*  Edge version 81.
*  Opera version 68.
*  Firefox version 76.
*  IE 11.

I used SauceLabs to verify the layout and links on Safari version 13.1.  
Each Browser I performed a simulated visit, Inputting various locations, checked that autocomplete was always present in the location input boxes.  
Checked the responsiveness using Google Chrome development tools.
*  The index.HTML page displayed as expected on all breakpoints.


I then checked on the devices I have available to me:

A Samsung Galaxy Tab 10":  
A Samsung S7 and S8:  
An Apple iPhone 9:  

*  The results.HTML page displayed as expected on all these devices.

**[Back to index](#Table-of-Contents)**

---

* ## results.css

### Code validation:
Used [W3C CSS Validator](https://jigsaw.w3.org/css-validator/validator) to check information.css.
  * No errors found.


#### Checked media queries for the following breakpoints:
<ul>
<li>

**@media (min-width:600px)** : For portrait tablets, portrait iPad, e-readers (Nook/Kindle), landscape 800x480 phones (Android). 
  *  Displayed as expected.
</li>
<li>

**@media (min-width:801px)** : For tablet, landscape iPad, lo-res laptops ands desktops.  
  *  Displayed as expected.
</li>
<li>

**@media (min-width:1025px)** : For big landscape tablets, laptops, and desktops. 
  *  Displayed as expected.
</li>
</ul>

I used the following browsers directly on my own PC's to check layouts of the website:

*  Chrome version 81.
*  Edge version 81.
*  Opera version 68.
*  Firefox version 76.
*  IE 11.

I used SauceLabs to verify the layout and links on Safari version 13.1.  
Each Browser I performed a simulated visit, Selecting each result.  
Checked the responsiveness using Google Chrome development tools.
*  The results.HTML page displayed as expected on all breakpoints.


I then checked on the devices I have available to me:

A Samsung Galaxy Tab 10":  
A Samsung S7 and S8:  
An Apple iPhone 9:  

*  The results.HTML page displayed as expected on all these devices.

**[Back to index](#Table-of-Contents)**

---

* ## information.css

### Code validation:
Used [W3C CSS Validator](https://jigsaw.w3.org/css-validator/validator) to check information.css.
  * No errors found.
  * Attached validation badge to HTML Page.


### Checked media queries for the following breakpoints:
<ul>
<li>

**@media (min-width:460px)** : For smartphones, Android phones, landscape iPhone. ***Reduced this from 480 to 460 to allow for slightly smaller phones in landscape mode.***
  *  Displayed as expected.
</li>
<li>

**@media (min-width:600px)** : For portrait tablets, portrait iPad, e-readers (Nook/Kindle), landscape 800x480 phones (Android). 
  *  Displayed as expected.
</li>
<li>

**@media (min-width:801px)** : For tablet, landscape iPad, lo-res laptops ands desktops.  
  *  Displayed as expected.
</li>
<li>

**@media (min-width:1025px)** : For big landscape tablets, laptops, and desktops. 
</li>
</ul>

### Checked browser compatibility

I used the following browsers directly on my own PC's to check layouts of the website:

*  Chrome version 81.
*  Edge version 81.
*  Opera version 68.
*  Firefox version 76.
*  IE 11.

All browsers displayed as expected.

I used SauceLabs to verify the layout and links on Safari version 13.1.  
Each Browser I performed a simulated visit, Entering 2 and then all 4 locations.   
Checked the responsiveness using Google Chrome development tools.
*  The information.HTML page displayed as expected on all breakpoints.


I then checked on the devices I have available to me:

A Samsung Galaxy Tab 10":  
A Samsung S7 and S8:  
An Apple iPhone 9:  

*  The information.HTML page displayed as expected on all these devices.

**[Back to index](#Table-of-Contents)**

---

# Layout


* ### index.html
Used the [W3C Markup Validator](https://validator.w3.org/) to check my code for errors.

   * Errors displayed relating to misuse of img tag in the logo were all fixed.
   * 1 warning **"Section lacks heading. Consider using h2-h6 elements"**.  
     * Searched for information on this error and found it to be unimportant. ***"While it is useful to provide a heading for each sectioning content element, it is not required."*** - (https://stackoverflow.com/questions/24155024/w3c-html-validation-error-section-lacks-heading-consider-using-h2-h6-elements).
   * Page layout displayed as expected.

**[Back to index](#Table-of-Contents)**

---

* ### results.html
Used the [W3C Markup Validator](https://validator.w3.org/) to check my code for errors.

   * Errors displayed relating to misuse of img tag in the logo were all fixed.
   * Page layout displayed as expected.

**[Back to index](#Table-of-Contents)**

---

* ### information.html
Used the [W3C Markup Validator](https://validator.w3.org/) to check my code for errors.

   * Errors displayed relating to misuse of img tag in the logo were all fixed.
   * 2 warnings **"Section lacks heading. Consider using h2-h6 elements"**.  
     * Searched for information on this error and found it to be unimportant. ***"While it is useful to provide a heading for each sectioning content element, it is not required."*** - (https://stackoverflow.com/questions/24155024/w3c-html-validation-error-section-lacks-heading-consider-using-h2-h6-elements).
   * Page layout displayed as expected. 

**[Back to index](#Table-of-Contents)**

---

* ### User Stories Tested

### 1.  As a user, I want the home screen to be inviting and with information relevant to my location. 
   * The home screen shows weather relevant to the users current loction.
   * I believe the home screen to be easy and uncluttered, providing an inviting and pleasant experience.
   * Being fully responsive, the user experience will be equally enjoyable on all devices.

### 2.  As a user, I want to quickly and easily understand the purpose of the application.
   *  I used a combination of techniques to subtly achieve this.
      *  A logo suggesting a search for sun.
      *  An brief introduction explaining in brief what the goal of the site is. Linking then to a more in-depth explanation of what the site does and how it does it.

### 3.  As a user, I want to easily understand what i have to do.
   * This is achieved through reading the in-depth explanation in the locations input section. The user can easily get to this by clicking the **Click Here** link in the brief description/welcome section

### 4.  As a user, I want to easily enter my information.
   * This is achieved, via a clear simple input section. What adds simplicity to this process is the including of google searchbox in the locaction input. The user can type and click to select the suggested location, then simply Tab or click to get to the next input box.

### 5.  As a user, I want to see an obvious and quick way to get my results.
   * This is achieved by use of a large **Click to see Results** button directly beneath the final location input.


### 6.  As a user, I want to be able to see an obvious comparison of predicted weather for my entered locations, including my home or current location.
   * This is achieved by use of a seperate page displaying only the results. This removes distractions and concentrates the user on seeing clearly defined results, all stacked in order.
   * The best rated location, is at the top, and highlighted in a different colour for emphasis.
   * % scores keeps the system simple and easy to understand.
   * The text at the top of the screen explains what the user is currently looking at, and what to do next.


### 7.  As a user, I would like to select my preferred location from the results, and see places of interest for that location.
   * This is achieved through simply selecting any one of the locations.
   * A breakdown of the weekends weather, with dates, is displayed in a responsive format.
   * A deliberate displaying of the top of the map section, invites the user to scroll down to view the map with preloaded markers. These markers pinpoint tourist attractions for the area.
   * A searchbox then allows the user to search the map further and add their own pins.


### 8.  As a user, it would be helpful to get a wildcard location returned, for a place not on the list, but which has a good rating for the next weekend.
   * Unfortunatly this is not achievable in this release, due to API and time restrictions.

**[Back to index](#Table-of-Contents)**

---