Weather App

This is a simple weather app getting data from open source api `http://openweathermap.org/api`

It has a json of cities stored inside assets folder which we use to populate our dropdown.
We are using `HttpClientModule` for getting data in services.

The main component is WeatherComponent in which we have our entire code.
WeatherComponent is referenced inside AppComponent using selector <app-weather></app-weather>


## Approach :
 To Approach this problem i used a custom dropdown defined in dropown Component.
 I use @Input approach to transfer cities data to the dropdown where i map it into useful data and display it in the dropdown.
 ## Dropdown Approach
 As the number of records is large.I am only rendering a part of response ie 20 at first go.
 I am using a `IntersectionObserver` toc heck when we have reached the end of the list and then i call a method `getMoreData` to append 10 more results to the list and so on.This Reduces the time to render and only shows a few of the records.
 On change of selction in dropdown i call a method which changes the text in the Selector Element and call a EventEmitter to transfer data to Weather Componet which gets the latest data of that city.
 For closing the dropdown when clicked outside i have used a little JS code which looks for click in the DOM and if it isnt from the dropdown element or and of its children it closes the dropdown. I have use JS here because even though angular offers such a feature `@HostListener` to look for events this JS code wasnt posing any security risk or disturbing any elements in Angular
   ## Why Use IntersectionObserver
    I used IntersectionObserver as it provides the best way to scroll through large data without affecting DOM load time ,It has a callback function which helps to provide more data to the list once a certain part intersects with the screen for me that is the end of the list.
   ## Search Approach
    I have created a search box inside the dropdown to search for values and show them . I am using `.include()` string operator to check for the keyword searched so even if you enter a string from between it will be filtered. PS: Search is not case senstive.
    Using `filter()` method to filter the records on basis of keywors searched.
    On Serching the list will be scrolled to top and reset to original 20 records to optimize performance
When we  get data from Weather Component for Cities ,I wait for them in the `ngOnChanges` lifecycle hook  ,I select the first city and get its data and set it in Selector of dropdown.
## Weather Component

It has 5 files
1.- .ts File where our typescript code is written
=> We are getting data from cities json and using \*ngFor for showing the datainside the dropdown
=> For Dropdown we are using ng-select a3rd party library to make various functions of dropdown
=> On ngOninIt we are getting the method for getting the cities and once we get the data we get current weather and forecast weather for the first item in the list
=> We get current weather using open Weather Api and assign it to our class variable currentWeather
=> For forecast weather we get various data with a 3 hour gap for 5 days , first we seperate the data into date specific key pair objects,then we use a min max function in our class to get the min max weather of that particular date and make a new json out of the various values which contain only the min max temp and icons for that day
=> We are using rxjs operators catchError to check for errors
=> We are using angular date pipes to show dates as shorthand days in html
2.- .css File to store all our designs
=> We are using flex box for design puropose
3.- .spec.ts file which containsour Test Cases
=>We are using jest for unit testing and not Karma or Jasmine
4.- .html File which contains our template code and design elements
=> We are using 2 way bindings and property bindings to display the values.
5.- .service.ts file which contains our service calls
=> We are using Http to send and recieve data
=> rxjs operators like tap ,pipe and catchError to verify data and catch Errors.

## Hosting And Git

The Application is hosted on Google's Firebase the url as follows:-
`https://weatherapp-31b62.web.app/`

The Project is maintained on GitHub
`https://github.com/Sid1772/weatherApp`

## How to Run this App

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `npm run test` to test the project using Jest
Run `npm run test:coverage` to test the project coverage
