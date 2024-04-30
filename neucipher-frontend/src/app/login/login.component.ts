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
      };
  
      // Call the login method and await the result
      const loginInfo = await this.authService.login(userData).toPromise();
  
      // Store the token in local storage upon successful login
      localStorage.setItem('token', loginInfo.token);
      localStorage.setItem('email', this.email);
      console.log('Login successful');
      alert('Login successful!');
      this.router.navigate(['/patientdashboard']);
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please check your email and password.');
    }
  }
}
