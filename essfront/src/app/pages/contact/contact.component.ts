import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { ContactService } from '../../service/contactService/contact.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../service/authService/auth.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FooterComponent,FormsModule,CommonModule ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  email: string = '';
  message: string = '';
  successMessage: string = ''; // Add a property to hold success message
  errorMessage: string = '';
  constructor(private contactService: ContactService, private authService: AuthService) {}

  onSubmit() {

    if (!this.authService.isLoggedIn()) {
      this.errorMessage = 'You need to login first.';
      return;
    }
    
    if (!this.email || !this.message) {
      this.errorMessage = 'Email and Message are required.';
      return; // Exit early if fields are empty
    }

    const contactInfo = { email: this.email, message: this.message };
    this.contactService.sendContactRequest(contactInfo).subscribe(
      response => {
        if (response && response.message) {
          this.successMessage = response.message;
          this.errorMessage = '';
          this.email = '';
          this.message = '';
        } else {
          this.errorMessage = 'Unexpected response from server.';
          this.successMessage = '';
        }
      },
      error => {
        this.errorMessage = 'Error sending contact request: ' + error.message;
        this.successMessage = '';
      }
    );
  }
}
