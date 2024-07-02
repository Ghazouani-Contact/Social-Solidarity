import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/authService/auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginData = {
    email: '',
    password: ''
  };
  isLoggedIn = false;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    // Check if the user is already logged in when the component initializes
    this.isLoggedIn = this.authService.isLoggedIn();
    if (this.isLoggedIn) {
      console.log('User is already logged in');
      this.router.navigate(['/']);
    }
  }
    login() {
      this.authService.login(this.loginData).subscribe(
        response => {
          console.log('Login successful', response); 
          this.authService.storeUserData(response.token, response.user);
          this.router.navigate(['/']);
        

          console.log(response.user)
        },
        error => {
          console.error('Login failed', error);
        }
      );
    }
     
}
