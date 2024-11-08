import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HourlyforecastComponent } from './hourlyforecast.component';

describe('HourlyforecastComponent', () => {
  let component: HourlyforecastComponent;
  let fixture: ComponentFixture<HourlyforecastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HourlyforecastComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HourlyforecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
