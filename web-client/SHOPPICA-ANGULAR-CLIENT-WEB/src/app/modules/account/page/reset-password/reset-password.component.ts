import { NzMessageService } from 'ng-zorro-antd/message';
import { tap, finalize } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from './../../../../core/services/storage/storage.service';
import { AuthService } from './../../../../core/services/auth/auth.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { environment } from '@env';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetForm: FormGroup;
  isLoading = false;
  verifyToken: string;
  email: string;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly storageService: StorageService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly messageService: NzMessageService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.verifyToken = this.activatedRoute.snapshot.queryParamMap.get('token');
    console.log(this.verifyToken);
    this.email = this.storageService.get(environment.emailToken);
  }

  buildForm() {
    this.resetForm = this.formBuilder.group({
      newPassword: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required, this.confirmationValidator]],
    });
  }

  confirmationValidator = (control: FormControl) => {
    if (!control.value) {
      return { required: true };
    }
    if (control.value !== this.resetForm.controls.newPassword.value) {
      return { error: true, confirm: true };
    }
    return null;
  }


  resetPassword() {
    const request = {
      email: this.email,
      databaseToken: this.verifyToken,
      ...this.resetForm.value
    };
    this.isLoading = true;

    this.authService.resetPassword(request).pipe(
      tap(result => {
        if (result.isSuccessed) {
          this.messageService.success('Reset password successfully!');
          this.router.navigate(['/account/login']);
          this.storageService.remove(environment.emailToken);
        }
        else {
          this.resetForm.setErrors({ error: result.message });
        }
      }),
      finalize(() => this.isLoading = false)
    ).subscribe();
  }

}
