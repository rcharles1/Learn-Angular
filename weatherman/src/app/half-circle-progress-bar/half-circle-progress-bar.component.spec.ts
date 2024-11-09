import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HalfCircleProgressBarComponent } from './half-circle-progress-bar.component';

describe('HalfCircleProgressBarComponent', () => {
  let component: HalfCircleProgressBarComponent;
  let fixture: ComponentFixture<HalfCircleProgressBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HalfCircleProgressBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HalfCircleProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
