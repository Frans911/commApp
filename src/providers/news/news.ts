import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the NewsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NewsProvider {

  constructor(public http: HttpClient) {
    console.log('NewsProvider has loaded..');
  }

  getApiData(){
    return this.http.get('https://newsapi.org/v2/top-headlines?sources=news24&apiKey=db27d30551424682927f1ed499a3b706');
  }
  
  getW(){
    return this.http.get('http://api.openweathermap.org/data/2.5/weather?q=pretoria&APPID=610cd2b778f68e90a3ff4147f5de85cc');
  }
}
