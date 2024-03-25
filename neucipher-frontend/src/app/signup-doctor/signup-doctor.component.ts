import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup-doctor',
  templateUrl: './signup-doctor.component.html',
  styleUrls: ['./signup-doctor.component.scss']
})
export class SignupDoctorComponent {
  userData = {
    name: '',
    email: '',
    gender: '',
    Specialty: '',
    ml: '',
    contactNumber: '',
    password: ''
    
  };
  confirmPassword: string = '';

constructor(private authService: AuthService) { }

onSignup() {
  /*My code*/ console.log('SignupComponent: onSignup method called'); // Log signup form submission
  this.authService.signup(this.userData); //facing issue in API call
}
}
