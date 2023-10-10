import { Component, OnInit } from '@angular/core';
import { Cities } from '../cities';
import { WeatherService } from './weather.service';
import {take} from 'rxjs/operators'

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css','./weathericons.css']
})
export class WeatherComponent implements OnInit {
selectedCity:string=""
currentWeather:any={}
fetchingData=true;
forecastWeather:Array<{icon:string,id:string,temp:string,max:string,min:string,date:Date}>=[]
citiesData:Array<Cities>=[]
  constructor(private service:WeatherService) { }

  ngOnInit(): void {
    this.getCitiesData() 
  }
  getCitiesData(){
    this.service.getCitiesData().subscribe(
      (city:any)=>{
        this.citiesData=city
        this.getWeatherData(this.citiesData[0])
      }
    )
  }
  getWeatherData(city:Cities){
    this.fetchingData=true
    this.selectedCity=city.nm
    this.getCurrentWeather(city);
    this.getForecast(city)
   
    
  }
  getCurrentWeather({lat,lon}:{lat:number,lon:number}){
    this.service.getCurrentWeather(lat,lon).subscribe((cw:any)=>{
      console.log(cw)
      this.currentWeather={icon:cw.weather[0].icon,id:`wi-icon-`+cw.weather[0].id,temp:cw.main.temp}
    })
  }
  getForecast({lat,lon}:{lat:number,lon:number}){
    this.service.getWeatherForecast(lat,lon).subscribe((fw:any)=>{
      console.log(fw)
      this.setForecastWeather(fw.list)
      this.fetchingData=false
    })
  }
  setForecastWeather(list:Array<any>){
    let dateTimeData:any={}
    list.forEach((data:any)=>{
      let date=data.dt_txt.split(" ")[0]
      let dataTobePushed={date:data.dt,min:data.main.temp_min,max:data.main.temp_max,icon:data.weather[0].icon,id:`wi-icon-`+data.weather[0].id}
      dateTimeData[date]?dateTimeData[date].push(dataTobePushed):dateTimeData[date]=[dataTobePushed]
    })
    console.log(dateTimeData)
    let maxDataTimeData:any=[]
    for(let date of Object.keys(dateTimeData)){
      let max=this.getMax(dateTimeData[date], 'max');
      let min= this.getMin(dateTimeData[date], 'min');
      maxDataTimeData.push({max,min,date,icon:dateTimeData[date][0].icon,id:dateTimeData[date][0].id})
    }
    console.log(maxDataTimeData)
   this.forecastWeather=maxDataTimeData.slice(1,4)
  }
   getMax(arr:any, attr:any){
    return Math.max(...arr.map((item:any) => item[attr]));
  }
  
   getMin(arr:any, attr:any){
    return Math.min(...arr.map((item:any) => item[attr]));
  }
  changeCity(cityId:number){
    let city=this.citiesData.filter(c=>c.id==cityId)[0]
    this.getWeatherData(city)
  }

}
