import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiUrl } from './constants/constants';

@Injectable({
  providedIn: 'root'
})
export class NewsletterService {

  constructor(public http: HttpClient) { }
  addPushSubscriber(sub: any) {
    return this.http.post(ApiUrl.subscribe, sub);
  }
}
