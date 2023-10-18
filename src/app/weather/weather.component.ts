import { Component, OnInit } from '@angular/core';
import { Cities } from '../cities';
import { WeatherService } from './weather.service';
import { catchError, take, tap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css', './weathericons.css'],
})
export class WeatherComponent implements OnInit {
  selectedCity: string = '';
  selectedCityId: number = 0;
  title="Sélectionner votre ville"
  currentWeather: any = {};
  fetchingData = true;
  dropdownProperties: any = {
    virtualScroll: true,
    typeahead: true,
    searchable: true,
    clearable: false,
  };
  forecastWeather: Array<{
    icon: string;
    id: string;
    temp: string;
    max: string;
    min: string;
    date: Date;
  }> = [];
  citiesData: Array<Cities> = [];
  constructor(private service: WeatherService) {}
  ngOnInit(): void {
    this.getCitiesData();
  }
  changeCity(id:any) {
    
    let city = this.citiesData.filter((c) => c.id == id)[0];
    this.getWeatherData(city);
  }
  getCitiesData() {
    this.service.getCitiesJSONData().pipe(tap((data)=>{
      
    }),
    catchError((error)=>{console.log(error);throw new Error()})
    ).subscribe((city: any) => {
      
      this.citiesData = city;
      this.getWeatherData(this.citiesData[0]);
    });
  }
  getWeatherData(city: Cities) {
    this.fetchingData = true;
    //Assigning City
    this.selectedCity = city.nm;
    this.selectedCityId = city.id;
    this.getCurrentWeather(city);
    this.getForecast(city);
  }
  handleError<T>(err:any){
    return (error: HttpErrorResponse): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      const message = `Internal Server Error ${err}"`;
      this.fetchingData=false
      // TODO: better job of transforming error for user consumption
      throw new Error(`${err} failed: ${message}`);
    };
  }
  getCurrentWeather({ lat, lon }: { lat: number; lon: number }) {
    
    this.service.getCurrentWeatherData(lat, lon).pipe(
      tap((data)=>{console.log("current weather data",data)}),
      catchError(this.handleError("Unable to get data"))
    ).subscribe((cw: any) => {
      
      this.currentWeather = {
        icon: cw.weather[0].icon,
        id: `wi-icon-` + cw.weather[0].id,
        temp: cw.main.temp,
      };
    });
  }
  getForecast({ lat, lon }: { lat: number; lon: number }) {
    this.service.getWeatherForecast(lat, lon)
    .pipe(
      catchError(this.handleError("Unable to get Data"))
    ).
    subscribe((fw: any) => {
      
      this.setForecastWeather(fw.list);
      this.fetchingData = false;
    });
  }
  setForecastWeather(list: Array<any>) {
    let dateTimeData: any = {};
    list.forEach((data: any) => {
      let date = data.dt_txt.split(' ')[0];
      let dataTobePushed = {
        date: data.dt,
        min: data.main.temp_min,
        max: data.main.temp_max,
        icon: data.weather[0].icon,
        id: `wi-icon-` + data.weather[0].id,
      };
      dateTimeData[date] = dateTimeData[date]
        ? [...dateTimeData[date], dataTobePushed]
        : [dataTobePushed];
    });
    
    let maxDataTimeData: any = [];
    for (let date of Object.keys(dateTimeData)) {
      let max = this.getMax(dateTimeData[date], 'max');
      let min = this.getMin(dateTimeData[date], 'min');
      maxDataTimeData.push({
        max,
        min,
        date,
        icon: dateTimeData[date][0].icon,
        id: dateTimeData[date][0].id,
      });
    }
    
    //For Getting next 3 days Data only
    this.forecastWeather = maxDataTimeData.slice(1, 4);
  }
  getMax(arr: any, attr: any) {
    return Math.max(...arr.map((item: any) => item[attr]));
  }
  getMin(arr: any, attr: any) {
    return Math.min(...arr.map((item: any) => item[attr]));
  }
}
