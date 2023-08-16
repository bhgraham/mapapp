import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InfoService {
  private baseUrl = 'https://api.worldbank.org/v2/country';

  constructor(private http: HttpClient) {}

  getCountryInfo(countryCode: string): Observable<any> {
    const url = `${this.baseUrl}/${countryCode}?format=json`;
    return this.http.get(url);
  }
}
