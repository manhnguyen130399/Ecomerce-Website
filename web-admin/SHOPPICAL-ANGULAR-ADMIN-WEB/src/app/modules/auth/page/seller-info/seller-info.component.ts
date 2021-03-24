import { tap } from 'rxjs/operators';
import { ShareService } from '@modules/auth/services/share.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UserService } from '@modules/auth/services/user.service';
import { of } from 'rxjs';
import { environment } from '@env';
import { validPasswordValidator } from '@app/core/directive/valid-password.directive';
import { existEmailValidator } from '@app/core/directive/exist-email.directive';

@Component({
  selector: 'app-seller-info',
  templateUrl: './seller-info.component.html',
  styleUrls: ['./seller-info.component.css']
})
export class SellerInfoComponent implements OnInit {
  sellerRegisterForm!: FormGroup;
  isValidEmail = false;
  verifyCode: string;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly userService: UserService,
    private readonly shareService: ShareService,
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.shareService.parentPrevEmitted$.subscribe(formData => {
      this.sellerRegisterForm.patchValue(formData);
      if (formData.email != null) {
        this.isValidEmail = true;
      }
    })

    this.sellerRegisterForm.controls.password.valueChanges.subscribe(data => console.log)
  }

  buildForm() {
    this.sellerRegisterForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email], existEmailValidator(this.userService)],
      fullName: [null, Validators.required],
      verifyCode: [null, [Validators.required, this.confirmVerifyCode]],
      password: [null, [Validators.required, validPasswordValidator(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$'))]],
      confirmPassword: [null, [Validators.required, this.confirmationValidator]],
    })
  }

  sendCode() {
    this.userService.sendCode(this.sellerRegisterForm.get("email").value);
  }

  confirmVerifyCode = (control: FormControl) => {
    if (!control.value) {
      return { required: true };
    }
    if (control.value !== atob(localStorage.getItem(environment.verifyKey))) {
      return { error: true, confirm: true }
    }
    return null;
  }

  confirmationValidator = (control: FormControl) => {
    if (!control.value) {
      return { required: true };
    }
    if (control.value !== this.sellerRegisterForm.controls.password.value) {
      return { error: true, confirm: true }
    }
    return null;
  }

  changeToNextStep() {
    const data = {
      ...this.sellerRegisterForm.value,
      isNext: true
    };
    this.shareService.childEmitChange(data);
  }
}
