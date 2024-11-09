import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-half-circle-progress-bar',
  standalone: true,
  templateUrl: './half-circle-progress-bar.component.html'
})
export class HalfCircleProgressBarComponent implements OnChanges {
  @Input() progressValue: number = 0;
  rotationDegree: number = 0;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['progressValue']) {
      this.updateProgress(changes['progressValue'].currentValue);
    }
  }

  updateProgress(value: number): void {
    this.rotationDegree = value / 100 * 180;
  }
}
