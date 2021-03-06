import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class RequestBase {
  headers = new HttpHeaders();
  noPreFlightHeaders = new HttpHeaders();
  options = {
    headers: this.headers,
    withCredentials: true
  };
  optionsNoPre = {
    headers: this.noPreFlightHeaders,
    withCredentials: true
  };

  constructor(public http: HttpClient) {
    this.headers.append('Content-Type', 'application/json');
    this.noPreFlightHeaders.append('Content-Type', 'text/plain');
  }
}
