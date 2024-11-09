import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodaysdetailsComponent } from './todaysdetails.component';

describe('TodaysdetailsComponent', () => {
  let component: TodaysdetailsComponent;
  let fixture: ComponentFixture<TodaysdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodaysdetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodaysdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
