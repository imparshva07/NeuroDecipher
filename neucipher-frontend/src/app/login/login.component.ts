import { Component } from '@angular/core';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  emailId: string = '';
  password: string = '';

  constructor(private authService: AuthService) { }

  onLogin() {

    let userData = {
      email : this.emailId,
      password : this.password
    }
    this.authService.login(userData);
  }
}
