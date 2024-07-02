import { Component,ViewChild } from '@angular/core';
import { AuthService } from '../../service/authService/auth.service';
import { FormsModule, NgForm } from '@angular/forms'; // Import FormsModule
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  @ViewChild('registerForm', { static: true }) registerForm!: NgForm; // Declare registerForm


  signupData = {
    email: '', 
    password: '',
    name: '',
    status :'true',
    role: 'user',
    contactNumber: ''

  };
  constructor(private authService: AuthService, private router: Router) { }
  

  signup() {
    if (this.registerForm.valid) { // Check if form is valid before submitting
      this.authService.signup(this.signupData).subscribe(
        response => {
          console.log('Signup successful', response);
          this.router.navigate(['/login']);
        },
        error => {
          console.error('Signup failed', error);
        }
      );
    }
  }
}
