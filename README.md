Weather App

This is a simple weather app getting data from open source api `http://openweathermap.org/api`

It has a json of cities stored inside assets folder which we use to populate our dropdown.
We are using `HttpClientModule` for getting data in services.

The main component is WeatherComponent in which we have our entire code.
WeatherComponent is referenced inside AppComponent using selector <app-weather></app-weather>

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

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `npm run test` to test the project using Jest
Run `npm run test:coverage` to test the project coverage
