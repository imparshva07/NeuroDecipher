import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
    userData = {
      name: '',
      email: '',
      username: '',
      gender: '',
      contactNumber: '',
      password: '',
      dob: ''
    };
    confirmPassword: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  validateContactNumber(): boolean {
    const contactNumberRegex = /^\d{10}$/; // Regular expression to match exactly 10 digits
    return contactNumberRegex.test(this.userData.contactNumber);
  }

    onSignup() {
      if (!this.validateContactNumber()) {
        // Handle invalid contact number
        console.log("Invalid contact number. Please enter exactly 10 digits.");
        return;
      }
      this.authService.signup(this.userData); //facing issue in API call
      alert('Signup successful!');
      this.router.navigate(['/login']);
    }
}
