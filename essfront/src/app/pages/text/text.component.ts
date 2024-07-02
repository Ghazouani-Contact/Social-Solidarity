import { Component } from '@angular/core';
import { RoundedComponent } from '../rounded/rounded.component';

@Component({
  selector: 'app-text',
  standalone: true,
  imports: [RoundedComponent],
  templateUrl: './text.component.html',
  styleUrl: './text.component.scss'
})
export class TextComponent {

}
