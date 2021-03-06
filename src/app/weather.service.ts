import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiUrl } from './constants/constants';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(public http: HttpClient) { }
  
  getWeatherByCoordinates(lat, lon) {
    return this.http.get(ApiUrl.weather + "?lat=" + lat + "&lon=" + lon);
  }

  getWeatherByCity(city) {
    return this.http.get(ApiUrl.weather + "?q=" + city);
  }
}
