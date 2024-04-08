import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-doctor',
  templateUrl: './login-doctor.component.html',
  styleUrls: ['./login-doctor.component.scss']
})
export class LoginDoctorComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService,private router: Router) { }

  async onLoginDoctor() {
    try {
      let userData = {
        email: this.email,
        password: this.password
      }
      await this.authService.logindoctor(userData);
      localStorage.setItem('email', this.email);
      alert('Login successful!');
      this.router.navigate(['/doctordashboard']);
    } catch (error) {
      alert('Login failed. Please check your email and password.');
    }
  } 
}
