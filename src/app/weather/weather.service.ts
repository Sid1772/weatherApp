import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { appConfig } from '../app.config';
import { catchError, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  API_KEY = appConfig.API_KEY;
  constructor(private http: HttpClient) {}
  getCitiesJSONData() {
    return this.http.get('../assets/cities-fr.json').pipe(
      catchError(this.handleError("Unable to get Cities Data"))
    )
  }
  getCurrentWeatherData(lat: any, long: any) {
    return this.http.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&APPID=${this.API_KEY}&units=metric`
    ).pipe(
      catchError(this.handleError("Unable to get Current Weather Data"))
    )
  }
  getWeatherForecast(lat: any, long: any) {
    return this.http.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${this.API_KEY}&units=metric`
    ).pipe(
      catchError(this.handleError("Unable to get Forecast Data"))
    )
  }
  handleError<T>(err:any){
    return (error: HttpErrorResponse): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      const message = `Internal Server Error ${err}"`;
      alert(message)
      // TODO: better job of transforming error for user consumption
      throw new Error(`${err} failed: ${error.error}`);
    };
  }
}
