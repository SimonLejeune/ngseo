import { Component } from '@angular/core';
import {SwPush, SwUpdate} from '@angular/service-worker';
import { NewsletterService } from './newsletter.service';
import { MapService } from './map.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  readonly VAPID_PUBLIC_KEY = 'BCNVbiY2W4wbKEIEoA7ChkmtKWUB5M4NQ-dN4M1acfFJSPEB2gJpNYbb0AnXT2--pcrGDOOclKh3z6si76qfpto';
  title = 'ngseo';

  map;

  constructor(
    private swPush: SwPush, private ns: NewsletterService, private swUpdate: SwUpdate, private mapService: MapService) {
    this.swUpdate.available.subscribe(event => {
      alert('update available');
      document.location.reload();
    });
  }

  ngOnInit() {
    if (this.mapService.L) {
      this.setupMap();
    }
  }

  private setupMap() {
    if (!this.map) {
      this.map = this.mapService.L.map('map').setView([51.505, 2.09], 5);
      this.mapService.L.tileLayer(
        'https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png',
        {
          attribution:
            'copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>,' +
            'creativeNerd Maps',
        }
      ).addTo(this.map);
    }
  }

  subscribeToNotifications() {
    this.swPush.requestSubscription({
      serverPublicKey: this.VAPID_PUBLIC_KEY
    })
      .then(sub => this.ns.addPushSubscriber(sub).subscribe( res => {
        console.log(res);
      }))
      .catch(err => console.error('Could not subscribe to notifications', err));
  }

}
