import { ShareService } from './../../services/share.service';
import { StoreService } from '@modules/auth/services/store.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { of } from 'rxjs';

@Component({
  selector: 'app-store-info',
  templateUrl: './store-info.component.html',
  styleUrls: ['./store-info.component.css']
})
export class StoreInfoComponent implements OnInit {
  isValidStoreName = false;
  storeRegisterForm: FormGroup;
  isValidSellerForm = false;
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly storeService: StoreService,
    private readonly shareService: ShareService,
    private datePipe: DatePipe
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.shareService.parentNextEmitted$.subscribe(formData => {
      this.storeRegisterForm.setValue(formData);
      if (formData.storeName != null) {
        this.isValidStoreName = true;
      }
    })

    this.shareService.sellerFormValidEmitted$.subscribe(isValid => {
      this.isValidSellerForm = isValid;
    })
  }

  buildForm() {
    this.storeRegisterForm = this.formBuilder.group({
      storeName: [null, Validators.required, this.storeNameAsyncValidator],
      storeAddress: [null, Validators.required],
      website: [null, Validators.required],
      openTime: [new Date(), Validators.required],
      closeTime: [new Date(), Validators.required],

    })
  }

  storeNameAsyncValidator = (control: FormControl) => {
    if (!this.isValidStoreName) {
      return this.storeService.checkStoreExist(control.value);
    }
    return of(null)
  }

  changeToPrevStep() {
    const data = {
      ...this.storeRegisterForm.value,
      isPrev: true
    };
    this.shareService.childEmitChange(data);
  }

  submitForm() {
    const data = {
      ...this.storeRegisterForm.value,
      openTime: this.datePipe.transform(this.storeRegisterForm.get("openTime").value, 'HH:mm:ss'),
      closeTime: this.datePipe.transform(this.storeRegisterForm.get("closeTime").value, 'HH:mm:ss'),
      isDone: true
    };
    this.shareService.childEmitChange(data);
  }

}
