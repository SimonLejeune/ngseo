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
  private marker;
  public weather;
  public located = false;
  public geoErr;

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

  successGeoloc(lng, lat) {
    if (this.marker)
      this.map.removeLayer(this.marker);
    this.marker = L.marker([lat, lng]);
    this.marker.addTo(this.map);

    this.weatherService.getWeatherByCoordinates(lat, lng).subscribe( res => {
      this.weather = res;
    });

    this.located = true;
    this.geoErr = null;
  }

  errorGeoloc(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            return "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            return "Location information is unavailable."
            break;
        case error.TIMEOUT:
            return "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            return "An unknown error occurred."
            break;
    }
  }

  getPosition(): Promise<any>
  {
    return new Promise((resolve, reject) => {

      if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          resp => {
            resolve({lng: resp.coords.longitude, lat: resp.coords.latitude});
          },
          err => {
            reject(err);
          });       
      }
    });
  }

  setPosition() {
    this.getPosition()
      .then(loc => {
        this.successGeoloc(loc.lng, loc.lat);
      })
      .catch(err => {
        this.geoErr = this.errorGeoloc(err);
      })
  }

  setCity(event) {
    let loc = event.target.value;

    this.weatherService.getWeatherByCity(loc).subscribe(
      res => {
        this.weather = res;

        if (this.marker)
          this.map.removeLayer(this.marker);
        this.marker = L.marker([this.weather.coord.lat, this.weather.coord.lon]);
        this.marker.addTo(this.map);
        this.geoErr = null;
      },
      err => {
        this.geoErr = "City not found !";
      }
      );
  }
}
