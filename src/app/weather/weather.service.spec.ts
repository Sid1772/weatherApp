import { TestBed } from '@angular/core/testing';

import { WeatherService } from './weather.service';
import { of, throwError } from 'rxjs';
import { Cities } from '../cities';
import { HttpErrorResponse } from '@angular/common/http';

describe('WeatherService', () => {
  let service: WeatherService;
  let httpClientSpy:any

  beforeEach(() => {
    httpClientSpy ={
      get:jest.fn()
    }
    service=new WeatherService(httpClientSpy)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it("cities should be called",()=>{
    const response=""
    const url="../assets/cities-fr.json"
    jest.spyOn(httpClientSpy,"get").mockReturnValue(of(response))
    service.getCitiesJSONData()
    expect(httpClientSpy.get).toBeCalledTimes(1)
    expect(httpClientSpy.get).toBeCalledWith(url)
  })
  it("should return type of cities",(done)=>{
    const response=""
    let ins:Array<Cities>=[{
      "id":3038789,
      "nm":"Abbeville",
      "lat":50.099998,
      "lon":1.83333
    }]
    const url="../assets/cities-fr.json"
    jest.spyOn(httpClientSpy,"get").mockReturnValue(of(ins))
    service.getCitiesJSONData().subscribe(city=>{
      expect(typeof city).toEqual(typeof ins)
      done()
    })
  })
  it("should return current weather",(done)=>{
    const response=""
    let ins:Cities={
      "id":3038789,
      "nm":"Abbeville",
      "lat":50.099998,
      "lon":1.83333
    }
    const url="../assets/cities-fr.json"
    jest.spyOn(httpClientSpy,"get").mockReturnValue(of(ins))
    service.getCurrentWeatherData(ins.lat,ins.lon).subscribe(weather=>{
      expect(typeof weather).toEqual("object")
      done()
    })
    expect(httpClientSpy.get).toBeCalledTimes(1)
  })
  it("should return forecast weather",(done)=>{
    const response=""
    let ins:Cities={
      "id":3038789,
      "nm":"Abbeville",
      "lat":50.099998,
      "lon":1.83333
    }
    const url="../assets/cities-fr.json"
    jest.spyOn(httpClientSpy,"get").mockReturnValue(of(ins))
    service.getWeatherForecast(ins.lat,ins.lon).subscribe(weather=>{
      expect(typeof weather).toEqual("object")
      done()
    })
    expect(httpClientSpy.get).toBeCalledTimes(1)
  })
  it('should throw error', (done) => {
    const errorResponse = new HttpErrorResponse({
      error: '',
      status: 404, statusText: ''
    })
    jest.spyOn(httpClientSpy, 'get').mockReturnValue(throwError(() => errorResponse));
    service.getCurrentWeatherData(1,2).subscribe(
      {
        next: data => console.log(data),
        error: error => {
          expect(error.message).toContain('Unable to get Current Weather Data');
          done();
        }
      }
    );
    expect(httpClientSpy.get).toBeCalledTimes(1);
  });
});
