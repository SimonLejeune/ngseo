import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class NewsletterService {

  constructor(public _http: HttpClient) { }
  addPushSubscriber(sub: any) {
    return this._http.post('https://serverpwa.herokuapp.com/subscribe', sub);
  }
}
