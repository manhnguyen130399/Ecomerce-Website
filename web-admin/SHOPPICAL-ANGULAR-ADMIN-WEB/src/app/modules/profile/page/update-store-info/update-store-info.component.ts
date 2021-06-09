import { UtilitiesService } from '@app/core/services/utilities/utilities.service';
import { DatePipe } from '@angular/common';
import { SlugifyPipe } from './../../../../core/pipe/slugify.pipe';
import { Address } from '@modules/profile/model/address';
import { UserService } from '@modules/auth/services/user.service';
import { ProfileService } from '@modules/profile/services/profile.service';
import { GhnService } from '@core/services/ghn/ghn.service';
import { District } from '@modules/profile/model/district';
import { Ward } from '@modules/profile/model/ward';
import { Province } from '@modules/profile/model/province';
import { FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { environment } from '@env';
import { Seller } from '@modules/profile/model/seller';
import { of, timer } from 'rxjs';
import { switchMap, finalize } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Store } from '@app/modules/profile/model/store';

@Component({
  selector: 'app-update-store-info',
  templateUrl: './update-store-info.component.html',
  styleUrls: ['./update-store-info.component.css']
})
export class UpdateStoreInfoComponent implements OnInit {
  storeUpdateForm!: FormGroup;
  fileList: NzUploadFile[] = [];
  listProvince: Province[] = [];
  listWard: Ward[] = [];
  listDistrict: District[] = [];
  districtIdSelected: number = -1;
  wardIdSelected = '-1';
  backendUrl = `${environment.productServiceUrl}/api/upload`;
  isLoadingSubmit = false;
  isLoadingSellerDetail = true;
  initialStoreNameValue: string;
  epochTime = "1970-01-01";

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly ghnService: GhnService,
    private readonly profileService: ProfileService,
    private readonly userService: UserService,
    private readonly messageService: NzMessageService,
    private readonly slugifyPipe: SlugifyPipe,
    private readonly datePipe: DatePipe,
    private readonly utilitiesService: UtilitiesService
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.loadProvinces();
    this.loadSellerInfo();

    this.storeUpdateForm.get("storeName").valueChanges.subscribe(storeName => {
      const slugStoreName = this.slugifyPipe.transform(storeName);
      this.storeUpdateForm.controls.website.setValue(`http://localhost:4200/${slugStoreName}`)
    })
  }

  buildForm() {
    this.storeUpdateForm = this.formBuilder.group({
      storeName: [null, Validators.required, this.existStoreNameValidator],
      owner: [null, Validators.required],
      openTime: [null, Validators.required],
      closeTime: [null, Validators.required],
      website: [null, Validators.required],
      province: [null, Validators.required],
      ward: [null, Validators.required],
      district: [null, Validators.required],
    })


    this.storeUpdateForm.get('website').disable();
    this.storeUpdateForm.get('owner').disable();
  }


  setFormValue(value: Store) {
    const address = JSON.parse(value.address);
    const owner = this.utilitiesService.getName();
    if (address) {
      const province = this.listProvince.find(x => x.ProvinceID == address.provinceId);
      this.districtIdSelected = address.districtId;
      this.wardIdSelected = address.wardId;
      this.storeUpdateForm.controls.province.setValue(province);
    }
    this.initialStoreNameValue = value.storeName;
    this.storeUpdateForm.controls.storeName.setValue(value.storeName);
    this.storeUpdateForm.controls.closeTime.setValue(new Date(`${this.epochTime}T${value.closeTime}`));
    this.storeUpdateForm.controls.openTime.setValue(new Date(`${this.epochTime}T${value.openTime}`));
    this.storeUpdateForm.controls.owner.setValue(owner);
    this.storeUpdateForm.controls.website.setValue(value.website);

    let listImage = [];
    let file = {
      uid: -1,
      url: value.logo,
      name: 'image.png',
    };
    listImage.push(file)
    this.fileList = listImage;
  }


  loadSellerInfo() {
    this.profileService.getStoreDetail().subscribe(res => {
      if (res.code == "OK") {
        this.isLoadingSellerDetail = false;
        this.setFormValue(res.data);
      }
    })
  }


  existStoreNameValidator = (control: FormControl) => {
    if (control.value == this.initialStoreNameValue) {
      return of(null);
    }
    return timer(1000).pipe(
      switchMap(() => this.userService.checkStoreExist(control.value)),
    )
  }



  loadProvinces() {
    this.ghnService.getProvinces().subscribe(res => {
      if (res.code == 200) {
        this.listProvince = res.data;
      }
    })
  }

  loadDistricts(provinceID: number) {
    this.ghnService.getDistricts(provinceID).subscribe(res => {
      if (res.code == 200) {
        this.listDistrict = res.data;
        const districtSelect = this.districtIdSelected !== -1 ? this.listDistrict.find(x => x.DistrictID == this.districtIdSelected) : this.listDistrict[0];
        this.storeUpdateForm.controls.district.setValue(districtSelect)
        this.districtIdSelected = -1;
      }
    })
  }

  loadWards(districtID: number) {
    this.ghnService.getWards(districtID).subscribe(res => {
      if (res.code == 200) {
        this.listWard = res.data;
        const wardSelect = this.wardIdSelected !== '-1' ? this.listWard.find(x => x.WardCode == this.wardIdSelected) : this.listWard[0];
        this.storeUpdateForm.controls.ward.setValue(wardSelect)
        this.wardIdSelected = '-1';
      }
    })
  }

  provinceChange(province: Province): void {
    this.loadDistricts(province.ProvinceID);
  }

  districtChange(district: District): void {
    this.loadWards(district.DistrictID);
  }

  submitForm() {
    const province = this.storeUpdateForm.get("province").value;
    const district = this.storeUpdateForm.get("district").value;
    const ward = this.storeUpdateForm.get("ward").value;
    const address: Address = {
      provinceId: province.ProvinceID,
      districtId: district.DistrictID,
      wardId: ward.WardCode,
      addressName: `${ward.WardName} - ${district.DistrictName} - tỉnh ${province.ProvinceName}`
    }
    const storeInfo: Store = {
      openTime: this.datePipe.transform(this.storeUpdateForm.get("openTime").value, 'HH:mm:ss'),
      closeTime: this.datePipe.transform(this.storeUpdateForm.get("closeTime").value, 'HH:mm:ss'),
      owner: this.storeUpdateForm.get("owner").value,
      storeName: this.storeUpdateForm.get("storeName").value,
      website: this.storeUpdateForm.get("website").value,
      address: JSON.stringify(address),
      logo: "",
    }

    if (this.fileList[0].status === "done") {
      storeInfo.logo = this.fileList[0].response.data[0];
    }
    else if (this.fileList[0].url != undefined) {
      storeInfo.logo = this.fileList[0].url;
    }
    this.isLoadingSubmit = true;
    this.profileService.updateStoreInfo(storeInfo).
      pipe(
        finalize(() => this.isLoadingSubmit = false)
      ).subscribe(res => {
        if (res.code === "OK") {
          this.messageService.create("success", "update info successfully");
        }
      });
  }




}
