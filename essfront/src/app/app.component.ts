import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { AnouncementComponent } from './pages/anouncement/anouncement.component';
import { PostComponent } from './pages/post/post.component';
import { FooterComponent } from './pages/footer/footer.component';


@Component({
  selector: 'app-root',
  standalone: true, 
  imports: [CommonModule,RouterOutlet,NavbarComponent,AnouncementComponent,PostComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'front';
}
