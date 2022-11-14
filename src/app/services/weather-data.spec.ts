import { TestBed, inject } from '@angular/core/testing';
import { WeatherDataService } from './weather-data';


describe('WeatherDataService', () => {
  let weatherDataServiceSpy;

  beforeEach(() => {
    weatherDataServiceSpy = jasmine.createSpyObj('WeatherDataService', {
      getWeatherForCityWithForecast: 0,
      citySearch: 0
    });
    TestBed.configureTestingModule({
      providers: [{ provide: WeatherDataService, useValue: weatherDataServiceSpy }],
    });
  });

  it('does some test where it is injected', inject([WeatherDataService], (service: WeatherDataService) => {
    expect(service).toBeTruthy();
  }));

  it('does some test where it is manually built', () => {
    const service = new WeatherDataService();
    expect(service).toBeTruthy();
  });
});
