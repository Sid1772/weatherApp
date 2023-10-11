import { HttpClient } from "@angular/common/http";
import { WeatherComponent } from "./weather.component"
import { WeatherService } from "./weather.service";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientModule } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { of } from "rxjs";


describe("WeatherComponent",()=>{
  let testArr=[
    {
      "max": 23.37,
      "min": 18.44,
      "date": "2023-10-11",
      "icon": "04d",
      "id": "wi-icon-804"
    },
    {
      "max": 20.71,
      "min": 17.06,
      "date": "2023-10-12",
      "icon": "04n",
      "id": "wi-icon-804"
    },
    {
      "max": 23.55,
      "min": 17.6,
      "date": "2023-10-13",
      "icon": "04n",
      "id": "wi-icon-804"
    },
    {
      "max": 18.17,
      "min": 10.11,
      "date": "2023-10-14",
      "icon": "04n",
      "id": "wi-icon-803"
    },
    {
      "max": 10.93,
      "min": 5.31,
      "date": "2023-10-15",
      "icon": "04n",
      "id": "wi-icon-804"
    },
    {
      "max": 11.56,
      "min": 4.09,
      "date": "2023-10-16",
      "icon": "04n",
      "id": "wi-icon-804"
    }
  ]
  let weatherTestArr=[
    {
      "dt": 1697058000,
      "main": {
        "temp": 20.13,
        "feels_like": 19.69,
        "temp_min": 18.44,
        "temp_max": 20.13,
        "pressure": 1014,
        "sea_level": 1014,
        "grnd_level": 1014,
        "humidity": 57,
        "temp_kf": 1.69
      },
      "weather": [
        {
          "id": 804,
          "main": "Clouds",
          "description": "overcast clouds",
          "icon": "04n"
        }
      ],
      "clouds": {
        "all": 100
      },
      "wind": {
        "speed": 4.17,
        "deg": 236,
        "gust": 10.63
      },
      "visibility": 10000,
      "pop": 0,
      "sys": {
        "pod": "n"
      },
      "dt_txt": "2023-10-11 21:00:00"
    }
    ,
    {
      "dt": 1697090400,
      "main": {
        "temp": 17.06,
        "feels_like": 16.73,
        "temp_min": 17.06,
        "temp_max": 17.06,
        "pressure": 1014,
        "sea_level": 1014,
        "grnd_level": 1014,
        "humidity": 73,
        "temp_kf": 0
      },
      "weather": [
        {
          "id": 804,
          "main": "Clouds",
          "description": "overcast clouds",
          "icon": "04n"
        }
      ],
      "clouds": {
        "all": 100
      },
      "wind": {
        "speed": 3.21,
        "deg": 212,
        "gust": 7.45
      },
      "visibility": 10000,
      "pop": 0.27,
      "sys": {
        "pod": "n"
      },
      "dt_txt": "2023-10-12 06:00:00"
    },
    {
      "dt": 1697166000,
      "main": {
        "temp": 17.76,
        "feels_like": 17.89,
        "temp_min": 17.76,
        "temp_max": 17.76,
        "pressure": 1011,
        "sea_level": 1011,
        "grnd_level": 1010,
        "humidity": 88,
        "temp_kf": 0
      },
      "weather": [
        {
          "id": 804,
          "main": "Clouds",
          "description": "overcast clouds",
          "icon": "04n"
        }
      ],
      "clouds": {
        "all": 100
      },
      "wind": {
        "speed": 5.81,
        "deg": 216,
        "gust": 14.67
      },
      "visibility": 10000,
      "pop": 0,
      "sys": {
        "pod": "n"
      },
      "dt_txt": "2023-10-13 03:00:00"
    },
    {
      "dt": 1697263200,
      "main": {
        "temp": 16.92,
        "feels_like": 16.47,
        "temp_min": 16.92,
        "temp_max": 16.92,
        "pressure": 1016,
        "sea_level": 1016,
        "grnd_level": 979,
        "humidity": 69,
        "temp_kf": 0
      },
      "weather": [
        {
          "id": 804,
          "main": "Clouds",
          "description": "overcast clouds",
          "icon": "04n"
        }
      ],
      "clouds": {
        "all": 100
      },
      "wind": {
        "speed": 5.06,
        "deg": 247,
        "gust": 10.91
      },
      "visibility": 10000,
      "pop": 0.01,
      "sys": {
        "pod": "n"
      },
      "dt_txt": "2023-10-14 06:00:00"
    },
  ]
  let weatherCheckArr=[// [object Object] 
  {
    "max": 17.06,
    "min": 17.06,
    "date": "2023-10-12",
    "icon": "04n",
    "id": "wi-icon-804"
  },// [object Object] 
  {
    "max": 17.76,
    "min": 17.76,
    "date": "2023-10-13",
    "icon": "04n",
    "id": "wi-icon-804"
  },// [object Object] 
  {
    "max": 16.92,
    "min": 16.92,
    "date": "2023-10-14",
    "icon": "04n",
    "id": "wi-icon-804"
  }]
  let component: WeatherComponent;
  let fixture: ComponentFixture<WeatherComponent>;
  let fakeServiceMock:any
  beforeEach(async () => {
    fakeServiceMock = {
      getCurrentWeatherData: jest.fn()
    }
    await TestBed.configureTestingModule({
      declarations: [WeatherComponent],
      imports: [
        HttpClientModule,
        NgSelectModule,
        FormsModule
      ],
    }).compileComponents();
  });
  it('should create the app', () => {
    const fixture = TestBed.createComponent(WeatherComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it("should have title",()=>{
    expect(component.title).toEqual("Sélectionner votre ville")
  })
  it("should have dropdown property",()=>{
    expect(component.dropdownProperties).toEqual({
      virtualScroll: true,
      typeahead: true,
      searchable: true,
      clearable: false,
    })
  })
  it("should return max value",()=>{
    expect(component.getMax(testArr,"max")).toEqual(23.55)
  })
  it("should return min value",()=>{
    expect(component.getMin(testArr,"min")).toEqual(4.09)
  })
  it("should change weather Value",()=>{
    component.setForecastWeather(weatherTestArr)
    expect(component.forecastWeather).toEqual(weatherCheckArr)
  })
  it("should call change city",()=>{
    component.selectedCityId=3038789
    let myFunc=jest.spyOn(component,"changeCity")
    let select=document.querySelector("#cityDropdown") as HTMLInputElement
    select.value="3038789"
    select.dispatchEvent(new Event('change'));
    expect(myFunc).toBeCalledTimes(1)
  })
  it("should call change city from init",()=>{
    let myFunc=jest.spyOn(component,"getCitiesData")
    component.ngOnInit()
    expect(myFunc).toBeCalledTimes(1)
  })
  it("get weather should call current weather",()=>{
    let myFunc=jest.spyOn(component,"getCurrentWeather")
    let city={
      "id":3038789,
      "nm":"Abbeville",
      "lat":50.099998,
      "lon":1.83333
    }
    component.getWeatherData(city)
    expect(myFunc).toBeCalledTimes(1)
    expect(myFunc).toBeCalledWith(city)
  })
  it("get weather should call forecast weather",()=>{
    let myFunc1=jest.spyOn(component,"getForecast")
    let city={
      "id":3038789,
      "nm":"Abbeville",
      "lat":50.099998,
      "lon":1.83333
    }
    component.getWeatherData(city)
    expect(myFunc1).toBeCalledTimes(1)
    expect(myFunc1).toBeCalledWith(city)
  })
  it("get weather should work",()=>{
    let city={
      "id":3038789,
      "nm":"Abbeville",
      "lat":50.099998,
      "lon":1.83333
    }
    component.getWeatherData(city)
    expect(component.selectedCity).toEqual(city.nm)
    expect(component.selectedCityId).toEqual(city.id)
  })
  
  })
