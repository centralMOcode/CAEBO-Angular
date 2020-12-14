import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AuthRequest, User } from 'src/app/models/caebo.constants';
import { SessionService } from 'src/app/services/auth/session.service';
import { Router } from '@angular/router';

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
    private authService: AuthService,
    private router: Router

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
          this.router.navigate(['/home']);
        }
      },
      (error) => {
        this.message = 'Something went wrong, try again.';
        this.submitting = false;
      },
      () => { this.submitting = false; }
    )
  }

  clearMessages() {
    this.message = '';
    this.successMessage = '';
  }

}
