import { Injectable } from '@angular/core';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import { ICompleteWeatherData, IWeatherData } from '../interfaces/weather-interface';

const API_KEY = 'b5c1a0947bcf414faaf134323221111';
const BASE_URL = 'https://api.weatherapi.com/v1';
const WEATHER_FORECAST = '/forecast.json';
const CITY_SEARCH = '/search.json';

@Injectable({
  providedIn: 'root'
})
export class WeatherDataService {
  constructor() {
  }


  getWeatherForCityWithForecast(city): Promise<ICompleteWeatherData> {
    return new Promise(async (resolve, reject) => {
      const options = {
        url: BASE_URL + WEATHER_FORECAST,
        params: { key: API_KEY, q: city, days: '5' },
      };

      const response: HttpResponse = await CapacitorHttp.post(options);
      if (response.status === 200) {
        console.log(response.data);
        resolve(response.data);
      } else {
        reject(response);
      }
    });
  }

  citySearch(city): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const options = {
        url: BASE_URL + CITY_SEARCH,
        params: { key: API_KEY, q: city},
      };

      const response: HttpResponse = await CapacitorHttp.post(options);
      if (response.status === 200) {
        console.log(response);
        resolve(response.data);
      } else {
        reject(response);
      }
    });
  }
}
