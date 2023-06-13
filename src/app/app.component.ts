import { Component, OnInit } from '@angular/core';
import {Root} from './models/weatherAPI.models';
import { WeatherApiService } from './services/weather-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})

export class AppComponent implements OnInit {
  weatherData?: Root;
  cityName: string = '';

  constructor(private weatherService: WeatherApiService) {}

  ngOnInit(): void {
    this.getWeatherByGeoLocation();
  }

  fetchData() {
    this.getWeather(this.cityName);
    this.cityName = '';
  }

  private getWeather(cityName: string) {
    this.weatherService.fetchWeatherData(cityName).subscribe((res) => {
      this.weatherData = JSON.parse(JSON.stringify(res));
    });
  }

  private getWeatherByGeoLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let long = position.coords.longitude;
        let lat = position.coords.latitude;
        this.weatherService.getlocation(lat, long).subscribe({
          next: (res) => {
            this.getWeather(res.city);
            this.cityName = '';
          },
        });
      });
    }
  }
}
