import { Component, OnInit } from '@angular/core';
import {SwPush} from '@angular/service-worker';
import { NewsletterService } from '../../newsletter.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  readonly VAPID_PUBLIC_KEY = 'BCNVbiY2W4wbKEIEoA7ChkmtKWUB5M4NQ-dN4M1acfFJSPEB2gJpNYbb0AnXT2--pcrGDOOclKh3z6si76qfpto';

  constructor(private swPush: SwPush, private ns: NewsletterService) { }

  ngOnInit(): void {
    this.subscribeToNotifications();
  }

  subscribeToNotifications() {
    console.log('subsribe');
    this.swPush.requestSubscription({
      serverPublicKey: this.VAPID_PUBLIC_KEY
    })
      .then(sub => this.ns.addPushSubscriber(sub).subscribe( res => {
        console.log(res);
      }))
      .catch(err => console.error('Could not subscribe to notifications', err));
  }
}
