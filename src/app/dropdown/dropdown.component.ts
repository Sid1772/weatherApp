import { Component, Input, OnChanges, OnInit, ViewChild,AfterViewInit,Output,EventEmitter } from '@angular/core';
import { Cities } from '../cities';


@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnInit, OnChanges,AfterViewInit {
isDropdownOpen=false;
value:string=""
@ViewChild("loadButton") button:any
@ViewChild("menu")menu:any
@Output() newCity=new EventEmitter<number>()
searchValue=""
citiesData:Array<Cities>=[]
displayCityData:Array<Cities>=[]
@Input('data') data:Array<Cities>=[]
observer!:IntersectionObserver
  constructor() {
    //A little jS code for some closing action
    document.querySelector("body")?.addEventListener("click",(e:any)=>{
      if(e.target?.closest(".dropdownContainer")){
        return
      } 
      else{
        this.isDropdownOpen=false;
        this.scrollToTop()
      }
    })
    this.observer=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting) this.getMoreData()
      })
    })
   }
  ngAfterViewInit(): void {
    this.observer.observe(this.button.nativeElement)
  }

  ngOnInit(): void {
    
  }

  getMoreData(){
    console.log(`getting more data ....${this.displayCityData.length} displayed ${this.citiesData.length-this.displayCityData.length} left` )
    this.displayCityData=[...this.citiesData].slice(0,this.displayCityData.length+10)
  }
 
  ngOnChanges(){
    if(this.data.length>0){
      this.value=this.data[0].nm
      this.citiesData=[...this.data]
      this.displayCityData=[...this.citiesData].slice(0,20)
    }
  }
  toggleDropdown(){
    this.isDropdownOpen=!this.isDropdownOpen
    this.scrollToTop()
    this.searchValue=""
    this.searchList("")
  }
  searchList(keyword:string){
    this.citiesData=this.data.filter(x=>x.nm.toLowerCase().includes(keyword.toLowerCase()))
    this.displayCityData=[...this.citiesData].slice(0,20)
    this.scrollToTop()
    
  }
  scrollToTop(){
    this.menu.nativeElement.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
  }
  select(item:Cities){
    this.isDropdownOpen=false;
    this.value=item.nm
    this.newCity.emit(item.id)
  }
  

}
