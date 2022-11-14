import { ComponentFixture, fakeAsync, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { HomePage } from './home.page';
import { FormBuilder } from '@angular/forms';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HomePage],
      imports: [IonicModule.forRoot()],
      providers: [FormBuilder]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize all class variables with good value', () => {
    expect(component.currentWeather).toBeTruthy();
    expect(component.weatherForecastToDisplay).toBeTruthy();
    expect(component.weatherForecastToSort).toBeTruthy();
  });

  it('should update and reset form values', fakeAsync(() => {
    const testInput = {
      city: 'Milan',
      country: 'France'
    };
    const emptyInput = {
      city: '',
      country: ''
    };
    component.weatherForm.controls['city'].setValue(testInput.city);
    component.weatherForm.controls['country'].setValue(testInput.country);
    expect(component.weatherForm.value).toEqual(testInput);
    component.fieldReset();
    expect(component.weatherForm.value).toEqual(emptyInput);
  }));


});
