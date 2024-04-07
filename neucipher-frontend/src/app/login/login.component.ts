import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService,private router: Router) { }

  async onLogin() {
    try {
      let userData = {
        email: this.email,
        password: this.password
      }
      await this.authService.login(userData);
      
      // Store email and token in localStorage upon successful login
      localStorage.setItem('email', this.email);
      alert('Login successful!');
      this.router.navigate(['/patientdashboard']);
    } catch (error) {
      alert('Login failed. Please check your email and password.');
    }
  } 
}
