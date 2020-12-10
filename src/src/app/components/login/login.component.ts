import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import * as jwt_decode from 'jwt-decode';
import { AuthRequest } from 'src/app/models/caebo.constants';

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
    if(this.loginForm.invalid) {
      this.message = 'Not valid';
      this.submitting = false;
      return;
    }

    const payload: AuthRequest = {
      email: this.loginForm.value.email,
      pass: this.loginForm.value.password
    }

    this.authService.login(payload).subscribe(
      (data) => {
        console.log(data);
        this.successMessage = 'Successful Auth';
      },
      (error) => {
        console.log(error);
        this.message = 'Something went wrong, try again.';
        this.submitting = false;
      },
      () => { this.submitting = false; }
    )
  }

}
