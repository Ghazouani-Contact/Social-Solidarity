import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { PostComponent } from '../post/post.component';
import { SliderComponent } from '../slider/slider.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { AnouncementComponent } from '../anouncement/anouncement.component';
import { FooterComponent } from '../footer/footer.component';
import { RoundedComponent } from '../rounded/rounded.component';
import { TextComponent } from '../text/text.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ RouterLink,RouterLinkActive,PostComponent,SliderComponent,NavbarComponent , AnouncementComponent,FooterComponent , RoundedComponent,TextComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
