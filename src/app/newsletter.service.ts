import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class NewsletterService {

  constructor(public http: HttpClient) { }
  addPushSubscriber(sub: any) {
    return this.http.post('https://serverpwa.herokuapp.com/subscribe', sub);
  }
}
