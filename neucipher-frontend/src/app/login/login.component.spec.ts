import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';

import { LoginComponent } from './login.component';
import { By } from '@angular/platform-browser';
import { AuthService } from '../auth.service'; 

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [ FormsModule, HttpClientTestingModule ], 
      providers: [ AuthService ] 

    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onLogin() function when form is submitted', () => {
    spyOn(component, 'onLogin');
    const form = fixture.debugElement.query(By.css('form')).nativeElement;
    form.dispatchEvent(new Event('submit'));
    expect(component.onLogin).toHaveBeenCalled();
  });

  it('should bind email and password fields correctly', () => {
    const emailInput = fixture.debugElement.query(By.css('#email')).nativeElement;
    const passwordInput = fixture.debugElement.query(By.css('#password')).nativeElement;
    component.email = 'myunittest@gmail.com';
    component.password = 'password@123';
    fixture.detectChanges();
    expect(emailInput.value).toBe('myunittest@gmail.com');
    expect(passwordInput.value).toBe('password@123');
  });
});
