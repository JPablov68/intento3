import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExchangeRateService {
  private apiKey = '3cb129091284f8e75cd2359b';
  private baseUrl = `https://v6.exchangerate-api.com/v6/${this.apiKey}/latest/MXN`;

  constructor(private http: HttpClient) {}

  getExchangeRates(): Observable<any> {
    return this.http.get(this.baseUrl);
  }
}
