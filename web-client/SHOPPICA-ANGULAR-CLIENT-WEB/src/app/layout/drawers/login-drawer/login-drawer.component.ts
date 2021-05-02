
import { ShareService } from './../../../core/services/share/share.service';
import { LoginMethod } from './../../../core/enum/login-method';
import { StorageService } from './../../../core/services/storage/storage.service';
import { AuthService } from './../../../core/services/auth/auth.service';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';
import { SocialAuthService, GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';
import { environment } from '@env';

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
    private readonly messageService: NzMessageService,
    private readonly socialAuthService: SocialAuthService,
    private readonly storageService: StorageService,
    private readonly shareService: ShareService,
  ) { }

  ngOnInit(): void {
    this.buildForm();

    this.socialAuthService.authState.subscribe((user) => {
      this.socialLogin(user);
    });

    if (this.authService.isAuthenticated()) {
      this.getCustomerDetail();
    }
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
    if (this.loginForm.invalid) {
      return;
    }
    const data = this.loginForm.value;
    this.isLoading = true;
    this.authService.login(data).pipe(
      tap(result => {
        if (result.isSuccessed) {
          this.loginSuccessAction();
          this.storageService.set(environment.loginMethod, LoginMethod.NORMAL);
        }
        else {
          this.loginForm.setErrors({ "error": result.message });
        }
      }),
      finalize(() => (this.isLoading = false))
    )
      .subscribe();
  }

  socialLogin(user) {
    this.isLoading = true;
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
          this.loginSuccessAction();
          this.storageService.set(environment.loginMethod, LoginMethod.SOCIAL);
        }
        else {
          this.loginForm.setErrors({ "error": result.message });
        }
      }),
      finalize(() => (this.isLoading = false))
    )
      .subscribe();

  }

  loginSuccessAction() {
    this.shareService.loginSuccessEvent();
    this.closeMenu();
    this.messageService.success("Login successfully!");
    this.loginForm.reset();
    this.getCustomerDetail();
  }

  getCustomerDetail() {
    this.authService.getUserById().subscribe(res => {
      if (res.isSuccessed) {
        this.shareService.customerInfoChangeEvent(res.data);
      }
    });
  }

  signInWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signInWithFacebook(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }


}
