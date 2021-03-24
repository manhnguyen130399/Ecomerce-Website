import { UserService } from '@modules/auth/services/user.service';
import { ShareService } from './../../services/share.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { SlugifyPipe } from '@app/core/pipe/slugify.pipe';
import { existStoreNameValidator } from '@app/core/directive/exist-store-name.directive';

@Component({
  selector: 'app-store-info',
  templateUrl: './store-info.component.html',
  styleUrls: ['./store-info.component.css']
})
export class StoreInfoComponent implements OnInit {
  isValidStoreName = false;
  storeRegisterForm: FormGroup;
  isValidSellerForm = false;
  isLoadingSubmitForm = false;
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly userService: UserService,
    private readonly shareService: ShareService,
    private datePipe: DatePipe,
    private slugifyPipe: SlugifyPipe
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.shareService.parentNextEmitted$.subscribe(formData => {
      this.storeRegisterForm.patchValue(formData);
      if (formData.storeName != null) {
        this.isValidStoreName = true;
      }
    })

    this.shareService.sellerFormValidEmitted$.subscribe(isValid => {
      this.isValidSellerForm = isValid;
    })

    this.storeRegisterForm.get("storeName").valueChanges.subscribe(storeName => {
      const slugStoreName = this.slugifyPipe.transform(storeName);
      this.storeRegisterForm.controls.website.setValue(`http://localhost:4200/${slugStoreName}`)
    })
  }

  buildForm() {
    this.storeRegisterForm = this.formBuilder.group({
      storeName: [null, Validators.required, existStoreNameValidator(this.userService)],
      website: ["", Validators.required],
      openTime: [new Date(), Validators.required],
      closeTime: [new Date(), Validators.required],
    })

    this.storeRegisterForm.get('website').disable();
  }

  changeToPrevStep() {
    const data = {
      ...this.storeRegisterForm.value,
      isPrev: true,
      website: (`http://localhost:4200/${this.slugifyPipe.transform(this.storeRegisterForm.controls.storeName.value)}`)
    };
    this.shareService.childEmitChange(data);
  }

  submitForm() {
    const data = {
      ...this.storeRegisterForm.value,
      openTime: this.datePipe.transform(this.storeRegisterForm.get("openTime").value, 'HH:mm:ss'),
      closeTime: this.datePipe.transform(this.storeRegisterForm.get("closeTime").value, 'HH:mm:ss'),
      isDone: true,
      website: this.storeRegisterForm.controls.website.value
    };
    this.isLoadingSubmitForm = true;
    this.shareService.childEmitChange(data);
  }

}
