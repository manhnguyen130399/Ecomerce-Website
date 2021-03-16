import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { Login } from '@app/modules/auth/models/login';
import { tap, finalize, catchError } from 'rxjs/operators'
import { environment } from '@env';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoading: boolean;
  validateForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {

  }
  ngOnInit() {
    this.buildForm();
  }

  private login() {
    this.isLoading = true;
    const credentials = this.validateForm.value as Login;

    this.authService.login(credentials)
      .pipe(
        tap(result => {
          if (result.isSuccessed) {
            this.router.navigate(['/admin/dashboard'])
          }
          else {
            this.validateForm.setErrors({ "error": result.message });
          }
        }),
        finalize(() => (this.isLoading = false))
      )
      .subscribe();
  }

  private buildForm(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (this.validateForm.valid) {
      this.login();
    }
  }
}
