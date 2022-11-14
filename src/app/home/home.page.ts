import { Component } from '@angular/core';
import { WeatherDataService } from '../services/weather-data';
import { IWeatherCondition, IWeatherData, IWeatherForecast } from '../interfaces/weather-interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  currentWeather: IWeatherCondition;
  weatherForecastToSort: Array<IWeatherForecast>;
  weatherForecastToDisplay: Array<IWeatherForecast>;
  sortOrder = 'ASC';
  weatherForm: FormGroup;
  isSubmitted = false;
  selectedCity: string;

  constructor(private wd: WeatherDataService, public formBuilder: FormBuilder) {
    //this.getData();
    this.weatherForm = this.formBuilder.group({
      city: ['', [Validators.required, Validators.minLength(2)]],
      country: ['', [Validators.minLength(2)]]
    });
  }


  // Form submit and city search functions


  submitForm() {
    this.isSubmitted = true;
    if (!this.weatherForm.valid) {
      console.log('City field is required');
      return false;
    } else {
      this.triggerCitySearch(this.weatherForm.value.city, this.weatherForm.value.country);
      console.log(this.weatherForm.value);
    }
  }

  fieldReset() {
    this.weatherForm.setValue({ city: '', country: '' });
  }

  triggerCitySearch(city, country) {
    this.wd.citySearch(city).then(result => {
      if (result.length) {
        this.getWeatherData(this.validateCityWithCountry(result, country));
      } else {
        alert('No city with the given name!');
      }

    }).catch(error => {
      console.log('City search error ', error);
    });
  }

  validateCityWithCountry(cities, country) {
    let validCity = '';
    for (const city of cities) {
      if (city.country === country) {
        validCity = city.name;
      }
    }
    if (validCity) {
      return validCity;
    } else {
      return cities[0].name;
    }

  }


  // Functions after we got data based on given city

  getWeatherData(city) {
    this.selectedCity = city;
    this.wd.getWeatherForCityWithForecast(city).then(result => {
      this.currentWeather = result.current.condition;
      this.weatherForecastToSort = result.forecast.forecastday;
      this.weatherForecastToDisplay = result.forecast.forecastday;
    });
  }

  toggleSort() {
    if (this.sortOrder === 'ASC') {
      this.weatherForecastToDisplay = this.weatherForecastToSort.sort((a, b) => a.date > b.date ? -1 : 1);
      this.sortOrder = 'DESC';
    } else {
      this.weatherForecastToDisplay = this.weatherForecastToSort.sort((a, b) => a.date < b.date ? -1 : 1);
      this.sortOrder = 'ASC';
    }
  }

  // Restart flow

  restartFlow() {
    this.selectedCity = '';
    this.fieldReset();
    this.isSubmitted = false;
    this.currentWeather = null;
    this.weatherForecastToDisplay = null;
    this.weatherForecastToSort = null;
    this.sortOrder = 'ASC';
  }
}
