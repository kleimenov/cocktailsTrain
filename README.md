# cocktailsTrain
(non-commercial project)

* Author: [Ivan Kleimenov](https://github.com/kleimenov).

---
### Description
There is the `Full Stack web application (responsive wepsite)` for cocktails fans.`RESTful API` is an architectural style for this application.
The interface of this application allows user `GET, PUT, POST, and DELETE ` data when the user interacts with APP.

This is cocktails library website. The main idea is to provide a communication platform for the cocktail lovers community, 
sort of a social network where the main discussion object is a cocktail. Users can share their favorite cocktails, left comments, and put likes.

`cocktailsTrain` website has three webpages:
- main (home) page;
- all cocktails page;
- my cocktails page;
- add new cocktail;
- edit existed cocktail;
- delete existed cocktail;
- reviews page.

All pages contain the website header (aka navigation block) with the links to other pages, login and logout buttons. 

1) _The main page_ is the landing page, where you can see a list of all cocktials that consist of all user's personal cocktails. 
Each cocktail has a personal block with a cocktail image (currently this feature under construction and you can see the same placeholder far all cocktails). 
User can click on the cocktail name and get access to the particular cocktail page. All users can see and interact with this page whether registered or not.

2) _The my cocktails page_ is a page that user use so as to hold his favorite cocktails or cocktails that the user wants to share with other users, 
also if the user clicks on each cocktail name on his page, he will be redirected to the specific cocktail page.


---





























### Tech descripton and specification

This website includes three web pages. All pages are responsive, work with a broad variety of screens in range from mobile devices (screen width 320px) to desktops (screen width 1200px and higher). This cross-devices website affords users to feel comfortable interacting with content whether the size of the screen their device has.

This project is build with the following technologies:
```
- HTML;
- CSS;
- JavaScript;
- SASS;
- weather API (fetch data from weather API);
```
Semantic HTML is used for all webpages markup with the elements of block - element - modifier system in class naming. All elements are styled with CSS using the inheritance and cascading rules, and selectors specificity. CSS rules are contained in a separate .scss files for easier maitenance and then compiled with the Sass preprocessor into a CSS style master file to reduce the number of interactions with a server. Responsiveness is provided by the usage of media queries and sass variables.
All algorithms  were implemented with JavaScript. This includes DOM manipulation (DOM elements creation and modification) and API fetching.

---
### Descriptions of JavaScript features 
1) _Weather API_ implemented on vanilla JavaScript. Weather API architecture includes following functions: 
Function `displayWeather()` creates DOM elements that contains weather data. Function `getWeather()` fetches weather API from outer resource. Functions `celsiusToFahrenheit()` and `fahrenheitToCelsius()` calculate and transition data to the measurement sistem convenient for user.
2) _Modal hotel booking form_. Implemented algorithm allows to show and hide modal booking form. Algorithm includes follow steps: find modal element inside HTML markup, listen for the event `a user click on the button`, show the modal booking form, get user's data, hide modal form when user click on a particular button. 
3) _Likes toggle_ with the toggle algorithm.


