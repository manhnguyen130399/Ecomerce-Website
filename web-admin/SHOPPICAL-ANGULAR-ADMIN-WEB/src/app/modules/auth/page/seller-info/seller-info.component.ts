import { ShareService } from '@modules/auth/services/share.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UserService } from '@modules/auth/services/user.service';
import { of } from 'rxjs';
import { environment } from '@env';

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
      this.sellerRegisterForm.setValue(formData);
      if (formData.email != null) {
        this.isValidEmail = true;
      }
    })
  }

  buildForm() {
    this.sellerRegisterForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email], this.emailAsyncValidator],
      fullName: [null, Validators.required],
      verifyCode: [null, [Validators.required, this.confirmVerifyCode]],
      // gender: ["Male", Validators.required],
      // phone: [null, Validators.required],
      password: [null, Validators.required],
      confirmPassword: [null, [Validators.required, this.confirmationValidator]],
      // storeName: [null, Validators.required],
      // openTime: [null, Validators.required],
      // closeTime: [new Date(), Validators.required],
      // webSite: [new Date(), Validators.required],
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

  emailAsyncValidator = (control: FormControl) => {
    if (!this.isValidEmail) {
      return this.userService.checkEmailExist(control.value);
    }
    return of(null);
  }

  changeToNextStep() {
    const data = {
      ...this.sellerRegisterForm.value,
      isNext: true
    };
    this.shareService.childEmitChange(data);
  }
}
