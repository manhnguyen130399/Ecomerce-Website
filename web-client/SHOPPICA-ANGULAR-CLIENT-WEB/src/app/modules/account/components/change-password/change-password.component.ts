import { LoginMethod } from './../../../../core/enum/login-method';
import { StorageService } from './../../../../core/services/storage/storage.service';
import { JwtService } from './../../../../core/services/jwt/jwt.service';
import { tap, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthService } from '@core/services/auth/auth.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { environment } from '@env';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup;
  isLoading = false;
  loginMethod: string;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly messageService: NzMessageService,
    private readonly router: Router,
    private readonly storageService: StorageService
  ) { }

  ngOnInit(): void {
    this.loginMethod = this.storageService.get(environment.loginMethod);
    this.buildForm();
  }


  buildForm() {
    this.changePasswordForm = this.formBuilder.group({
      currentPassword: [null, this.loginMethod === LoginMethod.SOCIAL ? [] : [Validators.required]],
      newPassword: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required, this.confirmationValidator]],
    });
  }

  confirmationValidator = (control: FormControl) => {
    if (!control.value) {
      return { required: true };
    }
    if (control.value !== this.changePasswordForm.controls.newPassword.value) {
      return { error: true, confirm: true };
    }
    return null;
  }

  changePassword() {
    const request = {
      ...this.changePasswordForm.value,
      loginMethod: this.loginMethod,
    };
    this.isLoading = true;

    this.authService.changePassword(request).pipe(
      tap(result => {
        if (result.isSuccessed) {
          this.messageService.success('Change password successfully!');
          this.authService.logout();
          this.router.navigate(['/account/login']);
        }
        else {
          this.changePasswordForm.setErrors({ error: result.message });
        }
      }),
      finalize(() => this.isLoading = false)
    ).subscribe();
  }

}
