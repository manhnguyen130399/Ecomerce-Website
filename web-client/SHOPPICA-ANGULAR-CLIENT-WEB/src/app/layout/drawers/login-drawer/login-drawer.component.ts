import { AuthService } from './../../../core/services/auth/auth.service';

import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';
import { SocialAuthService, GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';

@Component({
  selector: 'app-login-drawer',
  templateUrl: './login-drawer.component.html',
  styleUrls: ['./login-drawer.component.css']
})
export class LoginDrawerComponent implements OnInit {
  @Input() isOpenLoginDrawer: boolean = false;
  @Output() loginSucceededEvent = new EventEmitter<boolean>();
  @Output() closeLoginDrawer = new EventEmitter<boolean>();
  @Output() openRegisterDrawerEvent = new EventEmitter<boolean>();
  @Output() openResetPasswordDrawerEvent = new EventEmitter<boolean>();

  isClose: Observable<any>;
  loginForm: FormGroup;
  isLoading = false;
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly messageService: NzMessageService,
    private socialAuthService: SocialAuthService
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.socialAuthService.authState.subscribe((user) => {
      const socialLoginData = {
        email: user.email,
        provider: user.provider,
        imageUrl: user.photoUrl,
        fullName: user.name,
        providerKey: user.id
      }
      this.authService.socialLogin(socialLoginData).pipe(
        tap(result => {
          if (result.isSuccessed) {
            this.loginSucceededEvent.emit();
            this.closeMenu();
            this.messageService.success("Login successfully!");
            this.loginForm.reset();
          }
          else {
            this.loginForm.setErrors({ "error": result.message });
          }
        }),
        finalize(() => (this.isLoading = false))
      )
        .subscribe();

    });
  }

  buildForm() {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
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
    // validate
    for (const i in this.loginForm.controls) {
      this.loginForm.controls[i].markAsDirty();
      this.loginForm.controls[i].updateValueAndValidity();
    }
    const data = this.loginForm.value;
    this.isLoading = true;
    this.authService.login(data).pipe(
      tap(result => {
        if (result.isSuccessed) {
          this.loginSucceededEvent.emit();
          this.closeMenu();
          this.messageService.success("Login successfully!");
          this.loginForm.reset();
        }
        else {
          this.loginForm.setErrors({ "error": result.message });
        }
      }),
      finalize(() => (this.isLoading = false))
    )
      .subscribe();
  }

  signInWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signInWithFacebook(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
}
