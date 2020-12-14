
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthRequest, MESSAGES, RegisterRequest } from 'src/app/models/caebo.constants';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registerForm: FormGroup;
  message: string;
  successMessage: string;
  submitting: boolean;

  get f() { return this.registerForm.controls; }

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      passwordConfirm: ['', Validators.required]
    });
   }

  ngOnInit(): void {
  }

  onSubmit() {
    this.submitting = true;

    if (this.registerForm.invalid) {
      this.submitting = false;
      return;
    }

    const registerRequest: RegisterRequest = {
      first_name: this.registerForm.value.firstName,
      last_name: this.registerForm.value.lastName,
      username: this.registerForm.value.userName,
      email: this.registerForm.value.email,
      pass: this.registerForm.value.password,
      pass2: this.registerForm.value.passwordConfirm
    }

    this.authService.register(registerRequest).subscribe(
      (data) => {
        if (this.authService.statusCheck(data.statusCode)) {
          const payload = {
            email: this.registerForm.value.email,
            pass: this.registerForm.value.password,
          }
          this.callLoginAndRedirect(payload);
        } else {
          console.log(data);
          this.message = MESSAGES.GENERIC_ERROR;
        }
      },
      (error) => {
        this.message = MESSAGES.GENERIC_ERROR;
        this.submitting = false;
      },
      () => { this.submitting = false; }
    )
  }

  callLoginAndRedirect(payload: AuthRequest) {
    this.authService.login(payload).subscribe(
      (data) => {
        this.router.navigate(['home']);
      },
      (error) => {
        this.router.navigate(['login']);
      }
    )
  }

}
