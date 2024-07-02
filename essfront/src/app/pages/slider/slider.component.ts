import { Component ,OnInit} from '@angular/core';
import { initTWE, Carousel } from 'tw-elements';
import { RoundedComponent } from '../rounded/rounded.component';
@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [RoundedComponent],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss'
})
export class SliderComponent {
  constructor() { }

  ngOnInit(): void {
    // Initialize the carousel
    initTWE({ Carousel });
  }
}
