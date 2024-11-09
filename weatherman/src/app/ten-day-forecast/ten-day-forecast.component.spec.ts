import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenDayForecastComponent } from './ten-day-forecast.component';

describe('TenDayForecastComponent', () => {
  let component: TenDayForecastComponent;
  let fixture: ComponentFixture<TenDayForecastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TenDayForecastComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TenDayForecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
