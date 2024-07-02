import { Component ,HostListener } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../service/authService/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,RouterLinkActive,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  constructor(private authService: AuthService, private router: Router) {}

  isFixed: boolean = false;

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: any) {
    const navbar = document.getElementById('navbar');
    if (navbar) {
      const distanceFromTop = navbar.getBoundingClientRect().top;
      if (distanceFromTop <= 0) {
        this.isFixed = true;
      } else {
        this.isFixed = false;
      }
    }
  }

   isAuthenticated(): boolean {
        // Implement authentication logic here
        // For demonstration purposes, return false
        return false;
    }

        logout() {
          this.authService.logout().subscribe(
            response => {
              console.log('Logout successful:', response);
              // Clear client-side authentication data
              localStorage.removeItem('token');
              localStorage.removeItem('user');
              // Optionally navigate to another route after logout
              this.router.navigate(['/login']);
            },
            error => {
              console.error('Logout failed:', error);
            }
          );
        }
        
        isLoggedIn(): boolean {
          return this.authService.isLoggedIn();
        }
}
