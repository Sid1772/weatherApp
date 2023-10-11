import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { appConfig } from '../app.config';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  API_KEY = appConfig.API_KEY;
  constructor(private http: HttpClient) {}
  getCitiesData() {
    return this.http.get('../assets/cities-fr.json').pipe(
      tap(()=>{console.log("data Fetched")})
    );
  }
  getCurrentWeatherData(lat: any, long: any) {
    return this.http.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&APPID=${this.API_KEY}&units=metric`
    );
  }
  getWeatherForecast(lat: any, long: any) {
    return this.http.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${this.API_KEY}&units=metric`
    );
  }
}
