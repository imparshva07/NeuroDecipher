import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

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

constructor(private authService: AuthService,private router: Router) { }
  
onSignupDoctor() {
  this.authService.signupDoctor(this.userData); 
  alert('Signup successful!');
  this.router.navigate(['/logindoctor']);
}
}
