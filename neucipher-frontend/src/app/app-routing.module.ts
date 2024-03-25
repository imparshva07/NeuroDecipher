import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { LoginDoctorComponent } from './login-doctor/login-doctor.component';
import { SignupDoctorComponent } from './signup-doctor/signup-doctor.component';

const routes: Routes = [
  //{ path: '', redirectTo: '/signup', pathMatch: 'full' },
  { path: '', component : HomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logindoctor', component: LoginDoctorComponent},
  { path: 'signupdoctor', component: SignupDoctorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
