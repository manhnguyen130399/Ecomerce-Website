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

@Component({
  selector: 'app-update-info',
  templateUrl: './update-info.component.html',
  styleUrls: ['./update-info.component.css']
})
export class UpdateInfoComponent implements OnInit {

  sellerUpdateForm!: FormGroup;
  fileList: NzUploadFile[] = [];
  listProvince: Province[] = [];
  listWard: Ward[] = [];
  listDistrict: District[] = [];
  districtIdSelected = -1;
  wardIdSelected: string = '-1';
  backendUrl = `${environment.productServiceUrl}/api/upload`;
  isLoadingSubmit = false;
  isLoadingSellerDetail = true;
  initialEmailValue: string;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly ghnService: GhnService,
    private readonly profileService: ProfileService,
    private readonly userService: UserService,
    private readonly messageService: NzMessageService,
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.loadProvinces();
    this.loadSellerInfo();
  }

  setFormValue(value: Seller) {
    if (value.address) {
      const province = this.listProvince.find(x => x.ProvinceID == value.address.provinceId);
      this.districtIdSelected = value.address.districtId;
      this.wardIdSelected = value.address.wardId;
      this.sellerUpdateForm.controls.province.setValue(province);
    }
    this.initialEmailValue = value.email;
    this.sellerUpdateForm.controls.sellerName.setValue(value.sellerName);
    this.sellerUpdateForm.controls.gender.setValue(value.gender);
    this.sellerUpdateForm.controls.phone.setValue(value.phone);
    this.sellerUpdateForm.controls.email.setValue(value.email);
    this.sellerUpdateForm.controls.sellerName.setValue(value.sellerName);

    let listImage = [];
    let file = {
      uid: -1,
      url: value.image,
      name: 'image.png',
    };
    listImage.push(file)
    this.fileList = listImage;
  }


  loadSellerInfo() {
    this.profileService.getSellerDetail().subscribe(res => {
      if (res.isSuccessed) {
        this.isLoadingSellerDetail = false;
        this.setFormValue(res.data);
      }
    })
  }

  buildForm() {
    this.sellerUpdateForm = this.formBuilder.group({
      sellerName: [null, Validators.required],
      gender: [null, Validators.required],
      phone: [null, Validators.required],
      email: [null, Validators.required, this.existEmailValidator],
      province: [null, Validators.required],
      ward: [null, Validators.required],
      district: [null, Validators.required],
    })

    this.sellerUpdateForm.controls.email.disable();
  }

  existEmailValidator = (control: FormControl) => {
    if (control.value == this.initialEmailValue) {
      return of(null);
    }
    return timer(1000).pipe(
      switchMap(() => this.userService.checkEmailExist(control.value)),
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
        this.sellerUpdateForm.controls.district.setValue(districtSelect)
        this.districtIdSelected = -1;
      }
    })
  }

  loadWards(districtID: number) {
    this.ghnService.getWards(districtID).subscribe(res => {
      if (res.code == 200) {
        this.listWard = res.data;
        const wardSelect = this.wardIdSelected !== '-1' ? this.listWard.find(x => x.WardCode == this.wardIdSelected) : this.listWard[0];
        this.sellerUpdateForm.controls.ward.setValue(wardSelect)
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
    const province = this.sellerUpdateForm.get("province").value;
    const district = this.sellerUpdateForm.get("district").value;
    const ward = this.sellerUpdateForm.get("ward").value;


    const address: Address = {
      provinceId: province.ProvinceID,
      districtId: district.DistrictID,
      wardId: ward.WardCode,
      addressName: `${ward.WardName} - ${district.DistrictName} - tỉnh ${province.ProvinceName}`
    }
    const sellerInfo: Seller = {
      email: this.sellerUpdateForm.get("email").value,
      phone: this.sellerUpdateForm.get("phone").value,
      sellerName: this.sellerUpdateForm.get("sellerName").value,
      gender: parseInt(this.sellerUpdateForm.get("gender").value),
      address: address,
      image: "",
    }

    if (this.fileList[0].status === "done") {
      sellerInfo.image = this.fileList[0].response.data[0];
    }
    else if (this.fileList[0].url != undefined) {
      sellerInfo.image = this.fileList[0].url;
    }

    this.isLoadingSubmit = true;
    this.profileService.updateSellerInfo(sellerInfo).
      pipe(
        finalize(() => this.isLoadingSubmit = false)
      ).subscribe(res => {
        if (res.isSuccessed) {
          this.messageService.create("success", "update info successfully");
          this.profileService.changeSellerInfo(sellerInfo);
        }
      });
  }


}
