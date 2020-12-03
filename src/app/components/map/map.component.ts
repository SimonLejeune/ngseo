import { Component, OnInit } from '@angular/core';
import  * as L from 'leaflet';
import { WeatherService } from '../../weather.service';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  public map;
  public weather;
  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    if (L) {
      this.setupMap();
    }
  }

  private setupMap() {
    if (!this.map) {
      this.map = L.map('map').setView([51.505, 2.09], 5);
      L.tileLayer(
        'https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png',
        {
          attribution:
            'copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>,' +
            'creativeNerd Maps',
        }
      ).addTo(this.map);
    }
  }

  setMarker() {

  }

  getPosition(): Promise<any>
  {
    return new Promise((resolve, reject) => {

      navigator.geolocation.getCurrentPosition(
        resp => {
          resolve({lng: resp.coords.longitude, lat: resp.coords.latitude});
          console.log(resp);
          L.marker([resp.coords.latitude, resp.coords.longitude]).addTo(this.map);

          this.weatherService.getWeather(resp.coords.latitude, resp.coords.longitude).subscribe( res => {
            this.weather = res;
          });
        },
        err => {
          reject(err);
        });
    });

  }

}
