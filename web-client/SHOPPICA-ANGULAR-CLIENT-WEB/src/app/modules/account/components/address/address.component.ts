import { Address } from '@core/model/address/address';
import { tap, finalize } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthService } from '@core/services/auth/auth.service';
import { GhnService } from '@core/services/ghn/ghn.service';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Customer } from '@core/model/user/customer';
import { ShareService } from '@core/services/share/share.service';
import { combineLatest, forkJoin } from 'rxjs';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  addressForm: FormGroup;
  customer: Customer;
  isLoading = false;
  listProvince = [];
  listDistrict = [];
  listWard = [];
  districtSelectedId = 0;
  wardSelectedId = '0';

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly ghnService: GhnService,
    private readonly messageService: NzMessageService,
    private readonly router: Router,
    private readonly shareService: ShareService
  ) { }

  ngOnInit(): void {
    this.buildForm();

    combineLatest([
      this.ghnService.getProvinces(),
      this.shareService.customerInfoEmitted$
    ]).subscribe(res => {
      if (res[0].code === 200) {
        this.listProvince = res[0].data;
      }
      this.customer = res[1];
      this.setFormValue();
    });
  }

  buildForm() {
    this.addressForm = this.formBuilder.group({
      customerName: [null, Validators.required],
      phone: [null, Validators.required],
      province: [null, Validators.required],
      ward: [null, Validators.required],
      district: [null, Validators.required],
      apartment: [null, Validators.required],
    });
  }

  setFormValue() {
    if (this.customer?.address) {
      this.districtSelectedId = this.customer.address.districtId;
      this.wardSelectedId = this.customer.address.wardId;
      const province = this.listProvince.find(x => x.ProvinceID === this.customer.address.provinceId);
      const apartment = this.customer.address.addressName.split('-')[0];
      this.addressForm.controls.province.setValue(province);
      this.addressForm.controls.apartment.setValue(apartment);
    }
    this.addressForm.controls.customerName.setValue(this.customer?.customerName);
    this.addressForm.controls.phone.setValue(this.customer?.phone);
  }

  provinceChange(province): void {
    this.loadDistricts(province.ProvinceID);
  }

  districtChange(district): void {
    this.loadWards(district.DistrictID);
  }

  loadDistricts(provinceID: number): void {
    this.ghnService.getDistricts(provinceID).subscribe(res => {
      if (res.code === 200) {
        this.listDistrict = res.data;
        const district = this.districtSelectedId !== 0 ? this.listDistrict.find(x => x.DistrictID == this.districtSelectedId) : this.listDistrict[0];
        this.addressForm.controls.district.setValue(district);
        this.districtSelectedId = 0;
      }
    });
  }

  loadWards(districtID: number) {
    this.ghnService.getWards(districtID).subscribe(res => {
      if (res.code === 200) {
        this.listWard = res.data;
        const ward = this.wardSelectedId !== '0' ? this.listWard.find(x => x.WardCode == this.wardSelectedId) : this.listWard[0];
        this.addressForm.controls.ward.setValue(ward);
        this.wardSelectedId = '0';
      }
    });
  }

  updateAddress() {
    const province = this.addressForm.get('province').value;
    const district = this.addressForm.get('district').value;
    const ward = this.addressForm.get('ward').value;
    const apartment = this.addressForm.get('apartment').value;
    const address: Address = {
      provinceId: province.ProvinceID,
      districtId: district.DistrictID,
      wardId: ward.WardCode,
      addressName: `${apartment} - ${ward.WardName} - ${district.DistrictName} - Tỉnh ${province.ProvinceName}`
    };

    const request = {
      customerName: this.addressForm.get('customerName').value,
      phone: this.addressForm.get('phone').value,
      address
    };

    this.isLoading = true;

    this.authService.updateInfo(request).pipe(
      tap(result => {
        if (result.isSuccessed) {
          this.messageService.success('Update address successfully!');
          this.router.navigate(['/account']);

        }
        else {
          this.addressForm.setErrors({ error: result.message });
        }
      }),
      finalize(() => this.isLoading = false)
    ).subscribe();
  }


}
