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

    onSignup() {
      this.authService.signup(this.userData); //facing issue in API call
      alert('Signup successful!');
      this.router.navigate(['/login']);
    }
}
