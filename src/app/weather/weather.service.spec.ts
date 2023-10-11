import { TestBed } from '@angular/core/testing';

import { WeatherService } from './weather.service';
import { of } from 'rxjs';
import { Cities } from '../cities';

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
    service.getCitiesData()
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
    service.getCitiesData().subscribe(city=>{
      expect(typeof city).toEqual(typeof ins)
      done()
    })
  })
});
