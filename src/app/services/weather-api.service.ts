import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { WeatherInterface } from '../models/weatherAPI.models';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class WeatherApiService {
  constructor(private http: HttpClient) {}

  fetchWeatherData(placeName: string): Observable<WeatherInterface> {
    return this.http.get<WeatherInterface>(environment.baseURL, {
      headers: new HttpHeaders()
        .set(environment.XRapidAPIHostName, environment.XRapidAPIHostValue)
        .set(environment.XRapidAPIKeyName, environment.XRapidAPIKeyValue),
      params: new HttpParams()
        .set('q', placeName)
        .set('units', 'imperial')
        .set('mode', 'json'),
    });
  }

  getlocation(lat: any, long: any) {
    var geoAPI = `${environment.reverseGeoCodeURL}latitude=${lat}&longitude=${long}&localityLanguage=en`;

    return this.http.get<any>(geoAPI);
  }

  setHeader(): HttpHeaders {
    new HttpHeaders().set('X-RapidAPI-Key', `${environment.XRapidAPIKeyValue}`);
    return new HttpHeaders().set('X-RapidAPI-Host', `${environment.XRapidAPIHostValue}`);
  }
}
