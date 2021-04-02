import { AuthService } from './../../../core/services/auth/auth.service';

import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login-drawer',
  templateUrl: './login-drawer.component.html',
  styleUrls: ['./login-drawer.component.css']
})
export class LoginDrawerComponent implements OnInit {
  @Input() isOpenLoginDrawer: boolean = false;
  @Output() closeLoginDrawer = new EventEmitter<boolean>();
  @Output() openRegisterDrawerEvent = new EventEmitter<boolean>();
  @Output() openResetPasswordDrawerEvent = new EventEmitter<boolean>();

  isClose: Observable<any>;
  loginForm: FormGroup;
  isLoading = false;
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.loginForm = this.formBuilder.group({
      email: [null, Validators.required],
      password: [null, Validators.required],
    })
  }

  closeMenu(): void {
    this.closeLoginDrawer.emit();
  }

  openRegisterDrawer() {
    this.openRegisterDrawerEvent.emit();
  }

  openResetPasswordDrawer() {
    this.openResetPasswordDrawerEvent.emit();
  }

  submitForm() {
    const data = this.loginForm.value;

    this.authService.login(data).pipe(
      tap(result => {
        if (result.isSuccessed) {
          console.log("success")
        }
        else {
          this.loginForm.setErrors({ "error": result.message });
        }
      }),
      finalize(() => (this.isLoading = false))
    )
      .subscribe();
  }

}
