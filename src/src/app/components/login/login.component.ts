import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import jwt_decode from 'jwt-decode';
import { AuthRequest, User } from 'src/app/models/caebo.constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  message: string;
  successMessage: string;
  submitting: boolean;
  userData: User;
  userGroupAdmin: boolean;
  
  get f() { return this.loginForm.controls; }

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) { 
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.submitting = true;
    this.clearMessages();

    if(this.loginForm.invalid) {
      this.submitting = false;
      return;
    }

    const payload: AuthRequest = {
      email: this.loginForm.value.email,
      pass: this.loginForm.value.password
    }

    this.authService.login(payload).subscribe(
      (data) => {
        if(data.statusCode !== 0) {
          this.message = 'Invalid email or password.';
        } else {
          this.userData = this.getDecodedAccessToken(data.message?.token);
          this.userGroupAdmin = this.userData.groupAdmin === 1;
          this.successMessage = 'Successful Authentication.';
        }
      },
      (error) => {
        this.message = 'Something went wrong, try again.';
        this.submitting = false;
      },
      () => { this.submitting = false; }
    )
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    }
    catch(error) {
      return null;
    }
  }


  clearMessages() {
    this.message = '';
    this.successMessage = '';
  }

}
