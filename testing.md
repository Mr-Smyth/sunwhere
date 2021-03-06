# SunWhere Manual Testing

## Continuous Testing:

[Back to Readme](https://github.com/Mr-Smyth/sunwhere/blob/master/README.md#Testing)

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

<li>

## utility.js Testing

* [getMonthName](#getMonthName)
* [fadeLogo](#fadeLogo)

</li>
</ul>

# Styling
<ul>
<li>

## CSS
* [utility.css](#utility-css)
* [style.css](#style-css)
* [results.css](#results-css)
* [information.css](#information-css)
  
</li>
</ul>

---
# Layout
<ul>
<li>

## HTML
* [index.html](#index-html)
* [results.html](#results-html)
* [information.html](#information-html)
  
</li>
</ul>

---
# General Testing

<ul>
<li>

[All user stories tested](#User-Stories-Tested)
</li>
</ul>

<ul>
<li>

[Unresolved issues](#Unresolved-issues)
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
   4. Retested after changes made to improve the look of the homescreen when no geolocation services were enabled in the users browser.
      * Background appeared as expected.
      * Error displayed as expected.
      * After multiple refreshes, everything displayed as expected.

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
  4. Retested after changes made to improve look of homescreen if no geolocation is enabled.
      * Switched off geolocation and resized screens to ensure breakpoints did not effect look, and that none of the current weather display items were displayed.
      * Refreshed page multiple times, display still only showed error and default weather background image of man looking at the sky.
      * Enabled location services in browser and everything displayed as expected.

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
  4. Re-ran above tests following refactored code to allow for Sat, Sun & Sunday only weekends. Set current day to both Saturday and Sunday.
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
  4. Re-ran above tests following refactored code to allow for Sat, Sun & Sunday only weekends. Set current day to both Saturday and Sunday.
     * No errors detected.
     * Output to console always displayed as expected.

**[Back to index](#Table-of-Contents)**

* ### getGeolocation() and getLocationsFromUser():

  These functions were set up to wrap existing code in a function. They are to solve the issue of the code within these functions automatically running on pages where it is not needed.
  The 2 Functions are called using the window.onload = function(),
  Which checks that the current page is index.html.
  Problem no longer relevant since deciding to use separate script files, for each page. Simplified viewing and I felt was a lot tidier.


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

  This function creates a new date and converts elements of the current date into a more readable format. then returns the data to the calling function.
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
  4. Re-ran above tests following refactored code to allow for Sat, Sun & Sunday only weekends. Set current day to both Saturday and Sunday.
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
  5. Re-ran above tests following refactored code to allow for Sat, Sun & Sunday only weekends. Set current day to both Saturday and Sunday.
     * No errors detected.
     * Output displayed as expected.

**[Back to index](#Table-of-Contents)**

* ### selectLocation()

  This function grabs which location the user selects, and saves it to local storage.

  The following tests were carried out:

  1. Passed the functions through JSHint, to check for errors.
     * No errors detected.
     * A Warning was returned "***Functions declared within loops referencing an outer scoped variable may lead to confusing semantics. (selection)***" - After researching this warning on stack overflow, I found that using let and const gets around this problem, and as they are all declared and used within the scope of the function, there won't be a problem.
      Warning: line 38  ***The body of a for in should be wrapped in an if statement to filter unwanted properties from the prototype.***
      Warning: line 67  ***Functions declared within loops referencing an outer scoped variable may lead to confusing semantics. (clicked, selection, I, selected)***
  2. Made a selection multiple times and logged result to console:
      * The results always matched the selection
  3. Logged the result in another HTML page to make sure information was being correctly retrieved from local storage.
     * The results always showed as expected.  
  4. Refreshed page multiple times to see if any errors occurred.
     * No errors detected.
  5. Re-ran above tests following refactored code to allow for Sat, Sun & Sunday only weekends. Set current day to both Saturday and Sunday.
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
  4. Re-ran above tests following refactored code to allow for Sat, Sun & Sunday only weekends. Set current day to both Saturday and Sunday.
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
  5. Re-ran above tests following refactored code to allow for Sat, Sun & Sunday only weekends. Set current day to both Saturday and Sunday.
     * No errors detected.
     * Output always displayed as expected.

**[Back to index](#Table-of-Contents)**

---
## utility.js

* ### getMonthName

  This function is called to get the month name from the getDate() function

  The following tests were carried out:

  1. Passed the functions through JSHint, to check for errors.
     * No errors detected.
  2. Repeated refreshing of page and month name always showed as expected

**[Back to index](#Table-of-Contents)**

* ### fadeLogo

  This is a function that automatically runs to set the logo to a semi transparent background when the page is scrolled down.

  1.  Repeated loading of page on different screen resolutions:
  2.  Refreshed page multiple times at different stages
       * Logo fade effect worked as expected.

---

# STYLING

* ## utility css

### Code validation:
Used [W3C CSS Validator](https://jigsaw.w3.org/css-validator/validator) to check information.css.
  * No errors found.

**[Back to index](#Table-of-Contents)**

---


* ## style css

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

* ## results css

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

* ## information css

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


* ### index html
Used the [W3C Markup Validator](https://validator.w3.org/) to check my code for errors.

   * Errors displayed relating to misuse of img tag in the logo were all fixed.
   * 1 warning **"Section lacks heading. Consider using h2-h6 elements"**.  
     * Searched for information on this error and found it to be unimportant. ***"While it is useful to provide a heading for each sectioning content element, it is not required."*** - (https://stackoverflow.com/questions/24155024/w3c-html-validation-error-section-lacks-heading-consider-using-h2-h6-elements).
   * Page layout displayed as expected.

**[Back to index](#Table-of-Contents)**

---

* ### results html
Used the [W3C Markup Validator](https://validator.w3.org/) to check my code for errors.

   * Errors displayed relating to misuse of img tag in the logo were all fixed.
   * Page layout displayed as expected.

**[Back to index](#Table-of-Contents)**

---

* ### information html
Used the [W3C Markup Validator](https://validator.w3.org/) to check my code for errors.

   * Errors displayed relating to misuse of img tag in the logo were all fixed.
   * 2 warnings **"Section lacks heading. Consider using h2-h6 elements"**.  
     * Searched for information on this error and found it to be unimportant. ***"While it is useful to provide a heading for each sectioning content element, it is not required."*** - (https://stackoverflow.com/questions/24155024/w3c-html-validation-error-section-lacks-heading-consider-using-h2-h6-elements).
   * Page layout displayed as expected. 

**[Back to index](#Table-of-Contents)**

---

* ### User Stories Tested

### 1.  As a user, I want the home screen to be inviting and with information relevant to my location. 
   * I made a dummy visit to the site. Once I allowed geolocation on my browser I was able to view weather and location details relevant to my current position. I found that when I viewed from a PC, google could not place me correctly due to Google's database and how they locate routers. But from a mobile phone, the location was perfect.  
   * The background was relevant to my current locations current weather, and I was able to click on the temperature, to change the unit. The current date and time were also displayed which was very useful, and showed I was getting current information.

### 2.  As a user, I want to quickly and easily understand the purpose of the application.
   *  I used a combination of techniques to subtly achieve this.
      *  A logo suggesting a search for the sun.
      *  I made a dummy visit to the site and was able to read an introduction explaining in brief what the goal of the site is. Linking then to a more in-depth explanation of what the site does and how it does it. I felt informed about what was the goal of the site, and how to achieve it.

### 3.  As a user, I want to easily understand what I have to do.
   * This is achieved through reading the in-depth explanation in the locations input section. The user can easily get to this by clicking the **Click Here** link in the brief description/welcome section

### 4.  As a user, I want to easily enter my information.
   * I made a dummy visit to the site, and after scrolling to the clear introduction. I found the form clear and it was very obvious what the function of the inputs was. What added simplicity to this process is the including of google search box in the location input. I started typing KIL, and the result I wanted - KILKEE was automatically at the top of the list

### 5.  As a user, I want to see an obvious and quick way to get my results.
   * I made a dummy visit to the site, and after inputting the locations a large **Click to see Results** button directly beneath the final location input, made it obvious how to get my results.


### 6.  As a user, I want to be able to see an obvious comparison of predicted weather for my entered locations, including my home or current location.
   * I made a dummy visit to the site, and after clicking to see the results of my locations, I was taken to a results page. The page was displayed with full focus on the results, which were stacked in descending order and clear easy to understand % scoring.
   * It also invited me to select my preferred location.


### 7.  As a user, I would like to select my preferred location from the results and see places of interest for that location.
   * I made a dummy visit to the site, and after viewing the results, I clicked on my preferred location as instructed.
   * I was then taken to a clear layout of the full weekends' weather for that location. After scrolling down the page I was presented with a map for the location KILKEE showing me places of interest. I then searched for restaurants, which were all clearly marked on the map for me.


### 8.  As a user, it would be helpful to get a wildcard location returned, for a place not on the list, but which has a good rating for the next weekend.
   * Unfortunately this is not achievable in this release, due to API and time restrictions.

**[Back to index](#Table-of-Contents)**

---

# Unresolved issues

* Information.js - JSHint returned warnings about undefined variables, map, google and marker. I found that defining them led to issues in map loading. I was unable to find a satisfactory resolution to this issue.
* results.js - sortLocationScores() returned this warnings from jsHint.   
 
   * The body of a for in should be wrapped in an if statement to filter unwanted properties from the prototype.   

* results.js - selectLocation()  returned this warnings from jsHint.   

   * Functions declared within loops referencing an outer scoped variable may lead to confusing semantics. (clicked, selection, I, selected).

   I was unable to get the functions to work, in any other format. I will continue to search for an answer, as I progress in my coding, I'm sure I will find a solution.   

* script.js - One undefined variable : google.    
  
* **A console warning on information.html:** A cookie associated with a cross-site resource at http://openweathermap.org/ was set without the `SameSite` attribute. A future release of Chrome will only deliver cookies with cross-site requests if they are set with `SameSite=None` and `Secure`. You can review cookies in developer tools under Application>Storage>Cookies and see more details at https://www.chromestatus.com/feature/5088147346030592 and https://www.chromestatus.com/feature/5633521622188032.
  
  After searching for information on the above cookie related warning i found the following response on stack overflow: ***"This console warning is not an error or an actual problem — Chrome is just spreading the word about this new standard to increase developer adoption."***

* Links in my table of contents in my testing and readme, seemed to stop working on github, even though they worked at an earlier stage and they currently work on VSCode.

**[Back to index](#Table-of-Contents)**
